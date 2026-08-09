import {OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {clearSessionCookie} from "@/functions/middleware";

export class Logout extends OpenAPIRoute {
    async handle(c: AppContext) {
        clearSessionCookie(c);
        return c.json({ ok: true });
    }
}
