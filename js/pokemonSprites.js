/** @format */
// Starting index (the first Pokémon, which is bulbasaur:3)
let index = 1;
// Api for in-game sprites
//const battleSpriteUrl = `https://www.pokencyclopedia.info/sprites/gen1/spr_red-blue_gb/spr_rb-gb_${index}.png`;
const pokemonDescribeURL = `https://pokeapi.co/api/v2/characteristic/${index}/`;
// This function fetches the sprite for a Pokémon
export function fetchPokemonSprite(pokemonId) {
	const selectionSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
	// pokeApi repo to sprite of og games
	return fetch(selectionSpriteUrl)
		.then(function (response) {
			return response.blob();
		})
		.then((blob) => URL.createObjectURL(blob)) //fetch size and type of images
		.catch((error) => {
			console.log(`Error fetching sprite for Pokemon ID ${pokemonId}:`, error);
			return null;
		});
}
// This creates the list of Pokémon and displays it to the user. See if there's a way to condense it.
export function displayPokemonList(pokemonList) {
	//These are the Pokemon to that list section in the HTML
	// adds elements for each Pokémon up to the end of the list
	pokemonList.forEach((pokemon, index) => {
		//fetch the Pokemon API directly.
		fetch(`https://pokeapi.co/api/v2/characteristic/${index + 1}`)
			.then((res) => {
				return res.json();
			})
			.then((description) => {
				//return object
				console.log(description.descriptions[7]);
				const pokemonId = pokemon.url.split('/')[6];
				let i = index + 1;
				// This calls for pokemon 1-20 (limit 6)
				//Creating HTML elements to hold the Pokemon
				const pokemonEl = document.createElement('div');
				const pokemonImage = document.createElement('img');
				const pokemonName = document.createElement('span');
				const pokemonSelect = document.getElementById(i);
				var pokeDescription = description.descriptions[7].description;
				var pokemonDescription = document.getElementById('pokeDescription' + i);
				pokemonDescription.textContent = pokeDescription;
				pokemonName.textContent = pokemon.name;
				//Grab index of Pokemon. If image exists, then it's added to the list
				fetchPokemonSprite(pokemonId).then((selectionSpriteUrl) => {
					console.log(selectionSpriteUrl);
					if (selectionSpriteUrl) {
						pokemonImage.src = selectionSpriteUrl;
						pokemonEl.appendChild(pokemonImage);
					}
				});

				//Adds Pokemon to the list when selected
				pokemonEl.appendChild(pokemonName);
				pokemonSelect.appendChild(pokemonName);
				pokemonSelect.appendChild(pokemonDescription); //appends description sections to Pokemon index
				//Names
				pokemonImage.addEventListener('click', () => {
					selectPokemon(pokemon);
				});
				pokemonSelect.appendChild(pokemonEl); //Attached to the element for image.
			});
	}); //see line 47
}
// This function fetches the list of Pokémon from the API
export async function fetchPokemonList() {
	fetch('https://pokeapi.co/api/v2/pokemon')
		.then((response) => response.json())
		.then((data) => {
			displayPokemonList(data.results);
		})
		.catch((error) => {
			console.log('Error fetching Pokémon list:', error);
		});
}
// Stores the users selected Pokémon in local storage
export function selectPokemon(pokemonIndex) {
    console.log('this is not working', pokemonIndex);
    localStorage.setItem('selectedPokemonIndex', JSON.stringify(pokemonIndex));
    console.log('Selected Pokémon Index:', pokemonIndex);
    if (window.location.include('pokemonSimulator')) {
        window.location.href = '/pokemonSimulator/battleScene/index.html';
    } else {
        window.location.href = '/battleScene/index.html';
    }
}
