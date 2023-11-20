import React, { useEffect, useState } from 'react'
import TimeDisplay from './TimeDisplay'
import Progress from '../components/Progress/Progress'
import { useStateWrap } from '../utils/useStateWrap'

const MIN_TO_MILLI = 60*1000
const TIME_TO_RECESS = 6
const audio =  new Audio('public/test.mp3')

let states={
    off: {"bg_color":"bg-red-200"},
    work: {"bg_color":"bg-green-200"},
    recess: {"bg_color":"bg-blue-200"},
}

export default function PomodoroTimer(){
    let [ worker, setWorker ] = useState(null)
    let [ time, setTime ] = useStateWrap("time",0)
    let [ interval_time, setInterval_time ] = useStateWrap("interval_time",0)
    let [ recess_time, setRecess_time ] = useStateWrap("recess_time",0)
    let [ change, setChange ] = useState(3)
    let [ state, setState ] = useStateWrap("state","off")
    let [ from, setFrom ] = useStateWrap("from", "off")
    let [ intervals_completed, setIntervals_completed ] = useStateWrap("intervals_completed",0)

    useEffect(() => {
        window.addEventListener("keypress", (e) =>{
            if(e.code == "Space") setChange(2) 
            if(e.code == "Enter" || e.code == "NumpadEnter") setChange(2) 
        })
    },[])

    //this seems bloated and over complicated
    useEffect(() => {
        if(!worker){
            setWorker(new Worker(new URL('./worker.js',import.meta.url)))
        }
        //switches between work and recess
        if(change == 1){
            setChange(0)
            audio.play()
            //if == recess cause we got from recess -> work and work -> recess
            let time_to_set = state == "recess" ? interval_time : recess_time; 
            if (state == 'work') {
                setState('recess')
                setIntervals_completed(++intervals_completed)
            }
            else if (state == 'recess') setState('work')
            worker.postMessage({time:time_to_set,paused:false})
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
        <div className={ "rounded border-solid border-2 p-2 m-2 w-1/4"}>
            <p> <span className='text-lg'> Intervals (m) </span>
                <input className={`states[state].bg_color border-2 border-gray-400 rounded`} type="text" name="time" onChange={(e) =>{
                    setInterval_time(e.target.value*MIN_TO_MILLI)
                }}/> 
            </p>
            <p> <span className='text-lg'> Recess (m) </span>
                <input className={`states[state].bg_color border-2 border-gray-400 rounded`} type="text" name="time" onChange={(e) =>{
                    setRecess_time(e.target.value*MIN_TO_MILLI)
                }}/> 
            </p>
            <button className="bg-blue-200 rounded p-1 m-2" onClick={() => startWorker()}>start</button>
            <button className="bg-blue-200 rounded p-1 m-2" onClick={() => stopWorker()}>stop</button>
            <button className="bg-blue-200 rounded p-1 m-2" onClick={() => resetTimer()}>reset</button>
            <TimeDisplay time={time} style={`${states[state].bg_color} rounded p-1 m-2`}/> 
            <div className='bg-blue-200 rounded p-1 m-2 w-10'>{intervals_completed}</div>
            <Progress /> 
        </div>
    )
}
