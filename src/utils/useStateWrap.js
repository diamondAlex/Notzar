import { useState } from 'react'

//serializes data in localStorage
export function useStateWrap(name, init){
    let page = window.location.pathname.slice(1)
    page = page == "" ? "root" : page;
    let cachedData; 

    cachedData = JSON.parse(localStorage.getItem(page))
    cachedData = cachedData == null ?  null : cachedData[name]
    let [value, func]  = cachedData == null ?  useState(init) : useState(cachedData)
    //if state was reset (data deleted from storage)
    //update state to 'init', or it will return the prev state
    if(cachedData == null && value != init){
        func(init)
    }

    let wrappedFunc = (updatedState) => {
        let json = JSON.parse(localStorage.getItem(page))
        if(!json) json = {}
        json[name] = updatedState
        localStorage.setItem(page,JSON.stringify(json))
        func(updatedState)
    }
    return [ value, wrappedFunc ] 
}
