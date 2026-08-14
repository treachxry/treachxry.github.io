<script setup lang="ts" generic="TModel extends DbModel">
    import {Component as ComponentModel, computed, ref} from "vue";
    import { X, Ban, Check } from '@lucide/vue';
    import {DbModel} from "common/models/DbModel.ts";
    import {IGridConfiguration} from "common/models/grid/IGridConfiguration";
    import {IGridColumnConfiguration} from "common/models/grid/IGridColumnConfiguration.ts";
    import {IGridEvents} from "common/models/grid/IGridEvents.ts";
    import CellText from "@/components/grid/CellText.vue";
    import CellNumber from "@/components/grid/CellNumber.vue";

    const models = defineModel<TModel[]>({
        required: true
    });

    const {config, events = {}, components = []} = defineProps<{
        config: IGridConfiguration<TModel>
        events?: IGridEvents<TModel>
        components?: ComponentModel[]
    }>();

    const newModel = ref<TModel | undefined>();

    function getTemplate(col: IGridColumnConfiguration<TModel, unknown>, model: TModel): ComponentModel {
        if(col.customTemplate) {
            const template = components.find(c => (c as any)['__name'] === col.customTemplate);

            if(template) {
                return template;
            }
        }

        const value = col.getValue(model);

        switch(typeof value) {
            case 'number':
                return CellNumber;
            case 'undefined':
            case 'string':
            case 'boolean':
            default:
                return CellText;
        }
    }

    const columnCount = computed(() => {
        return config.columns.filter(x => x.isVisible).length;
    })

    const columnWidth = computed(() => {
        return `calc(100% / ${columnCount.value})`;
    });

    const displayModels = computed<TModel[]>(() => {
        const result = [...models.value];

        if(newModel.value) {
            result.unshift(newModel.value);
        }

        return result;
    });

    function startCreate(): void {
        if(newModel.value) {
            return;
        }

        newModel.value = {id: 0} as TModel;
    }

    function confirmCreate(): void {
        if(!newModel.value || !events.create) {
            return;
        }

        events.create(newModel.value);

        newModel.value = undefined;
    }

    function cancelCreate(): void {
        if(!newModel.value || !events.cancel) {
            return;
        }

        events.cancel(newModel.value);

        newModel.value = undefined;
    }

    function deleteRow(model: TModel): void {
        if(!events.remove) {
            return;
        }

        events.remove(model);
    }

    function updateRow<TProp>(model: TModel, column: IGridColumnConfiguration<TModel, TProp>, value: any): void {
        column.setValue(model, value);

        if(events.update) {
            events.update(model);
        }
    }
</script>

<template>
    <div class="flex flex-col">
        <div class="flex items-center px-1 gap-4">
            <div class="text-xl">{{config.name}}</div>
            <button v-if="events.create" @click="startCreate" class="button px-2 py-0 text-sm">Create new</button>
            <div class="ms-auto text-sm">{{models.length}} items</div>
        </div>
        <table>
            <colgroup>
                <col/>
                <template v-for="col in config.columns">
                    <col v-if="col.isVisible" :style="{width: columnWidth}"/>
                </template>
            </colgroup>
            <thead>
            <tr>
                <th>Actions</th>
                <template v-for="col in config.columns">
                    <th v-if="col.isVisible">
                        {{col.title}}
                    </th>
                </template>
            </tr>
            </thead>
            <tbody v-if="displayModels.length">
            <tr v-for="(model, i) in displayModels" class="relative" :key="model.id">
                <td>
                    <div class="flex items-center gap-1">
                        <template v-if="i === 0 && newModel">
                            <button class="" @click="confirmCreate">
                                <check class="size-5"/>
                            </button>
                            <button @click="cancelCreate()">
                                <ban class="size-5"/>
                            </button>
                        </template>
                        <template v-else>
                            <button v-if="events.remove" @click="deleteRow(model)">
                                <x class="size-5"/>
                            </button>
                        </template>
                    </div>
                </td>
                <template v-for="col in config.columns">
                    <td v-show="col.isVisible" :class="{'readonly': !col.isEditable || !events.update}">
                        <component
                            :is="getTemplate(col, model)"
                            :value="col.getValue(model)"
                            :set-value="(v: any) => updateRow(model, col, v)"
                            :editable="col.isEditable && events.update !== undefined"
                        />
                    </td>
                </template>
            </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td :colspan="columnCount + 1">
                        <div class="text-center py-2 opacity-70">No items</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    table {
        @apply border-separate table-fixed;
    }

    th, td {
        @apply text-left min-w-20  text-sm px-2 py-1 border border-base-content/20;
    }

    th {
        @apply border-b-base-content/50 text-secondary text-nowrap;
    }

    td.readonly {
        @apply border-dashed;
    }

    td:has(> .open) {
        @apply border-secondary;
    }

    tbody tr:nth-child(odd) {
        @apply bg-base-content/5;
    }
</style>