// #region EJECICIO 1

// Función para calcular mayoria de edad
function calcular_Edad() {
    mayoriaDeEdad = 18; // Se define la mayoria de edad
    let edad = Number(document.getElementById('inputEdad').value); // Se obtiene el valor de la edad digitada por el usuario

    let respuesta = ''; // Variable que almacena la respuesta
    if (typeof edad !== 'number') { // Se valida que el valor ingresado por el usuario sea de tipo numérico
        throw new Error('La información ingresada no es un número.');
    }
    else if (edad < 0) { // Se valida que el valor ingresado por el usuario sea mayor que 0
        throw new Error('La edad ingresada en menor a 0.');
    }

    respuesta = edad < mayoriaDeEdad ? `No eres mayor de edad` : "Eres mayor de edad";
    document.getElementById('resultadoEdad').innerText = respuesta;
}
// Función para limpiar resulado del calculo de edad
function limpiar_ResultadoEdad() {
    document.getElementById('resultadoEdad').innerText = '';
}
// #endregion

// #region EJECICIO 2
// Función para calcular nota final de alumno
function calcular_Nota_Final() {
    let nombre = document.getElementById('inputNombreAlumno').value;
    let carnet = document.getElementById('inputCarnet').value;

    let notaExamen = Number(document.getElementById('inputNotaExamen').value);
    let notaTareas = Number(document.getElementById('inputNotaTareas').value);
    let notaAsistencias = Number(document.getElementById('inputNotaAsistencia').value);
    let notaInvestigacion = Number(document.getElementById('inputNotaInvestigacion').value);
    // Calcular la nota final con los porcentajes dados
    const notaFinal = (notaExamen * 0.2) + (notaTareas * 0.4) + (notaAsistencias * 0.1) + (notaInvestigacion * 0.3);

    document.getElementById('resultadoNotas').classList.remove('d-none');
    document.getElementById('inputAlumnoNombre').value = nombre;
    document.getElementById('inputCarnetAlumno').value = carnet;
    document.getElementById('inputNotaFinal').value = notaFinal.toFixed(2);
}

// Función para limpiar resultado y controles para calcular nota final de alumno
function limpiar_ResultadoNotas() {
    document.getElementById('inputNombreAlumno').value = '';
    document.getElementById('inputCarnet').value = '';
    document.getElementById('inputNotaExamen').value = 0;
    document.getElementById('inputNotaTareas').value = 0;
    document.getElementById('inputNotaAsistencia').value = 0;
    document.getElementById('inputNotaInvestigacion').value = 0;

    document.getElementById('resultadoNotas').classList.add('d-none');
    document.getElementById('inputAlumnoNombre').value = '';
    document.getElementById('inputCarnetAlumno').value = '';
    document.getElementById('inputNotaFinal').value = 0;
}
// #endregion

// #region EJECICIO 3
// Función para calcular el nuevo salario del trabajador
function calcular_Aumento_Salarial() {
    let nombre = document.getElementById('inputNombreEmpleado').value;
    let salario = Number(document.getElementById('inputSalarioEmpleado').value);
    let categoria = document.getElementById('inputCategoria').value;
    let aumento = 0;
    switch (categoria) {
        case 'A':
            // Se aumenta un 15% 
            aumento = salario * (15 / 100);
            break;
        case 'B':
            // Se aumenta un 30% 
            aumento = salario * (30 / 100);
            break;
        case 'C':
            // Se aumenta un 10% 
            aumento = salario * (10 / 100);
            break;
        case 'D':
            // Se aumenta un 20% 
            aumento = salario * (20 / 100);
            break;
        default:
            categoria = 'No seleccionda';
            break;
    }
    nuevoSalario = salario + aumento;

    document.getElementById('inputEmpleadoNombre').value = nombre;
    document.getElementById('inputEmpleadoSalario').value = `$${salario}`;
    document.getElementById('inputEmpleadoCategoria').value = categoria;
    document.getElementById('inputEmpleadoAumento').value = `$${aumento}`;
    document.getElementById('inputEmpleadoNuevoSalario').value = `$${nuevoSalario}`;
}

function limpiar_ResultadoAumentoDeSalario() {
    document.getElementById('inputNombreEmpleado').value = '';
    document.getElementById('inputSalarioEmpleado').value = 0;

    document.getElementById('inputCategoria').value = 'Seleccionar Categoría';
    document.getElementById('inputEmpleadoNombre').value = '';
    document.getElementById('inputEmpleadoSalario').value = '0';
    document.getElementById('inputEmpleadoCategoria').value = 0;

    document.getElementById('inputEmpleadoAumento').value = '';
    document.getElementById('inputEmpleadoNuevoSalario').value = '';
}
// #endregion

// #region EJECICIO 4
// Función para calcular el mayor de dos números
function calcular_Numero_Mayor() {
    let primerNumero = Number(document.getElementById('inputPrimerNumero').value);
    let segundoNumero = Number(document.getElementById('inputSegundoNumero').value);
    if (primerNumero > segundoNumero) {
        document.getElementById('inputNumeroMayor').value = primerNumero;
    }
    else if (primerNumero < segundoNumero) {
        document.getElementById('inputNumeroMayor').value = segundoNumero;
    }
    else {
        document.getElementById('inputNumeroMayor').value = "Los números son iguales";
    }
}

// #endregion

// #region EJECICIO 5

const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD' // Cambia a 'USD' o cualquier otra moneda según sea necesario
});

const cochesConDescuento = [{
    id: 1,
    nombre: 'FORD FIESTA',
    precio: 9700,
    porcentajeDescuento: 5,
},
{
    id: 2,
    nombre: 'FORD FOCUS',
    precio: 7600,
    porcentajeDescuento: 10
},
{
    id: 3,
    nombre: 'FORD ESCAPE',
    precio: 10500,
    porcentajeDescuento: 20
}];

document.addEventListener('DOMContentLoaded', function () {
    const select = document.createElement('select');

    select.id = 'inputCoches';
    select.className = 'form-select';
    select.addEventListener('change', calcular_Descuento);

    // Generar las opciones
    cochesConDescuento.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.id;
        optionElement.textContent = `${opcion.nombre} - ${formatter.format(opcion.precio)}`;
        select.appendChild(optionElement);
    });

    const selectContainer = document.getElementById('select-coches-container');
    selectContainer.appendChild(select);
});

function calcular_Descuento(event) {
    let idCoche = Number(event.target.value);
    const coche = cochesConDescuento.find(c => c.id === idCoche);
    if (coche !== undefined) {
        let descuento = (coche.precio * (coche.porcentajeDescuento / 100));
        let nuevoPrecio = (coche.precio) - descuento;
        document.getElementById('inputCocheSeleccionado').value = `${coche.nombre}`;
        document.getElementById('inputDescuentoCoche').value = `${formatter.format(descuento)}`;
        document.getElementById('inputNuevoPrecioCoche').value = `${formatter.format(nuevoPrecio)}`;
    }
    else {

    }

    return dataCoche;
}

// #endregion

// #region EJECICIO 6

const viajeList = [{
    id: 1,
    nombre: 'Ciudad de Palma',
    tipo: 1,
    latitud: 14.3166,
    longitud: -89.1729
},
{
    id: 2,
    nombre: 'Ciudad de San Salvador',
    tipo: 1,
    latitud: 13.6927,
    longitud: -89.2183
},
{
    id: 3,
    nombre: 'Ciudad de Santa Ana',
    tipo: 1,
    latitud: 13.9778,
    longitud: -89.5637
},
{
    id: 4,
    nombre: 'La Costa del Sol',
    tipo: 2,
    latitud: 13.3436,
    longitud: -89.0063
},
{
    id: 5,
    nombre: 'Panchimalco',
    tipo: 2,
    latitud: 13.6132,
    longitud: -89.1789
},
{
    id: 6,
    nombre: 'Puerto el Triunfo',
    tipo: 2,
    latitud: 13.2766,
    longitud: -88.5493
}];


document.addEventListener('DOMContentLoaded', function () {
    const selectOrigen = document.createElement('select');
    const selectDestino = document.createElement('select');

    selectOrigen.id = 'inputOrigenViaje';
    selectOrigen.className = 'form-select';

    selectDestino.id = 'inputDestinoViaje';
    selectDestino.className = 'form-select';
    selectOrigen.addEventListener('change', calcular_Descuento_Viaje);
    selectDestino.addEventListener('change', calcular_Descuento_Viaje);

    const origenes = viajeList.filter(o => o.tipo === 1);
    const destinos = viajeList.filter(d => d.tipo === 2);

    const optionHiddenElement_O = document.createElement('option');
    optionHiddenElement_O.hidden = true;
    optionHiddenElement_O.textContent = `Seleccionar Origen`;
    selectOrigen.appendChild(optionHiddenElement_O);
    // Generar las opciones
    origenes.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.id;
        optionElement.textContent = `${opcion.nombre}`;
        selectOrigen.appendChild(optionElement);
    });
    const optionHiddenElement_D = document.createElement('option');
    optionHiddenElement_D.hidden = true;
    optionHiddenElement_D.textContent = `Seleccionar Destino`;
    selectDestino.appendChild(optionHiddenElement_D);
    // Generar las opciones
    destinos.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.id;
        optionElement.textContent = `${opcion.nombre}`;
        selectDestino.appendChild(optionElement);
    });
    const selectOrigenContainer = document.getElementById('select-origen-container');
    selectOrigenContainer.appendChild(selectOrigen);

    const selectDestinoContainer = document.getElementById('select-destino-container');
    selectDestinoContainer.appendChild(selectDestino);
});

async function calcular_Descuento_Viaje() {
    // const lugarSeleccionado = viajeList.find(v => v.id === Number(event.target.value));
    const lugarOrigen = viajeList.find(v => v.id === Number(document.getElementById('inputOrigenViaje').value));
    const lugarDestino = viajeList.find(v => v.id === Number(document.getElementById('inputDestinoViaje').value));

    let distancia;
    let distanciaOnline = calcular_Distancia_Offline(lugarOrigen.latitud, lugarOrigen.longitud, lugarDestino.latitud, lugarDestino.longitud);
    if (distanciaOnline === 0) {
        distancia = calcular_Distancia_Offline(lugarOrigen.latitud, lugarOrigen.longitud, lugarDestino.latitud, lugarDestino.longitud);
    }
    else {
        distancia = distanciaOnline;
    }

    precio = distancia * 1.25;
    let descuento = 0;
    if (lugarOrigen.id == 1 && lugarDestino.id == 4) {
        descuento = (precio * (5 / 100));
    }
    else if (lugarOrigen.id == 1 && lugarDestino.id == 5) {
        descuento = (precio * (10 / 100));
    }
    else if (lugarOrigen.id == 1 && lugarDestino.id == 6) {
        descuento = (precio * (15 / 100));
    }
    let nuevoPrecio = precio - descuento;
    document.getElementById('inputDistanciaViaje').value = `${distancia.toFixed(2)} km`;
    document.getElementById('inputPrecioViaje').value = `${formatter.format(precio)}`;
    document.getElementById('inputDescuentoViaje').value = `${formatter.format(descuento)}`;
    document.getElementById('inputNuevoPrecioViaje').value = `${formatter.format(nuevoPrecio)}`;

}

function calcular_Distancia_Offline(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const rad = Math.PI / 180; // Conversión de grados a radianes

    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = R * c; // Distancia en kilómetros
    return distancia;
}

async function calcula_Distancia_Online(lat1, lon1, lat2, lon2) {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes.length > 0) {
            const distancia = data.routes[0].distance / 1000; // Convertir a kilómetros
            return distancia; // Retornar la distancia
        } else {
            0;
        }
    } catch (error) {
        return 0;
    }
}
// #endregion

// #region EJECICIO 7

function ver_Resultados() {
    const inputsE7 = document.getElementsByClassName('input-numero-e7');
    let negativos = 0;
    let positivos = 0;
    let multiplos15 = 0;
    let pares = 0;
    for (let index = 0; index < inputsE7.length; index++) {
        if (Number(inputsE7[index].value) < 0) {
            negativos++
        }
        else if (Number(inputsE7[index].value) > 0) {
            positivos++
        }
        if (Number(inputsE7[index].value) % 15 === 0 && Number(inputsE7[index].value) !== 0) {
            multiplos15++
        }
        if (Number(inputsE7[index].value) % 2 === 0 && Number(inputsE7[index].value) !== 0) {
            pares = pares + Number(inputsE7[index].value);
        }
    }
    document.getElementById('inputNNegativos').value = negativos;
    document.getElementById('inputNPositivos').value = positivos;
    document.getElementById('inputNM15').value = multiplos15;
    document.getElementById('inputNPares').value = pares;

}
// #endregion

// #region EJECICIO 8
function ver_tabla_de_Multiplicar(event) {
    const numero = Number(event.target.value);
    const containerTablas = document.getElementById('tablas-multiplicar-container');
    while (containerTablas.firstChild || numero == 0) {
        containerTablas.removeChild(containerTablas.firstChild);
    }
    for (let index = 1; index < 11; index++) {
        const itemTabla = document.createElement('li');
        itemTabla.innerText = `${numero} x ${index} = ${numero * index}`;
        containerTablas.appendChild(itemTabla);
    }
}
// #endregion

// #region EJECICIO 9
function convertir_Temperatura(event) {
    // Obtener el valor de Celsius ingresado
    const celsius = parseFloat(event.target.value);

    // Verificar si el input está vacío o no es un número
    if (isNaN(celsius)) {
        document.getElementById('resultado-tempratura').textContent = 'Por favor, ingresa un valor válido.';
        return;
    }

    // Convertir a Fahrenheit
    const fahrenheit = (celsius * 9 / 5) + 32;

    // Determinar el mensaje basado en el valor en Fahrenheit
    let mensaje = '';
    if (fahrenheit >= 14 && fahrenheit < 32) {
        mensaje = 'Temperatura baja';
    } else if (fahrenheit >= 32 && fahrenheit < 68) {
        mensaje = 'Temperatura adecuada';
    } else if (fahrenheit >= 68 && fahrenheit <= 96) {
        mensaje = 'Temperatura alta';
    } else {
        mensaje = 'Temperatura desconocida';
    }

    // Mostrar el resultado
    document.getElementById('resultado-tempratura').textContent = `La temperatura en Fahrenheit es ${fahrenheit.toFixed(2)}ºF. ${mensaje}`;
}
// #endregion

// #region EJECICIO 10
const turnos = [{
    id: 1,
    nombre: 'TURNO MAÑANA'
},
{
    id: 2,
    nombre: 'TURNO TARDE'
},
{
    id: 3,
    nombre: 'TURNO NOCHE'
}];

let alumnosList = [];

document.addEventListener('DOMContentLoaded', function () {
    const select = document.createElement('select');

    select.id = 'input-turno-alumno';
    select.className = 'form-select';
    //    select.addEventListener('change', calcular_Descuento);

    // Generar las opciones
    turnos.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.id;
        optionElement.textContent = `${opcion.nombre}`;
        select.appendChild(optionElement);
    });

    const selectContainer = document.getElementById('select-turnos-container');
    selectContainer.appendChild(select);
});
let idCounter = 1;

function agregar_Alumno(event) {
    event.preventDefault();  // Esto previene el refresco de la página
    const nombre = document.getElementById('input-nombre-alumno').value;
    const edad = document.getElementById('input-edad-alumno').value;
    const idTurno = Number(document.getElementById('input-turno-alumno').value);
    const turnoNombre = turnos.find(t => t.id === idTurno).nombre;
    if (validateForm(nombre, edad, idTurno)) {
        agregar_Fila(nombre, edad, idTurno, turnoNombre);
    }
}

// Función para añadir una fila
function agregar_Fila(nombre, edad, idTurno, turno) {
    const tableBody = document.querySelector('#table-alumnos tbody');
    const row = document.createElement('tr');
    const rowId = idCounter++;
    const alumno = { id: rowId, nombre, edad, idTurno };
    row.setAttribute('data-id', rowId);
    row.innerHTML = `
    <td >${alumno.id}</td>
        <td >${nombre}</td>
        <td class="text-center">${edad}</td>
        <td class="text-center">${turno}</td>
        <td class="text-center acciones-row">
            <button class="delete-alumno" title="Eliminar"><i class="bi bi-trash3"></i></button>
        </td>
    `;
    alumnosList.push(alumno);
    tableBody.appendChild(row);
    agregar_Eventos_De_Fila(row);
}

function eliminar_Fila(row) {
    const rowId = row.getAttribute('data-id');
    alumnosList = alumnosList.filter(a => a.id !== Number(rowId));
    row.remove();
}

function agregar_Eventos_De_Fila(row) {
    row.querySelector('.delete-alumno').addEventListener('click', () => eliminar_Fila(row));
}

function obtener_Promedio(alumnosByTurno) {
    let suma = 0;
    let cantidad = alumnosByTurno.length;
    if (alumnosByTurno.length > 0) {
        alumnosByTurno.forEach(function (alumno) {
            suma += Number(alumno.edad);
        });
        return suma / cantidad;
    }
    else {
        return 0;
    }
}

function calcular_Promedios() {
    const alumnosManana = alumnosList.filter(a => a.idTurno == 1);
    const alumnosTarde = alumnosList.filter(a => a.idTurno == 2);
    const alumnosNoche = alumnosList.filter(a => a.idTurno == 3);

    // Calcular promedios
    const promedioManana = obtener_Promedio(alumnosManana);
    const promedioTarde = obtener_Promedio(alumnosTarde);
    const promedioNoche = obtener_Promedio(alumnosNoche);

    // Determinar cuál es el mayor promedio
    let mayorPromedio = Math.max(promedioManana, promedioTarde, promedioNoche);
    let turnoConMayorPromedio = '';

    if (mayorPromedio === promedioManana) {
        turnoConMayorPromedio = 'Turno mañana';
    } else if (mayorPromedio === promedioTarde) {
        turnoConMayorPromedio = 'Turno tarde';
    } else {
        turnoConMayorPromedio = 'Turno noche';
    }

    // Mostrar los resultados
    document.getElementById('resultado-edades-alumnos').innerHTML = `
        Promedio de edades del turno mañana: ${promedioManana.toFixed(2)}<br>
        Promedio de edades del turno tarde: ${promedioTarde.toFixed(2)}<br>
        Promedio de edades del turno noche: ${promedioNoche.toFixed(2)}<br>
        El turno con el mayor promedio de edades es: ${mayorPromedio === 0 ? "Ninguno" : turnoConMayorPromedio}.
    `;
}

// Función para validar el formulario
function validateForm(nombre, edad, turno) {
    if (nombre.trim() === "") {
        return false;
    }

    if (edad.trim() === "" || isNaN(edad) || parseInt(edad) <= 0) {
        return false;
    }

    if (turno <= 0) {
        return false;
    }

    return true;
}
// #endregion

let currentSectionIndex = -1; // Índice actual de la sección visible

function ocultarNavegacion() {
    const encabezado = document.getElementById('encabezado');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.classList.add('d-none');
    nextBtn.classList.add('d-none');
    currentSectionIndex = -1;
    encabezado.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.getElementsByClassName('ejercicio');

    // Obtener los botones
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const btnVerEjercicios = document.getElementById('btn-ver-ejercicios');

    // Función para mostrar la sección actual
    function scrollToSection(index) {
        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    btnVerEjercicios.addEventListener('click', function () {
        const prevBtn = document.getElementById('prev-btn');
        prevBtn.classList.add('d-none');
        currentSectionIndex = -1;
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++; // Avanza a la siguiente sección
            scrollToSection(currentSectionIndex);
            if (currentSectionIndex == 0) {
                const nextBtn = document.getElementById('next-btn');
                nextBtn.classList.remove('d-none');
            }
        }
    });

    // Manejador del botón "Siguiente"
    nextBtn.addEventListener('click', function () {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++; // Avanza a la siguiente sección
            scrollToSection(currentSectionIndex);
            if (currentSectionIndex == 1) {
                const prevBtn = document.getElementById('prev-btn');
                prevBtn.classList.remove('d-none');
            }
        }
    });

    // Manejador del botón "Anterior"
    prevBtn.addEventListener('click', function () {
        if (currentSectionIndex > 0) {
            currentSectionIndex--; // Retrocede a la sección anterior
            scrollToSection(currentSectionIndex);
            if (currentSectionIndex <= 0) {
                const prevBtn = document.getElementById('prev-btn');
                prevBtn.classList.add('d-none');
            }
        }
    });

    function detectarSeccionVisible() {
        const encabezado = document.getElementById('encabezado');
        const rectEncabezado = encabezado.getBoundingClientRect();
        const windowHeightEncabezado = window.innerHeight || document.documentElement.clientHeight;
        if (rectEncabezado.top >= 0 && rectEncabezado.bottom <= windowHeightEncabezado) {
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');

            prevBtn.classList.add('d-none');
            nextBtn.classList.add('d-none');
            currentSectionIndex = -1;
        }
        else {
            for (let index = 0; index < sections.length; index++) {
                const rect = sections[index].getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;

                // Comprobar si la sección está dentro del viewport
                if (rect.top >= 0 && rect.bottom <= windowHeight) {
                    if (index == 0) {
                        const prevBtn = document.getElementById('prev-btn');
                        const nextBtn = document.getElementById('next-btn');
                        nextBtn.classList.remove('d-none');
                        prevBtn.classList.add('d-none');
                        currentSectionIndex = index;
                    }
                    else if (index >= 1) {
                        const prevBtn = document.getElementById('prev-btn');
                        const nextBtn = document.getElementById('next-btn');
                        prevBtn.classList.remove('d-none');
                        nextBtn.classList.remove('d-none');
                        currentSectionIndex = index;
                    }
                    else if (index <= 0) {
                        const prevBtn = document.getElementById('prev-btn');
                        prevBtn.classList.add('d-none');
                        currentSectionIndex = -1;
                    }
                }
            }
        }
    }

    // Llamar a la función cada vez que se haga scroll
    window.addEventListener('scroll', detectarSeccionVisible);
});



