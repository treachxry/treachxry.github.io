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
            <h2 class="section-title">My drawings</h2>

            <div class="section-body">
                <p>Coming soon...</p>
                <p>I've only done tiny bits of digital art so very much a complete beginner. I'll post my stuff here after I improve a bit more. For now, I shall recommend you to check out a few other artists who inspire me:</p>
                <p class="link-list grid md:grid-cols-2 justify-start">
                    <span v-for="link in links">
                        <a :href="link.url" target="_blank" class="py-1 link">{{link.name}}</a>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    .link-list a:before {
        content: '> ';
    }
</style>