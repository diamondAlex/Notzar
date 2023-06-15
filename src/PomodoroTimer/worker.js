const TIMEOUT_DURATION_RATIO = 10
const MILLI_TO_SEC = 1000

onmessage = async function(e){
    let now = new Date().getTime();
    let target = now + e.data.time
    runWorker(target)
}

async function runWorker(target){
    let current = new Date().getTime()
    let remainder
	while(current <= target){
        await runTimer()
            current = new Date().getTime()
            remainder = target - current
            remainder >= 0 ? postMessage(remainder):postMessage(0)
    }
}

async function runTimer(){
	let now = new Date().getTime();
	let target = now + MILLI_TO_SEC
	while((new Date().getTime()) < target){
		await new Promise((resolve) => {
			setTimeout(resolve,MILLI_TO_SEC/TIMEOUT_DURATION_RATIO)
		})
	}
}

