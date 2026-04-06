import { createRouter, createWebHistory } from "vue-router";

const routes = [
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