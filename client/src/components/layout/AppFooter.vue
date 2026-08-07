<script setup lang="ts">
    import {format} from "date-fns";

    const buildDate = format(__BUILD_DATE__, 'yyyy-MM-dd');
</script>

<template>
    <footer class="px-4 flex items-center text-sm border-t border-primary">
        <span class="me-auto">Last updated: {{buildDate}}</span>
        <a href="https://github.com/treachxry/treachxry.github.io" class="link" target="_blank">Source code</a>
    </footer>
</template>