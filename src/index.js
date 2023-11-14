import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Home from './Home/Home'
import Books from './Books/Books'
import Current from './Current/Current'
import PomodoroTimer from './PomodoroTimer/PomodoroTimer'
import Practicer from './Practicer/Practicer'
import Workout from './Workout/Workout'

function App(){
    const [currentPage, setCurrentPage] = useState("")

    useEffect(() =>{
        setCurrentPage(window.location.pathname)
    },[currentPage])

    function handleRouting(e){
        e.preventDefault()
        window.history.pushState({page:e.target.name},"",e.target.name)
        setCurrentPage(e.target.name)
    }

    function routes(path){
        switch(path){
            case '/current':
                return <Current/>
            case '/workout':
                return <Workout/>
            case '/books':
                return <Books/>
            case '/pomodoro':
                return <PomodoroTimer/>
            case '/practicer':
                return <Practicer/>
            case '/':
                return <Home/>
            default:
                return ""
        }
    }

    window.onpopstate = () => {
        setCurrentPage(routes(window.location.pathname))
    }

    return(
        <div className='p-2'>
            <div className='mb-4 pl-2 pt-1 text-lg'>
                <a href="/" name="/" onClick={handleRouting}>Home</a>
                 | 
                <a href="/current" name="/current" onClick={handleRouting}>Current</a>
                 | 
                <a href="/workout" name="/workout" onClick={handleRouting}>Workout</a>
                 | 
                <a href="/books" name="/books" onClick={handleRouting}>Books</a>
                 | 
                <a href="/pomodoro" name="/pomodoro" onClick={handleRouting}> Pomodoro </a>
                 | 
                <a href="/practicer" name="/practicer" onClick={handleRouting}> Practicer </a>
            </div>
            <div> {routes(currentPage)} </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
