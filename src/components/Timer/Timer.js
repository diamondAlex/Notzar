import React, { Component} from 'react'

export default class Timer extends Component{
	constructor(props){
		super(props)
        this.state = {
            time: this.props.time 
        }
        this.worker = new Worker(new URL('./worker.js', import.meta.url))
        this.startWorker = this.startWorker.bind(this)
        this.startWorker(this.state.time)
	}

    startWorker(time){
        this.worker.postMessage(time*1000)
        this.worker.onmessage = (e) =>{
            if(e.data == "done"){
                console.log('done')
                this.props.remove(this.startWorker)
            }
            else{
                this.setState({time: e.data})
            }
        }
    }

	render(){
		let time = this.state.time/1000
		let min = Math.floor(time/60)
		let sec = parseInt(time%60)

		return(
			<div>
				<br/>
				Time: {min} : {sec}
			</div>
		)
	}
}

