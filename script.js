const pokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const outputDiv = document.getElementById("output");
// pokemon info
const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const types = document.getElementById("types");
const spriteContainer = document.getElementById("sprite-container");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
// pokemon stats
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const getPokemon = async () => {
  try {
    // either by id or name 
    //ex: pokemon/25 or pokemon/pikachu
    const pokemonToFind = searchInput.value.toLowerCase();
    const res = await fetch(`${pokeAPI}/${pokemonToFind}`);
    const data = await res.json();
    console.log(data);
    updateUI(data);
  } catch (err) {
    console.error(err);
    alert("Pokémon not found");
    resetUI();
  }
}

const updateUI = (data) => {
  outputDiv.classList.remove("hidden");
  // set info 
  pokemonID.textContent = `#${data.id}`;
  pokemonName.textContent = data.name.toUpperCase();
  height.textContent = `HT: ${data.height}`;
  weight.textContent = `WT: ${data.weight}`;
  spriteContainer.innerHTML = 
    `<img src="${data.sprites.front_default}" alt="${data.name} front default sprite" id="sprite">`;

  // set stats
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;

  // set types
  types.innerHTML = data.types.map((obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`).join('')

  searchInput.value = '';
};

const resetUI = () => {
  pokemonID.textContent = '';
  pokemonName.textContent = '';
  height.textContent = '';
  weight.textContent = '';
  spriteContainer.innerHTML = '';
  types.innerHTML = '';

  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';

  searchInput.value = '';

  outputDiv.classList.add("hidden");
};

// add event listener to search form
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getPokemon();
});