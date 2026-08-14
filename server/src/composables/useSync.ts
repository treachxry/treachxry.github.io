export function useSync(db: D1Database, key: string) {
    const DEFAULT_SYNC_INTERVAL: number = 3600;

    async function getLastSync() {
        const row = await db.prepare(`
                SELECT *
                FROM [Sync]
                WHERE [key] = ?
            `)
            .bind(key)
            .first();

        return {
            lastSuccess: Number(row?.lastSuccess ?? 0),
            interval: Number(row?.interval ?? DEFAULT_SYNC_INTERVAL),
            isActive: Boolean(row?.isActive ?? true)
        };
    }

    async function setLastSynced(timestamp: number, error: null | string): Promise<void> {
        const success: boolean = error === null;

        if(success) {
            await db.prepare(`
                    INSERT INTO [Sync] ([key], [lastSuccess], [lastAttempt], [error]) VALUES (?1, ?2, ?2, ?3)
                    ON CONFLICT DO UPDATE SET [lastSuccess] = ?2, [lastAttempt] = ?2, [error] = ?3
                `)
                .bind(key, timestamp, error)
                .run();
        }
        else {
            await db.prepare(`
                    INSERT INTO [Sync] ([key], [lastAttempt], [error]) VALUES (?1, ?2, ?3)
                    ON CONFLICT DO UPDATE SET [lastAttempt] = ?2, [error] = ?3
                `)
                .bind(key, timestamp, error)
                .run();
        }
    }

    async function syncIfOutdated(syncAction: () => any | Promise<any>): Promise<boolean> {
        const {lastSuccess, interval, isActive} = await getLastSync();

        if(!isActive) {
            return false;
        }

        const now: number = Math.round(Date.now() / 1000);

        const elapsed: number = now - lastSuccess;
        const shouldSync: boolean = elapsed >= interval || elapsed < 0;

        if(!shouldSync) {
            return false;
        }

        let error: string | null = null;

        try {
            await syncAction();
        }
        catch (e: any) {
            error = e?.message ?? 'Unknown error';
        }

        await setLastSynced(now, error);

        return error === null;
    }

    return {
        syncIfOutdated
    };
}