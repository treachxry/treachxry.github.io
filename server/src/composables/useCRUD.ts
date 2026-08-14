import {HonoOpenAPIRouterType} from "chanfana";
import {IRepository} from "@/composables/useRepository";
import {AppVariables} from "@/models/AppVariables";
import {AppContext} from "@/models/AppContext";

export function useCrudRoutes<T extends object>(router: HonoOpenAPIRouterType<{ Bindings: Env, Variables: AppVariables }>, repository: IRepository<T>) {
    const basePath = '';

    function toHandler() {

    }

    router.post(`${basePath}/create-or-update`);
    router.get(`${basePath}/read-all`);
    router.get(`${basePath}/read-one`);
    router.delete(`${basePath}/delete-one`);
}