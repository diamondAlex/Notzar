import React, { useEffect, useState } from 'react'
import TimeDisplay from './TimeDisplay'

const MIN_TO_MILLI = 60*1000
const TIME_TO_RECESS = 6
const audio =  new Audio('public/test.mp3')

let states={
    off: {"bg_color":"white"},
    work: {"bg_color":"#86db8d"},
    recess: {"bg_color":"#7b9fbd"},
}

export default function PomodoroTimer(){
    let [ worker, setWorker ] = useState(null)
    let [ time, setTime ] = useState(0)
    let [ interval_time, setInterval_time ] = useState(0)
    let [ change, setChange ] = useState("sup")
    let [ state, setState ] = useState("off")

    useEffect(() => {
        if(!worker){
            setWorker(new Worker(new URL('./worker.js',import.meta.url)))
        }
        //switches between work and recess
        if(change == 1){
            setChange(0)
            audio.play()

            //if == recess cause we got from recess -> work and work -> recess
            let time_to_set = state == "recess" ? 
                interval_time : 
                interval_time / TIME_TO_RECESS; 

            if (state == 'work') setState('recess')
            else if (state == 'recess') setState('work')

            worker.postMessage({
                time:time_to_set,
                paused:false
            })
        }
    },[worker, change])

    function stopWorker(){
        worker.terminate()
        setState("off")
        setWorker(null)
    }

	function startWorker(){
        if(state == 'work') return
        setState("work")
		worker.postMessage({
            time:time==0?interval_time:time,
		})
		worker.onmessage = (e) =>{
            setTime(e.data)
            if(e.data == 0) setChange(1)
		}
	}

    return(
        <div>
            <div style={{background:states[state].bg_color, float:'left',width:"50%"}}>
                Intervals (m)
                <input type="text" name="time" onChange={(e) =>{
                    setInterval_time(e.target.value*MIN_TO_MILLI)
                }}/> 
                <br/>
                <br/>
                <button  onClick={() => startWorker()}> 
                    start
                </button>
                <button  onClick={() => stopWorker()}> 
                    stop
                </button>
                <TimeDisplay time={time}/>
            </div>
        </div>
    )
}

