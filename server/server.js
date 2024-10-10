import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {User, Log} from './internal/models/models.js';

const app = express();
app.use(express.json())

const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost:27017"
const DB_NAME = "myclimbingjournal"
const DB_URI = MONGODB_URI + "/" + DB_NAME

// If mongoose failure then catch
mongoose.connect(DB_URI);

/**
 * Updates logs by userId
 */
app.patch("/user/:userId/log/:logId", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PATCH,GET,POST,DELETE")
    res.setHeader('Content-Type', 'application/json');
    console.log("Hitting PATCH for log")
    var userId = req.params["userId"];
    var logId = req.params["logId"];
    // Verify that the logId is contained in the userID

    const log = await Log.findByIdAndUpdate(logId, req.body);

    res.status(200).send(log)
})


/**
 * Gets logs by userId
 */
app.get("/user/:userId/logs", async (req, res) => {
    var userId = req.params["userId"];
    console.log("Hitting GET endpoint for user %s");


    // Default values for arg params
    var startDate = new Date();
    startDate.setDate(startDate.getDate()-14);
    var endDate = new Date()
    if(req.query.start_date){
        console.log(`Start date ${req.query.start_date}`)
        startDate = new Date(req.query.start_date);
    }
    if(req.query.end_date){
        endDate = new Date(req.query.end_date);
    }
    
    const user = await User.findById(userId);

    if(user === null){
        return res.status(404).send("Unable to find user associated with id")
    }

    const logIds = user.logs.map((x)=>x["_id"]);
    
    const logsQuery = {
        $and: [
            {_id: {$in: logIds}},
            {createdAt: {$gte: startDate, $lte: endDate}}
            ]
        }
    const logs = await Log.find(
            logsQuery
    ).sort({createdAt: 1})
    console.log(logs)

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    res.send({"logs": logs})
});

/**
 * Creates a new log by userId
 */

app.post("/user/:userId/log", async (req, res) => {
    console.log("Creating new log for user %s");
    var userId = req.params.userId || null;
    var notes = req.body.notes || null;
    var createdAt = new Date();
    var updatedAt = new Date();
    if(req.body.createdAt) {
        createdAt = new Date(req.body.createdAt);
    }
    if(req.body.updatedAt) {
        updatedAt = new Date(req.body.updatedAt);
    }
    var views = 0
    var highestGrade = req.body.highestGrade || null

    if(!userId){
        console.error("Must include userId")
        return res.status(400).send("Must include userId")
    }
    // Check if a log already exists for a given day
    const log = await Log.create({
        "userId": userId,
        "notes": notes,
        "createdAt": createdAt,
        "updatedAt": updatedAt,
        "views": views,
        "highestGrade": highestGrade
    });

    const user = await User.findById(userId)
    user.logs.push({_id: log._id, createdAt: createdAt})
    user.save()
    console.log("User updated %s", user)


    console.log("New Log created %s", log)
    res.status(201).send(log)
});


/**
 * Creates a new user
 */
app.post("/user", async (req, res) => {
    console.log("Creating new user")
    var name = req.body.name || null
    var email = req.body.email || null
    var password = req.body.password || null

    if(!(name && email && password)){
        console.error("Must include name, email, and password")
        return res.status(400).send("Must include name, email and password forgit  new user")
    }
    const user = await User.create({
        "name": name,
        "email": email,
        "password": password
    })

    console.log("New user created %s", user)
    res.status(201).send(user)
});


/**
 * Gets users
 */
app.get("/users", async (req, res) => {
    console.log("Getting all users")
    const users = await User.find();
    console.log(users);
    res.json(users);
})


/**
 * Healtcheck endpoint
 */
app.get("/", async (_, res) => {
    console.log("Healthcheck endpoint")
    res.json({"healthcheck": true})
})


app.use(cors());
console.log("Connecting to Mongodb: %s", DB_URI)
app.listen(port, ()=>{console.log('Listening on port %d', port)});