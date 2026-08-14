import {DbModel} from "../DbModel";

export interface StoryDbModel extends DbModel {
    tbID: number
    title: string
    summary: string
    phase: string
    wordCount: number
    lastUpdated: number
    url: string | null
    isActive: boolean
}
