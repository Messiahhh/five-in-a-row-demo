
let work = new Worker('worker.js')

let div = document.querySelector('.q')

work.postMessage(1000)

work.addEventListener('message', (e) => {
    let arr = e.data 
    console.log(...arr)
    
})

   