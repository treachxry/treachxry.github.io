import {createRouter, createWebHashHistory} from "vue-router";

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
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});