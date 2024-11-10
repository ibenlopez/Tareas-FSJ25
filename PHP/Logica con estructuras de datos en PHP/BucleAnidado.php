<?php

// Problema de Bucle Anidado:
// Escribe un programa que utilice bucles anidados para imprimir un patrón de asteriscos en forma de pirámide.

class Piramide
{
    public $altura; // ALMACENARÁ LA ALTURA DE LA PIRÁMIDE
    public $patron; // ALMACENARÁ EL PATRÓN COMPLETO DE LA PIRÁMIDE COMO UNA LISTA (ARRAY) DE LÍNEAS DE TEXTO

    public function __construct($altura)
    {
        $this->altura = $altura;
        $this->patron = $this->construirPiramide();
    }

    // CREA EL PATRÓN DE LA PIRÁMIDE. ESTE MÉTODO SOLO PUEDE SER LLAMADO DESDE DENTRO DE LA CLASE "Piramide"
    private function construirPiramide()
    {
        $piramide = []; // ARRAY QUE ALMACENARÁ CADA LÍNEA DE LA PIRÁMIDE

        //  BUCLE "for" QUE INICIA EN "1" HASTA EL VALOR DE "$this->altura".CADA ITERACIÓN REPRESENTA UN NIVEL DE LA PIRÁMIDE
        for ($i = 1; $i <= $this->altura; $i++) {
            // CONSTRUYE UNA LÍNEA DE TEXTO PARA EL NIVEL DE LA PIRÁMIDE:
            // PRIMER "str_repeat" CREA LOS ESPACIOS NECESARIOS A LA IZQUIERDA PARA ALINEAR LOS ASTERISCOS EN FORMA DE PIRÁMIDE
            // SEGUNDO "str_repeat"  AGREGA LA CANTIDAD NECESARIA DE ASTERISCOS PARA FORMAR LA PIRÁMIDE
            $linea = str_repeat(" ", $this->altura - $i) . str_repeat("*", 2 * $i - 1);
            $piramide[] = $linea; // AGREGA LA LÍNEA GENERADA AL ARRAY
        }

        return $piramide;
    }

    public function imprimirPiramide()
    {
        // QUE RECORRE CADA LÍNEA EN `patron` Y LA IMPRIME CANCATENANDOLE UN SALTO DE LINEA AL FINAL
        foreach ($this->patron as $linea) {
            echo $linea . "\n";
        }
    }
}

// EJEMPLO
$piramide = new Piramide(2);
$piramide->imprimirPiramide();
