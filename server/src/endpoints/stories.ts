import {OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {StoryData} from "common/models/StoryData";
import {TrackBearResponse} from "common/models/TrackBearResponse";
import {useTrackBearApi} from "@/composables/useTrackBearApi";

export class Stories extends OpenAPIRoute {
    async handle(c: AppContext) {
        const {sendRequest} = useTrackBearApi(c.env.TRACKBEAR_API_KEY);

        const response: TrackBearResponse<StoryData[]> = await sendRequest<StoryData[]>('/project');

        if(response.data) {
            response.data = response.data.filter(story => story.displayOnProfile);
        }

        return c.json(response);
    }
}