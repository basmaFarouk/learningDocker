const express=require('express');
// const mongoose= require('mongoose');
const {Client} = require('pg');
const redis=require('redis');

//init app
const PORT=4000;
const app=express();

//connect to redis
const REDIS_PORT=6379;
const REDIS_HOST='redis';
const redisClient= redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to redis ....'));
redisClient.connect();



//connect postgres db
const DB_USER='root';
const DB_PASSWORD='example';
const DB_PORT=5432;
const DB_HOST="postgres";

const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
    connectionString:URI,
  })
client.connect().then(()=>console.log('connect to postgres...')).catch((err) => console.log('failed',err));



//connect mongo db
// const DB_USER='root';
// const DB_PASSWORD='example';
// const DB_PORT=27017;
// const DB_HOST="mongo";

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose.connect(URI).then(()=>console.log('connect to monogo ....')).catch((err) => console.log('failed',err));

app.get('/',(req,res) =>{
    redisClient.set('products','products....')
    res.send('<h1> Hello hi dev</h1>')
});

app.get('/data',async (req,res) =>{
    const products= await redisClient.get('products');
    res.send(`<h1> Hello hi dev</h1> <h2>${products}</h2>`)
});

app.listen(PORT,() => console.log(`app is running on port: `+PORT)); 

// docker run  -v $(D:\nti\node-app):/app  -d -p 4000:4000 --name=express-node-app-container express-node-app 