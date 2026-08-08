export interface StoryDbModel {
    id: number
    tbID: number
    title: string
    summary: string
    phase: string
    wordCount: number
    lastUpdated: number
    url: string | null
}

export interface StoryViewModel extends StoryDbModel {
    tags: string[]
}