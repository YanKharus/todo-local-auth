const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const timerBegin = document.querySelector('.start')
const timerReset = document.querySelector('.reset')
const timerPause = document.querySelector('.pause')
const timerInput = document.querySelector('.timer')
const timerDisplay = document.querySelector('.timer-display')
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
// timer related---------------------------timer related-------------------------- timer related
class timer {
    static #timerId;
    static #timeBlock;
    static #time;
    static pauseTrigger() {
        timerPause.classList.add('hidden')
        timerBegin.classList.remove('hidden')
        timer.#time = timerDisplay.textContent  // holding leftover time between pauses
        clearInterval(timer.#timerId)
    }
    static startTrigger() {
        if (timerInput.value && (!timerInput.classList.contains('hidden'))) { // to prevent reassignment
            timer.#time = timerInput.value
        } 
        if (!timerDisplay.classList.contains('hidden')) {
            timer.#timeBlock = timerInput.value
        }
        
        timerInput.classList.add('hidden')
        timerPause.classList.remove('hidden')
        timerBegin.classList.add('hidden') 
        timerDisplay.textContent = timer.#time;  // theres an awkward 1 second delay before the timer shows up
        timer.#timerId = setInterval((() => {
            timer.#time--
            timerDisplay.textContent = timer.#time;
            if(timer.#time == 0) {
                clearInterval(timer.#timerId) 
                timerPause.classList.add('hidden')
                timerDisplay.textContent = `Congratulations you finished a session of ${timer.#timeBlock}, take a break!`
            }
        }),1000)
    }
    static resetTrigger() {
        clearInterval(timer.#timerId)
        timerBegin.classList.remove('hidden')
        timerInput.classList.remove('hidden')
        timerPause.classList.add('hidden')
        timerDisplay.textContent = null
        timerInput.value = ''
    }
    
}

timerBegin.addEventListener('click', timer.startTrigger)
timerPause.addEventListener('click', timer.pauseTrigger)
timerReset.addEventListener('click', timer.resetTrigger)
