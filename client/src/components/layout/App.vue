<script lang="ts" setup>
    import {initializeApiClient} from "@/composables/useApiClient";
    import {initializeAuth} from "@/composables/useAuth.ts";
    import AppFooter from "@/components/layout/AppFooter.vue";
    import AppBody from "@/components/layout/AppBody.vue";
    import AppHeader from "@/components/layout/AppHeader.vue";

    initializeApiClient();
    initializeAuth();
</script>

<template>
    <div class="h-full flex flex-col max-w-240 mx-auto py-2 transition-all">
        <app-header class="mx-4"/>
        <main class="px-4 sm:px-8 py-8 grow overflow-y-auto transition-all">
            <app-body/>
        </main>
        <app-footer class="mx-4"/>
    </div>
</template>