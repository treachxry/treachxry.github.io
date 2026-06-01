<script lang="ts" setup>
    import {ref} from "vue";
    import {useTextStreaming} from "@/composables/useTextStreaming";
    import HeaderPicture from "@/pages/home/HeaderPicture.vue";
    import HeaderContent from "@/pages/home/HeaderContent.vue";

    const headerText = ref("The goal is to be as kindhearted and perverted as possible.");
    const displayText = useTextStreaming(headerText, {stepDuration: 30});
</script>

<template>
    <header class="mb-4" role="banner">
        <div class="h-40 flex items-center overflow-hidden rounded bg-linear-20 from-primary to-secondary text-base-100 relative">
            <header-picture/>
            <header-content/>
        </div>
        <div class="min-h-[3lh] px-1 bg-linear-20 from-primary to-secondary bg-clip-text text-transparent transition-all">
            {{displayText}}
        </div>
    </header>
</template>