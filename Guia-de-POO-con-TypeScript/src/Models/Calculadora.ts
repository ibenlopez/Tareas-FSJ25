export class Calculadora {
    // Método para sumar
    sumar(a: number, b: number): number {
        return a + b;
    }

    // Método para restar
    restar(a: number, b: number): number {
        return a - b;
    }

    // Método para multiplicar
    multiplicar(a: number, b: number): number {
        return a * b;
    }

    // Método para dividir
    dividir(a: number, b: number): number {
        if (b === 0) {
            alert("No se puede calcular el factorial de un número negativo");
            throw new Error("No se puede calcular el factorial de un número negativo");
        }
        return a / b;
    }

    // Método para calcular la potencia
    potencia(base: number, exponente: number): number {
        let resultado = 1;

        for (let i = 0; i < exponente; i++) {
            resultado *= base;
        }

        return resultado;
    }

    // Método para calcular el factorial
    factorial(n: number): number {
        if (n < 0) {
            alert("No se puede calcular el factorial de un número negativo");
            throw new Error("No se puede calcular el factorial de un número negativo");
        }

        let resultado = 1;

        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }

        return resultado;
    }
}