import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {User, Log} from './internal/models/models.js';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())

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
    es.setHeader('Content-Type', 'application/json');
    res.send({"logs": logs})
});


app.get("/check", async(req, res) => {
    res.send("hello world");
})

app.get("/user/auth_user/:authId", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PATCH,GET,POST,DELETE")
    res.setHeader('Content-Type', 'application/json');
    var authId = req.params["authId"];
    console.log("Hitting GET endpoint for user %s");
    console.log(authId);
    const user = await User.findOne({authId: authId});
    if(!user){
        return res.status(404).send("Could not find user");
    }A
    res.status(200).send(user);

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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');


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

/**
 * Handles webhooks from clerk for user management
 *  */
app.post("/webhooks", async(req, res) =>{
    console.log("Received webhooks %s", req.body);

    
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
      throw new Error('You need a WEBHOOK_SECRET in your .env')
    }

    // Get the headers and body
    const headers = req.headers
    const payload = req.body;

    // Get the Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400,
      })
    }
    console.log(headers)
    console.log(typeof(payload))

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt
    const verification_payload = Buffer.from(JSON.stringify(payload))
    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
    try {
      evt = wh.verify(verification_payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      })
    } catch (err) {
      console.log('Error verifying webhook:', err.message)
      return res.status(400).json({
        success: false,
        message: err.message,
      })
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', evt.data)

    if(evt.type === 'user.created'){
        await handle_user_created_webhook(evt.data);
    }

    return res.status(200).json({
      success: true,
      message: 'Webhook received',
    })
})

/**
 * Handle webhook event for user created
 * @param {*} payload 
 */
async function handle_user_created_webhook(payload){
    console.log(payload);
    const user = await User.create({
        "firstName": payload.first_name,
        "lastName": payload.last_name,
        "username": payload.username,
        "email": payload.email_addresses[0].email_address,
        "authId": payload.id
    });
    console.log("User successfully created on db %s", user);
}


app.use(cors());
console.log("Connecting to Mongodb: %s", DB_URI)
app.listen(port, ()=>{console.log('Listening on port %d', port)});