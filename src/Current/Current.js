//for now this displays some text
import React, { useState } from 'react'
import { useStateWrap } from '../utils/useStateWrap'
import Text from '../components/Text/Text'
import Note from '../components/Note/Note'
import Progress from '../components/Progress/Progress'

export default function Current(){
    const [ todos, setTodos ] = useStateWrap("todos",[])
    const [ notes, setNotes ] = useStateWrap("notes","")

    return (
        <div> 
            <Progress />
            <div className='p-4 m-2 float-left w-1/4 border-2 rounded-md'>
                <Text name="test" setText={setTodos} text={todos} />
            </div>
            <div className='m-2 float-left w-1/2 border-2 rounded-md'>
                <Note setContent={setNotes} content={notes} />
            </div>
        </div>
    )
}
