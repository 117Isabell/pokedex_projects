const pokedex = document.getElementById("pokedex");
console.log(pokedex);
const pokeCache = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));
    displayPokemon(pokemon);
};

/*
    const promises = [];
    for( let i = 1; i <= 150; i++){
        const url = `https://pokeapi.co/api/v2/pokemon-form/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then( results => {
        const pokemon = results.map( data => ({
            name: data.name,
            id: data.id,
            image: data.sprites[`front_default`],
            type: data.types.map((type) => type.type.name).join(", ")
        }));
        displayPokemon(pokemon);
    })
*/

            // .then((data) => {
            //      console.log(data);
                 
            //     // const pokemon = {};
            //     // pokemon[`name`] = data.name;
            //     // pokemon[`id`] = data.id;
            //     // pokemon[`image`] = data.sprites[`front_default`];
            //     // pokemon[`type`] = data.types
            //     //     .map( (type) => type.type.name)
            //     //     .join(", ");
            //     // console.log(pokemon);
    
            //     const pokemon = {
                    
            //     };
            //     console.log(pokemon);
    
            // });       
   
   


const displayPokemon = (pokemon) => {
    // const html = `<li>Bulbasaur</li>`
    const pokemonHTMLString = pokemon.map ( (pokeman) => `
    <li class ="card" onclick="selectPokemon(${pokeman.id})")>
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    </li>
    `
    ).join("");
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if(!pokeCache[id]){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    pokeCache[id] = pokeman;
    console.log(pokeCache);
    displayPopup(pokeman);
    }
    displayPopup(pokeCache[id]);
};


const displayPopup =(pokeman) =>{
    console.log(pokeman);
    const type = pokeman.types.map( type => type.type.name)
    .join(', ');
    const image = pokeman.sprites[`front_default`];
    const htmlString = `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class ="card">
           <img class="card-image" src="${image}"/>
           <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    
           <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type}
        </div>
    </div>
    `;

    pokedex.innerHTML = htmlString + pokedex.innerHTML;
console.log(htmlString);
};


const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();