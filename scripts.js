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

    const Aleatorio = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

    const Api = new PokeAPI()

    const ObjetoPokemon = await Api.GetPokemonData(Aleatorio)

    // Nombre
    PokeName.innerHTML = `<p style="color: Yellow;">Nombre -> <strong style="color: white;">
                        ${ObjetoPokemon.name}</strong></p>`

    // Estadisticas
    hp.innerHTML = `<p style="color: red;">hp -> <strong        style="color: white;">
                    ${ObjetoPokemon.stats.hp}</strong></p>`

    attack.innerHTML = `<p style="color: #DE7321;">Ataque -> <strong style="color: white;">
                        ${ObjetoPokemon.stats.attack}</strong></p>`

    defense.innerHTML = `<p style="color: #DE7321;">Defensa -> <strong style="color: white;">
                        ${ObjetoPokemon.stats.defense}</strong></p>`

    special_attack.innerHTML = `<p style="color: Yellow;">Ataque especial -> 
                                <strong style="color: white;">${ObjetoPokemon.stats["special-attack"]}</strong></p> `

    special_defense.innerHTML = `<p style="color: Yellow;">Defensa especial -> 
                                <strong style="color: white;">${ObjetoPokemon.stats["special-defense"]}</strong></p>`

    speed.innerHTML = `<p style="color: #35D7E9;">Velocidad -> <strong style="color: white;">
                        ${ObjetoPokemon.stats.speed}</strong>`

    // Tipos
    const arrayType = await ObjetoPokemon.type
    const primerTipo = arrayType[0]
    const segundoTipo = arrayType[1]

    if(primerTipo){
        type1.innerHTML = `<p>Tipo 1 -> <strong>${arrayType[0]}</strong></p>`
    }
    
    if(segundoTipo){
        type2.innerHTML = `<p>Tipo 2 -> <strong>${arrayType[1]}</strong></p>`
    } else{
        type2.innerHTML = `<p>Tipo 2 -> <strong>No tiene</strong></p>`
    }

    // Sprites
    const stringSprite = await ObjetoPokemon.sprite
    sprite.setAttribute("src", stringSprite)
}


// Funcionamiento del boton
cambioBtn.addEventListener("click", MostrarPokemon);

