// Modulo de guardado del Historial de Pokemones

// Storage principal
const DB_KEY = "history"


export function getHistory(){

    const data = localStorage.getItem(DB_KEY)
    return data ? JSON.parse(data) : []
}


export function saveHistory(data){


    const dataString = JSON.stringify(data)
    localStorage.setItem(DB_KEY, dataString)
}


export async function crearRegistro(nuevoSprite){

    const history = getHistory()

    if(history.length < 6){
        history.push(nuevoSprite)
    }

    if (history.length === 6){
        history.unshift(nuevoSprite)
        history.pop(5)
    }

    saveHistory(history)

    console.log(`Hemos agregado a ${nuevoSprite.sprite} al registro`)
}



export function cargarHistory(){

    const historial = getHistory()
    
    container_history.innerHTML = ""
    
    for(let i =0; i < historial.length; i++){
        const spriteHistory = document.createElement('img')
        spriteHistory.setAttribute("class", "")
        spriteHistory.setAttribute("src", historial[i]) 
        container_history.appendChild(spriteHistory)
    }

}