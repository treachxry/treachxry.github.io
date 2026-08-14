import {DbModel} from "../DbModel";

export interface UserDbModel extends DbModel {
    username: string
    passwordHash: string
    passwordSalt: string
    isAdmin: boolean
    isActive: boolean
}