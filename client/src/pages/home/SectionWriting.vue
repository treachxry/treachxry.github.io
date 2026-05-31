<script lang="ts" setup>
    import RedirectLink from "@/components/ui/RedirectLink.vue";
</script>

<template>
    <div class="card">
        <h2 class="section-title">My writing</h2>
        <div class="section-body">
            <p class="flex gap-1.5 items-center">
                <span class="section-link text-[#900]">
                    <img alt="AO3 logo" src="@/assets/icons/ao3.svg"/>
                    <span>AO3</span>
                </span>
                <span>/</span>
                <redirect-link class="link text-secondary" href="https://archiveofourown.org/users/Treachery" target="_blank">Treachery</redirect-link>
            </p>
            <p>I write original fiction with a focus on messed up relationships and kinks. I have a thing for latex and bodysuits so expect me to be absolutely obsessed with those.</p>
            <p>Other things I enjoy are bondage, non-con, femdom, breathplay, perverted contraptions, corruption, aphrodisiacs, etc. You get the picture.</p>
        </div>
    </div>
</template>