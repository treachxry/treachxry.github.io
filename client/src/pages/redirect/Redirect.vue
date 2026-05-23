<script lang="ts" setup>
    import {onBeforeMount} from "vue";
    import {useRoute, useRouter} from "vue-router";
    import {useApiClient} from "@/composables/useApiClient";

    const api = useApiClient();
    const route = useRoute();
    const url = route.query.to;

    onBeforeMount(redirect);

    async function redirect() {
        if(typeof url !== 'string') {
            const router = useRouter();
            await router.push({path: '/'});
            return;
        }

        await api.POST('/api/analytics', {
            params: {
                query: {
                    url: url
                }
            }
        });

        window.location.replace(url);
    }
</script>

<template>
    <div>Redirecting to {{url}}</div>
</template>