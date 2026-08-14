import {z} from "zod";
import {contentJson, OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {SyncDbModel} from "common/models/sync/SyncDbModel";

export class ReadSync extends OpenAPIRoute {
    schema = {
        response: {
            "200": {
                body: {
                    ...contentJson(z.object({
                        id: z.number(),
                        key: z.string(),
                        lastSuccess: z.number().optional(),
                        lastAttempt: z.number().optional(),
                        error: z.string().optional(),
                        interval: z.number().optional(),
                        isActive: z.boolean()
                    }))
                }
            }
        }
    };

    async handle(c: AppContext) {
        const result = await c.env.profile.prepare(`
            SELECT *
            FROM [Sync]
        `).all<SyncDbModel>();

        return c.json(result.results);
    }
}

export class UpdateSync extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.object({
                id: z.number(),
                key: z.string().min(1).max(50),
                interval: z.number().optional(),
                isActive: z.boolean()
            }))
        }
    }

    async handle(c: AppContext) {
        const {body} = await this.getValidatedData<typeof this.schema>();

        if(body.id === 0) {
            await c.env.profile.prepare(`
                INSERT INTO [Sync]
                ([key], [lastSuccess], [lastAttempt], [error], [interval], [isActive])
                VALUES (?1, NULL, NULL, NULL, ?2, ?3)
            `)
                .bind(body.key, body.interval, body.isActive)
                .run();
        }
        else {
            await c.env.profile.prepare(`
                UPDATE [Sync]
                SET [interval] = ?2, [isActive] = ?3
                WHERE [id] = ?1
            `)
                .bind(body.id, body.interval, body.isActive)
                .run();

            return c.json({id: body.id});
        }
    }
}