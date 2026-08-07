<script setup lang="ts">
    import {computed, ref} from "vue";
    import {Blurb as BlurbModel} from "common/models/Blurb.ts";
    import Blurb from "@/components/ui/blurb/Blurb.vue";

    const models: BlurbModel[] = [
        {
            key: 'milking-suit',
            name: 'Milking suit',
            type: 'item',
            links: [
                {url: 'https://archiveofourown.org/works/59984566', label: 'Carmen\'s rape fantasies'}
            ],
            content: `
## Appearance

Neck entry bodysuit made of latex, covering the entire body from neck to toe. The material is thin and elastic, but also surprisingly strong and hard to tear. Made to measure, encasing the wearer with vacuum-sealed tightness.

It's colored black with red sections around the elbows, crotch and knees. An opening at the crotch leads into the fleshlight, resembling a pair of pussy lips.

## Feeling

The stretchy latex adds a constant tightness around the entire body, but it's thin enough to not reduce mobility. It transfers any sensation to the skin, creating a feeling of being naked, while sweat and other body fluids can accumulate under the waterproof layer.

The fleshlight stretches the pussy like a giant dildo, which can be uncomfortable at first. It's sealed off from the outside world, offering protection from semen.

It also doubles as a chastity device, since it does not move or vibrate. Climaxing is practically impossible while wearing the suit, which keeps the wearer aroused and craving for release.

## Fleshlight

Sex toy embedded inside the vagina, barely visible from the outside, thus easily hidden under a layer of clothes.

The insides is made of soft silicone with added roughness, capable of stroking and rotating motions. At the top is a suction cup, providing a strong vacuum for extra pleasure and keeping the cock locked inside. Automatic lube injection ensures the wet slippery feeling of a real pussy.

It's battery powered and controllable via a smartphone app, with multiple presets and options for an automated start up once a cock is detected inside. At full speed the stimulation is extreme, forcing multiple orgasms one after another to drain the victim's balls in mere minutes. Denial is also an option, quickly pushing the victim to the edge with fast strokes, and keeping him there indefinitely with controlled suction to the glans.

## Background

Made by a small company specializing in sex toys and can be purchased via their web shop. The suit is expensive due to its custom size and unique features.

It's intended as a powerful tool for a dominatrix, taking complete control over a man's pleasure while teasing them in tight rubber.
`
        },
        {
            key: 'carmen',
            name: 'Carmen',
            type: 'character',
            links: [
                {url: 'https://archiveofourown.org/works/59984566', label: 'Carmen\'s rape fantasies'}
            ],
            content: `
## Summary

- Seeks judgement-free understanding for her weirdness
- Confrontational and impulsive in conflicts
- Appears overly friendly to maintain her innocent facade
- Deep down an insecure girl with depraved fantasies

## Appearance (outdated)

- 19F, 175 cm/60 kg, slim/athletic
- Skin: Light, freckles
- Hair: Straight, shoulder length, auburn
- Eyes: Green
- Usual outfit: Dark grey leggings, green hoodie, black sport shoes
- Accessories: Necklace, glasses
`
        }
    ];

    const modelsByType = computed(() => Object.groupBy(models, m => m.type));

    const activeBlurbKey = ref<string>();

    const activeBlurb = computed(() => {
        return models.find(m => m.key === activeBlurbKey.value);
    })

    function openItem(key: string | undefined = undefined) {
        activeBlurbKey.value = key;
    }
</script>

<template>
    <div class="grid gap-8">
        <div v-for="(group, key) in modelsByType" class="card">
            <h1 class="section-title">{{key}}</h1>
            <div>
                <button v-for="item in group" class="underline" @click="openItem(item.key)">
                    {{item.name}}
                </button>
            </div>
        </div>
    </div>

    <transition name="fade">
        <div v-if="activeBlurb" class="fixed inset-0 bg-base-100/80 z-50" @click="openItem()">
            <div class="max-w-240 mx-auto px-4 sm:px-8 py-3 flex flex-col">
                <button class="button mb-3 px-8 ms-auto" @click.stop="openItem()">
                    Close
                </button>
                <blurb :blurb="activeBlurb" @click.stop/>
            </div>
        </div>
    </transition>
</template>