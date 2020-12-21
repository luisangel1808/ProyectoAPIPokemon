url='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
principal()
function principal(){
    for (let i = 1; i < 896; i++) {
        fetch(`${url}${i}.png`).then(function(response){
            return response.blob();
        }).then(function(blob){
            let objectURL = URL.createObjectURL(blob);
            createImage(objectURL, i);
        })    
    }
}
function createImage(url,id){
    const image = document.createElement('img');
    const enlace = document.createElement('a');
    const vinculo = `pokemon.html`
    enlace.href= (vinculo)
    image.src = url;
    image.alt = id;
    container = document.querySelector('.imagenes')
    enlace.appendChild(image)
    container.appendChild(enlace)
}