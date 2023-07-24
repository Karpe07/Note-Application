import React, { useContext, useEffect } from 'react';
import noteContext from '../context/Notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

function Notes() {
  const context = useContext(noteContext)
  const {notes , getNotes} = context
  useEffect(() => {
    getNotes();
  }, [])
  
  return (
    <>
      <AddNote />
      <div className="row my -3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          // console.log(Array.isArray(note)); // Check if notes is an array
          return <Noteitem key={note._id} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes