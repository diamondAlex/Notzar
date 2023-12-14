//TODO  -   save the state to local storage
//      -   the current exercise, which determines where the amt is added, is only set when clicking on the textarea
//          so it doesn't work by tabbing over to it, it's awful btw
//      -   add a % of total lifts done
import React, { useState, useEffect } from 'react'
import { useStateWrap } from '../utils/useStateWrap'

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
    const [ workout, setWorkout] = useStateWrap("workout",[])
    const [ value, setValue ] = useState(0)
    const [ current, setCurrent ] = useState("")
    const [ show, setShow ] = useState("")


    useEffect(() => {
        window.addEventListener("keydown", (e) =>{
            if(e.key == "Enter"){
                if(current != ""){
                    addToWorkout(current)
                }
            }
        })
    },[])

    function addExercise(ex, amt){
        workout.push({name:ex,current:0,goal:amt})
        setWorkout(workout)
    }

    function addToWorkout(ex){
        if(ex != current) return
        let new_workout = [...workout]

        let x = parseInt(value)
        if(!Number.isInteger(x)) return

        new_workout.find((e) => e.name == ex).current += x
        document.getElementById(ex).value = ""

        setWorkout(new_workout)
        setValue(0)
    }

    
    return (
        <div className="rounded border-solid border-2 w-1/3"> 
        {
            workout.map((e) => {
                return (
                    <Add key={e.name} 
                        setCurrent={setCurrent} 
                        onClick={addToWorkout} 
                        onChange={setValue} 
                        value={value} 
                        current={e.current} 
                        ex={e.name} 
                        amt={e.goal} 
                    />)
            })
        }
        <button className="border-2 rounded h-10 w-10" onClick={()=>setShow(1)} > add </button>
        <DialogAdder show={show} close={setShow} send={addExercise}/>
        </div>
    )
}

let className = 'align-top border-2 h-20 w-72'

function DialogAdder(props){
    let { show } = props
    if(!show) return <dialog/>

    const [ exercise, setExercise ] = useState("")
    const [ amt, setAmt ] = useState("")

    return (
        <dialog open>
            <div className='border-2 flex-box flex-col w-1/3'>
                exercise:<textarea className={className} value={exercise} onChange={(e)=>setExercise(e.target.value)}/>
                goal:<textarea className={className} value={amt} onChange={(e)=>setAmt(e.target.value)}/>
                <button className='border-2 flex' onClick={()=>{
                    props.close(0)
                    props.send(exercise,amt)
                }}>send</button>
                <button className='border-2 flex' onClick={()=>{
                    props.close(0)
                }}>close</button>
            </div>
        </dialog>
    )
}
