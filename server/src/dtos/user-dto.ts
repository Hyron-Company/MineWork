import mongoose from  'mongoose'

export default class UserDto {
    declare id : mongoose.Types.ObjectId;
    declare email: string;
    declare password: string;
}