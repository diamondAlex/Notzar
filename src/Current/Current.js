//for now this displays some text
import React from 'react'
import {useState} from 'react'

export default function Current(){
    const [ text, setText ] = useState("test")
    return (

        <div> 
            <p>{text} </p>
            <textarea onChange={(e) => setText(e.target.value)} />
        </div>
    )
}
