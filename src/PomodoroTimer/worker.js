//buffer ratio is the amount of time we run a setTimeout, the higher it is, the shorter the setTimeout
//do not go beyond 10 as it will spawn too many timeouts
const BUFFER_RATIO = 10
const MILLI_TO_SEC = 1000

//prevents multiple timer from running
let running = false

let pauseFlag = false
let unpauseFlag = false


onmessage = async function(e){
	let {time,paused} = e.data
    pauseFlag = paused
	if(running == false){
        let now = new Date().getTime();
        let target = now + time 
		runWorker(target)
	}
}

async function runWorker(target){
	running = true
    let current = new Date().getTime()
    let remainder

	while(current <= target){
        await runTimer()
        if (!pauseFlag){
            if(unpauseFlag){
                unpauseFlag = false
                target = new Date().getTime() + remainder
            }
            current = new Date().getTime()
            remainder = target - current
            if(remainder >= 0){
                postMessage(remainder)
            }
            else{
                postMessage(0)
            }
		}
        else{
            unpauseFlag = true
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

