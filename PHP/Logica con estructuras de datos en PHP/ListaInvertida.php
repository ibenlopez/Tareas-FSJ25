<?php
// Problema de Lista Invertida:
// Escribe un programa que tome un array de números y devuelva una nueva lista que contenga los mismos elementos en orden inverso.

class Lista
{
    public $datos; // ALMACENARA EL ARRAY INICIAL
    public $invertida; // ALMACENARA LA FUNCIÓN PARA INVERTIR EL ARRAY

    public function __construct($datos)
    {
        $this->datos = $datos;
        $this->invertida = $this->invertirArray();
    }

    private function invertirArray()
    {
        $arrayInvertido = []; // ARRAY VACÍO PARA ALMACENAR LOS ELEMENTOS EN ORDEN INVERSO
        for ($i = count($this->datos) - 1; $i >= 0; $i--) {
            $arrayInvertido[] = $this->datos[$i]; // AÑADIMOS CADA ELEMENTO AL NUEVO ARRAY
        }
        return $arrayInvertido;
    }
}

// EJEMPLO
$lista = new Lista([1, 2, 3]);
print_r($lista->invertida);
