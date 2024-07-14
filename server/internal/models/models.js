import { ObjectId } from "mongodb"
import  { Schema, model } from "mongoose"


const logSchema = new Schema(
    {
        userId: ObjectId,
        climbs: [{
            _id: ObjectId,
        }],

        notes: String,
        views: Number,
        highestGrade: String,
        createdAt: Number,
        updatedAt: Number,
    }
)

const climbSchema = new Schema(
    {
        grade: String,
        attempts: Number,
        name: String,
    }
)

const userSchema  = new Schema(
    {
        name: String,
        email: String,
        logs: [{
            _id: ObjectId,
            createdAt: Number
        }],
        password: String,
    }
)

const Log = model('Log', logSchema);
const Climb = model('Climb', climbSchema);
const User = model('User', userSchema);

export {Log, Climb, User};