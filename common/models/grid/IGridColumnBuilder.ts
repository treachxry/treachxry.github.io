export interface IGridColumnBuilder<T> {
    title(name: string): IGridColumnBuilder<T>
    visible(visible: boolean): IGridColumnBuilder<T>
    editable(editable: boolean): IGridColumnBuilder<T>
    template(name: string | undefined): IGridColumnBuilder<T>
}