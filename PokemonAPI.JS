const rechercheBtn = document.querySelector("#search");
const aleatoireBtn = document.querySelector("#aleatoire");
const aleatoireGalBtn = document.querySelector("#aleatoireGal");
const afficherTout = document.querySelector("#afficherTout");
const pokemondiv = document.querySelector("#pokemondiv");

const test = document.querySelector(".pokemondivALL");
let nomArechercherInput = document.querySelector("#pokeName");
let pokeImage = document.querySelector("#pokeImage");
let pokeName = document.querySelector("#pokeNameDisplay");
let pokeDescription = document.querySelector("#pokeDescription");
let boolpok = false;
let imgstatut = "";
let intervalId;

function fetchPokemon(id) {
  const pokemonFetch = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  //https://pokeapi.co/api/v2/pokemon/pikachu

  pokemonFetch.then(async (response) => {
    try {
      const data = await response.json();
      pokeImage.src = data.sprites.front_shiny;
      pokeImage.alt = `image de : ${data.name}`;
      pokeName.textContent = data.name;

      const types = data.types.map((type) => type.type.name).join(", ");
      const abilities = data.abilities
        .map((ability) => ability.ability.name)
        .join(", ");

      pokeDescription.textContent = `type ${types} || abilités : ${abilities}`;
    } catch (e) {
      //console.log(e)
      //console.log("hello dans le catch");
      pokeName.textContent = "le pokemon n'existe pas";
      pokeDescription.textContent = "impossible de trouver la description";
      pokeImage.src = "";
      pokeImage.alt = "impossible de trouver une image";
    }
  });
}

function fetchPokemonALL(id, pokeNameDisplayALL, pokeImageALL, imgstatut) {
  const pokemonFetchALL = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  //https://pokeapi.co/api/v2/pokemon/pikachu

  pokemonFetchALL.then(async (response) => {
    try {
      const dataALL = await response.json();
      console.log(dataALL);

      pokeImageALL.src = pokeImageALL.src = dataALL.sprites.front_shiny;
      pokeImageALL.alt = `image de : ${dataALL.name}`;
      pokeNameDisplayALL.textContent = dataALL.name;
    } catch (e) {
      pokeName.textContent = "le pokemon n'existe pas";
      pokeImage.src = "";
      pokeImage.alt = "impossible de trouver une image";
    }
  });
}

aleatoireBtn.addEventListener("click", () => {
  const idPokemon = Math.floor(Math.random() * 151) + 1;
  fetchPokemon(idPokemon);
});

rechercheBtn.addEventListener("click", () => {
  const nomPokemon = nomArechercherInput.value.toLowerCase();
  fetchPokemon(nomPokemon);
});

aleatoireGalBtn.addEventListener("click", () => {
  if (boolpok) {
    boolpok = false;
  } else {
    boolpok = true;
  }

  if (boolpok) {
    const idPokemon = Math.floor(Math.random() * 152) + 1;
    fetchPokemon(idPokemon);
    let index = 1;
    intervalId = setInterval(() => {
      const idPokemon = Math.floor(Math.random() * 152) + 1;
      fetchPokemon(idPokemon);
      index++;
    }, 2000);
    aleatoireGalBtn.textContent = "STOP";
  } else {
    clearInterval(intervalId);
    aleatoireGalBtn.textContent = "Aléatoire Galerie";
  }
});

afficherTout.addEventListener("click", () => {
  pokemondiv.classList.add("hidden");
  test.classList.remove("hidden");
  for (let i = 1; i < 152; i++) {
    let pokemondivALL = document.createElement("div");
    let pokeNameDisplayALL = document.createElement("h1");
    let pokeImageALL = document.createElement("img");
    pokeImageALL.setAttribute("scr", "");
    pokemondivALL.append(pokeNameDisplayALL, pokeImageALL);
    fetchPokemonALL(i, pokeNameDisplayALL, pokeImageALL, imgstatut);
    test.appendChild(pokemondivALL);

    pokemondivALL.addEventListener("click", () => {
      fetchPokemonALL(id, pokeNameDisplayALL, pokeImageALL, imgstatut);
    });
  }
});
