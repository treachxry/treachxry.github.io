<script setup lang="ts">
    import {ref} from "vue";
    import {useAuth} from "@/composables/useAuth.ts";
    import {useRoute, useRouter} from "vue-router";

    const auth = useAuth();
    const route = useRoute();
    const router = useRouter();

    const username = ref('');
    const password = ref('');
    const error = ref<string>();

    async function login() {
        error.value = undefined;

        try {
            const response = await auth.login(username.value, password.value);

            if(response.ok) {
                router.push((route.query.returnUrl as string) || '/');
            }
            else {
                error.value = response.error;
            }
        }
        catch(err) {
            error.value = JSON.stringify(err);
        }
    }
</script>

<template>
    <div class="flex flex-col w-80 mx-auto my-8 gap-6">
        <label>
            <span>Username</span>
            <input type="text" v-model="username"/>
        </label>

        <label>
            <span>Password</span>
            <input type="password" v-model="password"/>
        </label>

        <div class="flex flex-col gap-2">
            <button @click="login" class="button py-2 mt-5">Login</button>
            <div v-if="error" class="text-red-500">{{error}}</div>
        </div>
    </div>
</template>

<style scoped>
    @import "@/assets/style.css";

    label {
        @apply flex flex-col gap-0.5;
    }

    input {
        @apply bg-base-300 border border-base-content/60 focus:outline-2 outline-offset-2 outline-secondary transition-colors rounded-sm p-2;
    }
</style>