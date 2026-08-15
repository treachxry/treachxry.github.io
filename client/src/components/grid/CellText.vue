<script setup lang="ts">
    import {nextTick, ref, useTemplateRef} from "vue";

    const {value, setValue, editable} = defineProps<{
        value: string | undefined
        setValue: (value: string | undefined) => any
        editable: boolean
    }>();

    const open = ref<boolean>(false);
    const currentValue = ref<string | undefined>(value);
    const inputElement = useTemplateRef('input');

    async function openInput() {
        if(open.value || !editable) {
            return;
        }

        open.value = true;

        await nextTick();
        inputElement.value?.focus();
    }

    async function closeInput() {
        if(!open.value) {
            return;
        }

        if(setValue) {
            setValue(currentValue.value);
        }

        open.value = false;
    }
</script>

<template>
    <div :class="{'v-grid-active': open}" class="min-h-lh relative">
        <div
            v-if="!open"
            class="text-left min-h-lh text-nowrap absolute inset-0 overflow-hidden text-ellipsis"
            v-text="currentValue"
            tabindex="0"
            @focus="openInput"
        />
        <input
            v-else
            ref="input"
            type="text"
            v-model="currentValue"
            class="min-w-0 w-full outline-0"
            @blur="closeInput"
        />
    </div>
</template>