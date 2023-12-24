import React, { useEffect, useState } from 'react'

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function Day(props){
    const { setDay, day } = props
    const [ val, setVal ] = useState("")
    return (
        <div className='w-32 h-32 border-2 flex flex-col'> 
            <div>{props.day}</div>
            <div className='grow'>
                <textarea value={val} onClick={()=>setDay(day)} onChange={(e)=>setVal(e.target.value)}className='border-0 resize-none h-full w-full'> </textarea>
            </div>
        </div>
    )
}

export default function Calendar(){
    const [ day, setDay ] = useState(1)
    const [ month, setMonth ] = useState(0)
    const [ year, setYear ] = useState(0)
    const [ itemArr, setItemArr ] = useState([])

    useEffect(()=>{
        let date = new Date()
        setMonth(date.getMonth()+1)
        setYear(date.getFullYear())
    },[])

    useEffect(()=>{
        let arr = []
        let amt = daysInMonth(month, year)
        console.log(amt)
        for(let i = 1;i<=amt;i++){
            arr.push(<Day key={i} setDay={setDay} day={i}/>)
        }
        setItemArr(arr)
    },[month])

    function updateMonth(inc){
        let m = month + inc
        if(m < 1){
            m = 12
            setYear(year-1)
        }
        if(m > 12){
            m = 1
            setYear(year+1)
        }
        setMonth(m)
    }

    return(
        <div>
            <div className='w-32 border-2'>{year} - {month} - {day}</div>
            <div className='inline-flex'>
                <button onClick={()=>updateMonth(-1)} className='h-14 border-2 cursor-pointer mt-20'> PREV </button>
                <div className='rounded flex flex-wrap w-11/12 box-border p-8'>
                    {itemArr.map((e) => e)}
                </div>
                <button onClick={()=>updateMonth(1)} className='h-14 border-2 cursor-pointer mt-20'> NEXT </button>
            </div>
        </div>
    )
}
