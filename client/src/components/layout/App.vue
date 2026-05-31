<script lang="ts" setup>
    import {initializeApiClient} from "@/composables/useApiClient";
    import AppFooter from "@/components/layout/AppFooter.vue";
    import AppBody from "@/components/layout/AppBody.vue";
    import AppSidebar from "@/components/layout/AppSidebar.vue";

    initializeApiClient();
</script>

<template>
    <div class="min-h-full flex flex-col">
        <div class="px-4 sm:px-8 py-16 mx-auto max-w-240 grow transition-all flex items-start gap-4">
            <app-body/>
            <app-sidebar/>
        </div>
        <app-footer/>
    </div>
</template>