<script setup lang="ts">
    import { computed, onBeforeUnmount, onMounted, ref } from "vue";
    import { useTextStreaming } from "@/composables/useTextStreaming";

    const open = ref<boolean>(false);
    const mediaQuery = window.matchMedia("(max-width: 55rem)");

    onMounted(() => {
        mediaQuery.addEventListener('change', onLayoutChange);
    });

    onBeforeUnmount(() => {
        mediaQuery.removeEventListener('change', onLayoutChange);
    });

    function onLayoutChange() {
        open.value = false;
    }

    const buttonText = useTextStreaming(computed(() => open.value ? 'Close menu' : 'Menu'), {
        delayTotal: 300
    })
</script>

<template>
    <transition name="fade">
        <div v-if="open" class="fixed z-10 inset-0 bg-base-100 opacity-60" @click="open = false"/>
    </transition>

    <button class="button sidebar-button" :class="{'open': open}" @click="open = !open">
        {{ buttonText }}
    </button>

    <aside class="sidebar" :class="open ? '' : 'translate-x-full'">
        <div class="flex flex-col gap-4 overflow-hidden">
            <slot/>
        </div>
    </aside>
</template>

<style scoped>
    @import "@/assets/style.css";

    .sidebar {
        @apply fixed md:relative top-0 right-0 h-full md:h-auto w-60 md:w-52 md:min-w-52;
        @apply z-10 bg-base-100 md:bg-transparent p-4 pt-16 md:p-0 border-s border-s-base-content/30 md:border-0 transition-transform overflow-y-auto md:translate-0;
    }

    .sidebar-button {
        @apply fixed md:hidden top-0 right-0 w-20 h-9 mx-4 my-3 sm:me-8 md:me-4 z-20;

        &.open {
            @apply w-52 me-4;
        }
    }
</style>