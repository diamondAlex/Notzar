//for now this displays some text
import React from 'react'
import {useState} from 'react'

function useStateWrap(name, init){
    let cachedData = localStorage.getItem(name)
    let value;
    let func;
    if(cachedData){
        [ value, func ] = useState(cachedData)
    }
    else{
        [ value, func ] = useState(init)
    }
    let wrappedFunc = (updatedState) => {
        localStorage.setItem(name,updatedState)
        func(updatedState)
    }
    return [ value, wrappedFunc ] 
}

export default function Current(){
    const [ text, setText ] = useStateWrap("text", "test")
    return (
        <div> 
            <p>{text} </p>
            <textarea onChange={(e) => setText(e.target.value)} />
            <button onClick={() => console.log(localStorage.getItem("text"))}> test </button>
        </div>
    )
}
