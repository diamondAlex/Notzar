import React, { useEffect, useState } from 'react'

export default function Cards(){
    const [ cards, setCards ] = useState([])
    const [ index, setIndex ] = useState(0)
    const [ content, setContent ] = useState("")

    useEffect(() =>{
        console.log('fetching')
        fetch('http://localhost:9001', {method: "GET"}) 
        .then((res) =>{
            res.text().then((text) =>{
                let json = JSON.parse(text)
                setCards(json)
                setContent(json[index].question)
            })
        })
    },[])

    function set_next_content(){
        let new_index = index > 0 ? index-1: cards.length-1
        setContent(cards[new_index].question)
        setIndex(new_index)
    }
    
    return(
        <div className='rounded inline-flex m-2 p-4 border-2 w-1/3 h-1/3'>
            <button className="border-2 rounded h-10 w-10 align-middle" onClick={set_next_content}> prev </button>
            <div onClick={() => setContent(cards[index].answer)} className='rounded border-2 mx-4 p-2 flex-1'> {content} </div>
            <button className="border-2 rounded h-10 w-10" onClick={set_next_content}> next </button>
        </div>
    )
}
