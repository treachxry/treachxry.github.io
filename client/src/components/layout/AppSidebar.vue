<script lang="ts" setup>
    import {format} from "date-fns";
    import SidebarWrapper from "@/components/layout/SidebarWrapper.vue";
    import SidebarNavigation from "@/components/layout/SidebarNavigation.vue";

    const buildDate = format(__BUILD_DATE__, 'yyyy MMMM dd. HH:mm');
</script>

<template>
    <sidebar-wrapper>
        <sidebar-navigation/>

        <div class="card py-2">
            <div>Love my stupid perverted life</div>
        </div>

        <div class="card p-0">
            <img alt="Featured shitpost" src="@/assets/images/meme.webp"/>
        </div>

        <div class="card py-2">
            <div>Last updated:</div>
            <div>{{buildDate}}</div>
        </div>
    </sidebar-wrapper>
</template>