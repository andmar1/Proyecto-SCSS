document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1; i<= 12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        
        imagen.dataset.imagenId = i;

        // Añadir la funcion de mostrar imagen
        imagen.onclick = mostrarImagen;

        //sacar img de la consola
        const lista = document.createElement('LI');
        lista.appendChild(imagen)

        galeria.appendChild(lista);
    }
}

// Imagenes mas grandes

function mostrarImagen(e){
    //convertir el id a entero
    const id = parseInt( e.target.dataset.imagenId );

    // imagen es variable diferente, ya que es variable local 
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`; 

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen)
    overlay.classList.add('overlay');

    // Boton para cerrar la imagen 
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');


    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
       }
       cerrarImagen.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
       }
       
    overlay.appendChild(cerrarImagen);

    // Mostrar en html 
    const body = document.querySelector('BODY');
    body.appendChild( overlay )

    body.classList.add('fijar-body');
}