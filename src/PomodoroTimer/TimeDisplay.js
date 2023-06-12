import React, { Component} from 'react'

export default class TimeDisplay extends Component{

	constructor(props){
		super(props)
	}

	render(){
		
		let time = this.props.time/1000
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
