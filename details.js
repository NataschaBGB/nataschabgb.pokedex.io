let params = new URLSearchParams(window.location.search)

const pokemonName = params.get("name")

/* MARK: FETCH
*/
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) =>
        response.json()
    )
    .then((data) => {
        // insert header, pokemons and footer in html
        header()
        details(data)
        footer(data)
        // change title to pokemon name with first letter capitalized
        document.title = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    })


// get wrapper div in html
const wrapper = document.querySelector("#wrapper")



/* MARK: HEADER
*/
// ------------------------------- CONSTRUCT HEADER FOR CSS STYLE -------------------------------

function header() {

    // create top div
    const createHeaderDiv = /*html*/`<header class="pokemonsBanner"></header>`
    // insert pokemons-banner div in wrapper
    wrapper.insertAdjacentHTML("afterbegin", createHeaderDiv)

    // get top div in html
    const headerDiv = wrapper.querySelector(".pokemonsBanner")

    const bannerStyle = /*html*/`
        <div class="power">
            <div class="powerLight"></div>
        </div>
        <div class="pokeball"></div>`

    // insert searchbar in footer selected earlier
    headerDiv.insertAdjacentHTML("beforeend", bannerStyle)

}


/* MARK: DISPLAY POKEMONS
*/
// ------------------------------- DISPLAY POKEMONS -------------------------------

// create div to contain all pokemons in grid
const createPokemonsDiv = /*html*/`<div class="pokemons"></div>`
// insert pokemons div in wrapper
wrapper.insertAdjacentHTML("beforeend", createPokemonsDiv)
// get created pokemons div in html
const pokemonsDiv = wrapper.querySelector(".pokemons")

// DISPLAY POKEMONS
function details(data) {
    
    // console.log(data);
    // console.log(data.id);
    

    // create figure html to display pokemon in html
    const pokemonTemplate = /*html*/`
        <figure>
            <h1>${data.name}</h1>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png">
        </figure>`

    // insert figure in pokemons div selected earlier
    pokemonsDiv.insertAdjacentHTML("beforeend", pokemonTemplate)

}


/* MARK: FOOTER
*/
// ---------------- FOOTER ----------------

// create bottom div
const createFooterDiv = /*html*/`<footer class="pokemons-footer"></footer>`
// insert pokemons-footer div in wrapper
wrapper.insertAdjacentHTML("beforeend", createFooterDiv)

// get footer div in html
const footerDiv = document.querySelector(".pokemons-footer")

function footer(data) {

    const details = /*html*/`
        <div class="info">
            <div class="details">
                <div class="height">
                    <p class="title">Height</p>
                    <p>${data.height.toString().length === 1 
                    ? "0," + data.height 
                    : data.height.toString().slice(0, -1) + "," + data.height.toString().slice(-1)} m</p>
                </div>
                <div class="weight">
                    <p class="title">Weight</p>
                    <p> ${data.weight.toString().length === 1 
                    ? "0," + data.weight 
                    : data.weight.toString().slice(0, -1) + "," + data.weight.toString().slice(-1)} kg</p>
                </div>
                <div class="type">
                    <p class="title">Type</p>
                    <p>${data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1)}</p>
                </div>
            </div>
            <div class="stats">
                <p class="title">Base Stats</p>
                <div class="stat_hp">
                    <label for="hp" class="title">HP:</label>
                    ${data.stats[0].base_stat} / 255
                    <meter id="hp" value="${data.stats[0].base_stat}" min="0" low="60" high="120" optimum="180" max="255">${data.stats[0].base_stat}</meter>
                </div>
                <div class="stat_attack">
                    <label for="attack" class="title">Attack:</label>
                    ${data.stats[1].base_stat} / 180
                    <meter id="attack" value="${data.stats[1].base_stat}" min="0" low="40" high="80" optimum="140" max="180">${data.stats[1].base_stat}</meter>
                </div>
                <div class="stat_defense">
                    <label for="defense" class="title">Defense:</label>
                    ${data.stats[2].base_stat} / 200
                    <meter id="defense" value="${data.stats[2].base_stat}" min="0" low="50" high="90" optimum="160" max="200">${data.stats[2].base_stat}</meter>
                </div>
                <div class="stat_speed">
                    <label for="speed" class="title">Speed:</label>
                    ${data.stats[5].base_stat} / 200
                    <meter id="speed" value="${data.stats[5].base_stat}" min="0" low="50" high="90" optimum="160" max="200">${data.stats[5].base_stat}</meter>
                </div>
            </div>
            <div class="abilities">
                <p class="title">Abilities:</p>
                <ul>
                ${data.abilities.map((ability)=>{
                    return /*html*/`<li class="ability">${ability.ability.name}</li>`
                }).join("")}
                </ul>
            </div>
        </div>`

    // insert searchbar in footer selected earlier
    footerDiv.insertAdjacentHTML("beforeend", details)

}