import React from 'react'

export default function TimeDisplay(props){
    let time = props.time/1000
    let min = Math.floor(time/60)
    let sec = parseInt(time%60)

    return(
        <div>
        <br/>
        Time: {min} : {sec}
        </div>
    )
}
