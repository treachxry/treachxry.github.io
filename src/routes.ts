import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import("@/pages/home/Home.vue")
    },
    {
        path: '/about',
        component: () => import("@/pages/about/About.vue")
    },
    {
        path: '/music',
        component: () => import("@/pages/music/Music.vue")
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});