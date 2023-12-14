import React, { useState } from 'react'
import { useStateWrap } from '../utils/useStateWrap'

let template_pr = [
    {
        "name":"book",
        "current":0,
        "end":600,
        "start":0,
    }
]

let className = 'border-2 w-1/3 h-8 m-2'
function Adder(props){
    let { addItem } = props
    const [name, setName] = useState("")
    const [total, setTotal] = useState(1)

    return (
        <div className='border-2 w-1/3 flex m-2'>
            <textarea className={className}value={name} onChange={(e)=>setName(e.target.value)}></textarea>
            <textarea className={className}value={total} onChange={(e)=>setTotal(e.target.value)}></textarea>
            <button className='border-2 rounded m-2'onClick={() => props.addItem(name,total)}> add </button>
        </div>
    )
}

export default function Tracker(props){
    const [ items, setItems ] = useStateWrap("items",[])

    function deleteItem(name){
        let new_items = items.filter((e) => e.name != name)
        setItems(new_items)
    }
    function addItem(name, total){
        items.push({name:name,current:0,total:total,start:(new Date).getTime()})
        let new_items = items.map((e) => e)
        setItems(new_items)
    }
    function updateValue(name, value){
        let item = items.find((e) => e.name == name)
        item.current = value
        let new_items = items.map((e) => e)
        setItems(new_items)
    }

    function getRate(amt, startDate){
        startDate = (new Date("December 10, 2023 03:24:00")).getTime()
        let today = (new Date).getTime()    
        let diff = today - startDate
        let days = Math.floor((diff/1000)/(3600*24))
        return (
            <span>
                {amt / days} per days
            </span>
        )
    }

    return (
        <div>
            <Adder addItem={addItem}/>
            <div className='flex flex-wrap'>
                { items.map((e) => {
                        return (
                            <div className='border-2 w-1/3 m-2 flex-wrap flex-box'>
                                <div className='text-lg m-2'> task: {e.name} </div>
                                <div className='mx-8 border-2'>
                                    <li> current: <textarea className="border-2 w-10 resize-none rounded h-8"value={e.current} onChange={(t) => updateValue(e.name,t.target.value)}/> </li>
                                    <li> total: {e.total} </li>
                                    <li> start: {new Date(e.start).toDateString().slice(4)} </li>
                                    <li> progress: {e.current / e.total} </li>
                                    {getRate(e.current, e.start)} 
                                </div>
                                <button onClick={()=>deleteItem(e.name)}>x</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
