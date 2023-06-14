/*
 * TIME is in millisecond (all worker communication is in millisecond)
 * DISPLAYED TIME is in minutes and seconds
 * TODO: - In the last 10 seconds, display needs to be 0:09, not 0:9
 * 		- stop then start should reset paused to unpaused
 * 		- add a time slot related note/text field (ex: at 9:00 - feeling cute)
 */
import React, { useEffect, useState } from 'react'
import useStateWrap from '../utils/useStateWrap'
import TimeDisplay from './TimeDisplay'

const timer_states = {
    off:{
        background_color:"white",
        started:false,
        paused:false,
        work_mode:false,
        pause_mode:""
    },
    work:{
        background_color:"#7FFFD4",
        started:true,
        paused:false,
        work_mode:true,
        pause_mode:"work_paused"
    },
    work_paused:{
        background_color:"#EF5252",
        started:true,
        paused:true,
        work_mode:true,
        pause_mode:"work"
    },
    recess:{
        background_color:"#00FFFF",
        started:true,
        paused:false,
        work_mode:false,
        pause_mode:"recess_paused"
    },
    recess_paused:{
        background_color:"#EF5252",
        started:true,
        paused:true,
        work_mode:false,
        pause_mode:"recess"
    }
}

//const getState = (timer_state) => Object.keys(timer_state)[0]
const MIN_TO_MILLI = 60*1000
const audio =  new Audio('public/test.mp3')

export default function PomodoroTimer(){
    //const [ worker, setWorker ] = useState(null)
    //const [ time, setTime ] = useStateWrap("time",0)
    //const [ work_intervals, setWork_intervals ] = useStateWrap("work_intervals",0)
    //const [ recess_time, setRecess_time ] = useStateWrap("recess_time",0)
    //const [ interval_time, setInterval_time ] = useStateWrap("interval_time", 0)
    //const [ timer_state, setTimer_state ] = useStateWrap(null)

    const [ worker, setWorker ] = useState(null)
    const [ time, setTime ] = useState(0)
    const [ work_intervals, setWork_intervals ] = useState(0)
    const [ recess_time, setRecess_time ] = useState(0)
    const [ interval_time, setInterval_time ] = useState( 0)
    const [ timer_state, setTimer_state ] = useState(timer_states.off)
    const [ test, setTest ] = useState('test')

    useEffect(() => {
        if(!worker){
            setWorker(new Worker(new URL('./worker.js',import.meta.url)))
        }
    },[worker])

    function setStartButton(){
        timer_state.started ? stopWorker():startWorker()
    }
	
	function confirmStartValidity(){
		if(recess_time && interval_time) return true
        alert("youre missing some data")
        return false
	}

	function stopWorker(){
		worker.terminate()
        setTimer_state(timer_states.off)
        setTime(0)
        setWork_intervals(0)
        setInterval_time(0)
        setRecess_time(0)
        window.localStorage.clear();
	}

    function updateState(state){
        setTimer_state(() => {
            return state
        })
    }

    console.log(test)
	function startWorker(){
        setTimer_state(() => timer_states.work)
        setTest("test2")

		worker.postMessage({
			time:time != 0? time:interval_time,
			paused:timer_state.paused
		})

		worker.onmessage = (e) =>{
            setTime(e.data)
            console.log(test)
			//From recess to work
			if(e.data == 0 && timer_state.work_mode == false){
                console.log("RECESS TO WORK")
				audio.play()
                updateState(timer_states.work)
                setTime(interval_time)
                worker.postMessage({time:interval_time,paused:timer_state.paused})
			}
			//From work to recess
			else if(e.data==0 && timer_state.work_mode== true){
                console.log("WORK TO RECESS")
				audio.play()
                updateState(timer_states.recess)
                setTime(recess_time)
                setWork_intervals(work_intervals + 1)
                worker.postMessage({time:recess_time,paused:timer_state.paused})
			}
		}
	}

    function pauseClick(){
        setTimer_state(() => timer_states[timer_state.pause_mode])
        worker.postMessage({
            time:time,
            paused:!timer_state.paused
        })
    }

    return(
        <div>
            <div style={{background:timer_state.background_color, float:'left',width:"50%"}}>
                Intervals (m)
                <input type="text" name="interval_time" onChange={(e) =>{
                    setInterval_time(e.target.value*MIN_TO_MILLI)
                }}/> 
                <br/>
                Recess (m) 
                <input type="text" name="recess_time" onChange={(e) =>{
                    setRecess_time(e.target.value*MIN_TO_MILLI)
                }}/> 
                <br/>
                <button  onClick={() => setStartButton()}> 
                    {timer_state.started?"stop timer":"start timer"} 
                </button>
                <button onClick={() => pauseClick()}> 
                    {timer_state.paused == false ? 'pause' : 'unpause'}
                </button>
                <TimeDisplay time={time}/>
                Intervals Completed = {work_intervals}
            </div>
        </div>
    )
}
