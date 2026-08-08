<script setup lang="ts">
    import {computed} from "vue";
    import {useApiClient} from "@/composables/useApiClient";
    import StoryCard from "@/pages/writing/StoryCard.vue";
    import {StoryPhase} from "common/models/StoryPhase";
    import {StoryViewModel} from "common/models/database/Story.ts";
    import PageView from "@/components/ui/PageView.vue";

    const phases: string[] = [
        StoryPhase.Finished,
        StoryPhase.Revising,
        StoryPhase.Drafting,
        StoryPhase.Outlining,
        StoryPhase.OnHold,
        StoryPhase.Planning,
        StoryPhase.Abandoned
    ];

    const api = useApiClient();
    const {data} = await api.GET('/api/stories');

    const stories = computed(getStories);
    const pageSize = 5;

    function getStories(): StoryViewModel[] {
        if(data === undefined) {
            throw new Error('No response');
        }

        const response = data as StoryViewModel[];

        return response.sort(sortStories);
    }

    function sortStories(a: StoryViewModel, b: StoryViewModel): number {
        const phaseA = phases.indexOf(a.phase);
        const phaseB = phases.indexOf(b.phase);

        const phase = phaseA - phaseB;

        if(phase !== 0) {
            return phase;
        }

        const link = (b.url ? 1 : 0) - (a.url ? 1 : 0);

        if(link !== 0) {
            return link;
        }

        return a.lastUpdated - b.lastUpdated;
    }
</script>

<template>
    <page-view
        :data="stories"
        :page-size="pageSize"
        :disabled="stories.length <= pageSize"
    >
        <template #default="{data}">
            <div>
                <div v-for="(story, i) in data">
                    <hr v-if="i || stories.length > pageSize" class="my-4 opacity-20"/>
                    <story-card :story="story"/>
                </div>
            </div>
        </template>
    </page-view>
</template>