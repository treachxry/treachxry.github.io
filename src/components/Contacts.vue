<script setup lang="ts">
    import Contact from "@/components/Contact.vue";
</script>

<template>
    <div class="flex flex-col gap-4">
        <contact
            name="AO3"
            description="Writing, smut"
            logo="/icons/ao3.svg"
            url="https://archiveofourown.org/users/Treachery"
        />
        <contact
            name="Discord"
            description="Yapping"
            logo="/icons/discord.svg"
        />
        <contact
            name="Bluesky"
            description="Yapping"
            logo="/icons/bluesky.svg"
            url="https://bsky.app/profile/treachxry.bsky.social"
        />
        <contact
            name="Pixiv"
            description="Art"
            logo="/icons/pixiv.svg"
            url="https://www.pixiv.net/en/users/111936095"
        />
        <contact
            name="GitHub"
            description="Coding"
            logo="/icons/github.svg"
            url="https://github.com/treachxry"
        />
    </div>
</template>