import React, { useState } from 'react'

export default function Progress(props){
    const [ refresh, setRefresh ] = useState(0)

    function setTime(){
        let start = 4 
        let end = 21
        let range = end - start
        let date = new Date()
        let minutes = date.getMinutes()
        let hours = date.getHours()
        hours = (hours + minutes/60) - start
        setTimeout(() => {
            console.log("updated %")
            setRefresh(refresh + 1)
        },612000)
        return Math.round(hours/range*100)
    }
    
    function handleChange(e){
        setContent(e.target.value)
    }


    return (
        <div>
            <div className='p-4 m-2 w-1/4'>
                { setTime() } %
            </div>
        </div>
    )
}
