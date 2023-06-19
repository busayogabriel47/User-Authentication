import express from 'express';
import Product from "../model/product.js"
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from './verifyToken.js';
import Cart from '../model/Cart.js';


const router = express.Router();

//CREATE CART

router.post('/', verifyToken, async(req, res)=> {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error.message)
    }
})


//UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async(req, res)=> {
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true});
        res.status(200).json(updatedCart)
    }catch (err) { 
        res.status(500).json(err.message)
    }
});


//DELETE CART

router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=> {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted!");
    } catch (error) {
        res.status(500).json(error.message)
    }
})


//GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res)=> {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error.message)
    }
})


//GET ALL 

router.get('/', verifyTokenAndAdmin, async(req, res)=> {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(err.message)
    }
})

// router.get("/stats", verifyTokenAndAdmin, async(req, res)=> {
//         const date = new Date();
//         const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

//         try{
//             const data = await User.aggregate([
//                 {$match: {createdAt: {$gte: lastYear}}},
//                 {$project: {
//                     month: {$month: "$createdAt"},
//                 }},

//                 {$group:{
//                     _id: "$month",
//                     total:{$sum: 1}
//                 }}

//             ])
//             res.status(200).json(data);
//         }catch(err){
//             res.status(500).json(err.message)
//         }
// })



export default router;

