import './style.css'
import { CabeceraPagina } from './Models/CabeceraPagina';
import { Calculadora } from './Models/Calculadora';
import { Cancion } from './Models/Cancion';
import { Cuenta } from './Models/Cuenta';
import { Empleado } from './Models/Persona';

//#region EJERCICIO 1
const header = document.getElementById('cabecera');
const styles = window.getComputedStyle(header!);
const color = styles.getPropertyValue('color');
const fontFamily = styles.getPropertyValue('font-family');
let textAlign = styles.getPropertyValue('text-align');
textAlign = textAlign === 'center' ? 'Centrado' :
    textAlign === 'right' ? 'Derecha' :
        textAlign === 'left' ? 'Izquierda' : ''
const cabecera = new CabeceraPagina(header!.textContent!, color, fontFamily, textAlign);
cabecera.obtenerPropiedades();

let cssAlignment;
document.getElementById('selectAlineacion')!.addEventListener('change', (element) => {
    const selectValue = (element.target as HTMLSelectElement).value;
    cssAlignment = cabecera.definirAlineacion(selectValue);
    header!.style.textAlign = cssAlignment!;
    (document.getElementById('propiedades-ejecicio-1') as HTMLParagraphElement).querySelectorAll('span').forEach(element => {
        element.remove();
    });;
});
document.getElementById('ver-propiedades-ejercicio-1')!.addEventListener('click', () => {
    cabecera.imprimirPropiedades(document.getElementById('propiedades-ejecicio-1') as HTMLDivElement);
});
//#endregion

//#region EJERCICIO 2
document.getElementById('selectTipoOperacion')!.addEventListener('change', () => {
    const operacion = (document.getElementById('selectTipoOperacion') as HTMLSelectElement).value!;
    if (operacion == 'potencia' || operacion == 'factorial') {
        if (operacion == 'potencia') {
            (document.getElementById('txtPrimerValor') as HTMLLabelElement).innerText = 'Base:';
            (document.getElementById('txtSegundoValor') as HTMLLabelElement).innerText = 'Exponente:';
            (document.getElementById('inputSegundoValor') as HTMLInputElement).disabled = false;
        }
        if (operacion == 'factorial') {
            (document.getElementById('txtPrimerValor') as HTMLLabelElement).innerText = 'Valor';
            (document.getElementById('txtSegundoValor') as HTMLLabelElement).innerText = '';
            (document.getElementById('inputSegundoValor') as HTMLInputElement).value! = '0';
            (document.getElementById('inputSegundoValor') as HTMLInputElement).disabled = true;
        }
    }
    else {
        (document.getElementById('txtPrimerValor') as HTMLLabelElement).innerText = 'Primer valor:';
        (document.getElementById('txtSegundoValor') as HTMLLabelElement).innerText = 'Segundo valor:';
        (document.getElementById('inputSegundoValor') as HTMLInputElement).disabled = false;
    }
});
document.getElementById('btn-calcular-operaciones')!.addEventListener('click', Calcular);

function Calcular() {
    const calculadora = new Calculadora();
    const operacion = (document.getElementById('selectTipoOperacion') as HTMLSelectElement).value!;
    const primerValor = (document.getElementById('inputPrimerValor') as HTMLInputElement).value!;
    const segundoValor = (document.getElementById('inputSegundoValor') as HTMLInputElement).value!;
    let resultado = 0;
    switch (operacion) {
        case 'sumar':
            resultado = calculadora.sumar(parseFloat(primerValor), parseFloat(segundoValor));
            break;
        case 'restar':
            resultado = calculadora.restar(parseFloat(primerValor), parseFloat(segundoValor));
            break;
        case 'multiplicar':
            resultado = calculadora.multiplicar(parseFloat(primerValor), parseFloat(segundoValor));
            break;
        case 'dividir':
            resultado = calculadora.dividir(parseFloat(primerValor), parseFloat(segundoValor));
            break;
        case 'potencia':
            resultado = calculadora.potencia(parseFloat(primerValor), parseFloat(segundoValor));
            break;
        case 'factorial':
            resultado = calculadora.factorial(parseFloat(primerValor));
            break;
    }
    (document.getElementById('inputResultado') as HTMLInputElement).value! = resultado.toFixed(2).toString();
}
//#endregion

//#region EJERCICIO 3
const TituloCancion = (document.getElementById('inputTituloCancion') as HTMLInputElement).value;
const GeneroCancion = (document.getElementById('inputGeneroCancion') as HTMLInputElement).value;
const cancion = new Cancion(TituloCancion, GeneroCancion);
document.getElementById('inputAutorCancion')!.addEventListener('input', () => {
    const autorCancion = (document.getElementById('inputAutorCancion') as HTMLInputElement).value;
    cancion.autor = autorCancion;
});
document.getElementById('btn-ver-cancion')!.addEventListener('click', () => {
    cancion.mostrarDatos(document.getElementById('datos-de-cancion') as HTMLDivElement);
});
//#endregion

//#region EJERCICIO 4
const cuenta = new Cuenta("BEN", 10, "AHORRO", "1020304050");

document.getElementById('selectAccionesDeCuenta')!.addEventListener('change', () => {
    const operacion = (document.getElementById('selectAccionesDeCuenta') as HTMLSelectElement).value!;
    switch (operacion) {
        case 'depositar':
            (document.getElementById('inputMonto') as HTMLInputElement).value = '';
            (document.getElementById('inputMonto') as HTMLInputElement).disabled = true;
            break;
        case 'retirar':
            (document.getElementById('inputMonto') as HTMLInputElement).disabled = false;
            break;
    }
});

document.getElementById('btn-ejecutar-accion')!.addEventListener('click', () => {
    let valor = parseFloat((document.getElementById('inputMonto') as HTMLInputElement).value);
    const resultado = (document.getElementById('resultadoAccion') as HTMLParagraphElement);
    const operacion = (document.getElementById('selectAccionesDeCuenta') as HTMLSelectElement).value!;
    switch (operacion) {
        case 'depositar':
            resultado.innerText = cuenta.depositar();
            break;
        case 'retirar':
            resultado.innerText = cuenta.retirar(valor);
            break;
    }
    ;
});

document.getElementById('btn-ver-cuenta')!.addEventListener('click', () => {
    cuenta.mostrarDatos(document.getElementById('datos-de-cuenta') as HTMLDivElement);
});
//#endregion

//#region EJERCICIO 5
const empleado = new Empleado("BEN", "LOPEZ", "Calle Principal 123", "555-1234", 22, 100);
document.getElementById('btn-validar-edad')!.addEventListener('click', () => {
    let validacionEdad = empleado.esMayorDeEdad();
    (document.getElementById('resultado-validacion-edad') as HTMLParagraphElement).innerText = validacionEdad;
});

document.getElementById('btn-ver-datos-personales')!.addEventListener('click', () => {
    empleado.mostrarDatos((document.getElementById('datos-personales') as HTMLDivElement));
});

document.getElementById('btn-asignar-sueldo')!.addEventListener('click', () => {
    const sueldo = parseFloat((document.getElementById('sueldo-empleado') as HTMLInputElement).value);
    let cargarSueldo = empleado.cargarSueldo(sueldo);
    (document.getElementById('resultado-cargar-sueldo') as HTMLParagraphElement).innerText = cargarSueldo;
});

document.getElementById('btn-ver-sueldo')!.addEventListener('click', () => {
    empleado.imprimirSueldo((document.getElementById('resultado-sueldo') as HTMLParagraphElement));
});

document.getElementById('btn-ver-datos-de-empleado')!.addEventListener('click', () => {
    empleado.mostrarDatosEmpleado((document.getElementById('datos-de-empleado') as HTMLDivElement));
});
//#endregion
