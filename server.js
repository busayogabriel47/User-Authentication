import express from "express";
import mongoose from "mongoose";
import env from 'dotenv'
import authRoute from './routes/auth.js';

import cors from 'cors';


env.config()

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoute);


//Second step: connect server to mongoDB using connection
//string
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB Connection Successfull"))
.catch((err)=> {
    console.log(err);
})


app.listen(process.env.PORT || 5000, ()=> {
    console.log("Server running on port 5000")
})