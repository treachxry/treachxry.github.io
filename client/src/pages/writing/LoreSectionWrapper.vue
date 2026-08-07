<script setup lang="ts">
    import ErrorPanel from "@/components/ui/ErrorPanel.vue";
    import ErrorBoundary from "@/components/ui/ErrorBoundary.vue";
    import LoreSection from "@/pages/writing/LoreSection.vue";
</script>

<template>
    <error-boundary>
        <transition>
            <suspense timeout="0">
                <lore-section/>
                <template #fallback>
                    <div class="grid gap-4">
                        <div class="h-160 flex items-center justify-center animate-pulse">
                            Loading lore entries...
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