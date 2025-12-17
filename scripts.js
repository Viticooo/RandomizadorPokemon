// Scripts con conexion a la PokeAPI

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

//Boton

//Sprites
const sprite = document.getElementById("sprite")



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



// Eleccion random

const Aleatorio = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;


// Funcion Autoejecutable que manda los cambios, la hago 
// asi para poder usar el async-await en espera de los datos de la API

(async (numero) => {
    // Se busca de esta manera
    const Api = new PokeAPI()

    const ObjetoPokemon = await Api.GetPokemonData(numero)

    // Nombre
    PokeName.innerHTML = `Nombre: <strong>${ObjetoPokemon.name}</strong>`

    // Estadisticas
    hp.innerHTML = `hp: <strong>${ObjetoPokemon.stats.hp}</strong>`
    attack.innerHTML = `Ataque: <strong>${ObjetoPokemon.stats.attack}</strong>`
    defense.innerHTML = `Defensa: <strong>${ObjetoPokemon.stats.defense}</strong>`
    special_attack.innerHTML = `Ataque especial: <strong>${ObjetoPokemon.stats["special-attack"]}</strong>`
    special_defense.innerHTML = `Defensa especial: <strong>${ObjetoPokemon.stats["special-defense"]}</strong>`
    speed.innerHTML = `Velocidad: <strong>${ObjetoPokemon.stats.speed}</strong>`

    // Tipos
    const arrayType = await ObjetoPokemon.type
    const primerTipo = arrayType[0]
    const segundoTipo = arrayType[1]

    if(primerTipo){
        type1.innerHTML = `<p>Tipo 1: <strong>${arrayType[0]}</strong></p>`
    }
    
    if(segundoTipo){
        type2.innerHTML = `<p>Tipo 2: <strong>${arrayType[1]}</strong></p>`
    } else{
        type2.innerHTML = `<p>Tipo 2: <strong>No tiene</strong></p>`
    }

    // Sprites
    const stringSprite = ObjetoPokemon.sprite
    sprite.setAttribute("src", stringSprite)


})(Aleatorio);



