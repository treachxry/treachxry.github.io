<script setup lang="ts">
    import {computed} from "vue";
    import {useApiClient} from "@/composables/useApiClient";
    import {StoryData} from "common/models/StoryData";
    import {StoryDataExtended} from "@/models/StoryDataExtended";
    import StoryCard from "@/pages/writing/StoryCard.vue";

    const api = useApiClient();

    const {data, error} = await api.GET('/api/stories');

    const stories = computed<{ finished: StoryDataExtended[], 'in progress': StoryDataExtended[] }>(() => {
        const list: StoryDataExtended[] = (data as StoryData[]).map(x => ({
            ...x,
            progress: getWordCount(x.totals),
            ...parseDescription(x.description),
        }));

        const finished = list.filter(x => x.phase === 'finished');
        const inProgress = list.filter(x => x.phase !== 'finished');

        return {
            'finished': finished.sort(sortStories),
            'in progress': inProgress.sort(sortStories),
        };
    });

    function sortStories(a: StoryDataExtended, b: StoryDataExtended) {
        const updated1: string = a.lastUpdated ?? '0001-01-01';
        const updated2: string = b.lastUpdated ?? '0001-01-01'

        return updated2.localeCompare(updated1);
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
    <div class="flex flex-col gap-4">
        <div v-for="(data, key) in stories" class="card">
            <h2 class="section-title">
                {{key}} stories
            </h2>

            <div v-for="(story, i) in data">
                <hr v-if="i" class="my-4 opacity-20"/>
                <story-card :story="story"/>
            </div>
        </div>
    </div>
</template>