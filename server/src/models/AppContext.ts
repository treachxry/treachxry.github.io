import {Context} from "hono";
import {AppVariables} from "@/models/AppVariables";

export type AppContext = Context<{ Bindings: Env, Variables: AppVariables }>;