<script setup lang="ts">
    import StorySection from "@/pages/writing/StorySection.vue";
    import ErrorBoundary from "@/components/ui/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ui/ErrorPanel.vue";
</script>

<template>
    <error-boundary>
        <transition>
            <suspense timeout="0">
                <story-section/>
                <template #fallback>
                    <div class="grid gap-4">
                        <div class="h-160 flex items-center justify-center animate-pulse">
                            Loading stories...
                        </div>
                    </div>
                </template>
            </suspense>
        </transition>
        <template #error="{error, clearError}">
            <error-panel :error :clear-error/>
        </template>
    </error-boundary>
</template>