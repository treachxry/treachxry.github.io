import {contentJson, OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {TagDbModel} from "common/models/tag/TagDbModel";
import {z} from "zod";

export class ReadTags extends OpenAPIRoute {
    async handle(c: AppContext) {
        const result = await c.env.profile.prepare(`
            SELECT *
            FROM [Tag]
        `).all<TagDbModel>();

        return c.json(result.results);
    }
}

export class UpdateTag extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.object({
                id: z.number(),
                name: z.string().min(1).max(100)
            }))
        }
    }

    async handle(c: AppContext) {
        const {body} = await this.getValidatedData<typeof this.schema>();

        if(body.id === 0) {
            const id = await c.env.profile.prepare(`
                INSERT INTO [Tag] ([name])
                VALUES (?1)
            `)
                .bind(body.name)
                .first<number>();

            body.id = id ?? 0;
        }
        else {
            await c.env.profile.prepare(`
                UPDATE [Tag]
                SET [name] = ?2
                WHERE [id] = ?1
            `)
                .bind(body.id, body.name)
                .run();
        }

        return c.json({id: body.id});
    }
}

export class DeleteTag extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.object({
                id: z.number()
            }))
        }
    }

    async handle(c: AppContext) {
        const {body} = await this.getValidatedData<typeof this.schema>();

        await c.env.profile.prepare(`
            DELETE FROM [Tag]
            WHERE [id] = ?1
        `)
            .bind(body.id)
            .run();

        return c.json({id: body.id});
    }
}