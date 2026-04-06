<script setup lang="ts">
    import { ref } from "vue";
    import Avatar from "@/assets/images/avatar.png";
    import AvatarLewd from "@/assets/images/avatar-lewd.png";

    const active = ref<boolean>(false);
    const interval = ref<number>();

    function onClick() {
        if(interval.value) {
            clearTimeout(interval.value);
        }

        active.value = true;

        interval.value = setTimeout(() => {
            active.value = false;
        }, 1000);
    }
</script>

<template>
    <img
        :src="active ? AvatarLewd : Avatar"
        alt="Profile picture"
        class="h-full -ms-4 xs:ms-0 transition-all cursor-pointer"
        @click="onClick"
    />
</template>