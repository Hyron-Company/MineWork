import { IUser } from "../../models/user-model";
import mongoose from  'mongoose'

export interface IUserDto {
    id: mongoose.Types.ObjectId
    email: string,
    password: string
}


export const UserDto = (model : IUser) : IUserDto => {
    return {
        id: model._id as mongoose.Types.ObjectId,
        email: model.email as string,
        password: model.password as string
    }
}