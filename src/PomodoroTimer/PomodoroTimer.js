import React, { useEffect, useState } from 'react'
import TimeDisplay from './TimeDisplay'

const MIN_TO_MILLI = 60*1000
const TIME_TO_RECESS = 6
const audio =  new Audio('public/test.mp3')

let states={
    off: {"bg_color":"white"},
    work: {"bg_color":"#86db8d"},
    recess: {"bg_color":"#7b9fbd"},
    pause: {"bg_color":"#FFFF00"},
}

export default function PomodoroTimer(){
    let [ worker, setWorker ] = useState(null)
    let [ time, setTime ] = useState(0)
    let [ interval_time, setInterval_time ] = useState(0)
    let [ change, setChange ] = useState("sup")
    let [ state, setState ] = useState("off")
    let [ from, setFrom ] = useState("off")
    let [ intervals_completed, setIntervals_completed ] = useState(0)

    useEffect(() => {
        //window.addEventListener("keydown", (e) => {
            //console.log('test')
        //})
        if(!worker){
            setWorker(new Worker(new URL('./worker.js',import.meta.url)))
            console.log('test')
        }
        //switches between work and recess
        if(change == 1){
            console.log('test2')
            setChange(0)
            audio.play()
            console.log(state)
            console.log(from)

            //if == recess cause we got from recess -> work and work -> recess
            let time_to_set = state == "recess" ? 
                interval_time : 
                interval_time / TIME_TO_RECESS; 

            if (state == 'work') {
                setState('recess')
                setIntervals_completed(++intervals_completed)
            }
            else if (state == 'recess') setState('work')

            worker.postMessage({
                time:time_to_set,
                paused:false
            })
        }
    },[worker, change])

    function stopWorker(){
        if(state=="off") return
        worker.terminate()
        setFrom(state)
        setState("off")
        setWorker(null)
    }

	function startWorker(){
        if(state == 'work') return
        from == "recess" ? setState("recess") : setState("work")
		worker.postMessage({
            time:time==0?interval_time:time,
		})
		worker.onmessage = (e) =>{
            setTime(e.data)
            console.log(e.data)
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
                <br/> {intervals_completed}
            </div>
        </div>
    )
}

