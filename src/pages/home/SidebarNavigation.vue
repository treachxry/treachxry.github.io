<template>
    <div class="card py-1.5">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About me</router-link></li>
            <li><router-link to="/music">Music</router-link></li>
        </ul>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    li {
        @apply transition-colors py-0.5;
    }

    li:hover {
        @apply text-secondary;
    }

    li::before {
        content: "> ";
    }
</style>