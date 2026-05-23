<script lang="ts" setup>
    import AnalyticsLink from "@/components/ui/AnalyticsLink.vue";
</script>

<template>
    <div class="card">
        <h2 class="section-title">Yap with me</h2>
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
                    <p>I don't have a personal server, but I'm active in <analytics-link class="link text-secondary" href="https://discord.gg/eroticaabyss" target="_blank">The Erotica Abyss</analytics-link>.</p>
                    <p>Feel free to DM me about anything, as long as you're not rude or a scammer.</p>
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
                        <analytics-link class="link text-secondary" href="https://bsky.app/profile/treachxry.bsky.social">treachxry.bsky.social</analytics-link>
                    </p>
                    <p>I haven't posted anything here yet. Just following a bunch of artists and other assorted freaks.</p>
                </div>
            </div>
        </div>
    </div>
</template>