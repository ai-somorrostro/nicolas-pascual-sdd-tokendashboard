# Tasks

## 1. Estructura y seleccion

- [x] 1.1 Mantener la tabla a ancho completo y eliminar su boton y columna de grafico; verificar que las filas siguen siendo activables con clic y teclado.
- [x] 1.2 Conservar los controles de seleccion por fila y la accion de comparar, y actualizar sus estados accesibles; verificar que la comparacion sigue desactivada con menos de dos modelos.
- [x] 1.3 Añadir la leyenda y los estilos del grafico dentro del nuevo drawer; verificar que a 480 px no aparece desplazamiento horizontal en la pagina.

## 2. Graficos y datos

- [x] 2.1 Renderizar el grafico individual con `inputPricePerToken` y `outputPricePerToken`, valores numericos y escala proporcional; verificarlo con `mock-data.json`.
- [x] 2.2 Implementar la seleccion de dos o mas modelos y renderizar la comparativa con escala comun; verificar que la accion permanece desactivada con cero o un modelo.
- [x] 2.3 Mantener la seleccion sincronizada con la busqueda y reutilizar los datos cargados sin nuevas peticiones; verificar filtrado, limpieza y comparacion.

## 3. Integracion y verificacion

- [x] 3.1 Implementar el drawer fijo que entra desde la derecha, su fondo de cierre, cierre con Escape y bloqueo del desplazamiento de fondo; verificar los estados abierto y cerrado.
- [x] 3.2 Devolver el foco a la fila que abrio el drawer y mantener el grafico de comparacion dentro del mismo panel; verificar la navegacion con teclado.
- [ ] 3.3 Ejecutar `node --check js/main.js`, `openspec validate price-charts --strict`, validacion JSON y comprobacion HTTP local; verificar que no se añaden dependencias ni se modifica `mock-data.json`.
