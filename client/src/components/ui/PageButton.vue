<script setup lang="ts">
    defineProps<{
        label: number | string
        active: boolean
    }>();
</script>

<template>
    <button
        class="flex justify-center items-center border rounded-sm transition-colors border-secondary"
        :class="[active ? 'bg-secondary text-secondary-content': 'hover:bg-secondary/20']"
    >
        <span class="ps-px">{{label}}</span>
    </button>
</template>