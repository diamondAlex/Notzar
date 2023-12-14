import React, { useEffect, useState } from 'react'

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function Day(props){
    return (
        <div>
            sup
        </div>
    )
}

let item_obj = {}

export default function Calendar(props){
    let date = new Date()
    let dayAmt = daysInMonth(date.getMonth()-1, date.getFullYear())

    useEffect(()=>{
        let obj = JSON.parse(localStorage.getItem(props.name))
        if(obj){
            if(obj[props.index]){
                item_obj = obj[props.index]
            }
            else{
                obj.push({})
            }
        }
        else{
            localStorage.setItem(props.name,JSON.stringify([[]]))
        }
    },[])

    let arr = []
    for(let i = 1;i<=dayAmt;i++){
        arr.push(<div className='w-1/12 border-2'> {i} </div>)
    }

    return(
        <div className='rounded inline-flex flex-wrap w-full h-3/4'>
            { arr.map((e) => e)}
        </div>
    )
}
