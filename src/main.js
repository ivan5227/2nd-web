import { getPokemon, getInitialPokemons } from './api.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const randomBtn = document.getElementById('random-btn');
const resetBtn = document.getElementById('reset-btn');
const statusContainer = document.getElementById('status-container');
const pokemonGrid = document.getElementById('pokemon-grid');

let lastAction = () => loadInitial();

function renderCards(pokemonList) {
  pokemonGrid.innerHTML = pokemonList
    .map((pokemon) => {
      const sprite =
        pokemon.sprites.other?.['official-artwork']?.front_default ||
        pokemon.sprites.front_default ||
        '';
      const types = pokemon.types.map((item) => item.type.name).join(', ');

      return `
        <article class="pokemon-card">
          <span class="pokemon-num">#${String(pokemon.id).padStart(3, '0')}</span>
          <img 
            src="${sprite}" 
            alt="${pokemon.name}" 
            class="pokemon-sprite" 
            loading="lazy" 
            onerror="this.src='https://placehold.co/180x180?text=No+Sprite'"
          />
          <h2 class="pokemon-name">${pokemon.name}</h2>
          <div class="pokemon-details">
            <p><strong>Тип:</strong> ${types}</p>
            <p><strong>Вес:</strong> ${pokemon.weight / 10} кг</p>
          </div>
        </article>
      `;
    })
    .join('');
}

function setStatus(html = '') {
  statusContainer.innerHTML = html;
}

async function executeRequest(actionFn) {
  lastAction = actionFn;
  searchBtn.disabled = true;
  randomBtn.disabled = true;
  pokemonGrid.innerHTML = '';

  setStatus('<p class="loading-message">Загрузка…</p>');

  try {
    await actionFn();
  } catch (error) {
    setStatus(`
      <div class="error-box">
        <p class="error-message">Ошибка загрузки: ${error.message}</p>
        <button type="button" id="retry-btn" class="btn btn-retry">Повторить попытку</button>
      </div>
    `);

    document.getElementById('retry-btn')?.addEventListener('click', () => {
      executeRequest(lastAction);
    });
  } finally {
    searchBtn.disabled = false;
    randomBtn.disabled = false;
  }
}

async function loadInitial() {
  const pokemons = await getInitialPokemons();
  setStatus('');
  renderCards(pokemons.filter(Boolean));
}

async function loadByName(name) {
  const pokemon = await getPokemon(name);

  if (!pokemon) {
    setStatus('<p class="empty-message">Ничего не найдено</p>');
    return;
  }

  setStatus('');
  renderCards([pokemon]);
}

async function loadRandom() {
  const randomId = Math.floor(Math.random() * 151) + 1;
  searchInput.value = '';
  await loadByName(randomId);
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    executeRequest(loadInitial);
    return;
  }
  executeRequest(() => loadByName(query));
});

randomBtn.addEventListener('click', () => {
  executeRequest(loadRandom);
});

resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  executeRequest(loadInitial);
});

executeRequest(loadInitial);