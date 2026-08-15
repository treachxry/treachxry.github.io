<script setup lang="ts">
    import {ref} from "vue";

    const {value, setValue, editable} = defineProps<{
        value: string | undefined
        setValue: (value: string | undefined) => any
        editable: boolean
    }>();

    const open = ref<boolean>(false);
    const currentValue = ref<string | undefined>(value);

    function toggleOpen() {
        if(open.value && setValue) {
            setValue(currentValue.value);
        }

        open.value = !open.value;
    }
</script>

<template>
    <div :class="{'v-grid-active': open}">
        <button class="link text-left w-full" @click="toggleOpen" >
            {{ editable ? 'edit' : 'view' }}
        </button>
        <div v-if="open" class="absolute z-10 top-full left-0 right-0 flex flex-col">
            <textarea
                :disabled="!editable"
                v-model="currentValue"
                class="w-full min-h-60 max-h-screen p-4 bg-base-300 border border-secondary outline-0"
            />
            <span class="ms-auto bg-secondary text-secondary-content px-2">{{currentValue?.length ?? 0}} characters</span>
        </div>
    </div>
</template>