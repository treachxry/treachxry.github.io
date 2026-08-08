<script setup lang="ts">
    import {StoryViewModel} from "common/models/database/Story.ts";
    import RedirectLink from "@/components/ui/RedirectLink.vue";

    const {story} = defineProps<{
        story: StoryViewModel
    }>();

    function getPhaseColor(phase: string): string {
        switch(phase) {
            case 'drafting':
            case 'revising':
                return 'var(--color-amber-300)';
            case 'finished':
                return 'var(--color-green-300)';
            case 'abandoned':
                return 'var(--color-red-400)';
            default:
                return 'var(--color-neutral-500)';
        }
    }
</script>

<template>
    <div>
        <div class="story-card-row">
            <div class="me-auto text-[22px]">
                {{story.title}}
            </div>
            <div
                class="px-1.5 rounded-sm bg-secondary/10 text-secondary"
                :style="{'--color-secondary': getPhaseColor(story.phase)}"
            >
                {{story.phase}} | {{story.wordCount}} words
            </div>
        </div>

        <div class="py-2 opacity-70">
            {{story.summary}}
        </div>

        <div class="story-card-row">
            <div class="flex flex-wrap gap-1.25 me-auto">
                <span v-for="tag in story.tags" class="text-nowrap px-1.25 rounded-sm text-base-content/70 bg-base-content/10 text-[15px]">
                    {{tag}}
                </span>
            </div>

            <redirect-link v-if="story.url" :href="story.url" class="link text-secondary text-nowrap p-1 -m-1">
                read on AO3 >
            </redirect-link>
            <span v-else class="opacity-50 text-[15px]">
                To be published...
            </span>
        </div>
    </div>
</template>

<style>
    @import "@/assets/style.css";

    .story-card-row {
        @apply flex gap-1.5 flex-col xs:flex-row items-start xs:items-center;
    }
</style>