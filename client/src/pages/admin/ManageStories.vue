<script setup lang="ts">
    import {ref} from "vue";
    import {gridBuilder} from "common/functions/grid/GridBuilder.ts";
    import {StoryDbModel} from "common/models/story/StoryDbModel.ts";
    import {useApiClient} from "@/composables/useApiClient.ts";
    import AdminSubview from "@/pages/admin/AdminSubview.vue";
    import GridTable from "@/components/grid/GridTable.vue";
    import CellTextbox from "@/components/grid/CellTextbox.vue";
    import CellNumber from "@/components/grid/CellNumber.vue";

    const api = useApiClient();

    const {data} = await api.GET('/api/admin/story/read-all', {credentials: 'include'});
    const models = ref(data as StoryDbModel[]);

    const config = gridBuilder<StoryDbModel>('Story', grid => {
        grid.column(m => m.id).title('ID').visible(false);
        grid.column(m => m.tbID).title('TrackBear ID').visible(false);
        grid.column(m => m.title).title('Title').editable(false);
        grid.column(m => m.summary).title('Summary').editable(false).template('CellTextbox');
        grid.column(m => m.phase).title('Phase').editable(false);
        grid.column(m => m.wordCount).title('Word count').editable(false);
        grid.column(m => m.lastUpdated).title('Last updated').editable(false).template('CellNumber');
        grid.column(m => m.url).title('Url');
    });
</script>

<template>
    <admin-subview>
        <grid-table :config="config" v-model="models" :components="[CellTextbox, CellNumber]"/>
    </admin-subview>
</template>