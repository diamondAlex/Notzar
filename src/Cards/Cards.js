import React, { useEffect, useState } from 'react'

export default function Cards(){
    const [ cards, setCards ] = useState([])
    const [ index, setIndex ] = useState(0)
    const [ card, setCard ] = useState("")
    const [ content, setContent ] = useState("")
    const [ show, setShow ] = useState(0)
    const [ refresh, setRefresh ] = useState(0)

    function setTime(){
        let start = 4 
        let end = 20
        let range = end - start
        let date = new Date()
        let minutes = date.getMinutes()
        let hours = date.getHours()
        hours = (hours + minutes/60) - start
        setTimeout(() => {
            console.log("updated %")
            setRefresh(refresh + 1)
        },612000)
        return Math.round(hours/range*100)
    }

    useEffect(() => {
        let data = localStorage.getItem("cards")
        if(!data){
            localStorage.setItem("cards",JSON.stringify([]))
        }
        setTime()
    },[])

    useEffect(() =>{
        getCards()
    },[show])

    function getCards(new_index){
        fetch('http://localhost:9001/getcards', {method: "GET"}) 
        .then((res) =>{
            res.text().then((text) =>{
                let json = JSON.parse(text)
                if(new_index==null){
                    new_index = index
                }
                if(json.length == 1){
                    new_index = 0
                }
                setCards(json)
                setCard(json[new_index])
                setContent(json[new_index].question)
            })
        })
    }

    async function deleteCard(){
        console.log("del")
        if(cards.length == 1) {
            alert("you don't have enough cards to remove them") 
            return
        }

        let id = card.id
        await fetch('http://localhost:9001/delcards', {
            method: "POST",
            body:JSON.stringify({id:card.id})
        }) 
        let data = JSON.parse(localStorage.getItem("cards"))
        let new_data = data.filter((e) => e.id != id)
        localStorage.setItem("cards",JSON.stringify(new_data))
        let new_index = set_next_content(-1)
        getCards(new_index)
    }

    function send_new_card(question,answer){
        fetch('http://localhost:9001/setcards', {
            method: "POST",
            body:JSON.stringify({question:question,answer:answer})
        }) 
    }

    function set_next_content(inc){
        let new_index = 0 
        if(inc == -1){
            new_index = index  > 0 ? index-1: cards.length-1
            setCard(cards[new_index])
            setContent(cards[new_index].question)
            setIndex(new_index)
        }else{
            new_index = index +1< cards.length ? index+1: 0
            setCard(cards[new_index])
            setContent(cards[new_index].question)
            setIndex(new_index)
        }
        return new_index
    }

    function setPass(res){
        let data = JSON.parse(localStorage.getItem("cards"))
        let new_item = {id:card.id, res:res}
        data.push(new_item)
        localStorage.setItem("cards",JSON.stringify(data))
        set_next_content(1)
    }
    
    return(
        <div className='rounded inline-flex m-2 p-4 border-2 w-1/2 h-1/2'>
            <div className='relative flex flex-col w-12'>
                <button className="border-2 rounded h-10 w-10 align-middle" onClick={()=>set_next_content(-1)}> prev </button>
                <button className="absolute bottom-20 border-2 rounded h-10 w-10" onClick={()=>deleteCard()}> del </button>
                <button className="absolute bottom-0 border-2 rounded h-10 w-10" onClick={()=>setPass(0)} > FAIL </button>
            </div>
            <div onClick={() =>{
                if(content == card.question){
                    setContent(card.answer)
                }else{
                    setContent(card.question)
                }
            }} className='rounded border-2 mx-4 p-2 flex-1'> {content} </div>
            <div className='relative flex flex-col w-12'>
                <button className="border-2 rounded h-10 w-10" onClick={()=>set_next_content(1)}> next </button>
                <button className="absolute bottom-20 border-2 rounded h-10 w-10" onClick={()=>setShow(1)}> new </button>
                <button className="absolute bottom-0 border-2 rounded h-10 w-10" onClick={()=>setPass(1)} > PASS </button>
            </div>
                <DialogAdder show={show} close={setShow} send={send_new_card}/>
        </div>
    )
}

let className = 'align-top border-2 h-20 w-72'

function DialogAdder(props){
    let { show } = props
    if(!show) return <dialog/>

    const [ question, setQuestion ] = useState("")
    const [ answer, setAnswer ] = useState("")
    const [ subject, setSubject ] = useState("")

    return (
        <dialog open>
            <div className='border-2 flex-box flex-col w-1/3'>
                Question:<textarea className={className} value={question} onChange={(e)=>setQuestion(e.target.value)}/>
                Answer:<textarea className={className} value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                Subject:<textarea className='align-top border-2 h-8 w-32' value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                <button className='border-2 flex' onClick={()=>{
                    props.close(0)
                    props.send(question,answer)
                }}>send</button>
                <button className='border-2 flex' onClick={()=>{
                    props.close(0)
                }}>close</button>
            </div>
        </dialog>
    )
}
