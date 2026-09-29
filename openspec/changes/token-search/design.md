# Design

## Context

El dashboard carga y valida una colección de modelos en `js/main.js` y la entrega a la lista y al panel de detalle. La búsqueda debe consumir esa colección en memoria, conservar la tabla y reutilizar sus estados de carga, resultados vacíos y contador. La aplicación está limitada a HTML5, CSS3 y JavaScript nativo.

## Goals / Non-Goals

**Goals:**

- Añadir una interacción de búsqueda usable con teclado y tecnologías de asistencia.
- Aplicar el mismo criterio textual a nombre, modalidad de entrada y modalidad de salida.
- Renderizar la lista filtrada mediante la ruta existente de representación para conservar formato y acciones de detalle.
- Mantener el resumen global basado en todos los modelos cargados.

**Non-Goals:**

- No se filtrarán precios, latencias ni volúmenes numéricos.
- No se añadirá ordenación, paginación ni una API de búsqueda externa.
- No se modificará `mock-data.json` ni el contrato de validación de datos.

## Decisions

- **Filtrado en memoria:** se conservará la colección validada y se aplicará `Array.prototype.filter` al cambiar el control. Es suficiente para el volumen de datos actual y evita nuevas peticiones; una búsqueda remota añadiría complejidad y no aportaría valor con una fuente estática.
- **Coincidencia inclusiva y sin distinción de mayúsculas:** el texto normalizado se comparará con `name`, `inputModality` y `outputModality`. Así una búsqueda parcial como `deep` o `image` resulta útil sin imponer sintaxis especial.
- **Renderizado reutilizado:** `renderTokenList` recibirá el subconjunto coincidente. Esto conserva las acciones de detalle y centraliza el mensaje de estado vacío; crear una segunda tabla produciría divergencia visual y funcional.
- **Control nativo de formulario:** se usará un `input` con etiqueta visible y evento `input`, sin librerías externas. El navegador gestionará el teclado y el valor se podrá limpiar directamente.

## Risks / Trade-offs

- [Riesgo] Las comparaciones con caracteres acentuados pueden no coincidir con una consulta equivalente sin acento → normalizar texto con `toLocaleLowerCase("es-ES")` y eliminar marcas Unicode antes de comparar.
- [Riesgo] Un estado sin coincidencias podría ocultar la causa al usuario → actualizar el mensaje con la consulta realizada y conservar el control visible.
- [Riesgo] El detalle abierto puede dejar un registro fuera de los resultados tras una nueva búsqueda → cerrar el detalle cuando ya no pertenezca al subconjunto visible.

## Migration Plan

1. Añadir el control y sus estilos junto a la sección existente de modelos.
2. Conectar el filtrado con los datos validados y reutilizar el renderizado actual.
3. Verificar la búsqueda vacía, las coincidencias parciales, las modalidades y el estado sin resultados mediante servidor HTTP local.
4. Para revertir, eliminar el control y la llamada de filtrado; la carga, el resumen y la lista existentes permanecen funcionales.
