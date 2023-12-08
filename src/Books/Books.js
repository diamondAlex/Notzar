// page will display every half hour of a day with space to take notes 
//TODO :  - Update notes

import React, { useState } from 'react';
import Entry from './Entry'

let url = "http://localhost:8080/"

export default function Books(props){
    const [ books, setBooks ] = useState([]) 
    const [ notes, setNotes ] = useState([])

    function removeNote(noteToRemove){
        fetch(url+"removenote",{
            method: 'POST',
            body: JSON.stringify({id:noteToRemove})
        })
        .then((data) =>{
        })
    }

    function updateNote(updatedNote){
        var notes = notes
        var note = notes.filter((note) => note.id == updatedNote.id)[0]
        note.title = updatedNote.title
        note.subjects = updatedNote.subjects
        note.note = updatedNote.note
        setNotes(notes)
    }

    function filterForBooks(){
        var booksArray = []
        notes.forEach((note) => {
            booksArray.push(note.book)
        })
        setBooks(booksArray)
    }
    
    function getNotes(){
        fetch(url+"getnotes",{
            method: 'GET',
        })
        .then((data) =>{
        })
    }
    
    //will add this once the server is done
    //getNotes()

    function addNote(title,note,subjects,book){
        fetch(url+"addNote",{
            method: 'POST',
            body: JSON.stringify({
                title:title,
                note:note,
                subjects:subjects,
                book:book
            })
        })
        .then((data) =>{
        })
    }

    return(
        <div>            
        <div>
        <Entry  
        removeNote={removeNote} 
        updateNote={updateNote} 
        addNote={addNote} 
        books={books} 
        notes={notes}/>
        </div>
        </div>
    )
}
