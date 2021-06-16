const pokemonURL = 'https://pokeapi.co/api/v2/pokemon';
const prevBtn = document.getElementById('btn_prev');
const nextBtn = document.getElementById('btn_next');

let prevURL = '';
let nextURL = '';

const container = document.getElementById('container')

function generatePokemon(pokemonURL) {
    fetch(pokemonURL)
        .then((response) => response.json())
        .then((pokemon) => {
            prevURL = pokemon.previous;
            nextURL = pokemon.next;
            createHTML(pokemon)
            controlButtons();
        })
}

function controlButtons(){
    if (prevURL == null) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (nextURL == null) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function createHTML(pokemon) {
    console.log(pokemon)

    container.innerHTML = '';

    for (i = 0; i < pokemon.results.length; i++) {
        const url = pokemon.results[i].url;
        const id = url.split('/')[6];
        const name = pokemon.results[i].name;

        pokeInnerHTML = `
        <a href="pokemon_info.html?pokemon=${id}">
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png" draggable="false" alt="image not available">
            </div>
            <div class="poke_info">
                <h3 class="number"><b>${id}</b>. ${name}</h3>
            </div>
        </a>`;

        container.innerHTML += pokeInnerHTML;
    }


}

$('#btn_prev').on('click', () => {
    generatePokemon(prevURL);
    console.log(prevURL)
})

$('#btn_next').on('click', () => {
    generatePokemon(nextURL);
    console.log(nextURL)
})

generatePokemon(pokemonURL);