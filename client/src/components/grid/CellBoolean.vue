<script setup lang="ts">
    import {ref} from "vue";

    const {value, setValue, editable} = defineProps<{
        value: boolean | undefined
        setValue: (value: boolean | undefined) => any
        editable: boolean
    }>();

    const open = ref<boolean>(false);
    const currentValue = ref<boolean | undefined>(value);

    function toggleOpen() {
        if(!editable) {
            return;
        }

        if(open.value && setValue) {
            setValue(currentValue.value);
        }

        open.value = !open.value;
    }

    function selectValue(value: boolean) {
        currentValue.value = value;

        toggleOpen();
    }
</script>

<template>
    <div :class="{'open': open}" class="relative">
        <button class="text-left w-full" @click="toggleOpen">
            {{ currentValue ? 'True' : 'False' }}
        </button>
        <div v-if="open" class="absolute z-10 top-full mt-1.5 -left-2 -right-2 flex flex-col bg-base-300">
            <button @click="selectValue(true)" class="button rounded-none">True</button>
            <button @click="selectValue(false)" class="button rounded-none">False</button>
            <!--
            <textarea
                :disabled="!editable"
                v-model="currentValue"
                class="w-full min-h-60 max-h-screen p-4  border border-secondary outline-0"
            />-->
        </div>
    </div>
</template>