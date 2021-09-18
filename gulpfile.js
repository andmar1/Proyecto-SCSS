const  {series, src, dest, watch } = require('gulp');

const sass = require('gulp-sass')(require('sass'));

// const sass = require('gulp-sass');    //gulp-sass solo tiene una funcion por eso solo no tiene llaves

// Funcion que compila SASS

function css(){
    return  src('src/scss/app.scss')         //leer el archivo
        .pipe( sass() )                      //compilar el archivo 
        .pipe( dest('./build/css') )         //Decirle la ruta donde se va a guardar el css o cualquier otro archivo

}

function minificarCSS(){
    return  src('src/scss/app.scss')     //leer el archivo
        .pipe( sass({                    //compilar el archivo 
            outputStyle: 'compressed'
        }) )                 
        .pipe( dest('./build/css') )     //Decirle la ruta donde se va a guardar el css o cualquier otro archivo
}

function indentarCSS(){
    return  src('src/scss/app.scss')     //leer el archivo
        .pipe( sass({                    //compilar el archivo 
            outputStyle: 'expanded'
        }) )                 
        .pipe( dest('./build/css') )     //Decirle la ruta donde se va a guardar el css o cualquier otro archivo
}

// modo watch
function watchArchivos(){
    watch('src/scss/**/*.scss', css);    // * = La carpeta actual,  ** = todos los archivos con esa extension
}

exports.css = css
exports.minificarCSS = minificarCSS
exports.indentarCSS = indentarCSS
exports.watchArchivos = watchArchivos
