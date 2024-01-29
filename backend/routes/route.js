import express from 'express'
import { LoginUser, createUser, getUser } from '../Controller/User.js'
import { body } from 'express-validator'
import fetchuser from '../middleware/fetchuser.js'
import { AddNote, DeleteNote, FetchNotes, UpdateNote } from '../Controller/Note.js'

const route = express.Router()

// User Specific Routers 

route.post('/createUser', [
    body('name').isLength({ min: 2 }),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password').isLength({ min: 5 })
  ], createUser)

route.post('/login', [
    body('email', 'Enter the valid email').isEmail(),
    body('password' , "Password cannot be blank").exists()
  ], LoginUser)  

route.post('/getuser', fetchuser, getUser) 


// Notes Specific Routers

route.get('/fetchallnotes', fetchuser, FetchNotes);

route.post('/addnotes', fetchuser, [
    body('title', "Enter the valid title").isLength({ min: 2 }),
    body('description', "Description must be atleast 5 character").isLength({ min: 5 })
], AddNote)

route.put('/updatenotes/:id',fetchuser, UpdateNote);

route.delete('/deletenotes/:id',fetchuser, DeleteNote)


export default route;