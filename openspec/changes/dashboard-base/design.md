# Design

## Context

El cambio incorpora la primera superficie visible y el primer acceso a datos del proyecto. Vease `proposal.md` para la motivacion y las especificaciones del cambio para el comportamiento observable.

## Goals / Non-Goals

**Goals:**

- Mantener el codigo de esta base pequeno y facil de seguir.
- Dejar una estructura HTML y CSS reutilizable por las funcionalidades de listado, filtros, detalle y metricas.
- Mantener una interfaz legible con CSS nativo en escritorio y movil.

**Non-Goals:**

- No crear la tabla completa de modelos, filtros ni un panel de detalle.
- No incorporar dependencias, backend, graficos de terceros ni datos alternativos.

## Decisions

- Se usara un unico script clasico, `js/main.js`. Para esta superficie limitada evita fallos de carga de modulos y mantiene toda la logica en un archivo corto; las futuras funcionalidades podran introducir separacion adicional solo si aportan valor real.
- El script concentrara descarga, validacion, calculo y representacion, sin duplicar datos ni incorporar dependencias.
- La interfaz usara elementos HTML semanticos, una region dinamica con `aria-live` y CSS Grid. Se descartan marcos de interfaz y canvas porque no aportan valor a este alcance y contradicen las restricciones del proyecto.
- Los indicadores se derivaran en memoria a partir de los valores del JSON. Se descarta persistir o duplicar los datos para conservar una unica fuente de verdad.

## Risks / Trade-offs

- [Abrir el HTML mediante `file://` bloquea `fetch()` en algunos navegadores] -> Mostrar un mensaje de error explicito y documentar el uso con un servidor HTTP estatico local.
- [El JSON puede cambiar de forma] -> Validar los campos requeridos y no representar resultados parciales.
- [Los nombres de modelos pueden crecer] -> Usar limites de rejilla y reglas de ajuste de texto desde el primer componente.

## Migration Plan

1. Incorporar los archivos nuevos sin modificar `mock-data.json`.
2. Servir el proyecto mediante HTTP estatico y comprobar carga, error y adaptacion responsive.
3. Si fuera necesario revertir, eliminar los archivos de la funcionalidad deja intacta la fuente de datos compartida.
