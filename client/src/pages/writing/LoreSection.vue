<script setup lang="ts">
    import {computed, ref} from "vue";
    import {useApiClient} from "@/composables/useApiClient.ts";
    import {LoreViewModel} from "common/models/lore/LoreViewModel"
    import LoreCard from "@/pages/writing/LoreCard.vue";

    const api = useApiClient();
    const {data} = await api.GET('/api/lore');

    const models = computed(() => data as LoreViewModel[]);
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
        <div class="grid md:grid-cols-2 gap-x-8 justify-start">
            <div v-for="item in models">
                <button class="link text-xl" @click="openItem(item.key)">
                    > {{item.name}} <span class="text-base-content/40">({{item.type}})</span>
                </button>
            </div>
        </div>

        <transition name="fade">
            <div v-if="activeItem" class="fixed inset-0 bg-base-200/50 z-50 backdrop-blur-xs" @click="openItem()">
                <div class="max-w-240 mx-auto px-4 sm:px-8 py-3 flex flex-col">
                    <button class="button mb-3 px-8 ms-auto" @click.stop="openItem()">
                        Close
                    </button>
                    <lore-card
                        :lore="activeItem"
                        @click.stop
                        class="overflow-y-auto"
                        style="max-height: calc(100vh - 4.5rem)"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>