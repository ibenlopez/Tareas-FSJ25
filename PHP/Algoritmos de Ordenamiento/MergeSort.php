<?php
function mergeSort(&$array)
{
    // SI LA LISTA TIENE 1 O NINGÚN ELEMENTO, YA ESTÁ ORDENADA
    if (count($array) <= 1) {
        return;
    }

    // DIVIDIMOS EL ARREGLO EN DOS PARTES
    $middle = floor(count($array) / 2); // ENCONTRAMOS LA MITAD
    $left = array_slice($array, 0, $middle); // TOMAMOS LA PRIMERA MITAD
    $right = array_slice($array, $middle); // TOMAMOS LA SEGUNDA MITAD

    // ORDENAMOS CADA MITAD USANDO RECURSIÓN (LA FUNCIÓN SE LLAMA A SÍ MISMA)
    mergeSort($left);
    mergeSort($right);

    // UNIMOS LAS DOS PARTES YA ORDENADAS
    $array = merge($left, $right);
}

function merge($left, $right)
{
    // CREAMOS UN ARREGLO VACÍO PARA GUARDAR LOS ELEMENTOS ORDENADOS
    $result = [];

    // MIENTRAS QUE LAS DOS PARTES TENGAN ELEMENTOS
    while (count($left) > 0 && count($right) > 0) {
        // COMPARAMOS EL PRIMER ELEMENTO DE CADA PARTE
        if ($left[0] <= $right[0]) {
            // SI EL PRIMERO DE LA IZQUIERDA ES MENOR O IGUAL, LO AÑADIMOS AL RESULTADO
            $result[] = array_shift($left);
        } else {
            // SI EL PRIMERO DE LA DERECHA ES MENOR, LO AÑADIMOS AL RESULTADO
            $result[] = array_shift($right);
        }
    }

    // SI QUEDAN ELEMENTOS EN LA IZQUIERDA, LOS AÑADIMOS AL RESULTADO
    while (count($left) > 0) {
        $result[] = array_shift($left);
    }

    // SI QUEDAN ELEMENTOS EN LA DERECHA, LOS AÑADIMOS AL RESULTADO
    while (count($right) > 0) {
        $result[] = array_shift($right);
    }

    // DEVOLVEMOS EL ARREGLO YA ORDENADO
    return $result;
}

// LISTA DE PALABRAS PARA ORDENAR
$words = ["manzana", "perro", "casa", "gato", "arbol", "zapato", "mesa"];

// MOSTRAR LISTA ANTES DE ORDENAR
echo "Lista antes de ordenar:\n";
echo implode(", ", $words) . "\n";

// LLAMAR A LA FUNCIÓN PARA ORDENAR
mergeSort($words);

// MOSTRAR LISTA DESPUÉS DE ORDENAR
echo "Lista después de ordenar:\n";
echo implode(", ", $words) . "\n";
?>