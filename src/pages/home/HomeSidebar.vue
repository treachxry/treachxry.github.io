<script setup lang="ts">
    import { format } from "date-fns";
    import SidebarWrapper from "@/pages/home/SidebarWrapper.vue";
    import SidebarNavigation from "@/pages/home/SidebarNavigation.vue";
    import SidebarStatus from "@/pages/home/SidebarStatus.vue";
    import SidebarMeme from "@/pages/home/SidebarMeme.vue";

    const buildDate = format(__BUILD_DATE__, 'yyyy MMMM dd. HH:mm');
</script>

<template>
    <sidebar-wrapper>
        <sidebar-navigation/>
        <sidebar-status/>
        <sidebar-meme/>
        <div class="card py-2">
            <div>Last updated:</div>
            <div>{{buildDate}}</div>
        </div>
    </sidebar-wrapper>
</template>