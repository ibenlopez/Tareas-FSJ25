<?php

// Problema de la serie Fibonacci:
// Escribe una función llamada generar Fibonacci que reciba un número n como parámetro y genere los primeros n términos de la serie Fibonacci. La serie comienza con 0 y 1, y cada término subsiguiente es la suma de los dos anteriores.

function generarFibonacci($n) {
    // SE INICIA EL ARRAY PARA ALMACENAR LOS VALORES DE LA SERIE Fibonacci
    $fibonacci = [];

    // SI $n ES MENOR O IGUAL A 0, RETORNAMOS EL ARRAY VACÍO
    if ($n <= 0) {
        return $fibonacci;
    }

    // AGREGAMOS EL PRIMER TÉRMINO DE LA SERIE
    $fibonacci[] = 0;

    // SI $n ES 1, SE RETORNA EL ARRAY CON SOLO EL PRIMER TÉRMINO
    if ($n == 1) {
        return $fibonacci;
    }

    // AGREGAMOS EL SEGUNDO TERMINO DE LA SERIE
    $fibonacci[] = 1;

    // GENERAMOS LOS TERMINOS RESTANTES MIENTRAS SEA MENOR AL VALOR DE $n
    for ($i = 2; $i < $n; $i++) {
        $fibonacci[] = $fibonacci[$i - 1] + $fibonacci[$i - 2];
    }

    // SE RETORNA EL ARRAY CON LOS TÉRMINOS DE LA SERIE Fibonacci
    return $fibonacci;
}

// EJEMPLO:
print_r(generarFibonacci(5));
?>