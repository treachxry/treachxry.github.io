import {DbModel} from "../DbModel";

export interface SyncDbModel extends DbModel {
    key: string
    lastSuccess: number
    lastAttempt: number
    error?: string
    interval?: number
    isActive: boolean
}