//for now this displays some text
import React from 'react'
import useStateWrap from '../utils/useStateWrap'

export default function Current(){
    const [ text, setText ] = useStateWrap("text", "test")
    const [ num, setNum ] = useStateWrap("num", 1)
    return (
        <div> 
            <p>{num + num} </p>
            <textarea onChange={(e) => setText(e.target.value)} />
            <button onClick={() => setNum(2)}> test </button>
        </div>
    )
}
