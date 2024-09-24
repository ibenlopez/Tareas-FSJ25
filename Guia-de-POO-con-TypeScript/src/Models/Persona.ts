// Clase abstracta Persona
export abstract class Persona {
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  edad: number;

  constructor(nombre: string, apellido: string, direccion: string, telefono: string, edad: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.telefono = telefono;
    this.edad = edad;
  }

  // Método para verificar si es mayor de edad
  esMayorDeEdad(): string {
    if (this.edad >= 18) {
      return `${this.nombre} ${this.apellido}, tiene ${this.edad} años de edad, es mayor de edad.`;
    } else {
      return `${this.nombre} ${this.apellido}, tiene ${this.edad} años de edad, no es mayor de edad.`;
    }
  }

  // Método abstracto para mostrar los datos personales
  abstract mostrarDatos(element: HTMLDivElement): void;
}

// Clase Empleado que hereda de Persona
export class Empleado extends Persona {
  sueldo: number;

  constructor(nombre: string, apellido: string, direccion: string, telefono: string, edad: number, sueldo: number) {
    super(nombre, apellido, direccion, telefono, edad);
    this.sueldo = sueldo;
  }

  // Método para cargar el sueldo
  cargarSueldo(sueldo: number): string {
    this.sueldo = Number.isNaN(sueldo) ? 0 :sueldo;
    return `Sueldo de $${this.sueldo.toFixed()} cargado correctamente`;
  }

  // Método para imprimir el sueldo
  imprimirSueldo(element: HTMLParagraphElement): void {
    element.innerText = `El sueldo de ${this.nombre} ${this.apellido} es: $${this.sueldo.toFixed()}`;
  }

  // Implementación del método abstracto para mostrar los datos personales
  mostrarDatos(element: HTMLDivElement): void {
    element.innerHTML = `<span>Nombre: ${this.nombre.trim()}</span>
    <span>Apellido: ${this.apellido}</span>
    <span>Dirección: ${this.direccion}</span>
    <span>Teléfono: ${this.telefono}</span>
    <span>Edad: ${this.edad} años</span>`;
  }
  mostrarDatosEmpleado(element: HTMLDivElement): void {
    element.innerHTML = `<span>Nombre: ${this.nombre.trim()}</span>
    <span>Apellido: ${this.apellido}</span>
    <span>Dirección: ${this.direccion}</span>
    <span>Teléfono: ${this.telefono}</span>
    <span>Edad: ${this.edad} años</span>
    <span>Sueldo: $${this.sueldo.toFixed()}</span>`;
  }
}
