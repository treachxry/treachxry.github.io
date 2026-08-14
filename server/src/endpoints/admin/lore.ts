import {contentJson, OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {LoreDbModel} from "common/models/lore/LoreDbModel";
import {z} from "zod";

export class ReadLore extends OpenAPIRoute {
    async handle(c: AppContext) {
        const result = await c.env.profile.prepare(`
            SELECT *
            FROM [Lore]
        `).all<LoreDbModel>();

        const res = result.results;

        res.forEach(r => {
            r.isActive = Boolean(r.isActive);
        })

        return c.json(res);
    }
}

export class UpdateLore extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.object({
                id: z.number(),
                key: z.string().min(1).max(100),
                name: z.string().min(1).max(100),
                type: z.string().min(1).max(100),
                iconUrl: z.string().max(200).optional(),
                content: z.string().max(50000),
                isActive: z.boolean()
            }))
        }
    }

    async handle(c: AppContext) {
        const {body} = await this.getValidatedData<typeof this.schema>();

        if(body.id === 0) {
            const id = await c.env.profile.prepare(`
                INSERT INTO [Lore] ([key], [name], [type], [iconUrl], [content], [isActive])
                VALUES (?1, ?2, ?3, ?4, ?5, ?6)
            `)
                .bind(body.key, body.name, body.type, body.iconUrl, body.content, body.isActive)
                .first<number>();

            body.id = id ?? 0;
        }
        else {
            await c.env.profile.prepare(`
                UPDATE [Lore]
                SET [key] = ?2, [name] = ?3, [type] = ?4, [iconUrl] = ?5, [content] = ?6, [isActive] = ?7
                WHERE [id] = ?1
            `)
                .bind(body.id, body.key, body.name, body.type, body.iconUrl, body.content, body.isActive)
                .run();
        }

        return c.json({id: body.id});
    }
}

export class DeleteLore extends OpenAPIRoute {
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
            DELETE FROM [Lore]
            WHERE [id] = ?1
        `)
            .bind(body.id)
            .run();

        return c.json({id: body.id});
    }
}