<?php

function bubbleSortDescending(&$array) {
    // CONTAMOS CUÁNTOS ELEMENTOS TIENE EL ARREGLO
    $n = count($array);

    // ESTE PRIMER CICLO VA A REPETIR EL PROCESO DE ORDENAR
    for ($i = 0; $i < $n - 1; $i++) {
        // ESTE SEGUNDO CICLO RECORRE LOS ELEMENTOS DEL ARREGLO
        for ($j = 0; $j < $n - $i - 1; $j++) {
            // SI EL NÚMERO ACTUAL ES MENOR QUE EL SIGUIENTE, LOS CAMBIAMOS DE LUGAR
            if ($array[$j] < $array[$j + 1]) {
                // GUARDAMOS EL NÚMERO ACTUAL EN UNA VARIABLE TEMPORAL
                $temp = $array[$j];
                // EL NÚMERO SIGUIENTE PASA AL LUGAR ACTUAL
                $array[$j] = $array[$j + 1];
                // EL NÚMERO ACTUAL SE MUEVE AL LUGAR SIGUIENTE
                $array[$j + 1] = $temp;
            }
        }
    }
}

// LISTA DE EJEMPLO
$numbers = [3, -1, 5, 7, 2, -3, 5];

echo "Lista antes de ordenar:\n";
echo implode(", ", $numbers) . "\n";

bubbleSortDescending($numbers);

echo "Lista después de ordenar:\n";
echo implode(", ", $numbers) . "\n";
?>