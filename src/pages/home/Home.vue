<script setup lang="ts">
    import HomeBody from "@/pages/home/HomeBody.vue";
    import HomeHeader from "@/pages/home/HomeHeader.vue";
    import HomeSidebar from "@/pages/home/HomeSidebar.vue";
</script>

<template>
    <div>
        <home-header/>
        <div class="flex items-start gap-4">
            <home-body/>
            <home-sidebar/>
        </div>
    </div>
</template>