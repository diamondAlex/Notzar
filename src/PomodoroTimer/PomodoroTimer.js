//todo make change names more explicit than ints (Ex: "switch, keypress_switch, reload_switch" etc)
//see if all those hooks are really necessary
import React, { useEffect, useState } from 'react'
import TimeDisplay from './TimeDisplay'
import { useStateWrap } from '../utils/useStateWrap'

const MIN_TO_MILLI = 60*1000
const TIME_TO_RECESS = 6
const audio =  new Audio('public/test.mp3')

let states={
    off: {"bg_color":"bg-white-500"},
    work: {"bg_color":"bg-green-500"},
    recess: {"bg_color":"bg-blue-500"},
    pause: {"bg_color":"bg-yellow-500"},
}

export default function PomodoroTimer(){
    let [ worker, setWorker ] = useState(null)
    let [ time, setTime ] = useStateWrap("time",0)
    let [ interval_time, setInterval_time ] = useStateWrap("interval_time",0)
    let [ change, setChange ] = useState(3)
    let [ state, setState ] = useStateWrap("state","off")
    let [ from, setFrom ] = useStateWrap("from", "off")
    let [ intervals_completed, setIntervals_completed ] = useStateWrap("intervals_completed",0)

    console.log(interval_time)
    console.log(time)

    useEffect(() => {
        window.addEventListener("keypress", (e) =>{
            if(e.code == "Space") setChange(2) 
            if(e.code == "Enter" || e.code == "NumpadEnter") setChange(2) 
        })
    },[])

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
        //change state through keypress
        else if(change == 2){
            setChange(0)
            if(state=="work" || state == "recess") stopWorker()
            else if(state=="off") startWorker()
        }
        //starts worker on reload if localStorage has data
        else if(change == 3 && worker && (state == 'work' || state == 'recess')){
            setChange(0)
            initWorker()
        }
        else if(change == 4){
            setChange(0)
        }
    },[worker, change])

    function clearData(){
        localStorage.removeItem("pomodoro")
    }

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

    function resetTimer(){
        clearData()
        stopWorker()
        setChange(4)
    }

    return(
        <div>
            <div className={states[state].bg_color + " m-2"}>
                <p> Intervals (m) <input className="border-solid border-2 border-sky-500 rounded" type="text" name="time" onChange={(e) =>{
                        setInterval_time(e.target.value*MIN_TO_MILLI)
                    }}/> 
                </p>
                <button className="btn-blue rounded p-1 m-2" onClick={() => startWorker()}>start</button>
                <button className="btn-blue rounded p-1 m-2" onClick={() => stopWorker()}>stop</button>
                <button className="btn-blue rounded p-1 m-2" onClick={() => resetTimer()}>reset</button>
                <TimeDisplay time={time}/> <br/> {intervals_completed}
            </div>
        </div>
    )
}

