//for now this displays some text
import React from 'react'
import { useStateWrap } from '../utils/useStateWrap'
import Text from '../components/Text/Text'


export default function Workout(){
    const [ todos, setTodos ] = useStateWrap("todos",[])
    return (
        <div className='border-2 h-96'> 
            <textarea className='border-2 m-2'> </textarea>
        </div>
    )
}
