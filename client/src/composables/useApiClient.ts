import createClient from "openapi-fetch";
import {paths} from "common/api/api";
import {useSingleton} from "@/composables/useSingleton";

const {initializeComposable, useComposable} = useSingleton(useApiClient);

export {
    initializeComposable as initializeApiClient,
    useComposable as useApiClient
}

function useApiClient() {
    return createClient<paths>({
        baseUrl: __API_URL__
    });
}