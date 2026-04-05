<script setup lang="ts">
    import SidebarWrapper from "@/pages/home/SidebarWrapper.vue";
    import SidebarNavigation from "@/pages/home/SidebarNavigation.vue";
    import SidebarStatus from "@/pages/home/SidebarStatus.vue";
</script>

<template>
    <sidebar-wrapper>
        <sidebar-navigation/>
        <sidebar-status/>
        <div class="card p-0 relative overflow-hidden">
            <span class="absolute px-1 text-xs font-bold bottom-0 left-0 opacity-80">Featured shitpost</span>
            <img src="@/assets/images/featured-meme.webp" alt="Featured shitpost"/>
        </div>
    </sidebar-wrapper>
</template>