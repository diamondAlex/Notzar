import React, { useEffect, useState } from 'react'

export default function Practicer(){
    const [ number1, setNumber1 ] = useState(0)
    const [ number2, setNumber2 ] = useState(0)
    const [ answer, setAnswer ] = useState("")
    const [ check, setCheck ] = useState(0)
    const [ correct, setCorrect ] = useState(0)
    const [ wrong, setWrong ] = useState(0)

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
            let total = correct + 1
            setCorrect(total)
            reroll()
            setAnswer("")
        }
        else{
            let total = wrong + 1
            setWrong(total)
            setAnswer("")
        }
    }

    return (
        <div className='m-7 border-2 w-1/6 p-2 rounded-md'> 
            <div className='h-10 '>
                <div className="float-left text-center h-1/2 m-2"> 
                    {number1} x {number2}  = 
                </div>
                <textarea className='bg-sky-200 w-1/4 h-full text-center rounded ' value={answer} onChange={(e) => {
                    setAnswer(e.target.value)
                    console.log(answer)
                }} />
            </div>
            <div className=''>
                <button className="bg-sky-200 rounded m-2 p-1" onClick={reroll}> reroll </button>
                <button className="bg-sky-200 rounded m-2 p-1" onClick={submit}> submit </button>
                <span className='bg-red-200 text-center ml-2'>&#10005;</span>
                {wrong}
                <span className='bg-green-200 text-center ml-2'>&#10004;</span>
                {correct}
            </div>
        </div>
    )
}
