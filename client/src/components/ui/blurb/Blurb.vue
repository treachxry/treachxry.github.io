<script setup lang="ts">
    import {computed} from "vue";
    import MarkdownIt from "markdown-it";
    import {Blurb} from "common/models/Blurb.ts";

    const {blurb} = defineProps<{
        blurb: Blurb
    }>();

    const md = new MarkdownIt();
    const htmlContent = computed(() => md.render(blurb.content.trim()));
</script>

<template>
    <div class="card">
        <div class="flex items-center gap-4 mb-6">
            <div class="size-25 border-2 flex justify-center items-center">
                <img v-if="blurb.icon" alt="Blurb icon" :src="blurb.icon" class="size-full object-cover"/>
                <span v-else class="text-7xl">?</span>
            </div>
            <div>
                <h1 class="text-xl">{{blurb.name}}</h1>
                <div class="opacity-60">Type: {{blurb.type}}</div>
                <div v-if="blurb.links?.length" class="flex flex-wrap">
                    <div class="me-2 opacity-60">Featured in:</div>
                    <div v-for="(link, i) in blurb.links">
                        <span v-if="i">, </span>
                        <a class="link text-secondary" :href="link.url">{{link.label}}</a>
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
        h2 {
            @apply text-lg;
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