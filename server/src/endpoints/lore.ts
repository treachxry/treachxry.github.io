import {OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {LoreDbModel, LoreViewModel} from "common/models/database/Lore";

export class Lore extends OpenAPIRoute {
    async handle(c: AppContext): Promise<LoreViewModel[]> {
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

        return query.results.map(m => ({
            ...m as LoreDbModel,
            links: JSON.parse(m.storyJson) ?? {}
        }));
    }
}