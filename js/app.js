// VARIABLES //
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// EVENTOS //
window.addEventListener('load', () => {    
    formulario.addEventListener('submit', buscarClima);
});


// FUNCIONES //
function buscarClima(e){

    e.preventDefault();

    // Validar campos
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    
    if( ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.alerta');

    if(!alerta){
        const alertaDiv = document.createElement('div');
        alertaDiv.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');
        alertaDiv.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        container.appendChild(alertaDiv);

        setTimeout(() => {
            alertaDiv.remove();
        }, 3000);    
    }
}

function consultarAPI(ciudad, pais){

    const appId = '31b33df22fe2b492d9b74843003438fe';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner(); 

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {
            console.log(datos);

            limpiarHTML();

            if(datos.cod === "404"){ // Si da error
                mostrarError('Ciudad no encontrada');
                return
            } 

            mostrarClima(datos);
        })
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function mostrarClima(datos){
    const {name, main: {temp, temp_max, temp_min}} = datos; // Datos que se extraen de la API 

    const centigrados = parseInt(temp - 273.15);
    const max = parseInt(temp_max - 273.15);
    const min = parseInt(temp_min - 273.15);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const tempActual = document.createElement('p');
    tempActual.innerHTML = `${centigrados} &#8451;`;
    tempActual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

function spinner(){

    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('sk-fading-circle');
    spinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(spinner);
}
