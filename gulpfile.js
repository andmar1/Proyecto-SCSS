const  {series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));  //gulp-sass solo tiene una funcion poreso solo no tiene llaves
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');


// Utilidades
const autoprefixed = require('autoprefixer'); //Agregar prefijos
const postcss = require('gulp-postcss');  //Agregar procesamiento al css
const cssnano = require('cssnano');   //herramienta para crear una version optimizada de css
const sourcemaps = require('gulp-sourcemaps');  
const rename = require('gulp-rename');

// Utilidades JS
const terser = require('gulp-terser-js');


const paths = {
    imagenes:'src/img/**/*',
    scss:'src/scss/**/*.scss',
    js:'src/js/**/*.js'
}

// Funcion que compila SASS
function css(){
    return  src(paths.scss)         //leer el archivo
        .pipe(sourcemaps.init())        //inicializar sourcemaps, identifa referencias de archivos
        .pipe( sass() )    
        .pipe(postcss( [autoprefixed(), cssnano() ])) //compilar el archivo y agregar prefijos "minifica"
        .pipe( sourcemaps.write('.') )       //Escribe propio mapa en disco
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

function indentarJS(){
    return src('build/js/bundle.js')
        .pipe( sass({
            outputStyle: 'expanded'
        }))
        .pipe( dest('./build/js'))
}

function javascript(){
    return src( paths.js )
        .pipe( sourcemaps.init())
        .pipe( concat('bundle.js') )
        .pipe( terser())              //minifica el codigo js a una sola linea 
        .pipe( sourcemaps.write('.'))
        .pipe( rename({ suffix: '.min'})) //renombrar el archivo con la extension .min
        .pipe( dest('./build/js') )
}

function imagenes(){
    return src(paths.imagenes)              //Entra a img y lee todas las imagenes encontradas ahi
        .pipe( imagemin() )                 //aplicar la libreria al pipe
        .pipe( dest ('./build/img') )        //generar la carpeta de imagenes, dest "destino"
        .pipe( notify({ message :'Imagen Minificada'} ));         //Nos notifica que se modifico la imagen
}

function versionWebp(){
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify({message: 'Versión webP lista '}));
}

// modo watch
function watchArchivos(){
    watch(paths.scss, css);    // * = La carpeta actual,  ** = todos los archivos con esa extension
    watch(paths.js, javascript);
}

exports.css = css
exports.minificarCSS = minificarCSS
exports.indentarCSS = indentarCSS
exports.imagenes = imagenes
exports.watchArchivos = watchArchivos
exports.javascript = javascript

exports.indentarJS = indentarJS

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);   //compila a css, minifica imagenes y jalar el watchArchivos

// solo con poner 'gulp' en consola corremos todo en la cola del dafault
