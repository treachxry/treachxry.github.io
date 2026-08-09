<script setup lang="ts">
    import {format} from "date-fns";
    import {useAuth} from "@/composables/useAuth.ts";
    import {useRouter} from "vue-router";

    const buildDate = format(__BUILD_DATE__, 'yyyy-MM-dd');
    const {username, logout} = useAuth();
    const router = useRouter();

    function logoutUser() {
        logout();
        router.push('/');
    }
</script>

<template>
    <footer class="px-4 flex items-center gap-2 text-sm border-t border-primary">
        <span class="me-auto">Last updated: {{buildDate}}</span>
        <template v-if="username">
            <router-link to="/admin" class="link">Dashboard</router-link>
            <span>|</span>
            <button class="link" @click="logoutUser">Logout</button>
        </template>
        <router-link v-else to="/login" class="link">Login</router-link>
        <span>|</span>
        <a href="https://github.com/treachxry/treachxry.github.io" class="link" target="_blank">Source code</a>
    </footer>
</template>