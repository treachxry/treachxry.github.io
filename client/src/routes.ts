import {createRouter, createWebHashHistory} from "vue-router";
import {initializeAuth} from "@/composables/useAuth.ts";

const routes = [
    {
        path: '/',
        component: () => import("@/pages/home/Home.vue")
    },
    {
        path: '/writing',
        component: () => import("@/pages/writing/Writing.vue")
    },
    {
        path: '/art',
        component: () => import("@/pages/art/Art.vue")
    },
    {
        path: '/coding',
        component: () => import("@/pages/coding/Coding.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/pages/admin/Login.vue")
    },
    {
        path: '/admin',
        name: 'dashboard',
        component: () => import("@/pages/admin/Admin.vue"),
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

router.beforeEach(async (to) => {
    const auth = initializeAuth();

    if (!auth.checked.value) {
        await auth.fetchMe();
    }

    if (to.meta.requiresAuth && !auth.username.value) {
        return { name: 'login', query: { returnUrl: to.fullPath } };
    }

    if (to.name === 'login' && auth.username.value) {
        return { name: 'dashboard' };
    }
});

export {router};