//wtf is BUFFER_RATIO
const BUFFER_RATIO = 10
const MILLI_TO_SEC = 1000

//prevents substracting time
let paused_flag = false
//prevents multiple timer from running
let running = false


onmessage = async function(e){
	let {time,paused} = e.data
	
	paused_flag = paused
	if(running == false){
        let now = new Date().getTime();
        target = now + time 
		runWorker(target)
	}
}

async function runWorker(target){
	running = true
	while(new Date().getTime() <= target){
        console.log("still be timing")
		await runTimer()
        console.log("IN TIMER")
        let remainder = target - new Date().getTime()
		if(remainder >= 0){
			postMessage(remainder)
		}
	}
	running = false
}

async function runTimer(){
	let now = new Date().getTime();
	let target = now + MILLI_TO_SEC
	while((new Date().getTime()) < target){
		await new Promise((resolve) => {
			setTimeout(resolve,MILLI_TO_SEC/BUFFER_RATIO)
		})
	}
}

