<script setup lang="ts">
    import {computed, ref} from "vue";
    import {useApiClient} from "@/composables/useApiClient.ts";
    import {LoreDbModel, LoreViewModel} from "common/models/database/Lore.ts"
    import LoreCard from "@/pages/writing/LoreCard.vue";

    const api = useApiClient();
    const {data} = await api.GET('/api/lore');

    const models = computed(() => data as LoreDbModel[]);
    const activeKey = ref<string>();

    const activeItem = computed(() => {
        return models.value.find(m => m.key === activeKey.value);
    })

    function openItem(key: string | undefined = undefined) {
        activeKey.value = key;
    }
</script>

<template>
    <div class="grid gap-8">
        <div class="grid md:grid-cols-2 justify-start">
            <button v-for="item in models" class="link" @click="openItem(item.key)">
                {{item.name}}
            </button>
        </div>
    </div>

    <transition name="fade">
        <div v-if="activeItem" class="fixed inset-0 bg-base-100/80 z-50" @click="openItem()">
            <div class="max-w-240 mx-auto px-4 sm:px-8 py-3 flex flex-col">
                <button class="button mb-3 px-8 ms-auto" @click.stop="openItem()">
                    Close
                </button>
                <lore-card :lore="activeItem as LoreViewModel" @click.stop/>
            </div>
        </div>
    </transition>
</template>