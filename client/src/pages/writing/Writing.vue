<script lang="ts" setup>
    import {ref} from "vue";
    import RedirectLink from "@/components/ui/RedirectLink.vue";
    import StorySectionWrapper from "@/pages/writing/StorySectionWrapper.vue";
    import LoreSectionWrapper from "@/pages/writing/LoreSectionWrapper.vue";

    const activeTabIndex = ref<number>(0);
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="card">
            <h2 class="section-title">About</h2>
            <div class="section-body">
                <p>I write smut as a hobby and publish my stories exclusively on AO3. No commissions or requests, but suggestions are welcome if you have something interesting in mind.</p>
                <p>My stories are mainly original fiction with a focus on messed up relationships and kinks. These include latex, non-con, bondage, femdom, breathplay, perverted contraptions, corruption, aphrodisiacs, etc. You get the picture.</p>

                <redirect-link class="link text-secondary" href="https://archiveofourown.org/users/Treachery" target="_blank">
                    > Check out my AO3 profile
                </redirect-link>
            </div>
        </div>

        <div class="card p-0">
            <div class="grid grid-cols-2 border-b border-b-primary">
                <button class="btn" @click="activeTabIndex = 0">
                    <span class="link" :class="{'active': activeTabIndex === 0}">Stories</span>
                </button>
                <button class="btn" @click="activeTabIndex = 1">
                    <span class="link" :class="{'active': activeTabIndex === 1}">Lore</span>
                </button>
            </div>
            <div class="p-4">
                <keep-alive>
                    <story-section-wrapper v-if="activeTabIndex === 0"/>
                    <lore-section-wrapper v-else-if="activeTabIndex === 1"/>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    .btn {
        @apply outline-0 px-4;

        & > span {
            @apply inline-block w-full pt-1 pb-2 border-4 border-b-0 border-transparent transition-all h-10;

            &.active {
                @apply text-primary border-b-4 pb-1 border-b-primary;
            }
        }
    }
</style>