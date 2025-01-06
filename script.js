const pokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
// interactive elements
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const pokemonCard = document.getElementById("pokemon-card");
// const prevBtn = document.getElementById("prev-btn");
// const nextBtn = document.getElementById("next-btn");
const randomBtn = document.getElementById("random-btn");
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

let isRandom = false;

const getRandomPokemon = () => {
  isRandom = true;
  getPokemon();
};

const getPokemon = async () => {
  try {
    const pokemonToFind = isRandom ? getRandomInt(1025) : searchInput.value.toLowerCase();
    const res = await fetch(`${pokeAPI}/${pokemonToFind}`);
    const data = await res.json();
    console.log(data);
    updateUI(data);
    isRandom = false;
  } catch (err) {
    console.log(err);
    alert("Pokémon not found");
    resetUI();
  }
}

const updateUI = (data) => {
  pokemonCard.classList.remove("hidden");
  // set info 
  pokemonID.textContent = `#${data.id}`;
  pokemonName.textContent = data.name.toUpperCase();
  height.textContent = `HT: ${convertHeight(data.height)}`;
  weight.textContent = `WT: ${convertWeight(data.weight)} lbs`;
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
  types.innerHTML = data.types.map((obj) => `<span class="type-badge ${obj.type.name}">${obj.type.name}</span>`).join('')

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

  pokemonCard.classList.add("hidden");
};

// helper functions
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function convertWeight(weight) {
  return (weight / 4.536).toFixed(1);
}

function convertHeight(height) {
  let totalInches = Math.round(height * 3.93);
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches % 12);
  
  return `${feet}' ${inches}"`;
}

// add event listener to search form
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getPokemon();
});

randomBtn.addEventListener('click', getRandomPokemon);