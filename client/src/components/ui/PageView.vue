<script setup lang="ts" generic="T">
    import {computed, ref} from "vue";
    import PageButton from "@/components/ui/PageButton.vue";

    const {data, pageSize = 10, disabled = false} = defineProps<{
        data: T[],
        pageSize?: number
        disabled?: boolean
    }>();

    defineSlots<{
        default(props: { data: T[] }): any
    }>();

    defineOptions({
        inheritAttrs: false
    });

    const currentPage = ref(1);

    const total = computed(() => data?.length ?? 0);
    const start = computed(() => (currentPage.value - 1) * pageSize);
    const end = computed(() => Math.min(total.value, currentPage.value * pageSize));
    const displayData = computed<T[]>(() => data.slice(start.value, end.value));
    const pageCount = computed(() => Math.ceil(total.value / pageSize));

    const displayedPages = computed<number[]>(() => {
        return getDisplayedPages(currentPage.value, pageCount.value, 9);
    });

    function getDisplayedPages(currentPage: number, pageCount: number, displayLimit: number): number[] {
        if(!pageCount) {
            return [];
        }

        let start: number;
        let end: number;
        const half = Math.floor(displayLimit / 2);

        if(pageCount <= displayLimit) {
            start = 1;
            end = pageCount;
        }
        else if(currentPage <= half + 1) {
            start = 1;
            end = Math.min(pageCount, displayLimit - 2);
        }
        else if (currentPage >= pageCount - half) {
            start = Math.max(1, pageCount - displayLimit + 3);
            end = pageCount;
        }
        else {
            start = Math.max(1, currentPage - half + 2);
            end = Math.min(pageCount, currentPage + half - 2);
        }

        const results = Array.from({length: end - start + 1}, (_, i) => i + start);

        if(results[0] > 1) {
            results.unshift(1);
        }

        if(results[results.length - 1] !== pageCount) {
            results.push(pageCount);
        }

        return results;
    }

    function goToPage(i: number) {
        currentPage.value = i;
    }
</script>

<template>
    <div>
        <div v-if="!disabled" class="flex items-center justify-between gap-4" v-bind="$attrs">
            <div class="flex items-center gap-1.5">
                <template v-for="(i, index) in displayedPages">
                    <page-button
                        @click="goToPage(i)"
                        :index="i"
                        :current-index="currentPage"
                        class="w-8"
                    />
                    <div
                        v-if="index < displayedPages.length - 1 && displayedPages[index + 1] - i > 1"
                        class="w-8 text-center"
                    >
                        ...
                    </div>
                </template>
            </div>
            <div>{{start + 1}}-{{end}} of {{total}} items</div>
        </div>
        <div>
            <slot :data="displayData"/>
        </div>
    </div>
</template>