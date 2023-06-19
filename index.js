import express from "express";
import mongoose from "mongoose";
import env from 'dotenv'
import authRoute from './routes/auth.js';
import user from "./routes/user.js";
import product from "./routes/product.js"
import order from "./routes/order.js";
import cart from "./routes/cart.js"
import stripeRoute from './routes/stripe.js'

import cors from 'cors';



env.config()

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoute);
app.use('/api/users', user)
app.use('/api/products', product);
app.use('/api/orders', order)
app.use('/api/carts', cart );
app.use('/api/checkout', stripeRoute);



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

export default app;