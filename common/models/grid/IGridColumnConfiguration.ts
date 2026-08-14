export interface IGridColumnConfiguration<TModel, TProp> {
    key: string
    title: string
    isVisible: boolean
    isEditable: boolean
    getValue: (model: TModel) => TProp
    setValue: (model: TModel, value: TProp) => void
    customTemplate?: string
}