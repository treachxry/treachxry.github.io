import {OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {StoryDbModel} from "common/models/story/StoryDbModel";

export class ReadStories extends OpenAPIRoute {
    async handle(c: AppContext) {
        const result = await c.env.profile.prepare(`
            SELECT *
            FROM [Story]
        `).all<StoryDbModel>();

        const res = result.results;

        res.forEach(r => {
            r.isActive = Boolean(r.isActive);
        })

        return c.json(res);
    }
}