import {contentJson, OpenAPIRoute} from "chanfana";
import {z} from "zod";
import {AppContext} from "@/models/AppContext";
import {ViewSummary} from "@/models/ViewSummary";

export class Statistics extends OpenAPIRoute {
    schema = {
        responses: {
            "200": {
                description: 'Successful operation',
                ...contentJson(z.array(z.object({
                    url: z.string(),
                    views: z.number()
                })))
            }
        }
    }

    async handle(c: AppContext) {
        const query = await c.env.index.prepare(`
            SELECT
                url,
                COUNT(*) as views
            FROM analytics
            GROUP BY url
            ORDER BY views DESC;
        `).all<ViewSummary>();

        return query.results;
    }
}