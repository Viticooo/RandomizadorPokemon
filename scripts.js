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
const cambioBtn = document.getElementById("change")

//Sprites
const sprite = document.getElementById("sprite")

// Wiki
const wiki = document.getElementById("wiki")


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


// Funcion Autoejecutable que manda los cambios, la hago 
// asi para poder usar el async-await en espera de los datos de la API
const MostrarPokemon = async () => {
    // Se busca de esta manera

    // Eleccion random

    const Aleatorio = Math.floor(Math.random() * (1025 - 0 + 1)) + 0;

    const Api = new PokeAPI()

    const ObjetoPokemon = await Api.GetPokemonData(Aleatorio)

    // Nombre
    PokeName.innerHTML = `<p class="text-yellow-200 font-bold">Nombre 🠚<strong class="text-white font-bold">
                        ${ObjetoPokemon.name}</strong></p>`

    // Estadisticas
    hp.innerHTML = `<p class="text-rose-500  font-bold">hp 🠚 <strong        class="text-white font-bold">
                    ${ObjetoPokemon.stats.hp}</strong></p>`

    attack.innerHTML = `<p class="text-orange-400 font-bold">Ataque 🠚 <strong class="text-white font-bold">
                        ${ObjetoPokemon.stats.attack}</strong></p>`

    defense.innerHTML = `<p class="text-amber-300 font-bold">Defensa 🠚 <strong class="text-white font-bold">
                        ${ObjetoPokemon.stats.defense}</strong></p>`

    special_attack.innerHTML = `<p class="text-cyan-400 font-bold">Atq. especial 🠚 
                                <strong class="text-white font-bold">${ObjetoPokemon.stats["special-attack"]}</strong></p> `

    special_defense.innerHTML = `<p class="text-indigo-800 font-bold">Def. especial 🠚 
                                <strong class="text-white font-bold">${ObjetoPokemon.stats["special-defense"]}</strong></p>`

    speed.innerHTML = `<p class="text-emerald-400 font-bold">Velocidad 🠚 <strong class="text-white font-bold">
                        ${ObjetoPokemon.stats.speed}</strong>`

    // Tipos
    const arrayType = await ObjetoPokemon.type
    const primerTipo = arrayType[0]
    const segundoTipo = arrayType[1]

    if(primerTipo){
        type1.innerHTML = `<p>Tipo 1 🠚 <strong class="text-white font-bold">${arrayType[0]}</strong></p>`
    }
    
    if(segundoTipo){
        type2.innerHTML = `<p>Tipo 2 🠚 <strong class="text-white font-bold">${arrayType[1]}</strong></p>`
    } else{
        type2.textContent = ""
    }

    // Sprites
    const stringSprite = await ObjetoPokemon.sprite
    sprite.setAttribute("src", stringSprite)


    // info PokeWiki
    const referenciaWiki = `https://www.wikidex.net/wiki/${ObjetoPokemon.name}`
    wiki.setAttribute("href", referenciaWiki)
}


// Funcionamiento del boton
cambioBtn.addEventListener("click", MostrarPokemon);

// Texto para enviar el fix del commit anterior.