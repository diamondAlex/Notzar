import React, { useState } from 'react'

export default function Text(props){

    const [content, setContent] = useState()
    const [todos, setTodos] = useState([])

    function handleChange(e){
        setContent(e.target.value)
    }

    function removeItem(e){
        console.log(e.target.id)
        let updatedState = todos.filter((todo,i) => i != e.target.id)
        setTodos(updatedState)
    }

    function submit(){
        if(content){
            setTodos([...todos, content])
            setContent("")
        }
    }

    return (
        <div>
            <p> {props.name} </p>
            <textarea placeholder='enter text here' value={content} onChange={(e) => handleChange(e)}/>
            <button onClick={() => submit()}> click </button>
            <br/>
            {
                todos.map((e,i) => {
                    return(
                        <div key={i}>
                            {e}
                            <button id={i} onClick={(e)=>removeItem(e)}> delete me </button>
                        </div>
                    )
                })
            }
        </div>
    )
}
