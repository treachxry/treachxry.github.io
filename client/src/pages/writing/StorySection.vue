<script setup lang="ts">
    import {computed} from "vue";
    import {useApiClient} from "@/composables/useApiClient";
    import {StoryDataExtended} from "@/models/StoryDataExtended";
    import {StoryData} from "common/models/StoryData";
    import {TrackBearResponse} from "common/models/TrackBearResponse";
    import StoryCard from "@/pages/writing/StoryCard.vue";
    import {StoryPhase} from "common/models/StoryPhase";
    import PageView from "@/components/ui/PageView.vue";

    const phases = [
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

    function getStories(): StoryDataExtended[] {
        const response = data as TrackBearResponse<StoryData[]>;

        if(response.data === undefined) {
            throw new Error(response.error?.message ?? '');
        }

        return response.data.map(getExtendedData).sort(sortStories);
    }

    function getExtendedData(storyData: StoryData): StoryDataExtended {
        return {
            ...storyData,
            progress: getWordCount(storyData.totals),
            ...parseDescription(storyData.description),
        };
    }

    function sortStories(a: StoryDataExtended, b: StoryDataExtended): number {
        const phaseA = phases.indexOf(a.phase);
        const phaseB = phases.indexOf(b.phase);

        const phase = phaseA - phaseB;

        if(phase !== 0) {
            return phase;
        }

        const link = (b.link ? 1 : 0) - (a.link ? 1 : 0);

        if(link !== 0) {
            return link;
        }

        const updatedA: string = a.lastUpdated ?? '0001-01-01';
        const updatedB: string = b.lastUpdated ?? '0001-01-01';

        return updatedB.localeCompare(updatedA);
    }

    function getWordCount(totals: object): string {
        const result: string = Object.entries(totals).map(e => `${e[1]} ${e[0]}s`).join(', ');

        if(result.length === 0) {
            return 'no words';
        }

        return result;
    }

    function parseDescription(value: string): { description: string, link?: string, tags: string[] } {
        const linkRegex = /\(https:\/\/archiveofourown.org\/works\/\d*\)/g
        const linkMatch = value.match(linkRegex)?.at(0);

        const tagsRegex = /\[[^\]]+]/g;
        const tagsMatch = value.match(tagsRegex)?.at(0);

        return {
            description: value.replaceAll(linkRegex, '').replaceAll(tagsRegex, '').trim(),
            link: linkMatch?.replaceAll(/[()]/g, '').trim(),
            tags: tagsMatch ? tagsMatch.replaceAll(/[\[\]]/g, '').split(',').map(x => x.trim()).filter(x => x.length) : []
        };
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