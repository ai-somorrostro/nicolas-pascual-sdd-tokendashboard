# token-list Specification

## Purpose
Permitir comparar los datos operativos de cada modelo cargado desde la fuente comun del dashboard.

## Requirements

### Requirement: Lista de modelos cargados
El sistema SHALL mostrar una tabla con un registro por cada modelo valido cargado. Cada fila SHALL incluir nombre, modalidades de entrada y salida, precio por token de entrada, precio por token de salida, TTFT y volumen diario total de tokens.

#### Scenario: Lista tras una carga valida
- **WHEN** el dashboard recibe una lista valida de modelos
- **THEN** presenta una fila por cada registro y los valores corresponden a sus datos de origen

#### Scenario: Conjunto sin modelos
- **WHEN** la lista de modelos disponible para la vista esta vacia
- **THEN** presenta un mensaje de estado vacio y no muestra una tabla sin filas

### Requirement: Tabla accesible y adaptable
El sistema SHALL identificar la tabla mediante un titulo o etiqueta accesible y SHALL conservar legibles las cabeceras y celdas en pantallas estrechas. Cuando el ancho no sea suficiente, el desplazamiento horizontal SHALL limitarse al contenedor de la tabla.

#### Scenario: Consulta en pantalla estrecha
- **WHEN** una persona consulta la lista con un ancho de 480 pixeles o menos
- **THEN** puede acceder a todas las columnas sin provocar desplazamiento horizontal en la pagina
