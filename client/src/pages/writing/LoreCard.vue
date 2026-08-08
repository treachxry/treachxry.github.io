<script setup lang="ts">
    import {computed} from "vue";
    import MarkdownIt from "markdown-it";
    import {LoreViewModel} from "common/models/database/Lore.ts";

    const {lore} = defineProps<{
        lore: LoreViewModel
    }>();

    const md = new MarkdownIt();
    const htmlContent = computed(() => md.render(lore.content.trim()));
</script>

<template>
    <div class="card">
        <div class="flex items-center gap-4 mb-6">
            <div class="size-25 border-2 flex justify-center items-center bg-base-content/10">
                <img v-if="lore.iconUrl" alt="Lore icon" :src="lore.iconUrl" class="size-full object-cover"/>
                <span v-else class="text-6xl opacity-70">?</span>
            </div>
            <div>
                <h1 class="text-xl">{{lore.name}}</h1>
                <div class="opacity-70">Type: {{lore.type}}</div>

                <div v-if="lore.links?.length" class="flex flex-wrap">
                    <div class="me-2 opacity-70">Featured in:</div>
                    <div v-for="(link, i) in lore.links">
                        <span v-if="i">, </span>
                        <a v-if="link.url" class="link text-secondary" :href="link.url">{{link.label}}</a>
                        <span v-else class="opacity-40">{{link.label}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="markdown-content" v-html="htmlContent"/>
    </div>
</template>

<style>
    @import "@/assets/style.css";

    .markdown-content {
        @apply text-start;

        h2 {
            @apply text-lg;
        }

        h3 {
            @apply mt-2;
        }

        h4, h5, h6 {
            @apply mt-1;
        }

        h2:not(:first-of-type) {
            @apply border-t border-base-content/20 pt-3 mt-3;
        }

        p {
            @apply my-1.5;
        }

        li::before {
            content: "> ";
        }
    }
</style>