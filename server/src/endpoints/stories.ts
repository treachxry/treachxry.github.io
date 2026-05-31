import {OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";

export class Stories extends OpenAPIRoute {
    async handle(c: AppContext) {
        const token: string = c.env.TRACKBEAR_API_KEY;

        if(typeof token !== 'string' || token.length === 0) {
            c.status(500);
            return c.json(null);
        }

        try {
            const response = await fetch('https://trackbear.app/api/v1/project', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const results: any = await response.json();
            const data: any[] = results.data;

            const stories = data.filter(x => x.displayOnProfile === true && x.phase !== 'abandoned');

            return c.json(stories);
        }
        catch(e) {
            c.status(400);
            return c.json(null);
        }
    }
}