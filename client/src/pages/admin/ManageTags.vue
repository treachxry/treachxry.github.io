<script setup lang="ts">
    import {ref} from "vue";
    import {gridBuilder} from "common/functions/grid/GridBuilder.ts";
    import {TagDbModel} from "common/models/tag/TagDbModel";
    import {useApiClient} from "@/composables/useApiClient.ts";
    import AdminSubview from "@/pages/admin/AdminSubview.vue";
    import GridTable from "@/components/grid/GridTable.vue";
    import {IGridEvents} from "common/models/grid/IGridEvents.ts";

    const api = useApiClient();
    const models = ref<TagDbModel[]>(await readTags());

    const config = gridBuilder<TagDbModel>('Tag', grid => {
        grid.column(m => m.id).title('ID').visible(false);
        grid.column(m => m.name).title('Name');
    });

    async function readTags(): Promise<TagDbModel[]> {
        const {data} = await api.GET('/api/admin/tag/read-all', {credentials: 'include'});

        return data as TagDbModel[];
    }

    async function createTag(model: TagDbModel): Promise<void> {
        const {data, response, error} = await api.POST('/api/admin/tag/create-or-update', {credentials: 'include', body: model});

        if(response.ok) {
            models.value = await readTags();
        }
    }

    async function updateTag(models: TagDbModel[]) {

    }

    async function deleteTag(model: TagDbModel): Promise<void> {
        const {data, response, error} = await api.POST('/api/admin/tag/delete', {credentials: 'include', body: model});

        if(response.ok) {
            models.value = await readTags();
        }
    }

    const events: IGridEvents<TagDbModel> = {
        create: createTag,
        update: updateTag,
        remove: deleteTag
    };
</script>

<template>
    <admin-subview>
        <grid-table
            :config="config"
            :data="models"
            :events="events"
        />
    </admin-subview>
</template>