import {z} from "zod";
import {contentJson, OpenAPIRoute} from "chanfana";
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

export class UpdateStory extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.array(z.object({
                id: z.number().positive(),
                url: z.string().max(200).nullable(),
                isActive: z.boolean()
            })))
        }
    }

    async handle(c: AppContext) {
        const {body} = await this.getValidatedData<typeof this.schema>();

        const statement = c.env.profile.prepare(`
            UPDATE [Story]
            SET [url] = ?2, [isActive] = ?3
            WHERE [id] = ?1
        `)

        await c.env.profile.batch(body.map(m => {
            return statement.bind(m.id, m.url, m.isActive)
        }));

        return c.json({});
    }
}

export class DeleteStory extends OpenAPIRoute {
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
            DELETE FROM [Story]
            WHERE [id] = ?1
        `)
            .bind(body.id)
            .run();

        return c.json({id: body.id});
    }
}