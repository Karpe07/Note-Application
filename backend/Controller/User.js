import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import fetchuser from "../middleware/fetchuser.js";
import { validationResult } from "express-validator";


const JWT_SECRETE = "Akashisgoodboy"



export const createUser = async (req, res) => {
    // If there are errors, then send bad requests 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {


        // create whether the email is already exist
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "This Email adress is already exist, please enter the vaild one" })
        }
        // Create a new user

        const salt = await bcrypt.genSaltSync(10);
        const securePass = await bcrypt.hashSync(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRETE);

        res.json({ authtoken })
    } catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }
}

export const LoginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let success = false
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please enter the valid credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please enter the valid credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRETE);
        success = true
        res.json({ success, authtoken })


    } catch (error) {
        console.log(error)
        res.status(500).send("Internal error occured")
    }
}

export const getUser = async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal error Ocuured")
    }
}