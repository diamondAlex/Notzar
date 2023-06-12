/*
 * Input time is in minutes.
 * State time is in millisecond (all worker communication is in millisecond)
 * By default, long pause will happen every 3 interval and will be 3x time
 * TODO: - In the last 10 seconds, display needs to be 0:09, not 0:9
 * 		- stop then start should reset paused to unpaused
 * 		- add a time slot related note/text field (ex: at 9:00 - feeling cute)
 */
import React, { Component } from 'react'
import TimeDisplay from './TimeDisplay'

const background_color_work = '#7FFFD4'
const background_color_recess = '#00FFFF'
const background_color_pause = '#EF5252'

const MIN_TO_MILLI = 60*1000

export default class PomodoroTimer extends Component{
	constructor(props){
		super(props)

		this.state = {
			worker:null,
			time:0,
			work_intervals:0,
			recess_time:0,
			interval_time:0,
			paused:false,
			work_mode:true,
			background_color:'white',
		}
		this.startWorker = this.startWorker.bind(this)
		this.stopWorker = this.stopWorker.bind(this)
		this.confirmStartValidity = this.confirmStartValidity.bind(this)
        this.audio = new Audio('public/test.mp3')
        this.worker = null
	}
	
	confirmStartValidity(){
		if(this.state.recess_time && this.state.interval_time){
			return true
		}
		else{
			alert("youre missing some data")
			return false
		}
	}

	stopWorker(){
		this.worker.terminate()
		this.setState({
            background_color:"white",
            work_mode:false,
            time:0,
            work_intervals: 0
        })
	}

	startWorker(){
		this.worker = new Worker(new URL('./worker.js',import.meta.url))

		this.setState({
            work_mode:true,
            background_color:background_color_work
        })

		this.worker.postMessage({
			time:this.state.interval_time,
			paused:this.state.paused
		})

		this.worker.onmessage = (e) =>{
			this.setState({
				time:e.data
			})

			//From recess to work
			if(e.data == 0 && this.state.work_mode == false){
				this.audio.play()
				this.setState({
					background_color:background_color_work,
					work_mode:true,
					time:this.state.interval_time
				},() =>{
					worker.postMessage({time:this.state.interval_time,paused:this.state.paused})
				})
			}

			//From work to recess
			else if(e.data==0 && this.state.work_mode== true){
				this.audio.play()
				this.setState({
					background_color:background_color_recess,
					work_mode:false,
					time:this.state.recess_time,
					work_intervals: this.state.work_intervals + 1,
				}, () =>{
					let recess_time = this.state.work_intervals%3 == 0 ?
						this.state.recess_time * 3 :
						this.state.recess_time
					worker.postMessage({time:recess_time,paused:this.state.paused})
				})
			}
		}
	}

	render(){
		return(
			<div>
				<div style={{background:this.state.background_color, float:'left',width:"50%"}}>
					Intervals (m)
					<input type="text" name="interval_time" onChange={(e) =>{
						this.setState({interval_time:e.target.value*MIN_TO_MILLI})
					}}/> 
					<br/>

					Recess (m) 
					<input type="text" name="recess_time" onChange={(e) =>{
						this.setState({recess_time:e.target.value*MIN_TO_MILLI})
					}}/> 
					<br/>

					<button  onClick={(e) => {
						if(e.target.innerText == 'stop timer'){
							e.target.innerText = 'start timer'
							this.stopWorker()
						}
						else if(this.confirmStartValidity(e)){
							this.startWorker()
							e.target.innerText = 'stop timer'
						}
					}
					}> start timer </button>

					<button onClick={() => {
						this.worker.postMessage({
							time:this.state.time,
							paused:!this.state.paused
						})
						let current_color = this.state.paused == false 
							? background_color_pause : 
							this.state.work_mode == true ? 
							background_color_work : background_color_recess
						this.setState({
						paused:!this.state.paused,
						background_color:current_color
						})
						console.log(this.state.paused)
					}}> 
						{this.state.paused == false ? 'pause' : 'unpause'}
					</button>
			
					<br/>
					<br/>
					<TimeDisplay time={this.state.time}/>
					<br/>
					<br/>
					Intervals Completed = {this.state.work_intervals}
				</div>
			</div>
		)
	}
}
