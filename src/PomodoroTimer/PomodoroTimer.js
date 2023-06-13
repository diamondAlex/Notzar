/*
 * TIME is in millisecond (all worker communication is in millisecond)
 * DISPLAYED TIME is in minutes and seconds
 * By default, long pause will happen every 3 interval and will be 3x time
 * TODO: - In the last 10 seconds, display needs to be 0:09, not 0:9
 * 		- stop then start should reset paused to unpaused
 * 		- add a time slot related note/text field (ex: at 9:00 - feeling cute)
 */
import React, { useState } from 'react'
import useStateWrap from '../utils/useStateWrap'
import TimeDisplay from './TimeDisplay'

const background_color_work = '#7FFFD4'
const background_color_recess = '#00FFFF'
const background_color_pause = '#EF5252'

const MIN_TO_MILLI = 60*1000

export default function PomodoroTimer(){
    const [ worker, setWorker ] = useState(new Worker(new URL('./worker.js',import.meta.url)))
    const [ time, setTime ] = useStateWrap("time",0)
    const [ work_intervals, setWork_intervals ] = useStateWrap("work_intervals",0)
    const [ recess_time, setRecess_time ] = useStateWrap("recess_time",0)
    const [ interval_time, setInterval_time ] = useStateWrap("interval_time", 0)
    const [ paused, setPaused ] = useStateWrap("paused",false)
    const [ work_mode, setWork_mode ] = useStateWrap("work_mode",true)
    const [ background_color, setBackground_color ] = useStateWrap("background_color",'white')

    let audio = new Audio('public/test.mp3')
	
	function confirmStartValidity(){
		if(!(recess_time && interval_time)){
			alert("youre missing some data")
			return false
		}
        return true
	}

	function stopWorker(){
		worker.terminate()
        setBackground_color("white")
        setWork_mode(false)
        setTime(0)
        setWork_intervals(0)
	}

	function startWorker(){
        setWork_mode(true)
        setBackground_color(background_color_work)

		worker.postMessage({
			time:interval_time,
			paused:paused
		})

		worker.onmessage = (e) =>{
            console.log("TIME = " + e.data)
            setTime(e.data)

			//From recess to work
			if(e.data == 0 && work_mode == false){
				audio.play()
                //is this async?
                setBackground_color(background_color_work)
                setWork_mode(true)
                setTime(interval_time)
                worker.postMessage({time:interval_time,paused:paused})
			}

			//From work to recess
			else if(e.data==0 && work_mode== true){
				audio.play()
                setBackground_color(background_color_recess)
                setWork_mode(false)
                setTime(recess_time)
                setWork_intervals(work_intervals + 1)
                let recess_time = work_intervals%3 == 0 ?
                    recess_time * 3 :
                    recess_time
                worker.postMessage({time:recess_time,paused:paused})
			}
		}
	}

    return(
        <div>
            <div style={{background:background_color, float:'left',width:"50%"}}>
                Intervals (m)
                <input type="text" name="interval_time" value={interval_time/MIN_TO_MILLI} onChange={(e) =>{
                    setInterval_time(e.target.value*MIN_TO_MILLI)
                }}/> 
                <br/>

                Recess (m) 
                <input type="text" name="recess_time" value={recess_time/MIN_TO_MILLI} onChange={(e) =>{
                    setRecess_time(e.target.value*MIN_TO_MILLI)
                }}/> 
                <br/>

                <button  onClick={(e) => {
                    if(e.target.innerText == 'stop timer'){
                        e.target.innerText = 'start timer'
                        stopWorker()
                    }
                    else if(confirmStartValidity(e)){
                        startWorker()
                        e.target.innerText = 'stop timer'
                    }
                }
                }> start timer </button>

                <button onClick={() => {
                    worker.postMessage({
                        time:time,
                        paused:!paused
                    })
                    let current_color = paused == false 
                        ? background_color_pause : 
                        work_mode == true ? 
                        background_color_work : background_color_recess
                    setPaused(!paused)
                    setBackground_color(current_color)
                    console.log(paused)
                }}> 
                    {paused == false ? 'pause' : 'unpause'}
                </button>
        
                <br/>
                <br/>
                <TimeDisplay time={time}/>
                <br/>
                <br/>
                Intervals Completed = {work_intervals}
            </div>
        </div>
    )
}
