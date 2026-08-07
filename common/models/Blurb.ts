export interface Blurb {
    key: string
    name: string
    type: string
    icon?: string
    links?: {url: string, label: string}[]
    content: string
}