// This page will display every half hour of a day with space to take notes 
//TODO :  - Update notes

import React, { Component } from 'react';
import Entry from './Entry'

let url = "http://localhost:8080/"


class Books extends Component {
    constructor(props){
        super(props)
        this.state = {
            books:[], 
            notes:[],
            test:"testing"
        }
        this.getNotes = this.getNotes.bind(this)
        this.addNote = this.addNote.bind(this)
        this.updateNote = this.updateNote.bind(this)
        this.removeNote = this.removeNote.bind(this)
        this.filterForBooks = this.filterForBooks.bind(this)
        this.getNotes()
    }

    removeNote(noteToRemove){
        fetch(url+"removenote",{
            method: 'POST',
            body: JSON.stringify({id:noteToRemove})
        })
        .then((data) =>{
            console.log(data)
        })
    }

    updateNote(updatedNote){
        var notes = this.state.notes
        var note = notes.filter((note) => note.id == updatedNote.id)[0]
        note.title = updatedNote.title
        note.subjects = updatedNote.subjects
        note.note = updatedNote.note
        this.setState({notes:notes})
    }

    filterForBooks(){
        var booksArray = []
        this.state.notes.forEach((note) => {
            booksArray.push(note.book)
        })
        this.setState({books:booksArray})
    }
    
    getNotes(){
        fetch(url+"getnotes",{
            method: 'GET',
        })
        .then((data) =>{
            console.log(data)
        })
    }
    
    addNote(title,note,subjects,book){
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
            console.log(data)
        })
    }

    render(){
        return(
            <div>            
                <div>
                    <Entry  
                        removeNote={this.removeNote} 
                        updateNote={this.updateNote} 
                        addNote={this.addNote} 
                        books={this.state.books} 
                        notes={this.state.notes}/>
                </div>
            </div>
        )
    } 
}

export default Books;
