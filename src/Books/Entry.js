// page will be kept at handling entries of books
// So, basically, we make books, enter entries in it. That's it. 
// needs to be split on more than one component
//TODO : 
import React, { useState } from 'react';

export default function Entry(props){
    const [ title, setTitle ] = useState("")
    const [ note, setNote ] = useState("")
    const [ subjects, setSubjects ] = useState("")
    const [ book, setBook ] = useState("")
    const [ selectedNote, setSelectedNote ] = useState({})
    const [ filteredNotes, setFilteredNotes ] = useState([])
    //const [ subject, setSubject ] = useState("")
    //const [ selectedBook, setSelectedBook ] = useState("")

    function removeNote(){
        props.removeNote(selectedNote.id)
        setSelectedNote("")
        clearData()
    }

    //could have a way to go back to previously saved note  If you were writing a note before
    function displayNote(){
        setTitle(selectedNote.title)
        setNote(selectedNote.note)
        setSubjects(selectedNote.subjects)
        setBook(selectedNote.boo)
    }

    function clearData(){
        setTitle("")
        setNote("")
        setSubjects("")
        setBook('')
    }

    function filter(){
        var filtered = props.notes.filter((note) => note.book === selectedBook)
        setFilteredNotes(filtered)
    }

    function handleClick(){
        if(note == '' || title == '' || subjects == ''){
            alert('plz enter a note, a title and a subject before submitting')
        }
        else if(props.notes.filter((note)=>note.title==title).length != 0){
            selectedNote.title = title
            selectedNote.subjects = subjects
            selectedNote.note = note
            props.updateNote(selectedNote)
            return
        }
        props.addNote(title,note,subjects,book) 
    }

    function handleChange(event){
    }

    return(
        <div>
            <div style={{display:'inline-block',float:'left', width:'75%'}}>
                Title : <textarea rows="1" cols="40" name='title' value={title} onChange={handleChange} /><br/>
                Entry : <textarea rows="15" cols="80" name='note' value={note} onChange={handleChange} /><br/>
                Subjects :<textarea rows="1" cols="50" name='subjects' value={subjects} onChange={handleChange} />
                <br/>
                <br/>
                <div onChange={setBook}>
                Existing Books : 
                        <div>
                            <select name="book" value={book}> 
                                <option/>
                                {props.books != null ? props.books.map((value) => <option>{value}</option>):""}
                            </select>
                            <br/>
                        </div>
                Add Book : <textarea rows="1" cols="25" name='book' value={book} onChange={handleChange} />
                </div>
                <br/>
                <button onClick={handleClick} > Submit </button>
                <button onClick={clearData} > Clear </button>
                <button onClick={removeNote} > Delete </button>
                <br/>
                <br/>
            </div>
            <div style={{float:'left'}}>
                In book =
                <select name="selectedBook" onChange={handleChange}> 
                    <option/>
                    {props.books.map((book) => {
                        return(<option> {book} </option>)
                    })}
                </select>
                <select value={selectedNote.id} name="selectedNote" onChange={handleChange}>
                    <option value=""/>
                    {filteredNotes.map((note) => {
                        return(<option value={note.id}> {note.id}-{note.title} </option>)
                    })}
                </select>
                <br/>
            </div>
        </div>
    )
}
