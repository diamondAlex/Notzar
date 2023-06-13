import React from 'react'

export default function ProjectDisplay(props){
    const { length } = props;

	function processProps(){
		if(length != 0){
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

    return (
        <div>
        {processProps()}
        </div>
    )
}
