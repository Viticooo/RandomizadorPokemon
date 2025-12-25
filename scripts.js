// Scripts con conexion a la PokeAPI

// Importaciones
import {  getHistory ,crearRegistro, cargarHistory } from "./history.js"

// Documentos

//Nombre
const PokeName = document.getElementById("name")

//Estadisticas
const hp = document.getElementById("hp")
const ataque = document.getElementById("attack")
const defensa = document.getElementById("defense")
const special_attack = document.getElementById("special-attack")
const special_defense = document.getElementById("special-defense")
const speed = document.getElementById("speed")
const type1 = document.getElementById("type1")
const type2 = document.getElementById("type2")

// Selector de generacion
const selector = document.getElementById("generaciones")
const rangosPokemon = {
  '0': { inicio: 1, fin: 1025 },
  '1': { inicio: 1, fin: 151 },    // Kanto
  '2': { inicio: 152, fin: 251 },  // Johto
  '3': { inicio: 252, fin: 386 },  // Hoenn
  '4': { inicio: 387, fin: 493 },  // Sinnoh
  '5': { inicio: 494, fin: 649 },  // Unova
  '6': { inicio: 650, fin: 721 },
  '7': { inicio: 722, fin: 809 },
  '8': { inicio: 810, fin: 905 },
  '9': { inicio: 906, fin: 1025 },   
};

//Boton
const cambioBtn = document.getElementById("change")

//Sprites
const sprite = document.getElementById("sprite")

// Wiki
const wiki = document.getElementById("wiki")

// Container history
const container_history = document.querySelector(".sprites")


// Funcion de buscar el pokemon en la API
class PokeAPI {

    // Funcion para la busqueda de info general
    async GetPokemonData(pokemon) {
        this.pokemon = pokemon

        try{
            // Data general del pokemon
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`)

            if(response.ok){
                const data = await response.json()

                // Nombre del Pokemon
                const nombre = await data.species.name

                // Sprite del pokemon
                const sprite = await data.sprites.front_default


                // Objeto/map con la estadisticas en orden del Json
                const mapEstadisticas = {}
                const estadisticas = await data.stats.forEach(stat => {
                    mapEstadisticas[stat.stat.name] = stat.base_stat
                });

                
                return {
                    name: nombre, // Nombre del pokemon
                    stats: mapEstadisticas, // El map de stats
                    type: data.types.map(tipo => tipo.type.name), // Mete en un array los tipos que encuentra
                    sprite: sprite
                }
            } else{
                throw Error("No se pudo conectar a la api")
            }
        } catch ( error ){
            console.log(`Ocurrio el siguiente error: ${error}`)
        }
    }
}

function obtenerIdGen(eleccion){

    const rango = rangosPokemon[eleccion]

    return Math.floor(Math.random() * (rango.fin - rango.inicio + 1)) + rango.inicio;
}

selector.addEventListener("change", () => {
    const gen = selector.value
    console.log(`Se ha seleccionado la generacion: ${gen}`)
    })


// Funcion Autoejecutable que manda los cambios, la hago 
// asi para poder usar el async-await en espera de los datos de la API
const MostrarPokemon = async () => {

    // Eleccion random
    const genActual = selector.value
    const IdRandom = obtenerIdGen(genActual)

    //const Aleatorio = Math.floor(Math.random() * (1025 - 0 + 1)) + 0;

    const Api = new PokeAPI()

    const ObjetoPokemon = await Api.GetPokemonData(IdRandom)

    // Nombre
    PokeName.innerHTML = `<p><strong class="text-yellow-200 font-bold">
                        ${ObjetoPokemon.name}</strong></p>`

    // Estadisticas
    hp.innerHTML = `HP <strong class="text-white font-bold">
                    ${ObjetoPokemon.stats.hp}</strong>`

    attack.innerHTML = `Ataque <strong class="text-white font-bold">${ObjetoPokemon.stats.attack}</strong>`

    defense.innerHTML = `Defensa <strong class="text-white font-bold">${ObjetoPokemon.stats.defense}</strong>`

    special_attack.innerHTML = `Atq. Esp <strong class="text-white font-bold">${ObjetoPokemon.stats["special-attack"]}</strong>`

    special_defense.innerHTML = `Def. Esp <strong class="text-white font-bold">${ObjetoPokemon.stats["special-defense"]}</strong>`

    speed.innerHTML = `Velocidad <strong class="text-white font-bold">${ObjetoPokemon.stats.speed}</strong>`

    // Tipos
    const arrayType = await ObjetoPokemon.type
    const primerTipo = arrayType[0]
    const segundoTipo = arrayType[1]

    if(primerTipo){
        type1.innerHTML = `<p><strong class="text-white font-bold">${arrayType[0]}</strong></p>`
    }
    
    if(segundoTipo){
        type2.innerHTML = `<p><strong class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow">${arrayType[1]}</strong></p>`
    } else{
        type2.innerHTML = ""
        type2.setAttribute("class", "")
    }

    // Sprites
    const stringSprite = await ObjetoPokemon.sprite
    sprite.setAttribute("src", stringSprite)


    // Guardado del sprite en el Historial
    crearRegistro(stringSprite)
    const historial = getHistory()

    container_history.innerHTML = ""

    for(let i =0; i < historial.length; i++){
        const spriteHistory = document.createElement('img')
        // spriteHistory.setAttribute("class", "size-16")
        spriteHistory.setAttribute("src", historial[i]) 
        container_history.appendChild(spriteHistory)
    }


    // info PokeWiki
    const referenciaWiki = `https://www.wikidex.net/wiki/${ObjetoPokemon.name}`
    wiki.setAttribute("href", referenciaWiki)
}


// Historial
document.addEventListener("DOMContentLoaded", () => {
    const historial = getHistory()
    
    container_history.innerHTML = ""
    
    for(let i =0; i < historial.length; i++){
        const spriteHistory = document.createElement('img')
        spriteHistory.setAttribute("class", "")
        spriteHistory.setAttribute("src", historial[i]) 
        container_history.appendChild(spriteHistory)
    }
})


// Funcionamiento del boton
cambioBtn.addEventListener("click", MostrarPokemon);

// Texto para enviar el fix del commit anterior.