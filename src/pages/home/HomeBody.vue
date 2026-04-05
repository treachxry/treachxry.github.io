<script setup lang="ts">

</script>

<template>
    <main class="flex flex-col gap-8" role="main">
        <div class="card">
            <h2 class="card-title">Yap with me</h2>
            <div class="grid gap-6">
                <div>
                    <div class="card-link">
                        <img src="@/assets/icons/discord.svg" alt="Discord logo"/>
                        <span class="text-[#5865F2]">Discord</span>
                        <span>/</span>
                        <span>@treachxry</span>
                    </div>
                    <div class="card-body">
                        <p>I don't have a personal server, but I'm active in <a href="https://discord.gg/eroticaabyss" target="_blank" class="link text-secondary">The Erotica Abyss</a>.</p>
                        <p>Feel free to DM me about anything, as long as you're not rude or a scammer.</p>
                    </div>
                </div>

                <div>
                    <a class="card-link" href="https://bsky.app/profile/treachxry.bsky.social" target="_blank">
                        <img src="@/assets/icons/bluesky.svg" alt="Bluesky logo"/>
                        <span class="text-[#1185FE]">Bluesky</span>
                        <span>/</span>
                        <span class="link">treachxry.bsky.social</span>
                    </a>
                    <div class="card-body">
                        <p>I haven't posted anything here yet. Just following a bunch of artists and other assorted freaks.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2 class="card-title">My writing</h2>
            <div>
                <a class="card-link" href="https://archiveofourown.org/users/Treachery" target="_blank">
                    <img src="@/assets/icons/ao3.svg" alt="AO3 logo"/>
                    <span class="text-[#900]">AO3</span>
                    <span>/</span>
                    <span class="link">Treachery</span>
                </a>
                <div class="card-body">
                    <p>I write original fiction with a focus on messed up relationships and kinks. I have a thing for latex and bodysuits so expect me to be absolutely obsessed with those.</p>
                    <p>Other things I like are bondage, non-con, femdom, breathplay, perverted contraptions, corruption, aphrodisiacs, etc. You get the picture.</p>
                    <p class="mt-3">
                        <img src="@/assets/images/nibble.gif" class="size-[2lh] float-left p-1 -ms-1 me-1" alt=":3"/>
                        <span>I've been an incredible procrastinator lately and haven't written shit. But you'll see links to newer fics here eventually.</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="card">
            <h2 class="card-title">My coding projects</h2>
            <div>
                <a class="card-link" href="https://github.com/treachxry" target="_blank">
                    <img src="@/assets/icons/github.svg" alt="GitHub logo"/>
                    <div class="text-[#999]">GitHub</div>
                    <span>/</span>
                    <span class="link">treachxry</span>
                </a>
                <div class="card-body">
                    <p>
                        <a href="/ao3-theme-generator" class="link text-secondary">AO3 skin generator</a>
                        <span> - </span>
                        <span>Web app to create site skins for AO3. Customizable colors, live skin preview, etc. In development.</span>
                    </p>
                    <p>
                        <a href="/just-write" class="link text-secondary">Just write</a>
                        <span> - </span>
                        <span>A very simple web interface to write without distractions. With typing sounds for your ADHD brain.</span>
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>