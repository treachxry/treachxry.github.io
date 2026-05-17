<script setup lang="ts">
    const {href} = defineProps<{
        href: string
    }>();
</script>

<template>
    <a :href="`/redirect?to=${href}`" target="_blank">
        <slot/>
    </a>
</template>