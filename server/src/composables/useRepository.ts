export function useRepository<T extends object>(db: D1Database, options: IRepositoryOptions<T>): IRepository<T> {
    function getTableName(): string {
        return `[${options.table}]`;
    }

    function getPrimaryKey(): string {
        return `[${options.primaryKey ?? 'id'}]`;
    }

    function getColumnList(): string {
        if(!options.columnList) {
            return '*';
        }

        return options.columnList.map(x => `[${String(x)}]`).join(', ');
    }

    async function createOrUpdate(model: T): Promise<number> {
        const values: any[] = Object.values(model);

        const result: number | null = await db.prepare(`
            INSERT INTO ${getTableName()} (${getColumnList()})
            VALUES (?)
        `).bind(values).first<number>();

        return result ?? 0;
    }

    async function readAll(): Promise<T[]> {
        const result = await db.prepare(`
            SELECT ${getColumnList()}
            FROM ${getTableName()}
            ${options.whereExpression ? `WHERE ${options.whereExpression}` : ''}
        `).all<T>();

        return result.results;
    }

    async function readOne(id: number): Promise<T | null> {
        return await db.prepare(`
            SELECT ${getColumnList()}
            FROM ${getTableName()}
            WHERE ${getPrimaryKey()} = ?
        `).bind(id).first<T>();
    }

    async function deleteOne(id: number): Promise<number> {
        const result: number | null = await db.prepare(`
            DELETE FROM ${getTableName()}
            WHERE ${getPrimaryKey()} = ?
        `).bind(id).first<number>();

        return result ?? 0;
    }

    return {
        createOrUpdate,
        readAll,
        readOne,
        deleteOne
    };
}

export interface IRepositoryOptions<T extends object> {
    table: string
    primaryKey?: string
    columnList?: (keyof T)[]
    whereExpression?: string
}

export interface IRepository<T extends object> {
    createOrUpdate(model: T): Promise<number>
    readAll(): Promise<T[]>
    readOne(id: number): Promise<T | null>
    deleteOne(id: number): Promise<number>
}