<script setup lang="ts">
    defineProps<{
        name: string
        description: string
        logo: string
        url?: string
    }>();
</script>

<template>
    <a :href="url" target="_blank" class="flex items-center gap-6 rounded-3xl bg-base-300 p-4 text-base-content">
        <img
            :src="logo"
            :alt="`${name} logo`"
            class="w-10"
        />
        <div>
            <div class="font-bold underline">{{name}}</div>
            <div class="text-sm">{{description}}</div>
        </div>
    </a>
</template>