<script setup lang="ts">
    const links = [
        {
            url: 'https://bsky.app/profile/layer.industries',
            name: 'LayerIndustries'
        },
        {
            url: 'https://www.pixiv.net/en/users/24417561',
            name: 'maguro27'
        },
        {
            url: 'https://bsky.app/profile/nopinkdoggo.bsky.social',
            name: 'Geni'
        },
        {
            url: 'https://bsky.app/profile/sleepystephbot.bsky.social',
            name: 'Sleepystephbot'
        },
        {
            url: 'https://bsky.app/profile/tonibabelony.bsky.social',
            name: 'ToniBabelony'
        },
        {
            url: 'https://www.pixiv.net/en/users/109060982',
            name: 'yamakaji_pixiv'
        },
        {
            url: 'https://www.pixiv.net/en/users/17998142',
            name: 'yasaikakiage'
        },
        {
            url: 'https://www.pixiv.net/en/users/38815134',
            name: 'salmon'
        },
    ];
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="card">
            <h2 class="section-title">My art</h2>

            <div>
                Coming soon...
            </div>
        </div>

        <div class="card link-list flex flex-col">
            <h2 class="section-title">Artists you should check out</h2>

            <div class="grid md:grid-cols-2 justify-start">
                <div v-for="link in links">
                    <a :href="link.url" target="_blank" class="py-1">{{link.name}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    .link-list a {
        @apply hover:underline;

        &:before {
            content: '> ';
        }
    }
</style>