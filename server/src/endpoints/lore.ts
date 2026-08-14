import {OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {LoreDbModel} from "common/models/lore/LoreDbModel";
import {LoreViewModel} from "common/models/lore/LoreViewModel";

export class Lore extends OpenAPIRoute {
    async handle(c: AppContext) {
        const query = await c.env.profile.prepare(`
            SELECT 
                L.*,
                (
                    SELECT json_group_array(
                        json_object('url', S.[url], 'label', S.[title])
                    )
                    FROM [Lore4Story] LS
                    JOIN [Story] S ON S.[ID] = LS.[StoryID]
                    WHERE LS.[LoreID] = L.[ID]
                ) AS [storyJson]
            FROM [Lore] L
        `).all<any>();

        const results: LoreViewModel[] = query.results.map(m => ({
            ...m as LoreDbModel,
            links: JSON.parse(m.storyJson) ?? {}
        }));

        return c.json(results);
    }
}