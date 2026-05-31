<script setup lang="ts">
    import {StoryDataExtended} from "@/models/StoryDataExtended";
    import RedirectLink from "@/components/ui/RedirectLink.vue";

    const {story} = defineProps<{
        story: StoryDataExtended
    }>();
</script>

<template>
    <div>
        <div class="flex items-center gap-2">
            <div class="me-auto text-[22px]">
                {{story.title}}
            </div>
            <div class="px-1.5 border border-secondary bg-secondary/10 text-secondary">
                {{story.phase}} | {{story.progress}}
            </div>
        </div>

        <div class="mt-4 mb-2 opacity-60 leading-snug">
            {{story.description}}
        </div>

        <div class="flex gap-2">
            <div class="flex items-center flex-wrap gap-1.25 me-auto">
                <span v-for="tag in story.tags" class="text-nowrap px-1.25 leading-tight border border-accent text-accent bg-accent/10 text-[15px]">
                    {{tag}}
                </span>
            </div>

            <redirect-link v-if="story.link" :href="story.link" class="text-secondary underline text-nowrap">
                read on AO3 >
            </redirect-link>
            <span v-else class="opacity-50">
                To be published...
            </span>
        </div>
    </div>
</template>