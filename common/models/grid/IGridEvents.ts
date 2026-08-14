export interface IGridEvents<TModel extends object> {
    create?(model: TModel): void
    update?(model: TModel): void
    remove?(model: TModel): void
    cancel?(model: TModel): void
    change?(model: TModel): void
}