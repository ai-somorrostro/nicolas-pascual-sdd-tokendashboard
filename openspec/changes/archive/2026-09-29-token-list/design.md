# Design

## Context

El dashboard base ya carga y valida `mock-data.json` en un unico script clasico. Vease `proposal.md` y la especificacion `token-list` para la motivacion y el comportamiento observable.

## Goals / Non-Goals

**Goals:**

- Representar los registros cargados con una tabla semantica y valores legibles.
- Reutilizar la carga existente sin una segunda solicitud ni una copia de los datos.
- Mantener la pagina adaptada a pantallas estrechas.

**Non-Goals:**

- No anadir busqueda, filtros, ordenacion, paginacion ni vistas de detalle.
- No modificar `mock-data.json` ni incorporar dependencias externas.

## Decisions

- La tabla se renderizara desde la misma lista validada que alimenta el resumen. Asi se conserva una sola fuente de datos y se evita otra descarga; se descarta volver a llamar a `fetch()` solo para la tabla.
- Los precios se mostraran en notacion decimal con precision suficiente para distinguir los valores del archivo. Se descarta la notacion compacta porque oculta diferencias relevantes entre precios por token.
- La tabla se envolvera en un contenedor con desplazamiento horizontal en pantallas estrechas. Se descarta convertir cada fila en una tarjeta porque las columnas son mas faciles de comparar en una tabla.

## Risks / Trade-offs

- [Una tabla ancha no cabe integramente en movil] -> Limitar el desplazamiento al contenedor y mantener las cabeceras visibles.
- [Los precios muy pequenos pierden precision al formatearse] -> Mostrar hasta ocho decimales y no redondear el dato antes de presentarlo.
- [Una futura vista necesita mas campos] -> Extender las columnas en su propia feature con su especificacion correspondiente.

## Migration Plan

1. Anadir el contenedor de lista tras los indicadores existentes.
2. Renderizar la tabla a partir de los datos validados.
3. Verificar los datos, la adaptacion y la validacion estricta de OpenSpec.
4. Para revertir, eliminar el contenedor y el renderizado de lista sin afectar la carga ni el resumen base.
