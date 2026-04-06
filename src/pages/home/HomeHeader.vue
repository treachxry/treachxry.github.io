<script setup lang="ts">
    import { computed, ref } from "vue";
    import { useTextStreaming } from "@/composables/useTextStreaming";
    import HeaderPicture from "@/pages/home/HeaderPicture.vue";
    import HeaderContent from "@/pages/home/HeaderContent.vue";

    const textChoices: string[] = [
        "The goal is to be as kindhearted and perverted as possible.",
        "Underboob? Sure wish I was...",
        "???",
    ];

    const currentIndex = ref<number>(0);
    const currentText = computed(() => textChoices[currentIndex.value]);
    const displayText = useTextStreaming(currentText, {delayBatch: 30});

    function chooseRandom() {
        const offset = Math.floor(1 + Math.random() * (textChoices.length - 1));
        currentIndex.value = (currentIndex.value + offset) % textChoices.length;
    }
</script>

<template>
    <header class="mb-4" role="banner">
        <div class="h-40 flex items-center overflow-hidden rounded bg-linear-20 from-primary to-secondary text-base-100 relative">
            <header-picture @click="chooseRandom"/>
            <header-content/>
        </div>
        <div class="min-h-[3lh] px-1 bg-linear-20 from-primary to-secondary bg-clip-text text-transparent transition-all">
            {{ displayText }}
        </div>
    </header>
</template>