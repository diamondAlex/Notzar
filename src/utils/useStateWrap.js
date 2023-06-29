import { useState } from 'react'

export function useStateWrap(name, init){
    let cachedData; 

    cachedData = JSON.parse(localStorage.getItem(name))

    const [ value, func ] = cachedData == null ?  useState(init) : useState(cachedData)

    let wrappedFunc = (updatedState) => {
        localStorage.setItem(name,JSON.stringify(updatedState))
        if(name == 'work_mode'){
            console.log("cached data of " + name + " = " + localStorage.getItem(name) + " of type " + typeof(cachedData))
        }
        func(updatedState)
    }

    return [ value, wrappedFunc ] 
}
