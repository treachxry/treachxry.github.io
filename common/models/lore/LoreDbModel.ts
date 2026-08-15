import {DbModel} from "../DbModel";

export interface LoreDbModel extends DbModel {
    key: string
    name: string
    type: string
    iconUrl: string | null
    content: string
    isActive: boolean
}