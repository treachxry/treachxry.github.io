<script lang="ts" setup>
    import {useRoute} from "vue-router";
    import HomeHeader from "@/pages/home/HomeHeader.vue";
    import HomeBody from "@/pages/home/HomeBody.vue";
    import Redirect from "@/components/ui/Redirect.vue";

    const route = useRoute();
</script>

<template>
    <redirect v-if="route.query.redirect"/>

    <div v-else>
        <home-header/>
        <home-body/>
    </div>
</template>