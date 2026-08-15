<script setup lang="ts">
    import {ref} from "vue";
    import {gridBuilder} from "common/functions/grid/GridBuilder.ts";
    import {LoreDbModel} from "common/models/lore/LoreDbModel.ts";
    import {useApiClient} from "@/composables/useApiClient.ts";
    import AdminSubview from "@/pages/admin/AdminSubview.vue";
    import GridTable from "@/components/grid/GridTable.vue";
    import CellTextbox from "@/components/grid/CellTextbox.vue";
    import CellBoolean from "@/components/grid/CellBoolean.vue";
    import {IGridEvents} from "common/models/grid/IGridEvents.ts";

    const api = useApiClient();
    const models = ref(await readLore());

    const grid = gridBuilder<LoreDbModel>('Lore', c => {
        c.column(m => m.id).title('ID').visible(false);
        c.column(m => m.key).title('Key');
        c.column(m => m.type).title('Type');
        c.column(m => m.name).title('Name');
        c.column(m => m.iconUrl).title('Icon URL');
        c.column(m => m.content).title('Content').template('CellTextbox');
        c.column(m => m.isActive).title('Public').template('CellBoolean');
    });

    async function readLore(): Promise<LoreDbModel[]> {
        const {data} = await api.GET('/api/admin/lore/read', {credentials: 'include'});

        return data as LoreDbModel[];
    }

    async function createLore(model: LoreDbModel): Promise<void> {
        model.iconUrl ??= null;
        model.isActive ??= false;

        const {response} = await api.POST('/api/admin/lore/create', {credentials: 'include', body: model});

        if(response.ok) {
            models.value = await readLore();
        }
    }

    async function updateLore(updated: LoreDbModel[]) {
        const {response} = await api.POST('/api/admin/lore/update', {credentials: 'include', body: updated});

        if(response.ok) {
            models.value = await readLore();
        }
    }

    async function deleteLore(model: LoreDbModel): Promise<void> {
        const {response} = await api.POST('/api/admin/lore/delete', {credentials: 'include', body: model});

        if(response.ok) {
            models.value = await readLore();
        }
    }

    const events: IGridEvents<LoreDbModel> = {
        create: createLore,
        update: updateLore,
        remove: deleteLore
    };
</script>

<template>
    <admin-subview>
        <grid-table
            :config="grid"
            :data="models"
            :events="events"
            :components="[CellTextbox, CellBoolean]"
        />
    </admin-subview>
</template>