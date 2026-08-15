<script setup lang="ts">
    import {ref} from "vue";
    import {gridBuilder} from "common/functions/grid/GridBuilder.ts";
    import {StoryDbModel} from "common/models/story/StoryDbModel.ts";
    import {useApiClient} from "@/composables/useApiClient.ts";
    import AdminSubview from "@/pages/admin/AdminSubview.vue";
    import GridTable from "@/components/grid/GridTable.vue";
    import CellTextbox from "@/components/grid/CellTextbox.vue";
    import CellNumber from "@/components/grid/CellNumber.vue";
    import {IGridEvents} from "common/models/grid/IGridEvents.ts";
    import CellBoolean from "@/components/grid/CellBoolean.vue";

    const api = useApiClient();
    const models = ref(await readStories());

    const config = gridBuilder<StoryDbModel>('Story', grid => {
        grid.column(m => m.id).title('ID').visible(false);
        grid.column(m => m.tbID).title('TrackBear ID').visible(false);
        grid.column(m => m.title).title('Title').editable(false);
        grid.column(m => m.summary).title('Summary').editable(false).template('CellTextbox');
        grid.column(m => m.phase).title('Phase').editable(false);
        grid.column(m => m.wordCount).title('Word count').editable(false);
        grid.column(m => m.lastUpdated).title('Last updated').editable(false).template('CellNumber');
        grid.column(m => m.url).title('Url');
        grid.column(m => m.isActive).title('Public').template('CellBoolean');
    });

    async function readStories(): Promise<StoryDbModel[]> {
        const {data} = await api.GET('/api/admin/story/read-all', {credentials: 'include'});

        return data as StoryDbModel[];
    }

    async function updateStory(updated: StoryDbModel[]) {
        const body = updated.map(m => ({
            id: m.id,
            url: m.url,
            isActive: m.isActive
        }));

        const {response} = await api.POST('/api/admin/story/update', {credentials: 'include', body: body});

        if(response.ok) {
            models.value = await readStories();
        }
    }

    async function deleteStory(model: StoryDbModel) {
        const {response} = await api.POST('/api/admin/story/delete', {credentials: 'include', body: model});

        if(response.ok) {
            models.value = await readStories();
        }
    }

    const events: IGridEvents<StoryDbModel> = {
        update: updateStory,
        remove: deleteStory
    };
</script>

<template>
    <admin-subview>
        <grid-table
            :config="config"
            :data="models"
            :events="events"
            :components="[CellTextbox, CellNumber, CellBoolean]"
        />
    </admin-subview>
</template>