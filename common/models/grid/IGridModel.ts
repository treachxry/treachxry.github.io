export interface IGridModel<TModel extends object> {
    value: TModel
    dirtyFields: string[]
}