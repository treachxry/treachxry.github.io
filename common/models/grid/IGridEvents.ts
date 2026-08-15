export interface IGridEvents<TModel extends object> {
    create?(model: TModel): Promise<void>
    update?(models: TModel[]): Promise<void>
    remove?(model: TModel): Promise<void>
    cancel?(model: TModel): Promise<void>
    change?(model: TModel): Promise<void>
}