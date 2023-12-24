import React, { useState, useEffect } from 'react'
import { useStateWrap } from '../utils/useStateWrap'

export default function Journal(props){
    const [entries, setEntries] = useState([])
    const [content, setContent] = useStateWrap("journal","")

    useEffect(() =>{
        fetch("http://localhost:9020/getjournal") 
        .then( (data) =>{
            data.json()
            .then((text) => {
                setEntries(text)
            })
        })
    },[])

    function next(){
    
    }
    function prev(){
    }
    function handleChange(e){
        setContent(e.target.value) 
    }

    function save(){
        //setContent()    
    }
    
    return(
        <div className='flex h-5/6'>
            <div onClick={prev} className='relative w-14 my-10 border-2'>
                <button className='absolute border-2 m-2'> prev </button>
            </div>
            <textarea value={content} onChange={handleChange} className='box-border my-10 mx-16 p-10 w-5/6 h-5/6 border-2'> 
                
            </textarea>
            <div className='relative w-14 my-10 border-2'>
                <button onClick={next} className='absolute border-2 m-2'> next </button>
                <button onClick={save} className='absolute bottom-0 border-2 m-2'> save </button>
            </div>
        </div>
    )
}
