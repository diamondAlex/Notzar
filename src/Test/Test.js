import React, { Component } from 'react'
import Timer from '../components/Timer/Timer'

export default class Test extends Component{
    constructor(props){
        super(props)
        this.state = {
            time:0
        }
        this.current = 0
        this.removeItem = this.removeItem.bind(this)
        this.items = [
            "w1",
            "w1",
            "w1",
        ]
    }

    componentDidMount() {
        this.current++
        this.setState({time:5},
            () => console.log(this.state.time)
        )
    }


    removeItem(cb){
        cb(5)
    }

    render(){
        console.log(this.state.time)
        return (
            <div> 
                <div>
                    {this.items.map((e) => { 
                        return <div> { e }<br/> </div>
                    })} 
                </div>
                <div>
                    { this.state.time == 0 ? <div>test</div> : <Timer time={this.state.time} remove={this.removeItem} /> }
                </div>
            </div>
        )
    }
}
