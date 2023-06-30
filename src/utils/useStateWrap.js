import { useState } from 'react'

export function useStateWrap(name, init){
    let page = window.location.pathname.slice(1)
    let cachedData; 

    cachedData = JSON.parse(localStorage.getItem(page))
    cachedData = cachedData == null ?  null : cachedData[name]
    const [ value, func ] = cachedData == null ?  useState(init) : useState(cachedData)

    let wrappedFunc = (updatedState) => {
        let json = JSON.parse(localStorage.getItem(page))
        if(!json) json = {}
        json[name] = updatedState
        localStorage.setItem(page,JSON.stringify(json))
        func(updatedState)
    }
    return [ value, wrappedFunc ] 
}
