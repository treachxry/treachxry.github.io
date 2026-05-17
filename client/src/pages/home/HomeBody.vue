<script setup lang="ts">
    import SectionSocials from "@/pages/home/SectionSocials.vue";
    import SectionCoding from "@/pages/home/SectionCoding.vue";
    import SectionWriting from "@/pages/home/SectionWriting.vue";
</script>

<template>
    <main class="flex flex-col gap-4" role="main">
        <section-socials/>
        <section-writing/>
        <section-coding/>
    </main>
</template>