//wtf is BUFFER_RATIO
const BUFFER_RATIO = 10
const MILLI_TO_SEC = 1000

onmessage = async function(e){
	let time = e.data
    console.log(time)
    runWorker(time)
}

async function runWorker(time){
	while(time>0){
		await runTimer()
        time=time-MILLI_TO_SEC
		if(time>=0){
			postMessage(time)
		}
	}
    postMessage("done")
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

