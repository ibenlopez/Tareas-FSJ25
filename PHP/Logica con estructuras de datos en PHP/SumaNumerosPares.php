<?php
// Problema de Suma de Números Pares:
// Crea un script que sume todos los números pares en un array de números enteros.

class SumadorPares
{
    public $numeros; // ALMACENARA EL ARRAY DE NUMEROS
    public $sumaPares; //  ALMACENARA LA FUNCIÓN PARA SUMAR LOS NUMEROS PARES DEL ARRAY

    public function __construct($numeros)
    {
        $this->numeros = $numeros;
        $this->sumaPares = $this->calcularSumaPares();
    }

    private function calcularSumaPares()
    {
        $suma = 0; // INICIALIZAMOS LA SUMA EN 0
        foreach ($this->numeros as $numero) {
            // VERIFICAR SI EL NÚMERO ES PAR
            if ($numero % 2 == 0) {
                $suma += $numero; // AGREGAMOS EL NÚMERO A LA SUMA
            }
        }
        return $suma;
    }
}

// EJEMPLO
$sumador = new SumadorPares([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
echo "La suma de los números pares es: " . $sumador->sumaPares;
