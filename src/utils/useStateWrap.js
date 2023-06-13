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

    let value;
    let func;

    //console.log("cached data of " + name + " = " +cachedData + " of type " + typeof(cachedData))
    if(cachedData){
        [ value, func ] = useState(cachedData)
    }
    else{
        [ value, func ] = useState(init)
    }

    let wrappedFunc = (updatedState) => {
        localStorage.setItem(name,updatedState)
        func(updatedState)
    }

    return [ value, wrappedFunc ] 
}
