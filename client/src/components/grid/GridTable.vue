<script setup lang="ts" generic="TModel extends DbModel">
    import {Component as ComponentModel, computed, ref, watch} from "vue";
    import { X, Ban, Check } from '@lucide/vue';
    import {DbModel} from "common/models/DbModel.ts";
    import {IGridConfiguration} from "common/models/grid/IGridConfiguration";
    import {IGridColumnConfiguration} from "common/models/grid/IGridColumnConfiguration.ts";
    import {IGridModel} from "common/models/grid/IGridModel.ts";
    import {IGridEvents} from "common/models/grid/IGridEvents.ts";
    import CellText from "@/components/grid/CellText.vue";

    const {data, config, events = {}, components = []} = defineProps<{
        data: TModel[]
        config: IGridConfiguration<TModel>
        events?: IGridEvents<TModel>
        components?: ComponentModel[]
    }>();

    const models = ref<IGridModel<TModel>[]>(getFreshData());
    const newModel = ref<IGridModel<TModel> | undefined>();

    watch(() => data, () => {
        models.value = getFreshData();
    });

    function getFreshData() {
        return data.map(m => ({value: {...m}, dirtyFields: []}));
    }

    function getTemplate(col: IGridColumnConfiguration<TModel, unknown>, model: TModel): ComponentModel {
        if(col.customTemplate) {
            const template = components.find(c => (c as any)['__name'] === col.customTemplate);

            if(template) {
                return template;
            }
        }

        return CellText;
    }

    const columnCount = computed(() => {
        return config.columns.filter(x => x.isVisible).length;
    })

    const columnWidth = computed(() => {
        return `calc(100% / ${columnCount.value})`;
    });

    const displayModels = computed<IGridModel<TModel>[]>(() => {
        const result: IGridModel<TModel>[] = [...(models.value as IGridModel<TModel>[])];

        if(newModel.value) {
            result.unshift(newModel.value);
        }

        return result;
    });

    function startCreate() {
        if(newModel.value) {
            return;
        }

        newModel.value = {
            value: {id: 0} as TModel,
            dirtyFields: []
        };
    }

    async function confirmCreate() {
        if(!newModel.value || !events.create) {
            return;
        }

        await events.create(newModel.value.value);

        newModel.value = undefined;
    }

    async function cancelCreate() {
        if(!newModel.value || !events.cancel) {
            return;
        }

        await events.cancel(newModel.value.value);

        newModel.value = undefined;
    }

    async function deleteRow(model: TModel) {
        if(!events.remove) {
            return;
        }

        await events.remove(model);
    }

    function updateRow<TProp>(model: IGridModel<TModel>, column: IGridColumnConfiguration<TModel, TProp>, value: any) {
        const oldValue: TProp = column.getValue(model.value);
        const newValue: TProp = value;

        if(oldValue === newValue) {
            return;
        }

        column.setValue(model.value, newValue);

        if(!model.dirtyFields.includes(column.key)) {
            model.dirtyFields.push(column.key);
        }
    }

    async function saveChanges() {
        if(!events.update) {
            return;
        }

        const dirtyModels: TModel[] = models.value.filter(m => m.dirtyFields.length).map(m => m.value as TModel);

        await events.update(dirtyModels);
    }

    function discardChanges() {
        models.value = getFreshData();
    }

    function getRowKey(model: IGridModel<TModel>): string {
        return `${model.value.id}/${model.dirtyFields.length}`;
    }
</script>

<template>
    <div class="flex flex-col">
        <div class="flex items-center px-1 gap-2">
            <div class="text-xl">
                {{config.name}}
            </div>
            <button class="v-grid-button" v-if="events.create" @click="startCreate">
                Create new
            </button>
            <button class="v-grid-button" v-if="events.update" @click="saveChanges">
                Save changes
            </button>
            <button class="v-grid-button" v-if="events.update" @click="discardChanges">
                Discard changes
            </button>
            <div class="ms-auto text-sm">
                {{models.length}} items
            </div>
        </div>
        <table class="v-grid-table">
            <colgroup>
                <col/>
                <template v-for="col in config.columns">
                    <col v-if="col.isVisible" :style="{width: columnWidth}"/>
                </template>
            </colgroup>
            <thead>
            <tr class="v-grid-header-row">
                <th class="v-grid-header-cell">Actions</th>
                <template v-for="col in config.columns">
                    <th v-if="col.isVisible" class="v-grid-header-cell">
                        {{col.title}}
                    </th>
                </template>
            </tr>
            </thead>
            <tbody v-if="displayModels.length">
            <tr v-for="(model, i) in displayModels" class="v-grid-row" :key="getRowKey(model)">
                <td class="v-grid-cell">
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
                            <button v-if="events.remove" @click="deleteRow(model.value)">
                                <x class="size-5"/>
                            </button>
                        </template>
                    </div>
                </td>
                <template v-for="col in config.columns">
                    <td
                        v-show="col.isVisible"
                        class="v-grid-cell"
                        :class="{'v-grid-readonly': !col.isEditable || !events.update, 'v-grid-dirty': model.dirtyFields.includes(col.key)}"
                    >
                        <component
                            :is="getTemplate(col, model.value)"
                            :value="col.getValue(model.value)"
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