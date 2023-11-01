let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

btnSiguiente.addEventListener ('click', () => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener ('click', () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
});

//funcion flecha para cargar las peliculas, de tipo async para poder realizar la espera de carga de datos antes de continuar con el codigo
const cargarPeliculas = async () => {

    try {
        //creamos una constante llamada respuesta, le asignamos fetch que se encargara de recibir los datos de la api con el link de coneccion,
        //usamos await para que espere a recibir todos los datos antes de continuar con el codigo
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=fd3c38f591ad39b6098dcfa7842b5612&language=es-MX&page=${pagina}`);

        console.log(respuesta)

        if(respuesta.status === 200){

            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula =>{
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src=https://image.tmdb.org/t/p/w500/${pelicula.poster_path}>
                        <h3 class="titulo">${pelicula.title} </h3>
                    </div>
                `



            });

            document.getElementById('contenedor').innerHTML = peliculas;


        } else if(respuesta.status === 401){
            console.log('Key mal ingresada')
        } else if(respuesta.status === 404){
            console.log('La pelicula que buscas no existe')
        } else{
            console.log('Error desconocido')
        }

    } catch (error) {
        console.log(error);
    }
}

cargarPeliculas();