import {Env, Hono} from "hono";
import {cors} from "hono/cors";
import {fromHono} from "chanfana";
import {Analytics} from "@/endpoints/analytics";
import {Statistics} from "@/endpoints/statistics";
import {Stories} from "@/endpoints/stories";

const app = new Hono<{ Bindings: Env }>();

app.use('/*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['*'],
    maxAge: 86400
}));

const openapi = fromHono(app, {
    docs_url: '/',
});

openapi
    .get('/api/statistics', Statistics)
    .get('/api/stories', Stories)
    .post('/api/analytics', Analytics)
;

export default app;