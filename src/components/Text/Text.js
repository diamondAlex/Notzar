//TODO - adding item when clicking enter
import React, { useState } from 'react'

//the naming in this has to be rethought, even the component name (Text) is sussy
export default function Text(props){
    const [content, setContent] = useState("")
    const [editIndex, setEditIndex] = useState(-1)
    let todos = props.text
    let setTodos = props.setText

    function handleChange(e){
        setContent(e.target.value)
    }

    function submit(){
        if(content)
            setTodos([...todos, content])
        setContent("")
    }

    function removeItem(e){
        let updatedState = todos.filter((todo,i) => i != e.target.id)
        setTodos(updatedState)
    }

    function editItem(e){
        let id = (e.target.id).split("_")[1]
        setEditIndex(id)
    }

    function editVal(e){
        let updatedState = todos.map((val,i) => i == editIndex ? e.target.value : val)
        setTodos(updatedState)
    }

    function confirmEdit(){
        setEditIndex(-1)
    }

    return (
        <div>
            <p className='text-2xl'> {props.name} </p>
            <div className='h-8 inline-flex my-4'> 
                <textarea className="border-2 rounded-md" placeholder='enter text here' value={content} onChange={(e) => handleChange(e)}/>
                <button className="font-bold w-12 border-2 rounded-md bg-blue-200" onClick={() => submit()}> click </button>
            </div>
            <br/>
            {
                todos.map((e,i) => {
                    //checks for line that needs to be edited, renders normally if not the case
                    let element = i==editIndex ? 
                        <textarea className="border-2 rounded-md" onChange={editVal} value={e}> </textarea> :
                        <span> {e} </span>;
                    let editButton = i==editIndex ? 
                        <button id={"bt_" + i} className='float-right font-bold mr-2 w-8 border-2 rounded-md bg-blue-200' onClick={(e)=>confirmEdit(e)}> &#10003; </button>:
                        <button id={"bt_" + i} className='float-right font-bold mr-2 w-8 border-2 rounded-md bg-blue-200' onClick={(e)=>editItem(e)}> &#128393; </button>;

                    return(
                        <p key={i} className='my-4'>
                            <span id={"sp_" + i}>{element}</span>
                            <button className='float-right font-bold mr-10 w-8 border-2 rounded-md bg-blue-200' id={i} onClick={(e)=>removeItem(e)}> X </button>
                            {editButton}
                        </p>
                    )
                }) 
            }
        </div>
    )
}
