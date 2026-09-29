# Proposal

## Why

El resumen muestra el estado agregado, pero no permite comparar los datos de cada modelo. Se necesita una lista legible para consultar los registros ya cargados sin inventar ni duplicar informacion.

## What Changes

- Anadir una tabla de modelos despues de los indicadores del dashboard.
- Mostrar nombre, modalidades, precios de entrada y salida, TTFT y volumen diario de cada registro valido.
- Comunicar un estado vacio si no hay modelos disponibles para listar.
- Adaptar la tabla a pantallas estrechas mediante desplazamiento horizontal contenido, sin afectar el resumen existente.

## Capabilities

### New Capabilities

- `token-list`: Permite consultar en una tabla los atributos operativos de cada modelo cargado.

### Modified Capabilities

- Ninguna.

## Impact

Se modificaran `index.html`, `css/styles.css` y `js/main.js` para representar los datos ya cargados desde `mock-data.json`. No se anadiran dependencias ni se modificara la fuente de datos.
