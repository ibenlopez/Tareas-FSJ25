<?php

// Problema de Palíndromos:
// Implementa una función llamada esPalindromo que determine si una cadena de texto dada es un palíndromo. Un palíndromo es una palabra, frase o secuencia que se lee igual en ambas direcciones.

function esPalindromo($cadena) {
    // SE ELIMINA LOS ESPACIO EN BLANCO Y SE CONVIERTE A MINUSCULAS
    $cadena = strtolower(str_replace(' ', '', $cadena));

    // SE OBTIENE LA LONGITUD DE LA CADENA
    $longitud = strlen($cadena);
    
    // COMPARAMOS LOS CARACTERES DE LA CADENA DESDE LOS EXTREMOS
    for ($i = 0; $i < $longitud / 2; $i++) {
        if ($cadena[$i] !== $cadena[$longitud - $i - 1]) {
            // SI NO COINCIDEN, ES PORQUE NO ES UN PALÍNDROMO
            return false;
        }
    }
    
    // SI TODOS LOS CARACTERES COINCIDEN, SI ES UN PALÍNDROMO
    return true;
}

// EJEMPLO
echo esPalindromo("Anita lava la tina") ? "Es palíndromo" : "No es palíndromo";
?>
