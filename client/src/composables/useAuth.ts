import {ref} from "vue";
import {useSingleton} from "@/composables/useSingleton.ts";
import {useApiClient} from "@/composables/useApiClient.ts";
import {LoginResponseModel} from "common/models/LoginResponseModel";

const {initializeComposable, useComposable} = useSingleton(useAuth);

export {
    initializeComposable as initializeAuth,
    useComposable as useAuth
}

function useAuth() {
    const api = useApiClient();
    const username = ref<string | null>(null);
    const checked = ref<boolean>(false);

    async function login(uname: string, password: string): Promise<LoginResponseModel> {
        const {data} = await api.POST('/api/auth/login', {
            credentials: 'include',
            body: {
                username: uname,
                password: password
            },
        });

        const model = data as LoginResponseModel;

        username.value = model?.username ?? null;
        checked.value = true;

        return model;
    }

    async function logout(): Promise<void> {
        await api.POST('/api/auth/logout', {
            credentials: 'include',
        });

        username.value = null;
    }

    async function fetchMe(): Promise<void> {
        const {data, response} = await api.GET('/api/admin/me', {
            credentials: 'include'
        });

        if(response.ok) {
            const model = data as { username: string | null };

            username.value = model.username;
        }
        else {
            username.value = null;
        }

        checked.value = true;
    }

    return {
        login,
        logout,
        fetchMe,
        username,
        checked
    };
}