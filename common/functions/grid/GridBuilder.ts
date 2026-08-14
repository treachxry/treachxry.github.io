import {IGridConfiguration} from "../../models/grid/IGridConfiguration";
import {IGridColumnConfiguration} from "../../models/grid/IGridColumnConfiguration";
import {IGridBuilder} from "../../models/grid/IGridBuilder";
import {IGridColumnBuilder} from "../../models/grid/IGridColumnBuilder";
import {gridColumnBuilder} from "./GridColumnBuilder";

export function gridBuilder<TModel extends object>(name: string, init: (builder: IGridBuilder<TModel>) => void): IGridConfiguration<TModel> {
    const columns: IGridColumnConfiguration<TModel, any>[] = [];

    const builder: IGridBuilder<TModel> = {
        column
    };

    init(builder);

    function column<TProp>(getter: (model: TModel) => TProp): IGridColumnBuilder<TModel> {
        const {column, builder} = gridColumnBuilder<TModel, TProp>(getter);

        columns.push(column);

        return builder;
    }

    return {
        name,
        columns
    };
}