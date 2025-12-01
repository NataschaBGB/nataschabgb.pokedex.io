// ------------------------------- API AND FETCH -------------------------------

// url to get info from
const url = `https://pokeapi.co/api/v2/pokemon`

/* MARK: FETCH POKEMONS
*/
async function fetchPokemons(offset, limit) {

    // set url to get offset and limit after base url
    // offset and limit is specific to this url construction
    newUrl = `${url}?offset=${offset}&limit=${limit}`

    try {

        fetch(newUrl)
        .then((response) => 
            response.json()
        )
        .then((data) => {
            // call function to display header
            header()
            // function to get pokemons data
            getPokemons(data)
            console.log(data);
            
            
            // function to display page nunmber
            // const {currentPage, totalPages} = getPageNumber(offset, limit, data.count)
        })


        // // get the newly constructed url
        // const response = await fetch(newUrl)
        // // convert the fetched data to json
        // const data = await response.json()        
        
        // // call function to display header
        // header()
        // // function to get pokemons data
        // getPokemons(data)
        
        // function to display page nunmber
        // const {currentPage, totalPages} = getPageNumber(offset, limit, data.count)
    }
    catch (error) {
        console.log("Error fetching pokémon data:", error.message);
    }
    
   
}

// function getPageNumber(offset, limit, count) {

//     // currentPage is calculated by dividing offset by limit and rounding down, then adding 1
//     const currentPage = Math.floor(offset / limit) + 1;
//     // count is total number of pokemons in API
//     const totalPages = Math.ceil(count / limit);

//     return {currentPage, totalPages}
// }


/* MARK: Get wrapper
*/
const wrapper = document.querySelector("#wrapper")


/* MARK: Create header
*/
const createHeaderDiv = /*html*/`<header class="pokemonsBanner"></header>`
// insert pokemons-banner div in wrapper
wrapper.insertAdjacentHTML("afterbegin", createHeaderDiv)

/* MARK: Get header
*/
const headerDiv = wrapper.querySelector(".pokemonsBanner")




/* MARK: HEADER CONTENT
*/
// ------------------------------- CONSTRUCT AND INSERT HEADER -------------------------------

function header() {

    headerDiv.innerHTML = ""

    const bannerStyle = /*html*/`
        <div class="power">
            <div class="powerLight"></div>
        </div>
        <div class="pokeball"></div>`

    // insert searchbar in footer selected earlier
    headerDiv.insertAdjacentHTML("beforeend", bannerStyle)

}



/* MARK: GET POKEMONS
*/
// create div to contain all pokemons in grid
const createPokemonsDiv = /*html*/`<main class="pokemons"></main>`
// insert pokemons div in wrapper
wrapper.insertAdjacentHTML("beforeend", createPokemonsDiv)

// get created pokemons div in html
const pokemonsDiv = wrapper.querySelector(".pokemons")



// GET POKEMONS
function getPokemons(data) {

    // clear pokemons div from content to remove all pokemons from previous fetched page
    pokemonsDiv.innerHTML = ""

    // function to get links for previous / next page from url (api)
    pageUpdate(data)
    handlePageLinks()

    // loop through 'results' in json file
    const displayPokemon = data.results.map((result) => {
        // get id from url by splitting the url
        // slice(0, -1) removes the last character in the string (which is a /)
        // split("/") splits the string into an array at each /
        // pop() removes and saves the last element from the array - which is the id
        // e.g. "https://pokeapi.co/api/v2/pokemon/1/" becomes ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "1"] and pop() returns "1"
        const imgId = result.url.slice(0, -1).split("/").pop();
        
        // set img src link with the extracted id
        const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${imgId}.gif`

        // create figure html to display pokemon in html
        const pokemonTemplate = /*html*/`
            <figure>
                <a href="details.html?name=${result.name}">
                    <img src="${imgSrc}" alt="${result.name}">
                    <figcaption>
                        ${result.name.charAt(0).toUpperCase() + result.name.slice(1)}
                    </figcaption>
                </a>
            </figure>`

        // return template to use out of the map function
        return pokemonTemplate

    }).join("");

    // insert figure in pokemons div selected earlier
    pokemonsDiv.insertAdjacentHTML("beforeend", displayPokemon)

}





/* MARK: FOOTER
*/
// create footer div
const createFooterDiv = /*html*/`<footer class="pokemons-footer"></footer>`
// insert pokemons-footer div in wrapper
wrapper.insertAdjacentHTML("beforeend", createFooterDiv)

// get footer div in html
const footerDiv = document.querySelector(".pokemons-footer")

footerDiv.innerHTML = ""

const searchBar = /*html*/`
    <div class="searchBar">
        <input type="text" id="searchPokemon" placeholder="Search..">
    </div>`

// insert searchbar in footer selected earlier
footerDiv.insertAdjacentHTML("beforeend", searchBar)





/* MARK: PREV/NEXT BUTTONS
*/
// create div for previous / next buttons
const pageButtonsDiv = /*html*/`
    <div class="pageButtons"></div>`
// insert button div inside footer
footerDiv.insertAdjacentHTML("afterbegin", pageButtonsDiv)
// get button div from html for later use
const pageButtons = document.querySelector(".pageButtons")

// PAGE UPDATE
function pageUpdate(data) {

    // clear button div from content so it does not make new buttons for every page fetched
    pageButtons.innerHTML = ""

    // get previous / next page links from json file
    const nextPage = data.next;
    const prevPage = data.previous;

    // if there is a link inside prev/next - set a tag with link
    // else set empty template string
    const pageButtonsTemplate = /*html*/`
    <div class="pageButtons">
        ${data.previous ? /*html*/`<a href="${prevPage}">< Previous</a>` : /*html*/`<p>Previous</p>`}
        ${data.next ? /*html*/`<a href="${nextPage}">Next ></a>` : /*html*/`<p>Next</p>`}
    </div>`

    // insert button links in button div
    pageButtons.insertAdjacentHTML("beforeend", pageButtonsTemplate)

}


/* MARK: PAGE LINKS
*/
function handlePageLinks() {

    // get button div from html
    const pageButtons = document.querySelector(".pageButtons")
    
    // add event listener so it knows when a link inside the button div has been clicked
    // when a link is clicked, do what the handlePageButtons function does
    pageButtons.addEventListener("click", handlePageButtons)

}


/* MARK: BUTTON CLICKS
*/
function handlePageButtons(event) {

    // prevent the click of a link in button to open the direct link (as it would by default)
    event.preventDefault()
    
    // if button link has no value do nothing
    if (!event.target.href) return
    
    // create new url object on the events target.href
    const url = new URL(event.target.href)
    
    // use the url object and search for info after the ?
    const params = new URLSearchParams(url.search)
    
    // after the ? - get the offset and limit
    const offset = params.get("offset")
    const limit = params.get("limit")
    
    // function to fetch pokemons on the page that matches the offset and limit
    fetchPokemons(offset, limit)

}
// call function to fetch pokemons from the first page (offset=0, limit=20)
fetchPokemons(0, 20)




/* MARK: SEARCH POKEMON
*/

// get search input field from html
const searchInput = document.querySelector("#searchPokemon")
// add event listener to know when user types in search field
searchInput.addEventListener("input", handleSearchInput)

// global array to hold all fetched pokemons name and id for search
let allPokemonData = [];

async function fetchAllPokemons() {

    // start at offset 0 (page 1 in api)
    // search on page one
    let offset = 0;
    // get 20 pokemons per page when searching
    let limit = 20;
    // is there a next page?
    let hasNext = true;
    // array to hold all fetched data temporarily
    const allData = [];

    // while there is still pages to search through
    while (hasNext) {
        // fetch data from api with current offset and limit to search through
        const searchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        // save searched fetched data as json
        const searchData = await searchResponse.json();

        // loop through results and extract name and id on searched pokemons
        searchData.results.forEach(result => {
            // get id from url by splitting the url and removing the last part before the last /
            const id = result.url.slice(0, -1).split("/").pop();
            // push name and id to allData array
            allData.push({ name: result.name, id });
        });

        // if there is a next page, increase offset by limit (offset + 20)to get the next page
        if (searchData.next) {
            offset += limit;
        }
        // else there is no next page - stop the while loop = no more pages to search through
        else {
            hasNext = false;
        }
    }

    // assign all fetched data to the global array for later use
    allPokemonData = allData;

}
// call function to fetch all pokemons for search
fetchAllPokemons();


/* MARK: SEARCH INPUT
*/
// when user types in search field
function handleSearchInput(event) {

    // get the value user types in - convert to lowercase for easier matching
    const searchString = event.target.value.toLowerCase();

    const filteredData = allPokemonData
        // filter the global array to find names that start with the search string
        .filter(data => data.name.toLowerCase().startsWith(searchString))
        // sort the filtered results alphabetically by name
        // compare one name with another to determine order
        .sort((a, b) => a.name.localeCompare(b.name))
        // limit the results to the first 20 matches
        .slice(0, 20);

    // clear the pokemons div to remove data not matching the search
    pokemonsDiv.innerHTML = "";

    // loop through the filtered results and display each pokemon
    filteredData.forEach(data => {
        
        // create figure html to display pokemon in html
        const pokemonTemplate = /*html*/`
            <figure>
                <a href="details.html?name=${data.name}">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${data.id}.gif" alt="${data.name}">
                    <figcaption>
                        ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                    </figcaption>
                </a>
            </figure>`

        // insert figure in pokemons div selected earlier
        pokemonsDiv.insertAdjacentHTML("beforeend", pokemonTemplate)
    
    });
}