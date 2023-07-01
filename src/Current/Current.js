//for now this displays some text
import React from 'react'
import { useStateWrap } from '../utils/useStateWrap'

export default function Current(){
    const [ todos, setTodos ] = useStateWrap("todos",[])
    return (
        <div> 
            <textarea onChange={(e) => setTodos(e.target.value)}></textarea>
        </div>
    )
}
