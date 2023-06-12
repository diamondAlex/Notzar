import React, { Component } from 'react'

export default class ProjectDisplay extends Component{
	constructor(props){
		super(props)
		this.processProps = this.processProps.bind(this)
        console.log(props)
	}

	processProps(){
        let props = this.props
		if(props.length != 0){
			let projects = Object.keys(props)
			let times = Object.values(props)
			let lines = []
			let i = 0
			for(var project of projects){
				let line = (<div> {project} : {times[i]} </div>)
				lines.push(line)
				i++
			}
			return lines
		}
		return(
			<div></div>
		)
	}

	render(){
		return (
			<div>
				{this.processProps()}
			</div>
		)
	}
}
