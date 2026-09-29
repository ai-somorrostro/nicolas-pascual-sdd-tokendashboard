# Proposal

## Why

La lista de modelos permite consultar todos los registros, pero cuando el catálogo crece resulta lento localizar un modelo o una modalidad concreta. Se necesita una búsqueda inmediata sobre los datos ya cargados para facilitar la consulta sin duplicar la fuente de datos.

## What Changes

- Añadir un control de búsqueda accesible junto a la lista de modelos.
- Filtrar los modelos por nombre, modalidad de entrada o modalidad de salida sin distinguir mayúsculas de minúsculas.
- Mostrar todos los modelos al iniciar la vista o cuando la búsqueda esté vacía.
- Comunicar cuántos modelos coinciden y mostrar un estado vacío cuando no existan coincidencias.
- Mantener el detalle del modelo y el resumen existentes integrados con los resultados filtrados.

## Capabilities

### New Capabilities

- `token-search`: Permite localizar modelos cargados mediante una búsqueda textual por nombre o modalidad.

### Modified Capabilities

- Ninguna.

## Impact

Se modificarán `index.html`, `css/styles.css` y `js/main.js` para añadir el control, el filtrado y los estados de la búsqueda. La funcionalidad reutilizará los registros ya cargados desde `mock-data.json`, no añadirá dependencias ni modificará la fuente de datos.
