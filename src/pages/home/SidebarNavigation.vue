<template>
    <div class="card grid py-1.5">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About me</router-link>
        <router-link to="/music">Art I like</router-link>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    a {
        @apply transition-colors py-0.5;

        &:hover, &:focus-visible {
            @apply text-secondary;
        }

        &::before {
            content: "> ";
        }
    }
</style>