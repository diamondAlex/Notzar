import React, { useEffect, useState } from 'react'

export default function Practicer(){
    const [ number1, setNumber1 ] = useState(0)
    const [ number2, setNumber2 ] = useState(0)
    const [ answer, setAnswer ] = useState("")
    const [ check, setCheck ] = useState(0)

    useEffect(() =>{
        window.addEventListener("keydown", (e) => {
            if(e.code == "Enter" || e.code == "NumpadEnter") setCheck(1)
        })
    },[])
    
    useEffect(() =>{
        if(number1*number2 == 0) reroll()
        if(check == 1){
            setCheck(0)
            submit()
        }
    }, [number1,number2, check])

    function reroll(){
        setNumber1(Math.floor(Math.random() * 12))
        setNumber2(Math.floor(Math.random() * 12))
    }

    function submit(){
        if(answer == "") return
        if(answer == (number1 * number2)){
            alert("good answer")
            reroll()
            setAnswer("")
        }
        else{
            alert("bad answer :(")
            setAnswer("")
        }
    }

    return (
        <div> 
            <span style={{width:'50px',margin:"10px"}}> 
                {number1} x {number2} 
            </span>
            <textarea style={{height:"25px",width:"50px"}} value={answer} onChange={(e) => {
                setAnswer(e.target.value)
                console.log(answer)
            }} />
            <br/>
            <button onClick={reroll}> reroll </button>
            <button onClick={submit}> submit </button>
        </div>
    )
}
