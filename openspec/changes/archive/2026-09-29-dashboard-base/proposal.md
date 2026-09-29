# Proposal

## Why

El repositorio dispone de datos de uso y coste de modelos, pero no de una interfaz que los cargue y los presente de forma fiable. Se necesita una base accesible y adaptable que permita incorporar las funcionalidades posteriores sin repetir la carga ni el tratamiento de errores.

## What Changes

- Crear el punto de entrada HTML, los estilos base y un script JavaScript nativo del dashboard.
- Cargar `mock-data.json` con `fetch()` y validar que sus registros contienen los campos necesarios.
- Mostrar un estado de carga, un mensaje de error recuperable y un resumen inicial cuando los datos sean validos.
- Establecer una estructura semantica, navegable por teclado y responsive para las futuras vistas del dashboard.

## Capabilities

### New Capabilities

- `dashboard-shell`: Proporciona el contenedor semantico, responsive y accesible del Token Dashboard.
- `token-data-loading`: Obtiene y valida el conjunto compartido de datos de tokens, comunicando sus estados al usuario.

### Modified Capabilities

- Ninguna.

## Impact

Se crean `index.html`, `css/styles.css` y modulos JavaScript en `js/`. La aplicacion usa exclusivamente APIs nativas del navegador y el archivo existente `mock-data.json`; no incorpora dependencias ni servicios externos.
