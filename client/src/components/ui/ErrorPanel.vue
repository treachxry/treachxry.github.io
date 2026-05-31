<script setup lang="ts">
    defineProps<{
        error: Error
        clearError: () => void
    }>();
</script>

<template>
    <div class="card flex flex-col items-center justify-center text-red-500 text-center">
        <span class="underline text-lg font-semibold">
            An unexpected error has occurred
        </span>

        <span v-if="error.message" class="text-sm max-w-80">
            {{ error.message }}
        </span>

        <button @click="clearError" class="mt-4 card p-2 text-base-content cursor-pointer">
            Reload page
        </button>
    </div>
</template>