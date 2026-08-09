export interface UserDbModel {
    id: number
    username: string
    passwordHash: string
    passwordSalt: string
    isAdmin: boolean
    isActive: boolean
}