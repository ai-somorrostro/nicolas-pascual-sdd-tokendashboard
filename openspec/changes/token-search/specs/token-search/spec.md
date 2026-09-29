# Spec Delta

## Purpose

Permitir localizar rápidamente un modelo cargado dentro de la lista del dashboard mediante una búsqueda textual accesible que reutilice los datos ya disponibles.

## ADDED Requirements

### Requirement: Búsqueda textual de modelos

El sistema SHALL proporcionar un campo de búsqueda accesible para filtrar los modelos cargados por coincidencia parcial, sin distinguir mayúsculas de minúsculas, en el nombre, la modalidad de entrada o la modalidad de salida.

#### Scenario: Búsqueda por nombre

- **WHEN** la persona introduce un texto que coincide parcialmente con el nombre de uno o más modelos
- **THEN** el sistema muestra únicamente esos modelos en la lista y conserva sus acciones de detalle

#### Scenario: Búsqueda por modalidad

- **WHEN** la persona introduce un texto que coincide con la modalidad de entrada o de salida
- **THEN** el sistema muestra todos los modelos cuya modalidad correspondiente coincide

#### Scenario: Búsqueda sin coincidencias

- **WHEN** la consulta no coincide con el nombre ni con ninguna modalidad de los modelos cargados
- **THEN** el sistema oculta la tabla, muestra un estado vacío comprensible y conserva visible el campo de búsqueda

### Requirement: Estado inicial y contador de resultados

El sistema SHALL mostrar todos los modelos cuando el campo de búsqueda esté vacío y SHALL comunicar el número de modelos que coinciden con la consulta actual.

#### Scenario: Vista inicial

- **WHEN** la lista termina de cargar y el campo de búsqueda está vacío
- **THEN** el sistema muestra todos los modelos disponibles y su contador correspondiente

#### Scenario: Limpieza de la consulta

- **WHEN** la persona elimina todo el texto del campo de búsqueda
- **THEN** el sistema restaura la lista completa y actualiza el contador sin volver a solicitar `mock-data.json`
