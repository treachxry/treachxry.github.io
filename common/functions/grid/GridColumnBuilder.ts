import {IGridColumnBuilder} from "../../models/grid/IGridColumnBuilder";
import {IGridColumnConfiguration} from "../../models/grid/IGridColumnConfiguration";

export function gridColumnBuilder<TModel, TProp>(getter: (model: TModel) => TProp): {column: IGridColumnConfiguration<TModel, TProp>, builder: IGridColumnBuilder<TProp>} {
    const key: string = nameof(getter);

    const column: IGridColumnConfiguration<TModel, TProp> = {
        key: key,
        title: key,
        isVisible: true,
        isEditable: true,
        getValue: getValue,
        setValue: setValue
    };

    const builder: IGridColumnBuilder<TProp> = {
        title,
        visible,
        editable,
        template
    };

    function getValue(model: TModel): TProp {
        return model[key as keyof TModel] as TProp;
    }

    function setValue(model: TModel, value: TProp): void {
        model[key as keyof TModel] = value as any;
    }

    function title(name: string) {
        column.title = name;

        return builder;
    }

    function visible(visible: boolean) {
        column.isVisible = visible;

        return builder;
    }

    function editable(editable: boolean) {
        column.isEditable = editable;

        return builder;
    }

    function template(name: string | undefined) {
        column.customTemplate = name;

        return builder;
    }

    return {
        column,
        builder
    };
}

function nameof<T>(selector: (obj: T) => any): string {
    const handler: ProxyHandler<any> = {
        get: (_, prop) => prop
    };

    const proxy = new Proxy({}, handler);

    return selector(proxy) as unknown as string;
}