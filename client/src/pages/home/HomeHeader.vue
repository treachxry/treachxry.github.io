<script lang="ts" setup>
    import Avatar from "@/assets/images/avatar.png";
</script>

<template>
    <div class="h-40 flex items-center overflow-hidden bg-linear-90 from-primary to-secondary text-base-100">
        <img
            :src="Avatar"
            alt="Profile picture"
            class="h-full -ms-4 xs:ms-0 transition-all"
        />
        <div class="p-2 sm:px-4 transition-all">
            <h1 class="text-2xl sm:text-3xl mb-1 sm:mb-2 transition-all">
                treachxry
            </h1>
            <div class="text-base sm:text-lg">
                <p>Kinky smut writer, latex/bodysuit enthusiast. Potentially a programmer.</p>
            </div>
        </div>
    </div>
</template>