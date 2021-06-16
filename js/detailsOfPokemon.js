const container = document.getElementById('pokemon-details');
const prevBtn = document.getElementById('btn_prev');
const nextBtn = document.getElementById('btn_next');

const params = new URLSearchParams(window.location.search);
let pokemon_id = parseInt(params.get('pokemon'));

function controlButtons(){
    if (pokemon_id <= 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (pokemon_id >= 1118) {
        nextBtn.disabled = true;
        nextBtn.style.background = "black";
        nextBtn.style.color = "white";
    } else {
        nextBtn.disabled = false;
    }
}

function getDetailsOfPokemon(pokemon_id) {
    const onePokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;
    
    fetch(onePokemonUrl)
    .then((response) => response.json())
    .then(dataOfPokemon => {
        
        showPokemon(pokemon_id, dataOfPokemon.name, dataOfPokemon.stats, dataOfPokemon.types, dataOfPokemon.abilities)
        console.log(dataOfPokemon);
        console.log(dataOfPokemon.stats);
        document.title = "About " + dataOfPokemon.name;
    })
    controlButtons();
}

getDetailsOfPokemon(pokemon_id);

function showPokemon(pokemon_id, name, stats, types, abilities){
    let showHTML = 
    `
    
    <div class="pokemon_card">
        <div class="pokemon_img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon_id}.png" draggable="false" alt="image not available">
            <h1>${pokemon_id}. ${name}</h1>
        </div>
        <div class="card_body">
            <div class="pokemon-info">
                <table>
                    <tr>
                        <td>
                            <h2>Abilities:</h2>
                            <ul>

                            `
                            abilities.forEach(data => {
                                showHTML += `<li>${data.ability.name}</li>`
                            })

                            showHTML += `
                            </ul>
                        </td>
                        <td>
                            <h2>Type:</h2>

                            <ul>`

                            types.forEach(data => {
                                showHTML += `<li>${data.type.name}</li>`
                            })   

                            showHTML += `
                            </ul>
                        </td>
                        <td>
                            <h2>Base stats:</h2>

                            <ul>
                            `

                            stats.forEach(data => {
                                showHTML += `<li>${data.stat.name}: ${data.base_stat}</li>`
                            })

        showHTML +=    `</td>
                    </tr>  
                </table>         
            </div>
        </div>
    </div>
`

    container.innerHTML = showHTML;
}

$('#btn_prev').on('click', () => {
    getDetailsOfPokemon(pokemon_id -= 1)
});
$('#btn_next').on('click', () => {
    getDetailsOfPokemon(pokemon_id += 1)
});