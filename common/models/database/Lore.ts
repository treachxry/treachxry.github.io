export interface LoreDbModel {
    id: number
    key: string
    name: string
    type: string
    iconUrl?: string
    content: string
}

export interface LoreViewModel extends LoreDbModel {
    links?: {url: string, label: string}[]
}