import express from 'express';
import User from '../model/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'


const router = express.Router();    

//REGISTER user
router.post('/register', async(req, res)=> {
    //check if user already exist
    //const existingUser = User.findOne({email: req.body.email});

    // if(existingUser){
    //     return res.status(400).send('That user already exist!')
    // }else{


        
    // }


    //create user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    })

    //save user into db using promise

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }


})


//LOGIN

router.post("/login", async(req, res)=> {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong credentials!")
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && 
        res.status(401).json("Wrong credentials");

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY,
            {expiresIn: "3d"}
            )

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken})
    } catch (error) {
        console.log(error)
    }
})

export default router;