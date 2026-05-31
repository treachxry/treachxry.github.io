<script lang="ts" setup>
    import {onBeforeMount} from "vue";
    import {useRoute} from "vue-router";
    import {useApiClient} from "@/composables/useApiClient";

    const api = useApiClient();
    const route = useRoute();
    const url = route.query.to;

    onBeforeMount(async () => {
        if(typeof url !== 'string') {
            return;
        }

        try {
            await api.POST('/api/analytics', {
                params: {
                    query: {
                        url: url
                    }
                }
            });
        }
        catch(e) {
            console.error(e);
        }

        window.location.replace(url);
    });
</script>

<template>
    <div class="p-8">Redirecting to {{url}}</div>
</template>