import {z} from "zod";
import {contentJson, OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";

export class Me extends OpenAPIRoute {
    schema = {
        response: {
            "200": {
                ...contentJson(z.object({
                    username: z.string().nullable()
                }))
            }
        }
    }

    async handle(c: AppContext) {
        const username: string | null = c.get('currentUser');

        return c.json({
            username: username
        });
    }
}