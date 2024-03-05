const express = require('express')
const app = express();
const cors = require('cors');
const Mode = require('./Model');
const postModel = require('./postModel')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('./crypt');
require('dotenv').config();
const uri = process.env.uri;
const auth = require('./auth');
app.use(cors());
app.use(express.json());
// Signup/POST API route controller
app.post('/signup', async (req, res)=>{
    const obj = req.body;
    //bcrypt adding salt & pepper
    obj.password = await bcrypt.hashPassword(obj.password);
    console.log(obj.password);
    mongoose.connect(uri);
    const user = new Mode(obj);
    try{
        const savedUser = await user.save();
        console.log(savedUser);
        const token = auth.setUser(savedUser);
        res.json(token)
    }
    catch(error){
        console.log('error occured');
    }
})

// Posts/GET API route controller
app.get('/posts', async (req, res)=>{
    const { MongoClient } = require('mongodb');
    console.log(req.query);
    const page = parseInt(req.query.page) || 1; // Current page number, default is 1
    const limit = 10;
// Connection URI
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database and collection
        const database = client.db('posts');
        const collection = database.collection('posts');

        // Fetch data from the collection
        const cursor = collection.find({});
        const result = await cursor.toArray();
        res.json(result);
     //   console.log('Fetched data:', result);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // Close the connection
        await client.close();
        console.log('Disconnected from MongoDB');
    }

})

app.get('/', (req, res)=>{
    res.send('server is up & running');
})
app.listen(3001, ()=>{
    console.log(`server is listening in port 3001`);
});
