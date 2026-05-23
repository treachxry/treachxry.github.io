<script lang="ts" setup>
    import AnalyticsLink from "@/components/ui/AnalyticsLink.vue";
</script>

<template>
    <div class="card">
        <h2 class="section-title">My coding projects</h2>
        <div class="section-body">
            <p class="flex gap-1.5 items-center">
                <span class="section-link text-[#999]">
                    <img alt="GitHub logo" src="@/assets/icons/github.svg"/>
                    <span>GitHub</span>
                </span>
                <span>/</span>
                <analytics-link class="link text-secondary" href="https://github.com/treachxry" target="_blank">treachxry</analytics-link>
            </p>
            <p>
                <analytics-link class="link text-secondary" href="/ao3-theme-generator">AO3 skin generator</analytics-link>
                <span> - </span>
                <span>Web app to create site skins for AO3. Customizable colors, live skin preview, etc. In development. [<analytics-link class="link text-secondary" href="https://github.com/treachxry/ao3-theme-generator">Source code</analytics-link>]</span>
            </p>
            <p>
                <analytics-link class="link text-secondary" href="/just-write">Just write</analytics-link>
                <span> - </span>
                <span>A very simple web interface to write without distractions. With typing sounds for your ADHD brain. [<analytics-link class="link text-secondary" href="https://github.com/treachxry/just-write">Source code</analytics-link>]</span>
            </p>
        </div>
    </div>
</template>