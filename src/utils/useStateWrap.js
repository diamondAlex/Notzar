import { useState } from 'react'

export default function useStateWrap(name, init){
    let cachedData; 

    //this tries to return the proper data type from storage
    try{
        cachedData = JSON.parse(localStorage.getItem(name))
    }
    catch(err){
        //not valid json, will keep as string 
        cachedData = localStorage.getItem(name)
    }

    const [ value, func ] = cachedData == null ?  useState(cachedData) : useState(init)

    let wrappedFunc = (updatedState) => {
        localStorage.setItem(name,updatedState)
        if(name == 'work_mode'){
            console.log("cached data of " + name + " = " + localStorage.getItem(name) + " of type " + typeof(cachedData))
        }
        func(updatedState)
    }

    return [ value, wrappedFunc ] 
}
