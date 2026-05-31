<script setup lang="ts">
</script>
<template>
    <div class="card grid py-1.5">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/writing">My writing</router-link>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    a {
        @apply py-0.5 select-none;

        &::before {
            content: "> ";
        }

        &.disabled {
            @apply pointer-events-none opacity-50;
        }

        &.router-link-active {
            @apply text-secondary;
        }
    }
</style>