# Design

## Context

El dashboard ya renderiza una tabla filtrable de modelos y un panel de detalle en el flujo principal. Cada registro validado contiene `inputPricePerToken` y `outputPricePerToken`, que son los unicos valores necesarios para esta visualizacion. La interfaz debe continuar funcionando con HTML5, CSS3 y JavaScript nativo.

## Goals / Non-Goals

**Goals:**

- Mantener la tabla a ancho completo y abrir el grafico en un drawer lateral derecho.
- Permitir seleccionar y comparar varios modelos usando una escala comun.
- Mostrar los valores numericos junto con las barras para que el grafico no dependa solo del color.
- Mantener el filtrado actual, limpiar selecciones que dejen de estar visibles y gestionar correctamente el foco del drawer.

**Non-Goals:**

- No se calcularan series historicas ni tendencias temporales.
- No se usaran datos distintos de los precios de entrada y salida presentes en `mock-data.json`.
- No se añadiran librerias de graficos, canvas ni peticiones externas.

## Decisions

- **Barras HTML y CSS:** cada precio se representara mediante una barra con ancho proporcional al mayor precio del conjunto mostrado. Es suficiente para dos metricas y mantiene el resultado inspeccionable y accesible; una libreria externa aportaria dependencia sin resolver una necesidad real.
- **Seleccion por fila y casilla de comparacion:** la fila abrira el grafico individual al hacer clic o usar Enter/Espacio, mientras que una casilla independiente permitira acumular modelos. La casilla impedira la propagacion del clic para no abrir el panel accidentalmente.
- **Drawer lateral derecho:** el panel de detalle existente se mostrara como una capa fija que entra desde la derecha sobre la pagina, con fondo de cierre y bloqueo del desplazamiento de fondo mientras esta abierto. La misma region mostrara un modelo o la comparativa seleccionada.
- **Sin accion duplicada en la tabla:** se eliminara el boton de grafico y su columna de acciones. La fila sera el unico disparador del grafico individual, evitando duplicar acciones y reservando todo el ancho para los datos.
- **Escala comun:** las barras de una comparativa usaran el maximo entre todos los precios seleccionados. Cada fila incluira el valor formateado y una etiqueta textual para no depender de la percepcion visual.
- **Estado de seleccion por nombre:** se guardaran los nombres de los modelos seleccionados en un `Set`. Los datos siguen siendo la fuente de verdad y las selecciones invisibles se eliminaran al filtrar.

## Risks / Trade-offs

- [Riesgo] Los precios son muy pequenos y las barras pueden resultar casi imperceptibles → conservar el valor numerico con ocho decimales junto a cada barra y aplicar un ancho minimo visual.
- [Riesgo] Una fila filtrada puede conservar una seleccion antigua → sincronizar el conjunto de seleccion con los modelos visibles despues de cada filtro.
- [Riesgo] El drawer puede ocultar contenido o dejar el foco fuera de la capa → gestionar foco al abrir y devolverlo al cerrar, con una accion visible de cierre.
- [Riesgo] El drawer puede provocar desplazamiento horizontal en movil → usar `width: min(100%, 420px)` y una capa fija con overflow interno.

## Migration Plan

1. Eliminar la columna de acciones y convertir el detalle en un drawer lateral.
2. Renderizar el grafico individual y la comparativa usando los datos validados.
3. Verificar la interaccion con busqueda, cierre, foco, teclado y viewport movil.
4. Para revertir, restaurar el panel integrado anterior; la tabla, la seleccion y la busqueda continuan siendo funcionales.
