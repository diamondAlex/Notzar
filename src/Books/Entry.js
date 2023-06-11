// This page will be kept at handling entries of books
// So, basically, we make books, enter entries in it. That's it. 
// This needs to be split on more than one component
//TODO : 
import React, { Component } from 'react';

class Entry extends Component {
    constructor(props){
        super(props)
        this.state = {
            title:"",
            note:"",
            subjects:"",
            book:"",
            selectedBook:"",
            selectedNote:{},
            subject:"",
            filteredNotes:[],
        }
        this.handleClick = this.handleClick.bind(this)    
        this.handleChange = this.handleChange.bind(this)    
        this.clearData = this.clearData.bind(this)
        this.filter = this.filter.bind(this)
        this.displayNote = this.displayNote.bind(this)
        this.removeNote = this.removeNote.bind(this)
    }

    removeNote(e){
        let id = this.state.selectedNote.id
        console.log("removing " + id)
        this.props.removeNote(id)
        this.setState({selectedNote:""})
        this.clearData()
    }

    //could have a way to go back to previously saved note state. If you were writing a note before
    displayNote(){
        var note = this.state.selectedNote
        this.setState({
            title:note.title,
            note:note.note,
            subjects:note.subjects,
            book:note.book
        })
    }

    clearData(){
        this.setState({
            title:"",
            note:"",
            subjects:"",
            book:''
        })
    }

    filter(){
        var filtered = this.props.notes.filter((note) => note.book === this.state.selectedBook)
        this.setState({filteredNotes:filtered})
    }

    setBook(e){
        this.setState({book:e.target.value})
    }

    handleClick(){
        if(this.state.note == ''){
            alert('plz enter a note before submitting')
        }
        else if(this.state.title == ''){
            alert('plz enter a title before submitting')
        }
        else if(this.state.subjects == ''){
            alert('plz enter subjects before submitting')
        }
        else if(this.props.notes.filter((note)=>note.title==this.state.title).length != 0){
            var selectedNote = this.state.selectedNote
            selectedNote.title = this.state.title
            selectedNote.subjects = this.state.subjects
            selectedNote.note = this.state.note
            this.props.updateNote(selectedNote)
            return
        }
        this.props.addNote(this.state.title,this.state.note,this.state.subjects,this.state.book) 
    }

    handleChange(event){
        //This is all pretty trash
        var name = event.target.name
        var value = event.target.value
        this.setState({[name]:value},() => {
            if(name === "selectedBook"){
                this.filter()
            }
            else if(name === "selectedNote"){
                var note = this.props.notes.filter((note) => note.id == value)[0]
                this.setState({selectedNote:note}, () => {
                    this.displayNote()
                })
            }
        })
    }

    render(){
        return(
            <div>
                <div style={{display:'inline-block',float:'left', width:'75%'}}>
                    Title : <textarea rows="1" cols="40" name='title' value={this.state.title} onChange={this.handleChange} /><br/>
                    Entry : <textarea rows="15" cols="80" name='note' value={this.state.note} onChange={this.handleChange} /><br/>
                    Subjects :<textarea rows="1" cols="50" name='subjects' value={this.state.subjects} onChange={this.handleChange} />
                    <br/>
                    <br/>
                    <div onChange={this.setBook.bind(this)}>
                    Existing Books : 
                            <div>
                                <select name="book" value={this.state.book}> 
                                    <option/>
                                    {this.props.books != null ? this.props.books.map((value) => <option>{value}</option>):""}
                                </select>
                                <br/>
                            </div>
                    Add Book : <textarea rows="1" cols="25" name='book' value={this.state.book} onChange={this.handleChange} />
                    </div>
                    <br/>
                    <button onClick={this.handleClick} > Submit </button>
                    <button onClick={this.clearData} > Clear </button>
                    <button onClick={this.removeNote} > Delete </button>
                    <br/>
                    <br/>
                </div>
                <div style={{float:'left'}}>
                    In book =
                    <select name="selectedBook" onChange={this.handleChange}> 
                        <option/>
                        {this.props.books.map((book) => {
                            return(<option> {book} </option>)
                        })}
                    </select>
                    <select value={this.state.selectedNote.id} name="selectedNote" onChange={this.handleChange}>
                        <option value=""/>
                        {this.state.filteredNotes.map((note) => {
                            return(<option value={note.id}> {note.id}-{note.title} </option>)
                        })}
                    </select>
                    <br/>
                </div>
            </div>
        )
    } 
}
export default Entry;
