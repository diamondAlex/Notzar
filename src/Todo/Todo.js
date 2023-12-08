//for now this displays some text
import React, { useState } from 'react'
import Text from '../components/Text/Text'

export default function Current(){
    const [ todos, setTodos ] = useState([])

    return (
        <div> 
            <div className='p-4 m-2 float-left w-1/4 border-2 rounded-md'>
                <Text name="test" setText={setTodos} text={todos} />
            </div>
        </div>
    )
}
