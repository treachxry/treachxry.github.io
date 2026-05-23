<template>
    <div class="card grid py-1.5">
        <router-link to="/">Home</router-link>
        <router-link class="disabled" to="/about">About me</router-link>
        <router-link class="disabled" to="/art">Art I like</router-link>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    a {
        @apply transition-colors py-0.5 select-none;

        &:hover, &:focus-visible {
            @apply text-secondary;
        }

        &::before {
            content: "> ";
        }
    }

    a.disabled {
        @apply pointer-events-none opacity-50;
    }
</style>