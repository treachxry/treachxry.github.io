import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {initializeAuth} from "@/composables/useAuth.ts";

const routes: RouteRecordRaw[] = [
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
        component: () => import("@/pages/admin/Login.vue")
    },
    {
        path: '/admin',
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                component: () => import("@/pages/admin/Admin.vue"),
            },
            {
                path: 'sync',
                component: () => import("@/pages/admin/ManageSync.vue")
            },
            {
                path: 'lore',
                component: () => import("@/pages/admin/ManageLore.vue")
            },
            {
                path: 'stories',
                component: () => import("@/pages/admin/ManageStories.vue")
            },
            {
                path: 'tags',
                component: () => import("@/pages/admin/ManageTags.vue")
            }
        ]
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
        return { path: '/login', query: { returnUrl: to.fullPath } };
    }

    if (to.path === '/login' && auth.username.value) {
        return { path: '/admin' };
    }
});

export {router};