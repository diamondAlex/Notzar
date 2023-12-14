import React, { useState } from 'react'
import { useStateWrap } from '../utils/useStateWrap'

function TimeSlot(props){
    let { hour, name, time, removeItem, editItem} = props
    let ratio = ((hour - time[0]) / (time[1]-time[0]))*100
    ratio = ratio > 100 ? 100: ratio
    ratio = ratio < 0 ? 0: ratio

    const [show, setShow] = useState(0)
     
    return(
        <div className='relative border-2 flex-initial h-16 w-80 box-border m-4 rounded'>
            <div className='w-5/6 m-4 bg-gray-100 z-0 absolute'>
                {name} - [ {time[0]}h - {time[1]}h ]
            </div>
            <button className='left-72 absolute z-20'onClick={()=>removeItem(name)}> X </button>
            <button className='left-72 top-6 absolute z-20'onClick={()=>setShow(1)}> &#128393; </button>
            <div style={{
                background:"rgba(50,150,50,0.3)",
                position:"absolute",
                zIndex:10,
                width:`${ratio}%`,
                height:"100%",
            }}>
            <DialogAdder className='left-full'show={show} close={setShow} addItem={editItem} old={name}/>
            </div>
        </div>
    )
}

export default function Day(props){
    const [ slots, setSlots ] = useStateWrap("slots",[])
    const [ hour, setHour ] = useState(0)
    const [ show, setShow ] = useState(0)

    useState(()=>{
        let current_hour = (new Date).getHours()
        let mins = (new Date).getMinutes()/60
        current_hour = current_hour + mins
        setHour(current_hour) 
    },[])

    function removeItem(name){
        let new_slots = slots.filter((e) => e.name != name)
        setSlots(new_slots)
    }
    function addItem(name, start,end){
        slots.push({name:name,time:[start,end]}) 
        let new_slots = slots.sort((a,b) => parseInt(a.time[0]) > parseInt(b.time[0]) ? 1:-1)
        setSlots(new_slots)
    }
    function editItem(name, start,end, old){
        let new_slots = slots.filter((e) => e.name != old)
        console.log(old)
        console.log(new_slots)
        new_slots.push({name:name,time:[start,end]})
        new_slots = new_slots.sort((a,b) => parseInt(a.time[0]) > parseInt(b.time[0]) ? 1:-1)
        setSlots(new_slots)
    }
    
    return (
        <div className='border-2 h-5/6 w-full'>
            <div className='p-6 items-start flex-col flex flex-wrap h-full border-2 box-border'>
                {
                    slots.map((e) => {
                        return <TimeSlot removeItem={removeItem} editItem={editItem} hour={hour} name={e.name} time={e.time}/>
                    })
                }
                <button onClick={()=>setShow(1)}className='border-2 text-lg w-8'> + </button>
                <DialogAdder show={show} close={setShow} addItem={addItem}/>
            </div>
        </div>
    )
}

let className = 'border-2 h-16 w-32'

function DialogAdder(props){
    let { show } = props
    if(!show) return <dialog/>

    const [ name, setName ] = useState("")
    const [ start, setStart ] = useState(0)
    const [ end, setEnd ] = useState(0)

    function confirm(){
        props.close(0)
        props.addItem(name,start,end,props.old)
    }

    function enterPress(e){
        if(e.key == "Enter"){
            confirm()
        }
    }

    return (
        <dialog className='border-2 absolute z-20' onKeyDown={enterPress} open>
            <textarea className={className} value={name} onChange={(e)=>setName(e.target.value)}/>
            <textarea className={className} value={start} onChange={(e)=>setStart(e.target.value)}/>
            <textarea className={className} value={end} onChange={(e)=>setEnd(e.target.value)}/>
            <button className='border-2' onClick={confirm}>add</button>
            <button className='border-2' onClick={()=>{
                props.close(0)
            }}>close</button>
        </dialog>
    )
}
