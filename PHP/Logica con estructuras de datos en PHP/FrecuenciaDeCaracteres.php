<?php
// Problema de Frecuencia de Caracteres:
// Implementa una función que tome una cadena de texto y devuelva un array asociativo que muestre la frecuencia de cada carácter en la cadena.

class FrecuenciaCaracteres
{
    public $cadena; // ALMACENARA LA CADENA DE TEXTO
    public $frecuencia; // ALMACENARA LA FUNCIÓN PARA CONTAR LA FRECUENCIA DE LOS CARACTERES

    public function __construct($cadena)
    {
        $this->cadena = $cadena;
        $this->frecuencia = $this->contarFrecuencia();
    }

    private function contarFrecuencia()
    {
        $frecuencia = []; // ARRAY PARA ALMACENAR LA FRECUENCIA DE CARA CARÁCTER

        // SE RECORRE CADA CARÁCTER DE LA CADENA
        for ($i = 0; $i < strlen($this->cadena); $i++) {
            $caracter = $this->cadena[$i];

            // SI EXISTE EL CARÁCTER EN EL ARRAY ENTONCES SE INCREMENTA EL CONTADOR
            if (isset($frecuencia[$caracter])) {
                $frecuencia[$caracter]++;
            } else {
                // SI NO EXISTE EL CARÁCTER EN EL ARRAY ENTONCES SE INICIALIZA EN 1
                $frecuencia[$caracter] = 1;
            }
        }
        return $frecuencia;
    }
}

// EJEMPLO
$frecuencia = new FrecuenciaCaracteres("pipiripau");
print_r($frecuencia->frecuencia);
