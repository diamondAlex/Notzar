import React from 'react'

export default function TimeDisplay(props){
    let time = props.time/1000
    let min = Math.floor(time/60)
    let sec = parseInt(Math.round(time%60))

    return(
        <div className={props.style + " w-1/6"}>
        <br/>
        Time: {min} : {sec}
        </div>
    )
}
