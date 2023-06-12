//This is gonna have to have a point. It's the homepage so it should
//be some important info like a summary of most important todos
//maybe some entry from the book page that is important. Workflow stuff

import React, {Component} from 'react'

export default class Current extends Component{
	constructor(props){
			super(props)
			this.state={
				currentTask:""
			}
		this.handleEvent = this.handleEvent.bind(this)
	}

	handleEvent(){

	}

	render(){
		return(
			<div style={{paddingLeft:'30px'}} >
			</div>
		)
	}
}
