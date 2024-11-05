<?php

// Problema de números Primos:
// Crea una función llamada esPrimo que determine si un número dado es primo o no. Un número primo es aquel que solo es divisible por 1 y por sí mismo.

function esPrimo($numero) {
    // LOS NUMEROS MENORES O IGUALES A 1 NO SON PRIMOS
    if ($numero <= 1) {
        return false;
    }

    // 2 y 3 SON PRIMOS.
    if ($numero <= 3) {
        return true;
    }

    // SI EL NUMERO ES DIVISIBLE POR 2 O 3, NO ES PRIMO
    if ($numero % 2 == 0 || $numero % 3 == 0) {
        return false;
    }

    // SE VERIFICA DEL 5 EN DELANTE, OMITIENDO LOS MÚLTIPLOS DE 2 Y 3
    for ($i = 5; $i * $i <= $numero; $i += 6) {
        if ($numero % $i == 0 || $numero % ($i + 2) == 0) {
            return false;
        }
    }

    // SI NO SE ENCUENTA DIVISOR, ENTONCES ES PRIMO
    return true;
}

// EJEMPLO
echo esPrimo(17) ? "Es primo" : "No es primo";
