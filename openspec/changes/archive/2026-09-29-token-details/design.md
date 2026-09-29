# Design

## Context

La lista de modelos ya representa los datos validados en la misma pagina. Veanse `proposal.md` y la especificacion `token-details` para el alcance funcional.

## Goals / Non-Goals

**Goals:**

- Abrir un detalle local reutilizando el registro ya cargado.
- Mantener navegacion y foco previsibles con teclado.

**Non-Goals:**

- No crear rutas, modales bloqueantes ni peticiones adicionales.
- No editar datos, filtrar resultados ni comparar varios modelos.

## Decisions

- El detalle sera una seccion expandida bajo la tabla en lugar de un modal. Mantiene el contexto de la lista, simplifica la navegacion y evita gestionar una capa superpuesta.
- Cada fila tendra un boton nativo para abrir el detalle. Se descarta hacer la fila completa interactiva porque un boton expresa mejor la accion y funciona de forma consistente con teclado.
- Se almacenara la accion que abrio el detalle para restaurar el foco al cerrar. Se descarta dejar el foco en una posicion indeterminada porque dificulta continuar la exploracion de la tabla.

## Risks / Trade-offs

- [El detalle desplaza contenido al abrirse] -> Ubicarlo tras la tabla y llevar el foco a su titulo.
- [Un cambio de seleccion puede dejar foco obsoleto] -> Actualizar la referencia de la accion iniciadora en cada apertura.

## Migration Plan

1. Anadir la accion de detalle a cada fila y el contenedor semantico del panel.
2. Renderizar los campos del modelo seleccionado y controlar apertura y cierre.
3. Verificar foco, contenido y validacion estricta de OpenSpec.
4. Para revertir, eliminar la accion y el panel sin modificar la carga ni la lista.
