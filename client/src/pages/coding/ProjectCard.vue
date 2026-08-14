<script setup lang="ts">
    import {Project} from "@/models/Project.ts";

    defineProps<{
        project: Project
    }>();
</script>

<template>
    <div>
        <div class="text-xl">{{project.title}}</div>
        <div class="py-2">{{project.description}}</div>
        <div class="flex gap-1.5 justify-between flex-col xs:flex-row items-start xs:items-center">
            <a v-if="project.liveUrl" class="link text-secondary" target="_blank" :href="project.liveUrl">Live website ></a>
            <a v-if="project.sourceUrl" class="link text-secondary" target="_blank" :href="project.sourceUrl">Source code ></a>
        </div>
    </div>
</template>