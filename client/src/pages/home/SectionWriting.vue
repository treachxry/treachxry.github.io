<script lang="ts" setup>
    import RedirectLink from "@/components/ui/RedirectLink.vue";
</script>

<template>
    <div class="card">
        <h2 class="section-title">My writing</h2>
        <div class="section-body">
            <p>I write smut as a hobby and publish my stories exclusively on AO3. No commissions or requests, but suggestions are welcome if you have something interesting in mind.</p>
            <p>My stories are mainly original fiction with a focus on messed up relationships and kinks. These include latex, non-con, bondage, femdom, breathplay, perverted contraptions, corruption, aphrodisiacs, etc. You get the picture.</p>

            <router-link to="/writing" class="link text-secondary">
                > Read more about it here
            </router-link>
            <redirect-link class="link text-secondary" href="https://archiveofourown.org/users/Treachery" target="_blank">
                > Check out my AO3 profile
            </redirect-link>
        </div>
    </div>
</template>