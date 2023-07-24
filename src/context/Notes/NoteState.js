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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZTVjZGVhZWIxOGYzMDFiNmQ4MDRhIn0sImlhdCI6MTY5MDE5NzIxNH0.jsAzL8FCJzUMP5kDXo9ahzvmJCAQxe0VRooZbQPI7cw"
      }
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    // Api call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZTVjZGVhZWIxOGYzMDFiNmQ4MDRhIn0sImlhdCI6MTY5MDE5NzIxNH0.jsAzL8FCJzUMP5kDXo9ahzvmJCAQxe0VRooZbQPI7cw"
        },
        body: JSON.stringify({ title, description, tag }),
      });
      // const json =  response.json();
   
    const note = {
      "_id": "64bab17a9b68ewc4c92fl8a809",
      "user": "64b8fffd77c5a1bd2a028bb9",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-07-21T16:25:30.451Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  //Delete a note
  const deleteNote = async (id) => {
     // Api call
     const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZTVjZGVhZWIxOGYzMDFiNmQ4MDRhIn0sImlhdCI6MTY5MDE5NzIxNH0.jsAzL8FCJzUMP5kDXo9ahzvmJCAQxe0VRooZbQPI7cw"
      }
    });
    const json = response.json();
    console.log(json)
    const NewNote = notes.filter((note) => { return note._id !== id })
    setNotes(NewNote)
    console.log("Note has been deleted Successfully!", id)
  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZTVjZGVhZWIxOGYzMDFiNmQ4MDRhIn0sImlhdCI6MTY5MDE5NzIxNH0.jsAzL8FCJzUMP5kDXo9ahzvmJCAQxe0VRooZbQPI7cw"
        },
        body: JSON.stringify({title , description, tag}),
      });
      const json = response.json();
   


    //Edit the notes at client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag
      }

    }

  }
  return (
    <NoteContext.Provider value={{notes,getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )


}

export default NoteState;