const User = require("../models/User.model")

const { buildErrorMessage } = require("vite");

const router = require("express").Router();
const bcrypt = require("bcryptjs")

// POST "/api/auth/signup" -> creat the doc of the user
router.post("/signup", async(req, res, next) => {
    console.log(req.body)
    const { username, email, password } = req.body
    
    //3 properties are mandatory
    if(!username || !email || !password) {
        res.status(400).json({errorMessage: "all properties are mandatory"})
        return;
    }
    //password strong
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g
    if (passwordRegex.test(password) === false) {
        res.status(400).json({errorMessage: "password needs 1 uppercase, 1 lowercase, 1 number and 8 characters"})
        return;
    }

    
    
    
    

    try {
        //email should be unique
        const foundUser = await User.findOne({email: email})
        if (foundUser) {
            res.status(400).json({errorMessage: "this email is already used"})
            return;
        }

        //hash the password
        const hashPassword = await bcrypt.hash(password, 12)


        await User.create({
            username: username,
            email: email,
            password: hashPassword
            
        })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
    
    
})


//POST "/api/auth/login" -> to login and send the tken


// GET "/api/auth/verify" -> indicate to the client who the user is



module.exports = router