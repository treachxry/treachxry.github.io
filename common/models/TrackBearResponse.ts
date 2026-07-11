import {ErrorMessage} from "common/models/ErrorMessage";

export interface TrackBearResponse<T> {
    success: boolean
    error?: ErrorMessage
    data?: T
}