import Notes from "../models/Notes.js";
import { validationResult } from "express-validator";


export const FetchNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal error occured")
    }
}

export const AddNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save()
        res.json(savedNotes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal error occured")
    }
}

export const UpdateNote = async (req, res) => {
    //Destructring the notes
    const { title, description, tag } = req.body
    try {
        //creating a new note
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find the note to updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal error occured")
    }
}

export const DeleteNote = async (req, res) => {
    try {
        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        // if(!note){
        //    return res.status(404).send("Not Found")
        // }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        // res.json({note : note})
        res.json({ 'success': "Note has been deleted successfully!", note: note })
        return;

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal error occured")
    }
}