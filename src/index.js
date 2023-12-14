import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Cards from './Cards/Cards'
import Calendar from './Calendar/Calendar'
import Books from './Books/Books'
import Current from './Current/Current'
import PomodoroTimer from './PomodoroTimer/PomodoroTimer'
import Practicer from './Practicer/Practicer'
import Workout from './Workout/Workout'
import Tracker from './Tracker/Tracker';
import Day from './Day/Day';

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
            case '/cards':
                return <Cards/>
            case '/calendar':
                return <Calendar/>
            case '/day':
                return <Day/>
            case '/tracker':
                return <Tracker/>
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
            default:
                return <Current/>
        }
    }

    window.onpopstate = () => {
        setCurrentPage(routes(window.location.pathname))
    }

    return(
        <div className='p-2'>
            <div className='mb-4 pl-2 pt-1 text-lg'>
                <a href="/current" name="/current" onClick={handleRouting}>Current</a>
                 | 
                <a href="/cards" name="/cards" onClick={handleRouting}>Cards</a>
                 | 
                <a href="/day" name="/day" onClick={handleRouting}>Day</a>
                 | 
                <a href="/tracker" name="/tracker" onClick={handleRouting}>Tracker</a>
                 | 
                <a href="/workout" name="/workout" onClick={handleRouting}>Workout</a>
                 | 
                <a href="/books" name="/books" onClick={handleRouting}>Books</a>
                 | 
                <a href="/calendar" name="/calendar" onClick={handleRouting}>Calendar</a>
                 | 
                <a href="/pomodoro" name="/pomodoro" onClick={handleRouting}>Pomodoro</a>
                 | 
                <a href="/practicer" name="/practicer" onClick={handleRouting}>Practicer</a>
            </div>
            <div> {routes(currentPage)} </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
