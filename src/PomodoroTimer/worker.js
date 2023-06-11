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
		runWorker(time)
	}
}

async function runWorker(time){
	running = true
	while(time>0){
		await runTimer()
        console.log("IN TIMER")
		if(!paused_flag){
			time=time-MILLI_TO_SEC
		}
		if(time>=0){
			postMessage(time)
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

