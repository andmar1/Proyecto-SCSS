document.addEventListener('DOMContentLoaded', function(){
    scrollNav()

    navegacionFija()  
})

function navegacionFija(){

    const barra = document.querySelector('.header');


    // Registrar el intersection observer API IntersectionObserver
    const observer = new IntersectionObserver( function( entries){
        if (entries[0].isIntersecting) {
            barra.classList.remove('fijo')
        }else{
            barra.classList.add('fijo')
        }
    });
    
    //Elemento a observar
    observer.observe( document.querySelector('.sobre-festival'))

}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( function( enlace ){
        enlace.addEventListener('click', function(evento){
            evento.preventDefault();

            const seccion = document.querySelector( evento.target.attributes.href.value )
            // Acceder a id mas lento al hacer click  
            seccion.scrollIntoView({
                behavior: 'smooth',
            });
        });
    });

}

