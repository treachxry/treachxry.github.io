export interface StoryDbModel {
    id: number
    title: string
    summary: string
    phase: string
    wordCount: number
    lastUpdated: number
    url: string
}

export interface StoryViewModel extends StoryDbModel {}