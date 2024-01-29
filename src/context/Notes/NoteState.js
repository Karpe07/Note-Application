import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get all Notes
  const getNotes = async () => {
    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    // Api call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
       setNotes(notes.concat(note))
  }
  //Delete a note
  const deleteNote = async (id) => {
     // Api call
     const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    const NewNote = notes.filter((note) => { return note._id !== id })
    setNotes(NewNote)
    console.log("Note has been deleted Successfully!", id)
  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title , description, tag}),
      });
      const json = response.json();
   

      let newNotes = JSON.parse(JSON.stringify(notes))
    //Edit the notes at client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)

  }
  return (
    <NoteContext.Provider value={{notes,getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )


}

export default NoteState;