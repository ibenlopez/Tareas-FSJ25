export class Cuenta {
    nombre: string;
    cantidad: number;
    tipoCuenta: string;
    numeroCuenta: string;

    constructor(nombre: string, cantidad: number, tipoCuenta: string, numeroCuenta: string) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.tipoCuenta = tipoCuenta;
        this.numeroCuenta = numeroCuenta;
    }

    // Método para depositar
    depositar(): string {
        if (this.cantidad < 5) {
            return "El valor a depositar debe ser mayor a $5.00";
        } else {
            return `Se ha depositado correctamente la cantidad de $${this.cantidad.toFixed(2)}`;
        }
    }

    // Método para retirar
    retirar(valor: number): string {
        valor = Number.isNaN(valor) ? 0 : valor;
        if (this.cantidad < 5) {
            return "Solo se permite retirar montos mayores a $5.00";
        }
        if (valor > this.cantidad) {
            return "No hay suficiente saldo en la cuenta.";
        } else {
            this.cantidad -= valor;
            return `Has retirado $${valor.toFixed(2)}. Te quedan $${this.cantidad.toFixed(2)} en tu cuenta.`;
        }
    }

    // Método para mostrar los datos
    mostrarDatos(element: HTMLDivElement): void {
        element.innerHTML = `<span>Nombre: ${this.nombre.trim()}</span>
        <span>Tipo de cuenta: ${this.tipoCuenta}</span>
        <span>Número de cuenta: ${this.numeroCuenta}</span>`;
    }
}