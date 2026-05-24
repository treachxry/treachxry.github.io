<script lang="ts" setup>
    const {href} = defineProps<{
        href: string
    }>();

    const url = `/?redirect=${true}&to=${href}`;
</script>

<template>
    <a :href="url" target="_blank">
        <slot/>
    </a>
</template>