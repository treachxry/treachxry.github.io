<script lang="ts" setup>

</script>

<template>
    <header class="flex items-center justify-center border-b border-primary text-nowrap">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/writing">Writing</router-link>
        <router-link class="link" to="/art">Art</router-link>
        <router-link class="link" to="/coding">Coding</router-link>
    </header>
</template>

<style scoped>
    @import "@/assets/style.css";

    a {
        @apply select-none text-xl h-11 px-6 pt-1 pb-2 border-transparent border-4 border-b-0;

        &.router-link-active {
            @apply text-primary border-b-primary border-b-4 pb-1;
        }
    }
</style>