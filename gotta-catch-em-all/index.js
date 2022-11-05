/*
  1. W pliku data.js pod zmienna "pokemons" znajduje się tablica zawierająca dane wielu pokemonów, masz do niej dostęp również w tym pliku. 
  Chciałbym, abyś użył jej do wyświetlenia wszystkich pokemonów w naszym Pokedexie. 
  W tym celu dla każdego z nich możesz stworzyć nowy element drzeewa DOM i umieścić w nim informacje o Pokemonie (możesz zawrzeć tam jego nazwę, zdjęcie, a na kontener w którym się znajduje nadać specjalną klasę zależnie od typu)
*/

// Create classes to color type tags
const pokemonTypesColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const pokemonTypesColorsStyle = Object.entries(pokemonTypesColors).reduce(
  (acc, [type, color]) => {
    const typeColorStyle = `
      .color_${type} {
        color: ${color};
      }`;
    return acc + typeColorStyle;
  },
  ""
);

const pokemonTypesColorsStyleElement = document.createElement("style");
pokemonTypesColorsStyleElement.appendChild(
  document.createTextNode(pokemonTypesColorsStyle)
);
document.querySelector("body").appendChild(pokemonTypesColorsStyleElement);

const filterCheckboxes = document.querySelectorAll(
  ".filters__form input[type='checkbox']"
);
const filterName = document.querySelector(
  ".filters__form input[name='pokemon-name']"
);

// Rerender pokemons after filter change
filterCheckboxes.forEach((element) =>
  element.addEventListener("change", renderFilteredPokemons)
);
filterName.addEventListener("keyup", renderFilteredPokemons);

function setFilterType({ target: { className: tagClass } }) {
  const type = tagClass.substring(6);
  filterCheckboxes.forEach((filterCheckbox) => {
    filterCheckbox.checked = filterCheckbox.name == type;
  });
  renderFilteredPokemons();
  window.scroll({ top: 0, behavior: "smooth" });
}

document
  .querySelector(".filters__form button")
  .addEventListener("click", () => {
    filterCheckboxes.forEach((filterCheckbox) => {
      filterCheckbox.checked = false;
    });
    filterName.value = "";
    renderFilteredPokemons();
  });

// tutaj złapiemy sekcję, do której będziemy dodawać pokemony
const pokemonsContainer = document.querySelector(".pokemons");

function renderPokemons(pokemons) {
  // Clear list
  pokemonsContainer.innerHTML = null;

  // Render each pokemon
  pokemons.forEach((pokemon) => {
    const pokemonContainer = document.createElement("div");
    pokemonContainer.className = "pokemon_card";

    // Image
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.className = "pokemon_card__image";
    pokemonContainer.appendChild(pokemonImage);

    const pokemonTextContainer = document.createElement("div");
    pokemonTextContainer.className = "pokemon_card__text";

    // Name
    const pokemonName = document.createElement("h1", {});
    pokemonName.className = "pokemon_card__text__name";
    const pokemonNameContent = document.createTextNode(pokemon.name);
    pokemonName.appendChild(pokemonNameContent);
    pokemonTextContainer.appendChild(pokemonName);

    // Types
    const pokemonTypesContainer = document.createElement("div");
    pokemonTypesContainer.className = "pokemon_card__text__types";
    pokemon.types.forEach((type) => {
      const pokemonType = document.createElement("span");
      pokemonType.className = `color_${type}`;
      pokemonType.addEventListener("click", setFilterType);
      const pokemonTypeContent = document.createTextNode(type);

      pokemonType.appendChild(pokemonTypeContent);
      pokemonTypesContainer.appendChild(pokemonType);
    });
    pokemonTextContainer.appendChild(pokemonTypesContainer);

    pokemonContainer.appendChild(pokemonTextContainer);
    pokemonsContainer.appendChild(pokemonContainer);
  });
}

/*
  2. Przeglądanie całej listy pokemonów może okazać się trochę uciążliwe. Fajnie byłoby skorzystać z filtrów, które już znajdują sie w pliku html. 
  Napisz ciało funkcji które pozwoli nam na:
  - filtrowanie po typie
  - filtrowanie po nazwie (wpisany fragment zawiera się w nazwie pokemona)
*/

function filterPokemons(
  pokemons,
  { "pokemon-name": filterName, ...filterTypesObject }
) {
  // uzupełnij tutaj
  // zwróć odfiltrowaną tablicę pokemonów
  let filteredPokemons = pokemons;

  const filterTypes = Object.keys(filterTypesObject);
  if (filterTypes.length) {
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.types.some((pokemonType) =>
        filterTypes.find((filterType) => pokemonType == filterType)
      )
    );
  }

  if (filterName) {
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }

  return filteredPokemons;
}

const form = document.querySelector(".filters__form");

function renderFilteredPokemons() {
  const filterData = Object.fromEntries(new FormData(form));
  renderPokemons(filterPokemons(pokemons, filterData));
}

// następnie wykonaj uzupełnioną metodę z tablicą pokemons, aby sprawdzić czy wszystko działa
renderFilteredPokemons();

function submitForm(event) {
  event.preventDefault();
  // następnie wykonaj uzupełnioną metodę z tablicą pokemons, aby sprawdzić czy wszystko działa
}
form.addEventListener("submit", submitForm);

/*
  3. Pokedex powinien wyglądać trochę lepiej, niż ten tutaj. W folderze znajdziesz plik style.css, w którym możesz ulepszyć wygląd naszego pokedexa
  Liczymy na Twoją kreatywność 😉
*/
