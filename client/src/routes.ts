import {createRouter, createWebHashHistory} from "vue-router";

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
        path: '/writing',
        component: () => import("@/pages/writing/Writing.vue")
    },
    {
        path: '/admin',
        component: () => import("@/pages/admin/Admin.vue")
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});