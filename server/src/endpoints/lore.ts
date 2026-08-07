import {OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {LoreDbModel} from "common/models/database/Lore";

export class Lore extends OpenAPIRoute {
    async handle(c: AppContext) {
        const query = await c.env.profile.prepare(`
            SELECT *
            FROM [Lore]
        `).all<LoreDbModel>();

        return query.results;
    }
}