<script setup lang="ts">
    import {Project} from "@/models/Project.ts";
    import RedirectLink from "@/components/ui/RedirectLink.vue";

    defineProps<{
        project: Project
    }>();
</script>

<template>
    <div>
        <div class="text-xl">{{project.title}}</div>
        <div class="py-2">{{project.description}}</div>
        <div class="flex gap-1.5 justify-between flex-col xs:flex-row items-start xs:items-center">
            <redirect-link v-if="project.liveUrl" class="link text-secondary" :href="project.liveUrl">Live website ></redirect-link>
            <redirect-link v-if="project.sourceUrl" class="link text-secondary" :href="project.sourceUrl">Source code ></redirect-link>
        </div>
    </div>
</template>