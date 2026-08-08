import {contentJson, OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {z} from "zod";

export class Analytics extends OpenAPIRoute {
    schema = {
        request: {
            query: z.object({
                url: z.string().max(200)
            })
        },
        responses: {
            "200": {
                description: 'Successful operation',
                ...contentJson(z.object({
                    success: z.boolean()
                }))
            }
        }
    }

    async handle(c: AppContext) {
        const data = await this.getValidatedData<typeof this.schema>();

        const url = data.query.url;
        const timestamp = Date.now();
        const country = String((c.req as any)?.country) || null;

        try {
            await c.env.profile.prepare(`
                INSERT INTO Analytics ([url], [timestamp], [country])
                VALUES (?, ?, ?)
            `)
                .bind(url, timestamp, country)
                .run();

            return {
                success: true
            };
        }
        catch(e) {
            return {
                success: false
            };
        }
    }
}