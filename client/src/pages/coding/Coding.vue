<script setup lang="ts">
    import RedirectLink from "@/components/ui/RedirectLink.vue";
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="card">
            <h2 class="section-title">My coding projects</h2>
            <div class="section-body">
                <redirect-link class="link text-secondary" href="https://github.com/treachxry" target="_blank">
                    Check out my GitHub profile >
                </redirect-link>
            </div>
        </div>

        <div class="card">
            <p>
                <redirect-link class="link text-secondary" href="/ao3-theme-generator">AO3 skin generator</redirect-link>
                <span> - </span>
                <span>Web app to create site skins for AO3. Customizable colors, live skin preview, etc. In development. [<redirect-link class="link text-secondary" href="https://github.com/treachxry/ao3-theme-generator">Source code</redirect-link>]</span>
            </p>
            <p>
                <redirect-link class="link text-secondary" href="/just-write">Just write</redirect-link>
                <span> - </span>
                <span>A very simple web interface to write without distractions. With typing sounds for your ADHD brain. [<redirect-link class="link text-secondary" href="https://github.com/treachxry/just-write">Source code</redirect-link>]</span>
            </p>
        </div>
    </div>
</template>