import {LoreDbModel} from "./LoreDbModel";

export interface LoreViewModel extends LoreDbModel {
    links?: {url: string, label: string}[]
}