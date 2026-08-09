export function useSync(db: D1Database, key: string) {
    async function getLastSynced(): Promise<number> {
        const row = await db.prepare(`
                SELECT [lastSuccess]
                FROM [Sync]
                WHERE [key] = ?
            `)
            .bind(key)
            .first();

        return Number(row?.lastSuccess ?? 0);
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

    async function syncIfOutdated(syncInterval: number, syncAction: () => any | Promise<any>): Promise<boolean> {
        const lastSync: number = await getLastSynced();
        const now: number = Math.round(Date.now() / 1000);

        const elapsed: number = now - lastSync;
        const shouldSync: boolean = elapsed >= syncInterval || elapsed < 0;

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