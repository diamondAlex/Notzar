import React, { useEffect, useState } from 'react'
import TimeDisplay from './TimeDisplay'
import { useStateWrap } from '../utils/useStateWrap'


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
    let [ time, setTime ] = useStateWrap("time",0)
    let [ interval_time, setInterval_time ] = useStateWrap("interval_time",0)
    let [ change, setChange ] = useState(3)
    let [ state, setState ] = useStateWrap("state","off")
    let [ from, setFrom ] = useStateWrap("from", "off")
    let [ intervals_completed, setIntervals_completed ] = useStateWrap("intervals_completed",0)

    useEffect(() => {
        if(state == "off"){
            clearData()
        }
        window.addEventListener("keypress", (e) =>{
            if(e.code == "Space"){
                setChange(2) 
            }
            if(e.code == "Enter" || e.code == "NumpadEnter"){
                setChange(2) 
            }
        })
    },[])

    function clearData(){
        console.log("should delete")
        localStorage.removeItem("pomodoro")
    }
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
        else if(change == 2){
            setChange(0)
            if(state=="work" || state == "recess"){
                stopWorker()
            }
            else if(state=="off"){
                startWorker()
            }
        }
        else if(change == 3 && worker && (state == 'work' || state == 'recess')){
            setChange(0)
            initWorker()
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
        if(interval_time == 0) return
        from == "recess" ? setState("recess") : setState("work")
        initWorker()
	}

    function initWorker(){
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
                <br/> {intervals_completed}
            </div>
        </div>
    )
}

