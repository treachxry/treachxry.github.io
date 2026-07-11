<script lang="ts" setup>
    import StorySection from "@/pages/writing/StorySection.vue";
    import ErrorBoundary from "@/components/ui/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ui/ErrorPanel.vue";
</script>

<template>
    <main class="flex flex-col gap-4" role="main">
        <div class="card">
            <h2 class="section-title">About</h2>

            <p>I write in my free time and publish my stories exclusively on AO3.</p>
            <p class="mt-3">
                <img alt=":3" class="size-[2lh] float-left p-1 -ms-1 me-1" src="@/assets/images/nibble.gif"/>
                <span>I do not take commissions or requests, but I welcome suggestions if you have something relevant to my interests.</span>
            </p>
        </div>

        <error-boundary>
            <transition>
                <suspense timeout="0">
                    <story-section/>
                    <template #fallback>
                        <div class="grid gap-4">
                            <div v-for="_ in 2" class="card h-80 flex items-center justify-center animate-pulse">
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
    </main>
</template>