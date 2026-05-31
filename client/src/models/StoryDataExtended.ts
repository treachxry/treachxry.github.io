import {StoryData} from "common/models/StoryData";

export interface StoryDataExtended extends StoryData {
    progress: string
    link?: string
    tags: string[]
}