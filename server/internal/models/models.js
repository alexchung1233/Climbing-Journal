import { ObjectId } from "mongodb"
import  { Schema, model } from "mongoose"


const logSchema = new Schema(
    {
        userId: ObjectId,
        notes: String,
        views: Number,
        climbs: Array,
        createdAt: Date,
        updatedAt: Date,
    }
)


const userSchema  = new Schema(
    {
        firstName: String,
        lastName: String,
        username: String,
        email: String,
        logs: [{
            _id: ObjectId,
            createdAt: Number
        }],
        authId: String,
        createdAt: Date
    }
)

const Log = model('Log', logSchema);
const User = model('User', userSchema);

export {Log, User};