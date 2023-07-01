//for now this displays some text
import React from 'react'
import { useStateWrap } from '../utils/useStateWrap'
import Text from '../components/Text/Text'

export default function Current(){
    const [ todos, setTodos ] = useStateWrap("todos",[])
    return (
        <div> 
            <Text name="test" />
        </div>
    )
}
