<script lang="ts" setup>
    import {onBeforeMount} from "vue";
    import {useRoute} from "vue-router";
    import {useApiClient} from "@/composables/useApiClient";

    const api = useApiClient();
    const route = useRoute();
    const url = route.query.to;

    onBeforeMount(redirect);

    async function redirect() {
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
    }
</script>

<template>
    <div>Redirecting to {{url}}</div>
</template>