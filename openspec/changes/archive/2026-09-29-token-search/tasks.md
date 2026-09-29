# Tasks

## 1. Control de búsqueda

- [x] 1.1 Añadir un campo `search` con etiqueta visible, texto de ayuda y estado accesible en la sección de modelos; verificar su presencia mediante inspección del DOM.
- [x] 1.2 Añadir estilos responsive para el campo y su contador sin provocar desplazamiento horizontal a 480 px; verificarlo en el navegador.

## 2. Filtrado y estados

- [x] 2.1 Conservar la colección validada y normalizar la consulta y los campos de nombre y modalidades; verificar coincidencias parciales, mayúsculas y acentos.
- [x] 2.2 Conectar el evento `input` para filtrar sin nuevas peticiones y reutilizar el renderizado de la lista; verificar que las acciones de detalle siguen funcionando.
- [x] 2.3 Mostrar todos los modelos con la consulta vacía, actualizar el contador y comunicar el estado sin coincidencias; verificar los tres estados con los datos de `mock-data.json`.

## 3. Integración y verificación

- [x] 3.1 Mantener el resumen global independiente del filtro y cerrar o actualizar un detalle cuyo modelo deje de estar visible; verificar la interacción combinada.
- [x] 3.2 Ejecutar comprobaciones de sintaxis, `openspec validate token-search --strict` y carga HTTP local; verificar que no se añaden dependencias ni se modifica `mock-data.json`.
