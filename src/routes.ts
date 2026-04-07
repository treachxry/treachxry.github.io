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
        path: '/art',
        component: () => import("@/pages/art/Art.vue")
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});