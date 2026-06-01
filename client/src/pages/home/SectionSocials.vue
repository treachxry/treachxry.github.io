<script lang="ts" setup>
    import RedirectLink from "@/components/ui/RedirectLink.vue";
</script>

<template>
    <div class="card">
        <h2 class="section-title">My contacts and socials</h2>
        <div class="grid gap-6">
            <div>
                <div class="section-body">
                    <p class="flex gap-1.5 items-center">
                        <span class="section-link text-[#5865F2]">
                            <img alt="Discord logo" src="@/assets/icons/discord.svg"/>
                            <span>Discord</span>
                        </span>
                        <span>/</span>
                        <span>@treachxry</span>
                    </p>
                    <p>
                        I have no personal server, but I'm active in
                        <redirect-link class="link text-secondary" href="https://discord.gg/eroticaabyss" target="_blank">The Erotica Abyss</redirect-link>.
                    </p>
                    <p>
                        Feel free to message me, just note that I despise small-talk.
                    </p>
                </div>
            </div>

            <div>
                <div class="section-body">
                    <p class="flex gap-1.5 items-center">
                        <span class="section-link text-[#1185FE]">
                            <img alt="Bluesky logo" src="@/assets/icons/bluesky.svg"/>
                            <span>Bluesky</span>
                        </span>
                        <span>/</span>
                        <redirect-link class="link text-secondary" href="https://bsky.app/profile/treachxry.bsky.social">treachxry.bsky.social</redirect-link>
                    </p>
                    <p>
                        No posts, only lurking.
                        Just following a bunch of artists and other assorted freaks I enjoy.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>