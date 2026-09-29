# Proposal

## Why

La lista permite consultar los precios de cada modelo como texto, pero dificulta comparar visualmente el coste de entrada y salida. Se necesita una vista grafica que use los dos precios disponibles en cada registro y aparezca en un panel lateral sin reducir el ancho de la tabla.

## What Changes

- Mantener la tabla ocupando todo el ancho disponible, sin una columna de acciones para el grafico.
- Abrir desde la derecha un panel lateral con un grafico de precio de entrada y precio de salida al seleccionar una fila.
- Permitir seleccionar varios modelos desde la tabla para construir una comparativa conjunta.
- Representar los precios con una escala comun y una leyenda accesible para distinguir entrada y salida.
- Comunicar el estado inicial, la seleccion individual y la comparativa de varios modelos.
- Cerrar el panel mediante una accion visible, la tecla Escape o el fondo del panel, devolviendo el foco a su origen.
- Adaptar el panel y la comparativa a pantallas estrechas sin crear desplazamiento horizontal en la pagina.

## Capabilities

### New Capabilities

- `price-charts`: Permite visualizar y comparar los precios de entrada y salida de los modelos cargados.

### Modified Capabilities

- Ninguna.

## Impact

Se modificaran `index.html`, `css/styles.css` y `js/main.js` para incorporar la seleccion, el drawer lateral y los graficos. Se reutilizaran `inputPricePerToken` y `outputPricePerToken` de `mock-data.json`, sin dependencias externas ni cambios en la fuente de datos.
