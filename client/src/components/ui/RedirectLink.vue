<script lang="ts" setup>
    defineProps<{
        href: string
    }>();
</script>

<template>
    <a :href="`/?redirect=${true}&to=${href}`" target="_blank">
        <slot/>
    </a>
</template>