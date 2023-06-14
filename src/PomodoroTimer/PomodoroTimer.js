import React, { useEffect, useState } from 'react'
import TimeDisplay from './TimeDisplay'

const MIN_TO_MILLI = 60*1000
const audio =  new Audio('public/test.mp3')

export default function PomodoroTimer(){
    let [ worker, setWorker ] = useState(null)
    let [ time, setTime ] = useState(0)
    let [ test, setTest ] = useState("sup")

    useEffect(() => {
        if(!worker){
            setWorker(new Worker(new URL('./worker.js',import.meta.url)))
        }
        if(test == 'test'){
            setTest("sup")
            worker.postMessage({
                time:6*MIN_TO_MILLI/60,
                paused:false
            })
        }
    },[worker, test])

	function startWorker(){
		worker.postMessage({
			time:time,
            paused:false
		})

		worker.onmessage = (e) =>{
            setTime(e.data)
            if(e.data == 0){
                setTest("test")
            }
		}
	}

    console.log(test)
    return(
        <div>
            <div style={{background:"white", float:'left',width:"50%"}}>
                Intervals (m)
                <input type="text" name="time" onChange={(e) =>{
                    setTime(e.target.value*MIN_TO_MILLI)
                }}/> 
                <br/>
                <br/>
                <button  onClick={() => startWorker()}> 
                    start
                </button>
                <TimeDisplay time={time}/>
            </div>
        </div>
    )
}

