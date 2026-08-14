<script setup lang="ts">

</script>

<template>
    <div class="grid gap-4">
        <div class="card">
            <router-link to="/admin" class="link text-xl">Back to dashboard ></router-link>
        </div>
        <slot/>
    </div>
</template>