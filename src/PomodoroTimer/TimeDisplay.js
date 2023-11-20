import React from 'react'

export default function TimeDisplay(props){
    let time = props.time/1000
    let min = Math.floor(time/60)
    let sec = ("0" + parseInt(Math.round(time%60)).toString()).slice(-2)

    return(
        <div className={props.style + " w-1/2"}>
        <br/>
        Time: {min} : {sec}
        </div>
    )
}
