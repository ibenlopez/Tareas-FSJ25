<?php
function insertionSort(&$array) {
    // RECORREMOS CADA ELEMENTO DE LA LISTA, COMENZANDO DESDE EL SEGUNDO
    for ($i = 1; $i < count($array); $i++) {
        // GUARDAMOS EL ELEMENTO ACTUAL QUE VAMOS A INSERTAR EN LA POSICIÓN CORRECTA
        $key = $array[$i];
        
        // INICIAMOS UN ÍNDICE PARA COMPARAR CON LOS ELEMENTOS A LA IZQUIERDA
        $j = $i - 1;
        
        // MIENTRAS HAYA ELEMENTOS MAYORES QUE EL ACTUAL A LA IZQUIERDA
        while ($j >= 0 && $array[$j] > $key) {
            // MOVEMOS EL ELEMENTO MAYOR UNA POSICIÓN A LA DERECHA
            $array[$j + 1] = $array[$j];
            $j--; // PASAMOS AL ELEMENTO ANTERIOR
        }
        
        // COLOCAMOS EL ELEMENTO ACTUAL EN SU POSICIÓN CORRECTA
        $array[$j + 1] = $key;
    }
}

// LISTA DE NOMBRES PARA ORDENAR
$names = ["Zoe", "Ana", "Luis", "Carlos", "Beatriz", "Ximena"];

// MOSTRAR LISTA ANTES DE ORDENAR
echo "Lista antes de ordenar:\n";
echo implode(", ", $names) . "\n";

// LLAMAR A LA FUNCIÓN PARA ORDENAR
insertionSort($names);

// MOSTRAR LISTA DESPUÉS DE ORDENAR
echo "Lista después de ordenar:\n";
echo implode(", ", $names) . "\n";
?>
