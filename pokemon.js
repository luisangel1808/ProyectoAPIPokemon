url='https://pokeapi.co/api/v2/pokemon/';
//urlImg='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
urlImg='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
urlDescription='https://pokeapi.co/api/v2/pokemon-species/';

const title = document.querySelector('.title');   
const typesContainer = document.querySelector('.type'); 
const otherContainer = document.querySelector('.other'); 
imageContainer=document.querySelector('.picture');
parContainer=document.querySelector('.description');

function onLoad(number){
    getData(url,number)
    const forward = document.createElement('button');
    const back = document.createElement('button');
    const buttonNavContainer = document.querySelector('.bnav');
    forward.type = 'button';
    back.type = 'button';
    back.innerText = 'Anterior';
    forward.innerText = 'Siguiente';
    buttonNavContainer.appendChild(back); 
    buttonNavContainer.appendChild(forward);
    forward.onclick = function(event) { 
        removeElements() 
        number++
        getData(url,number); 
    };
    back.onclick = function(event) { 
        removeElements() 
        number--
        getData(url,number); 
    };
}


function getData(url,number){
    fetch(`${url}${number}`).then(function(response){
        return response.json()
    }).then(function(json){
        let pokemon = json
        iniciar(pokemon,number)
    })
}

function iniciar(pokemon,number){
    const h2 = document.createElement('h2');
    const name = capitalize(pokemon.name);
    const id = pokemon.id;
    h2.textContent = `${id} ${name}`;
    title.appendChild(h2);
    const weight = pokemon.weight/10;
    const pWeight = document.createElement('p');
    const height = pokemon.height/10;
    const pHeight = document.createElement('p');
    pHeight.textContent = `Altura: ${height}m`;
    pWeight.textContent = `Peso: ${weight}kg`;
    otherContainer.appendChild(pHeight); 
    otherContainer.appendChild(pWeight); 
 
    for (let i = 0; i < pokemon.types.length; i++) {
        let p = document.createElement('p');        
        p.textContent = setType(pokemon.types[i].type.name, p)
        p.classList.add('tipos');
        typesContainer.appendChild(p);        
    }
    
    getImg(urlImg,number);
    getDescription(urlDescription,number);  
}

function getImg(url,number){
    fetch(`${url}${number}.svg`).then(function(response){
        return response.blob()
    }).then(function(blob){
            let objectURL=URL.createObjectURL(blob)
            showImage(objectURL,number)
    })
}

function getDescription(url,number){
    fetch(`${url}${number}/`).then(function(response){
        return response.json()
    }).then(function(json){
            let i = 0;
            while (json.flavor_text_entries[i].language.name!="es") {
                i++;
            }
            let description = json.flavor_text_entries[i].flavor_text
            description = description.replace(/\n|\r/g, " ");
            showDescription(description)
    })
}

function showImage(objectURL,number){
    const image = document.createElement('img');
    image.src = objectURL;
    image.alt=number;
    image.classList.add('picture_pokemon');
    
    imageContainer.appendChild(image)
}

function showDescription(description){
    const par = document.createElement('p');
    par.innerText = description;
    par.classList.add('textd')
    parContainer.appendChild(par)

}
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}    

function removeElements() {
    while (title.lastElementChild) {
        title.removeChild(title.lastElementChild);
    }
    while (typesContainer.lastElementChild) {
        typesContainer.removeChild(typesContainer.lastElementChild);
    }
    while (otherContainer.lastElementChild) {
        otherContainer.removeChild(otherContainer.lastElementChild);
    }
    while (imageContainer.lastElementChild) {
        imageContainer.removeChild(imageContainer.lastElementChild);
    }
    while (parContainer.lastElementChild) {
        parContainer.removeChild(parContainer.lastElementChild);
    }      
}

function setType(tipo, p){
    let conversion= {
        grass:"Hierba",
        ground:"Tierra",
        ice:"Hielo",
        electric:"Eléctrico",
        water:"Agua",
        fire:"Fuego",
        rock:"Roca",
        normal:"Normal",
        psychic:"Psíquico",
        flying:"Volador",
        fairy:"Hada",
        ghost:"Fantasma",
        steel:"Acero",
        bug:"Bicho",
        poison:"Veneno",
        fighting:"Lucha",
        dark:"Siniestro",
        dragon:"Dragón",       
    }
    
    if (tipo=='grass') {
        p.classList.add('background-grass')
    }
    else if (tipo=='ground') {
        p.classList.add('background-ground')
    }
    else if (tipo=='ice') {
        p.classList.add('background-ice')
    }
    else if (tipo=='electric') {
        p.classList.add('background-electric')
    }
        else if (tipo=='water') {
        p.classList.add('background-water')
    }
        else if (tipo=='fire') {
        p.classList.add('background-fire')
    }
    else if (tipo=='rock') {
        p.classList.add('background-normal')
    }
    else if (tipo=='psychi') {
        p.classList.add('background-psychi')
    }
    else if (tipo=='flying') {
        p.classList.add('background-flying')
    }
    else if (tipo=='ghost') {
        p.classList.add('background-ghost')
    }
    else if (tipo=='steel') {
        p.classList.add('background-steel')
    }
    else if (tipo=='bug') {
        p.classList.add('background-bug')
    }
        else if (tipo=='poison') {
        p.classList.add('background-poison')
    }
    else if (tipo=='fairy') {
        p.classList.add('background-fairy')
    }
        else if (tipo=='fighting') {
        p.classList.add('background-fighting')
    }
    else if (tipo=='dark') {
        p.classList.add('background-dark')
    }
    else if (tipo=='dragon') {
        p.classList.add('background-dragon')
    }
    else {
        p.classList.add('background-normal')
    }
    return conversion[tipo]
}