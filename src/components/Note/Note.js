import React from 'react'

export default function Note(props){
    function handleChange(e){
        props.setContent(e.target.value)
    }

    function clear(){
        props.setContent("")
    }

    return (
        <div className='w-full'>
            <textarea className='w-5/6 p-2 border-2 m-2 rounded-md' 
                placeholder='enter text here' 
                value={props.content} 
                onChange={(e) => handleChange(e)}
            />
            <br/>
            <button className="font-bold w-12 border-2 rounded-md bg-blue-200 m-2" onClick={clear}> clear </button>
        </div>
    )
}
