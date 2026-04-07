<template>
    <div class="card grid py-1.5">
        <router-link to="/">Home</router-link>
        <router-link to="/about" class="disabled">About me</router-link>
        <router-link to="/art" class="disabled">Art I like</router-link>
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