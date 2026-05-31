<script setup lang="ts">
    import LoadingIndicator from "@/components/ui/LoadingIndicator.vue";
</script>

<template>
    <router-view v-slot="{Component}">
        <transition mode="out-in" name="fade">
            <suspense timeout="0">
                <component :is="Component"/>
                <template #fallback>
                    <loading-indicator/>
                </template>
            </suspense>
        </transition>
    </router-view>
</template>