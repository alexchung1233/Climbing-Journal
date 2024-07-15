import express from 'express';
import mongoose from 'mongoose';
import {User, Log} from './internal/models/models.js';

const app = express();
app.use(express.json())
const port = process.env.PORT || 5000;
const URI = "mongodb://localhost:27017"
mongoose.connect(URI);


app.get("/user/:userId/logs", async (req, res) => {
    var userId = req.params["userId"]
    console.log("Hitting GET endpoint for user %s")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const user = await User.findById(userId);
    const logIds = user.logs.map((x)=>x["_id"])
    console.log(logIds)
    const logs = await Log.find({_id: {$in: logIds}})
    console.log(logs)
    res.setHeader('Content-Type', 'application/json');
    res.send({"logs": logs})
});

app.post("/user/:userId/log", async (req, res) => {
    console.log("Creating new log for user %s");
    var userId = req.params.userId || null;
    var notes = req.body.notes || null;
    var createdAt = Date.now();
    var updatedAt = Date.now();
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

app.post("/user", async (req, res) => {
    console.log("Creating new user")
    var name = req.body.name || null
    var email = req.body.email || null
    var password = req.body.password || null

    if(!(name && email && password)){
        console.error("Must include name, email, and password")
        return res.status(400).send("Must include name, email and password for new user")
    }
    2
    const user = await User.create({
        "name": name,
        "email": email,
        "password": password
    })

    console.log("New user created %s", user)
    res.status(201).send(user)
});

app.get("/users", async (req, res) => {
    console.log("Getting all users")
    const users = await User.find();
    console.log(users);
    res.json(users);
})



app.listen(port, ()=>{console.log('Listening on port %d', port)});