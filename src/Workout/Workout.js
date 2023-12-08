//TODO  -   save the state to local storage
//      -   the current exercise, which determines where the amt is added, is only set when clicking on the textarea
//          so it doesn't work by tabbing over to it, it's awful btw
//      -   add a % of total lifts done
import React, { useState, useEffect } from 'react'

let example_workout = {
    "pushups":{
        "current":0,
        "goal":100
    },
    "squats":{
        "current":0,
        "goal":100
    },
    "grippers":{
        "current":0,
        "goal":200
    },
    "calf raise":{
        "current":0,
        "goal":200
    }
}

let container_class = "h-20 inline-flex my-4 m-4 w-11/12 border-2 rounded"
let text_class = "border-2 border-gray-400 rounded ml-2 h-1/2 m-4 w-10"
let button_class = "rounded border-solid border-2 ml-2 mr-2 w-8 h-1/2 m-4"
let misc_class ='pt-5 mx-2 text-lg'

//this is truly horrendous code, but ok
let Add = (props) => {
    return (
        <div className={container_class}>
            <div id={"animation" + props.ex} className='m-2 w-8 h-16 border-solid border-2'></div>
            <div className={misc_class}> { props.ex } </div>
            <textarea id={props.ex} 
                className={text_class} 
                onClick={() => props.setCurrent(props.ex)} 
                onKeyDown={(e) => {e.key == "Enter"? e.preventDefault():false; e.key == 'Enter'? props.onClick(props.ex):false}}
                onChange={(e) => props.onChange(e.target.value)}> 
            </textarea>
            <button className={button_class} onClick={() => props.onClick(props.ex)}> + </button>
            <div className={misc_class}>{props.current}/{props.amt}</div>
        </div>
    )
}

let x = 1
setInterval(() => {
    let div = document.getElementById("animationpushups") 
    if(!div) return
    div.style.backgroundImage = `url('move${x}.png')`;
    div.style.backgroundSize= 'cover'
    x == 1 ? x = 2: x = 1;
},1000)

export default function Workout(){
    const [ workout, setWorkout] = useState(example_workout)
    const [ value, setValue ] = useState(0)
    const [ current, setCurrent ] = useState("")


    useEffect(() => {
        window.addEventListener("keydown", (e) =>{
            if(e.key == "Enter"){
                console.log(current)
                if(current != ""){
                    addToWorkout(current)
                }
            }
        })
    },[])

    function addToWorkout(ex){
        console.log("in add")
        if(ex != current) return
        let new_workout = {...workout}
        let x = parseInt(value)
        if(!Number.isInteger(x)) return
        new_workout[ex].current += x
        document.getElementById(ex).value = ""
        setWorkout(new_workout)
        setValue(0)
    }

    let element_array = Object.keys(example_workout).map((e) => {
        return (<Add key={e} setCurrent={setCurrent} onClick={addToWorkout} onChange={setValue} value={value} current={workout[e].current} ex={e} amt={workout[e].goal} />)
    })
    
    return (
        <div className="rounded border-solid border-2 w-1/3"> 
            {element_array}
        </div>
    )
}
