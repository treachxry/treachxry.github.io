<script setup lang="ts">
    defineProps<{
        index: number
        currentIndex: number
    }>();
</script>

<template>
    <button
        class="border text-center"
        :class="{'text-secondary': currentIndex === index}"
    >{{index}}</button>
</template>