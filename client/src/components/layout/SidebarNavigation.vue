<script setup lang="ts">
</script>
<template>
    <div class="card grid py-1.5">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/writing">Writing</router-link>
        <router-link class="link" to="/art">Art</router-link>
        <router-link class="link" to="/lore">Lore</router-link>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    a {
        @apply py-0.5 select-none;

        &::before {
            content: "> ";
        }

        &.router-link-active {
            @apply text-secondary;
        }
    }
</style>