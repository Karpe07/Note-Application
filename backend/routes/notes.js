const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes') // imported the Notes.js file
const { body, validationResult } = require('express-validator'); //import express validator 


// Route 1 : Get all notes: Get "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal error occured")
      }
})

// Route 2 : Add notes: POST "/api/notes/addnotes". Login required
router.post('/addnotes', fetchuser, [
    body('title', "Enter the valid title").isLength({ min: 2 }),
    body('description', "Description must be atleast 5 character").isLength({ min: 5 })
], async (req, res) => {
 
    try {
        const {title , description ,tag} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title , description , tag , user : req.user.id
        })
        const savedNotes = await note.save()
        res.json(savedNotes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal error occured")
      }

// Route 3 : Update notes : POST "/api/notes/updatenote". Login required
      router.put('/updatenotes/:id',fetchuser, async (req,res) =>{
        //Destructring the notes
        const {title , description , tag} = req.body
        try {
             //creating a new note
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //find the note to updated and update it
        let note = await Notes.findById(req.params.id)
        if(!note){
           return res.status(404).send("Not Found")
        }
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new : true});
        res.json(note)
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal error occured")
          }
       
      })

      // Route 4 : Delete the existing note : delete "/api/notes/deletenotes". Login required
      router.delete('/deletenotes/:id',fetchuser, async (req,res) =>{   
        try {
            //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        // if(!note){
        //    return res.status(404).send("Not Found")
        // }
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        // res.json({note : note})
        res.json({'success' : "Note has been deleted successfully!" , note : note})
        return;
            
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal error occured")
          }
        
      })

})

module.exports = router