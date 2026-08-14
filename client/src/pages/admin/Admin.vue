<script setup lang="ts">
    import {useAuth} from "@/composables/useAuth.ts";

    const {username} = useAuth();
</script>

<template>
    <div class="grid gap-4">
        <div class="card">
            <div class="font-title text-xl">Current user: {{username ?? 'null'}}</div>
        </div>
        <div class="card">
            <h2 class="section-title">Manage site data</h2>
            <div class="action-grid grid sm:grid-cols-2 gap-2">
                <router-link to="/admin/stories" class="link">Manage stories ></router-link>
                <router-link to="/admin/lore" class="link">Manage lore ></router-link>
                <router-link to="/admin/tags" class="link">Manage tags ></router-link>
                <router-link to="/admin/sync" class="link">Manage sync ></router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    .action-grid a {
        @apply bg-base-200 rounded-sm px-4 py-1 text-lg hover:text-secondary;
    }
</style>
