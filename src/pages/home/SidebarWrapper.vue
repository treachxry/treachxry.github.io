<script setup lang="ts">
    import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
    import { useTextStreaming } from "@/composables/useTextStreaming";

    const hiddenClass = 'overflow-hidden';
    const mediaQuery = window.matchMedia("(max-width: 55rem)");
    const open = ref<boolean>(false);
    const buttonText = computed(() => open.value ? 'Close menu' : 'Menu');
    const buttonDisplayText = useTextStreaming(buttonText, {delayTotal: 300});

    onMounted(() => {
        mediaQuery.addEventListener('change', closeSidebar);
    });

    onBeforeUnmount(() => {
        mediaQuery.removeEventListener('change', closeSidebar);
    });

    watch(open, (value) => {
        if(value) {
            document.body.classList.add(hiddenClass);
        }
        else {
            document.body.classList.remove(hiddenClass);
        }
    });

    function closeSidebar() {
        open.value = false;
    }
</script>

<template>
    <transition name="fade">
        <div v-if="open" class="fixed z-10 inset-0 bg-base-100 opacity-60" @click="closeSidebar"/>
    </transition>

    <button class="button sidebar-button" :class="{'open': open}" @click="open = !open">
        {{ buttonDisplayText }}
    </button>

    <aside class="sidebar-wrapper" :class="{'open': open}">
        <div class="sidebar">
            <div class="sidebar-inner">
                <slot/>
            </div>
        </div>
    </aside>
</template>

<style scoped>
    @import "@/assets/style.css";

    .sidebar-wrapper {
        @apply z-10 fixed md:relative inset-0 left-auto;
        @apply w-60 max-w-full md:w-52 md:min-w-52 pt-16 md:pt-0 transition-transform;
        @apply bg-base-100 md:bg-transparent border-s-base-content/30 border-s md:border-0;

        &:not(.open) {
            @apply translate-x-full md:translate-0;
        }
    }

    .sidebar {
        @apply overflow-y-auto max-h-full;
        @apply p-4 pt-0 md:p-0;
    }

    .sidebar-inner {
        @apply flex flex-col gap-4;
    }

    .sidebar-button {
        @apply z-20 fixed md:hidden top-0 right-0;
        @apply w-20 h-9 mx-4 my-3 sm:me-8 md:me-4;

        &.open {
            @apply w-52 me-4;
        }
    }
</style>