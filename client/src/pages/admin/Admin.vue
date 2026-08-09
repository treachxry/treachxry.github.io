<script setup lang="ts">
    import {useAuth} from "@/composables/useAuth.ts";

    const {username} = useAuth();
</script>

<template>
    <div class="card">
        <div>Current user: {{username ?? 'null'}}</div>
    </div>
</template>
