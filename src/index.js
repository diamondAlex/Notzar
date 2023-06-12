import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Books from './Books/Books'
import Current from './Current/Current'
import PomodoroTimer from './PomodoroTimer/PomodoroTimer'

class App extends Component {
    constructor(){
        super()
        this.state = {
            currentPage:""
        }

        this.handleRouting = this.handleRouting.bind(this)
        this.routes = this.routes.bind(this)
    }

    componentDidMount(){
        var path = this.routes(window.location.pathname)
        this.setState({currentPage:path})
    }

    handleRouting(e){
        e.preventDefault()
        window.history.pushState({page:e.target.name},"",e.target.name)
        let page = this.routes(e.target.name)
        this.setState({currentPage:page})
    }

    routes(path){
        switch(path){
            case '/current':
                return <Current/>
            case '/books':
                return <Books/>
            case '/pomodoro':
                return <PomodoroTimer/>
            case '/':
                return <Current/>
            default:
                return ""
        }
    }

    render(){
        window.onpopstate = (event) => {
            this.setState({currentPage:this.routes(window.location.pathname)})
        }
        return(
            <div>
                <a href="/current" name="/current" onClick={this.handleRouting}>Current</a>
                 | 
                <a href="/books" name="/books" onClick={this.handleRouting}>Books</a>
                 | 
                <a href="/pomodoro" name="/pomodoro" onClick={this.handleRouting}> pomodoro </a>
                <br/>
                <br/>
                <div> {this.state.currentPage} </div>
            </div>
        )
    } 
}

ReactDOM.render(<App />, document.getElementById('root'));
