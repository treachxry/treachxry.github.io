import {StoryDbModel} from "./StoryDbModel";

export interface StoryViewModel extends StoryDbModel {
    tags: string[]
}