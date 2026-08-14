import {TrackBearResponse} from "@/models/TrackBearResponse";

export function useTrackBearApi(token: string) {
    async function sendRequest<T>(path: string, init: RequestInit = {}): Promise<TrackBearResponse<T>> {
        try {
            const url: string = 'https://trackbear.app/api/v1' + path;

            init.headers ??= {};
            (init.headers as any)['Authorization'] = `Bearer ${token}`;

            const response: Response = await fetch(url, init);
            return response.json();
        }
        catch (e: any) {
            return {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: e.message ?? 'Unexpected server-side exception'
                }
            };
        }
    }

    return {
        sendRequest
    };
}