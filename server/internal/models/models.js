import { ObjectId } from "mongodb"
import  { Schema, model } from "mongoose"


const logSchema = new Schema(
    {
        userId: ObjectId,
        notes: String,
        views: Number,
        climbs: [{_id: ObjectId}],
        createdAt: Date,
        updatedAt: Date,
    }
)

const climbSchema = new Schema(
    {
        logId: ObjectId,
        grade: String,
        attempts: Number,
        description: String,
        name: String,
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
const Climb = model('Climb', climbSchema);
const User = model('User', userSchema);

export {Log, Climb, User};