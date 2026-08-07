<script lang="ts" setup>
    import StorySection from "@/pages/writing/StorySection.vue";
    import ErrorBoundary from "@/components/ui/ErrorBoundary.vue";
    import ErrorPanel from "@/components/ui/ErrorPanel.vue";
    import RedirectLink from "@/components/ui/RedirectLink.vue";
</script>

<template>
    <main class="flex flex-col gap-4" role="main">
        <div class="card">
            <h2 class="section-title">About</h2>

            <div class="section-body">
                <p>I have a thing for latex and bodysuits so expect me to be absolutely obsessed with those.</p>
                <p>
                    <redirect-link class="link text-secondary inline-block" href="https://archiveofourown.org/users/Treachery" target="_blank">
                        > Check out my AO3 profile
                    </redirect-link>
                </p>
            </div>
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