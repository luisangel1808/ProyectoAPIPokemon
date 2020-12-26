url='https://pokeapi.co/api/v2/pokemon/';
//urlImg='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
urlImg='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
urlDescription='https://pokeapi.co/api/v2/pokemon-species/';

let pokemonArray = [];
let number = 1;
const maxPokemon = 151;

    const main = document.querySelector('main');
    counterContainer = document.createElement('div');
    const pokeSelector=document.getElementsByName('poke-selector')[0];
    document.getElementById("poke-selector").onchange = changeListener;

class Poke{
    constructor(){
        this.name;
        this.description;
        this.types = [];
        this.weight;
        this.height;
        this.image;
        this.id;
        this.information;
    }

    showAll() {
      pokemonArray[number].removeElements();      
      pokemonArray[number].showTitle();
      pokemonArray[number].showImage(false);
      pokemonArray[number].showInformation()
    }

    showImage(siluet){
        const imagen = document.createElement('img');
        imagen.src = this.image;  
        imagen.alt ='Cargando imagen Pokemón'    
        imagen.classList.add('picture_pokemon');
        const imageContainer=document.createElement('div');
        imageContainer.classList.add('picture');
        if(siluet){
          imagen.classList.add('img-silueta');
        }        
        imageContainer.appendChild(imagen)
        main.appendChild(imageContainer)
    }
    showTitle(){
        const title = document.createElement('div'); 
        title.classList.add('title');
        const titulo = document.createElement('h2');
        titulo.textContent = `${this.id} ${this.name}`;      
        title.appendChild(titulo);
        main.appendChild(title);
    }
    showDescription(){
        const parContainer = document.createElement('div'); 
        parContainer.classList.add('description');
        const descripcion = document.createElement('p');
        descripcion.textContent = this.description;
        parContainer.appendChild(descripcion); 
        this.information.appendChild(parContainer);
    }
    showTypes(){
        const typesContainer = document.createElement('div');
        typesContainer.classList.add('type');
        for (let i = 0; i < this.types.length; i++) {
            const p = document.createElement('p');            
            p.innerText = setType(this.types[i],p);
            p.classList.add('tipos');
            typesContainer.appendChild(p)
            this.information.appendChild(typesContainer);
        }        
    }
    showPhysycal(){
        const otherContainer = document.createElement('div');
        otherContainer.classList.add('other');
        const pWeight = document.createElement('p');
        const pHeight = document.createElement('p');
        pHeight.textContent = `Altura: ${this.height}m`;
        pWeight.textContent = `Peso: ${this.weight}kg`;
        otherContainer.appendChild(pHeight); 
        otherContainer.appendChild(pWeight);
        this.information.appendChild(otherContainer); 
    }
    showButtons(){
      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('bnav');
      const forward = document.createElement('button');
      const back = document.createElement('button');
      forward.type = 'button';
      back.type = 'button';
      back.innerText = 'Anterior';
      forward.innerText = 'Siguiente';
      buttonsContainer.appendChild(back); 
      buttonsContainer.appendChild(forward);
      this.information.appendChild(buttonsContainer);

      forward.onclick = ()=>{  
        number<pokemonArray.length-1 ? number++: number=1;
        this.showAll(number);
      };
      back.onclick = ()=> {    
          number>1 ? number--: number=pokemonArray.length-1;
          this.showAll(number); 
      };

  }

  showInformation(){
    this.information = document.createElement('div');
    this.information.classList.add('information');
    main.appendChild(this.information);           
    this.showPhysycal();
    this.showTypes();
    this.showDescription();
    this.showButtons();
}

  removeElements(){
    while (main.lastElementChild) {
       main.removeChild(main.lastElementChild);
    } 
  }
}

 async function buildPokemon(i){
        let pokemon = new Poke();             
        await fetch(`${url}${i}`).then(function(response){
            return response.json();            
        }).then(function(json){
            pokemon.id = json.id; 
            pokemon.name = capitalize(json.name);  
            pokemon.weight = json.weight/10;
            pokemon.height = json.height/10; 
            for (let i = 0; i < json.types.length; i++) {     
                pokemon.types[i] = json.types[i].type.name  
            }           
        })
        await fetch(`${urlImg}${i}.svg`).then(function(response){
            return response.blob();            
        }).then(function(blob){
            pokemon.image = URL.createObjectURL(blob);                
        })  
        await fetch(`${urlDescription}${i}/`).then(function(response){
            return response.json()
        }).then(function(json){
            let i = 0;
            while (json.flavor_text_entries[i].language.name!="es") {
                i++;
            }
        let description = json.flavor_text_entries[i].flavor_text
        description = description.replace(/\n|\r/g, " ");
        pokemon.description = description
    })
    pokemonArray[i] = pokemon;  
    if(i===maxPokemon){
      number = parseInt(Math.random()*maxPokemon-1)+1;
      console.timeEnd()
      pokemonArray[1].showAll();
      console.log('number')
    }
}

function capitalize(word){
    return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function start(){ 
  console.time()
  if (pokemonArray.length==maxPokemon+1) {
    pokemonArray[number].showAll();
  }
  else{
    for (let i = 1; i <=maxPokemon; i++) {
      buildPokemon(i)
    }    
  } 
}

function addOptions(array) {     
    for (let i = 1; i < array.length; i++) {
     var option = document.createElement("option");
     option.text = array[i].name;
     option.value = i;
     option.onclick = ()=> showAll(2);
     pokeSelector.add(option); 
    }   
}    

function changeListener(){
    let value = this.value;
    number = value;
    removeElements();
    showAll(value);      
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
    
    switch (tipo) {
      case "grass":
        p.classList.add("background-grass");
        break;
      case "ground":
        p.classList.add("background-ground");
        break;
      case "electric":
        p.classList.add("background-electric");
        break;
      case "ice":
        p.classList.add("background-ice");
        break;
      case "water":
        p.classList.add("background-water");
        break;
      case "fire":
        p.classList.add("background-fire");
        break;
      case "ghost":
        p.classList.add("background-ghost");
        break;
      case "dragon":
        p.classList.add("background-dragon");
        break;
      case "fairy":
        p.classList.add("background-fairy");
        break;
      case "normal":
        p.classList.add("background-normal");
        break;
      case "rock":
        p.classList.add("background-rock");
        break;
      case "psychic":
        p.classList.add("background-psychic");
        break;
      case "steel":
        p.classList.add("background-steel");
        break;
      case "flying":
        p.classList.add("background-flying");
        break;
      case "dark":
        p.classList.add("background-dark");
        break;
      case "fighting":
        p.classList.add("background-fighting");
        break;
      case "poison":
        p.classList.add("background-poison");
        break;
      case "bug":
        p.classList.add("background-bug");
        break;
    }
    return conversion[tipo]
}

class Game{
  constructor(){   
    this.questions = 10;
    this.right = 0;
    this.wrong = 0;
    this.correct;
    this.newQuestion();     
  }
  newQuestion(){
    removeAll() 
    this.removeCounters() 
    this.setTitle();
    this.options= this.fourRandomPokemon();        
    this.options[this.chooseCorrect(this.options)].showImage(true);
    this.createOptions(this.options);
    this.counterInit(); 
    this.modifyCounter();
  }
  setTitle(){
    const title = document.createElement('div'); 
    title.classList.add('title');
    const titulo = document.createElement('h2');
    titulo.textContent = `¿Quién es ese Pokemón?`;      
    title.appendChild(titulo);
    main.appendChild(title);
  }
  createOptions(options){
    let optionsArr = [];
    const buttonOptContainer = document.createElement('div'); 
    buttonOptContainer.classList.add('bnav');
    for (let i = 0; i < 4; i++) {
      optionsArr[i]=document.createElement('button');
      optionsArr[i].type = 'button';
      optionsArr[i].innerText = `${options[i].name}`;
      buttonOptContainer.appendChild(optionsArr[i]);
      optionsArr[i].onclick = ()=>{
        this.selected(i)
      }
    }
    main.appendChild(buttonOptContainer);
  }
  chooseCorrect(options){
    this.correct = parseInt(Math.random()*options.length);
    return this.correct
  }
  fourRandomPokemon(){
    let optionsArray = [];
    let numbersArray = [];
    for(let i = 1; i<5; i++){
      let number = Math.round(Math.random()*(maxPokemon-1))+1;
      numbersArray.includes(number)
      ?i--
      : optionsArray.push(pokemonArray[number]); 
        numbersArray.push(number); 
    }
    return optionsArray;
  }
  removeCounters(){
    while (counterContainer.lastElementChild) {
      counterContainer.removeChild(counterContainer.lastElementChild);
    } 
  }    
  selected(number){
    this.correct===number ? this.right++: this.wrong++;   
    this.newQuestion()
  }
  counterInit(){     
    this.wrongView = document.createElement('p'); 
    this.rightView = document.createElement('p'); 
    counterContainer.appendChild(this.wrongView);
    counterContainer.appendChild(this.rightView);
    counterContainer.classList.add('counter');
    this.wrongView.classList.add('wrong');
    this.rightView.classList.add('correct');
    main.appendChild(counterContainer);
  }
  modifyCounter(){
    this.wrongView.innerText = `${this.wrong}`;
    this.rightView .innerText = `${this.right}`;
  }
}

function newGame(){ 
  let juego = new Game();
}

function pokedex(){
  removeAll()
  for (let i = 1; i <=maxPokemon; i++) {
    const image = document.createElement('img');
    image.classList.add('pokedexImg');
    image.src = pokemonArray[i].image;
    image.id=i;
    image.alt = `Pokémon${image.id}`;
    image.onclick = ()=>{  
      number=image.id;
      pokemonArray[number].showAll();
    };
    container = document.createElement('div');
    container.classList.add('pokedexC');
    container.appendChild(image); 
    main.appendChild(container);
  }
}

function removeAll() {  
  while (main.lastElementChild) {
      main.removeChild(main.lastElementChild);
  }

}