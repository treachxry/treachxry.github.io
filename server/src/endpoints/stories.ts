import {useSync} from "@/composables/useSync";
import {useTrackBearApi} from "@/composables/useTrackBearApi";
import {OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {StoryDbModel} from "common/models/story/StoryDbModel";
import {StoryData} from "common/models/story/StoryData";
import {TrackBearResponse} from "@/models/TrackBearResponse";
import {StoryViewModel} from "common/models/story/StoryViewModel";

export class Stories extends OpenAPIRoute {
    async handle(c: AppContext) {
        const {syncIfOutdated} = useSync(c.env.profile, 'Story');

        const syncResult: Promise<boolean> = syncIfOutdated(() => syncStories(c));

        c.executionCtx.waitUntil(syncResult);

        const query = await c.env.profile.prepare(`
            SELECT
                S.*,
                (
                    SELECT json_group_array(T.[Name]) 
                    FROM [Tag4Story] TS
                    JOIN [Tag] T ON T.[ID] = TS.[TagID]
                    WHERE TS.[StoryID] = S.[ID]
                ) AS [tagsJson]
            FROM [Story] S
        `).all<any>();

        const results: StoryViewModel[] =  query.results.map(m => ({
            ...m as StoryDbModel,
            tags: JSON.parse(m.tagsJson) ?? []
        }));

        return c.json(results);
    }
}

async function syncStories(c: AppContext): Promise<void> {
    const {sendRequest} = useTrackBearApi(c.env.TRACKBEAR_API_KEY);

    const response: TrackBearResponse<StoryData[]> = await sendRequest<StoryData[]>('/project');

    if(!response.data) {
        throw new Error(`${response.error?.code ?? 0} - ${response.error?.message ?? 'Unknown error'}`);
    }

    const stories: Partial<StoryDbModel>[] = response.data
        .filter(story => story.displayOnProfile)
        .map(data => ({
            ...data,
            wordCount: Number(data.totals['word']) ?? 0,
            lastUpdated: new Date(data.lastUpdated ?? 0).getTime(),
            tbID: data.id,
            summary: data.description
        }));

    const statement = c.env.profile.prepare(`
        INSERT OR REPLACE INTO [Story] (
            [tbID],
            [title],
            [summary], 
            [phase], 
            [wordCount], 
            [lastUpdated]
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6)
        ON CONFLICT DO UPDATE SET
            [tbID] = ?1,
            [title] = ?2,
            [summary] = ?3,
            [phase] = ?4,
            [wordCount] = ?5,
            [lastUpdated] = ?6
    `);

    await c.env.profile.batch(stories.map(s => {
        return statement.bind(
            s.tbID,
            s.title,
            s.summary,
            s.phase,
            s.wordCount,
            s.lastUpdated
        );
    }));
}