<script lang="ts" setup>
    const {href} = defineProps<{
        href: string
    }>();
</script>

<template>
    <a :href="`/redirect?to=${href}`" target="_blank">
        <slot/>
    </a>
</template>