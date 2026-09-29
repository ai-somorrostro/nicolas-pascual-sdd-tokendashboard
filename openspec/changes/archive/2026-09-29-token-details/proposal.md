# Proposal

## Why

La tabla permite comparar modelos, pero obliga a recorrer muchas columnas para comprender un registro concreto. Se necesita una vista de detalle enfocada para consultar las metricas y costes de un modelo sin abandonar el dashboard.

## What Changes

- Anadir una accion accesible en cada fila de la lista para seleccionar un modelo.
- Mostrar un panel de detalle con nombre, modalidades, precios, TTFT y volumenes diario y semanal del modelo seleccionado.
- Permitir cerrar el panel y devolver el foco a la accion que lo abrio.
- Comunicar el modelo seleccionado a tecnologias de asistencia.

## Capabilities

### New Capabilities

- `token-details`: Permite abrir, consultar y cerrar el detalle accesible de un modelo de la lista.

### Modified Capabilities

- Ninguna.

## Impact

Se modificaran `index.html`, `css/styles.css` y `js/main.js` para reutilizar los registros cargados y anadir interaccion local. No se incorporaran dependencias, rutas ni peticiones de datos adicionales.
