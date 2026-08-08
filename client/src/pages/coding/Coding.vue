<script setup lang="ts">
    import RedirectLink from "@/components/ui/RedirectLink.vue";
    import {Project} from "@/models/Project.ts";
    import ProjectCard from "@/pages/coding/ProjectCard.vue";

    const projects: Project[] = [
        {
            title: 'AO3 skin generator',
            description: 'Web app to create site skins for AO3. Customizable colors, live skin preview, etc. In development.',
            liveUrl: '/ao3-theme-generator',
            sourceUrl: 'https://github.com/treachxry/ao3-theme-generator'
        },
        {
            title: 'Just write',
            description: 'A very simple web interface to write without distractions. With typing sounds for your ADHD brain.',
            liveUrl: '/just-write',
            sourceUrl: 'https://github.com/treachxry/just-write'
        }
    ];
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="card">
            <h2 class="section-title">My coding projects</h2>
            <div class="section-body">
                <redirect-link class="link text-secondary" href="https://github.com/treachxry" target="_blank">
                    Check out my GitHub profile >
                </redirect-link>
            </div>
        </div>

        <div class="card">
            <div v-for="(project, i) in projects">
                <hr v-if="i" class="my-4 opacity-20"/>
                <project-card :project="project"/>
            </div>
        </div>
    </div>
</template>