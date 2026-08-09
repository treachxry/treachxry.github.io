export interface ISingleton<TUse, TState> {
    initializeComposable: (state?: TState) => TUse
    useComposable: () => TUse
}

const map: Map<Symbol, any> = new Map<Symbol, any>();

export function useSingleton<TUse, TState = void>(useFn: (state?: TState) => TUse): ISingleton<TUse, TState> {
    const key = Symbol();
    let initialized: boolean = false;

    function initializeComposable(state?: TState): TUse {
        if(initialized) {
            return useComposable();
        }

        const composable: TUse = useFn(state);

        map.set(key, composable);
        initialized = true;

        return composable;
    }

    function useComposable(): TUse {
        const composable: TUse | undefined = map.get(key);

        if(composable === undefined) {
            return initializeComposable();
        }

        return composable;
    }

    return {
        initializeComposable,
        useComposable
    }
}