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

	handleEvent(value){
		console.log(JSON.stringify({text:value}))
		fetch('http://localhost:3000/setcurrent',{
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				//'Content-Type': 'application/json'
				 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({text:value})
		})
		.then((res) =>{
			console.log(res)
		})
	}
		

	render(){
		let x =1
		return(
			<div style={{paddingLeft:'30px'}} >
                <br/>
                 practice using shift instead of cap locks <br/>
                 practice using tmux copy <br/>
			</div>
		)
	}
}
