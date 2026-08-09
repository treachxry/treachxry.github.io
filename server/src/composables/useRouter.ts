import {Hono} from "hono";
import {cors} from "hono/cors";
import {fromHono, HonoOpenAPIRouterType, RouterOptions} from "chanfana";
import {AppVariables} from "@/models/AppVariables";

export function useRouter(options?: RouterOptions): HonoOpenAPIRouterType<{ Bindings: Env, Variables: AppVariables }>  {
    const app: Hono<{Bindings: Env, Variables: AppVariables}> = new Hono();
    const router: HonoOpenAPIRouterType<{ Bindings: Env, Variables: AppVariables }> = fromHono(app, options);

    router.use('*', cors({
        origin: ['http://localhost:5173', 'https://treachxry.github.io'],
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        credentials: true
    }));

    return router;
}