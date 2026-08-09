import {requireAuth} from "@/functions/middleware";
import {useRouter} from "@/composables/useRouter";
import {Analytics} from "@/endpoints/analytics";
import {Lore} from "@/endpoints/lore";
import {Stories} from "@/endpoints/stories";
import {Login} from "@/endpoints/auth/login";
import {Logout} from "@/endpoints/auth/logout";
import {Me} from "@/endpoints/admin/me";

const app = createApp();

app.route('/api/admin', createAdminRouter());
app.route('/api/auth', createAuthRouter());

export default app;

function createApp() {
    const router = useRouter({
        docs_url: '/'
    });

    router
        .get('/api/lore', Lore)
        .get('/api/stories', Stories)
        .post('/api/analytics', Analytics);

    return router;
}

function createAdminRouter() {
    const router = useRouter();

    router.use('*', requireAuth);

    router
        .get('/me', Me);

    return router;
}

function createAuthRouter() {
    const router = useRouter();

    router
        .post('/login', Login)
        .post('/logout', Logout);

    return router;
}