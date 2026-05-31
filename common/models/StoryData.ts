import {StoryTotals} from "./StoryTotals";

export interface StoryData {
    id: number
    uuid: string
    createdAt: string
    updatedAt: string
    state: string
    ownerId: number
    title: string
    description: string
    phase: string
    startingBalance: StoryTotals
    cover: string | null
    starred: boolean
    displayOnProfile: boolean
    totals: StoryTotals
    lastUpdated: string | null
}