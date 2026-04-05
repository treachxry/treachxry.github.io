<script setup lang="ts">
    import { computed, ref } from "vue";
    import { useTextStreaming } from "@/composables/useTextStreaming";
    import ProfilePicture from "@/pages/home/ProfilePicture.vue";

    const textChoices: string[] = [
        "The goal is to be as kindhearted and perverted as possible.",
        "???",
        "I wish I could [DATA EXPUNGED].",
        "I'll add more easter eggs here",
    ];

    const currentIndex = ref<number>(0);
    const currentText = computed(() => textChoices[currentIndex.value]);
    const displayText = useTextStreaming(currentText, {delayUnit: 30});

    function chooseRandom() {
        const offset = Math.floor(1 + Math.random() * (textChoices.length - 1));
        currentIndex.value = (currentIndex.value + offset) % textChoices.length;
    }
</script>

<template>
    <header class="mb-4" role="banner">
        <div class="h-40 flex items-center overflow-hidden rounded bg-linear-20 from-primary to-secondary text-base-100 relative">
            <profile-picture @click="chooseRandom"/>
            <div class="p-2 sm:px-4 transition-all">
                <h1 class="text-2xl sm:text-3xl mb-1 sm:mb-2 transition-all">
                    treachxry
                </h1>
                <div class="text-base sm:text-lg">
                    <p>Kinky degenerate. I write, code, and procrastinate... mostly the latter.</p>
                </div>
            </div>
        </div>
        <div class="min-h-[3lh] px-1 bg-linear-20 from-primary to-secondary bg-clip-text text-transparent transition-all">
            {{ displayText }}
        </div>
    </header>
</template>