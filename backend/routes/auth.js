import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import User from '../models/Users.js';
import fetchuser from '../middleware/fetchuser.js';
import { body, validationResult } from 'express-validator';;
import { json } from 'react-router-dom';




// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/Users') // imported the Users.js file
// const fetchuser = require('../middleware/fetchuser');
// const { body, validationResult } = require('express-validator'); //import express validator 
// const { json } = require('react-router-dom');

const router = express.Router();

const JWT_SECRETE = "Akashisgoodboy"

// Route 1 : Create a User using: POST "/api/auth/createUser". Doesn't require auth
router.post('/createUser', [
  body('name').isLength({ min: 2 }),
  body('email').isEmail().withMessage('Not a valid e-mail address'),
  body('password').isLength({ min: 5 })
], async (req, res) => {
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
})


// Route 2: Create a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter the valid email').isEmail(),
  body('password', "Password cannot be blank").exists()
], async (req, res) => {
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
})

// Route 3: Create a User using: POST "/api/auth/getuser".login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal error Ocuured")
  }
})
// module.exports = router
export default router



