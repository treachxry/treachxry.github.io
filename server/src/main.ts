import {requireAuth} from "@/functions/middleware";
import {useRouter} from "@/composables/useRouter";
import {Lore} from "@/endpoints/lore";
import {Stories} from "@/endpoints/stories";
import {Login} from "@/endpoints/auth/login";
import {Logout} from "@/endpoints/auth/logout";
import {Me} from "@/endpoints/admin/me";
import {ReadSync, UpdateSync} from "@/endpoints/admin/sync";
import {DeleteLore, ReadLore, UpdateLore} from "@/endpoints/admin/lore";
import {ReadStories} from "@/endpoints/admin/story";
import {DeleteTag, ReadTags, UpdateTag} from "@/endpoints/admin/tags";

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

    return router;
}

function createAdminRouter() {
    const router = useRouter();

    router.use('*', requireAuth);

    router
        .get('/me', Me)

        .get('/sync/read-all', ReadSync)
        .post('/sync/create-or-update', UpdateSync)

        .get('/lore/read-all', ReadLore)
        .post('/lore/create-or-update', UpdateLore)
        .post('/lore/delete', DeleteLore)

        .get('/story/read-all', ReadStories)

        .get('/tag/read-all', ReadTags)
        .post('/tag/create-or-update', UpdateTag)
        .post('/tag/delete', DeleteTag)

    return router;
}

function createAuthRouter() {
    const router = useRouter();

    router
        .post('/login', Login)
        .post('/logout', Logout)

    return router;
}