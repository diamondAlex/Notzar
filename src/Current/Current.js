//for now this displays some text
import React, { useState } from 'react'

let states = {
    sup:{
        test:"sup"
    },
    bro:{
        test:"bro"
    }
}

export default function Current(){
    const [ text, setText ] = useState({test:"value"})
    return (
        <div> 
            {text.test}
            <button onClick={() => setText(states.sup)} > sup </button>
            <button onClick={() => setText(states.bro)} > bro </button>
        </div>
    )
}
