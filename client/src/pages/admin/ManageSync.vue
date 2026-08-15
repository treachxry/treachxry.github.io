<script setup lang="ts">
    import {ref} from "vue";
    import {format} from "date-fns";
    import {gridBuilder} from "common/functions/grid/GridBuilder.ts";
    import {useApiClient} from "@/composables/useApiClient.ts";
    import {SyncDbModel} from "common/models/sync/SyncDbModel"
    import AdminSubview from "@/pages/admin/AdminSubview.vue";
    import GridTable from "@/components/grid/GridTable.vue";
    import {IGridEvents} from "common/models/grid/IGridEvents.ts";

    const api = useApiClient();

    const {data} = await api.GET('/api/admin/sync/read-all', {credentials: 'include'});
    const models = ref(data as SyncDbModel[]);

    const config = gridBuilder<SyncDbModel>('Sync', grid => {
        grid.column(m => m.id).title('ID').visible(false);
        grid.column(m => m.key).title('Name').editable(false);
        grid.column(m => m.lastSuccess).title('Last synced').editable(false);
        grid.column(m => m.lastAttempt).title('Last attempt').editable(false);
        grid.column(m => m.error).title('Error').editable(false);
        grid.column(m => m.interval).title('Interval (s)');
        grid.column(m => m.isActive).title('Active');
    });

    function formatDate(value: number) {
        return format(value * 1000, 'yyyy-MM-dd HH:mm:ss');
    }

    const events: IGridEvents<SyncDbModel> = {

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