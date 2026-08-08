<script setup lang="ts">
    import {computed, ref} from "vue";
    import MarkdownIt from "markdown-it";
    import {LoreViewModel} from "common/models/database/Lore.ts";

    const {lore} = defineProps<{
        lore: LoreViewModel
    }>();

    const md = new MarkdownIt();
    const htmlContent = computed(() => md.render(lore.content.trim()));
    const imagePreviewActive = ref<boolean>(false);

    function toggleImagePreview() {
        imagePreviewActive.value = !imagePreviewActive.value;
    }
</script>

<template>
    <div class="card relative">
        <div class="flex items-center gap-4 mb-6">
            <div class="size-25">
                <div v-if="lore.iconUrl" class="preview-image" :class="{'active': imagePreviewActive}">
                    <img alt="Lore entry icon" :src="lore.iconUrl" @click="toggleImagePreview"/>
                </div>
                <div v-else class="opacity-60 size-full flex justify-center items-center bg-base-content/15 rounded-xl border-2">
                    <span class="text-6xl rounded-xl">?</span>
                </div>
            </div>
            <div>
                <h1 class="text-xl">{{lore.name}}</h1>
                <div class="opacity-70">Type: {{lore.type}}</div>

                <div v-if="lore.links?.length" class="flex flex-wrap">
                    <div class="me-2 opacity-70">Featured in:</div>
                    <div v-for="(link, i) in lore.links">
                        <span v-if="i">, </span>
                        <a v-if="link.url" class="link text-secondary" target="_blank" :href="link.url">{{link.label}}</a>
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

    .preview-image {
        @apply size-25 absolute inset-4 overflow-hidden rounded-xl overflow-y-auto;
        @apply flex items-start justify-center z-10 border border-transparent hover:border-secondary;

        transition: width 300ms ease, height 300ms ease, border-color 150ms ease;

        &.active {
            height: calc(100% - 2rem);
            width: calc(100% - 2rem);
            border: 0;
        }

        & img {
            @apply rounded-xl object-cover;
        }
    }

    .markdown-content {
        @apply text-start;

        h2 {
            @apply text-lg;
        }

        h2:not(:first-of-type) {
            @apply border-t border-base-content/30 pt-3 mt-3;
        }

        h3, h4, h5, h6 {
            @apply mt-4;
        }

        p {
            @apply my-1.5;
        }

        li::before {
            content: "> ";
        }
    }
</style>