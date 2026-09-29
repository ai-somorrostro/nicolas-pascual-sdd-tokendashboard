# Spec Delta

## Purpose

Establecer una carga fiable del archivo compartido de modelos para que todas las vistas del dashboard partan de datos consistentes y comuniquen los fallos con claridad.

## ADDED Requirements

### Requirement: Carga del archivo de datos compartido
El sistema SHALL recuperar `mock-data.json` como fuente de datos y aceptar unicamente una lista de registros que incluya nombre, precios de entrada y salida, TTFT, modalidades y volumenes diario y semanal de tokens.

#### Scenario: Archivo disponible y valido
- **WHEN** `mock-data.json` responde correctamente con registros que contienen los campos obligatorios
- **THEN** el sistema entrega los registros al dashboard para construir su resumen

#### Scenario: Archivo con estructura invalida
- **WHEN** el archivo no contiene una lista valida o falta un campo obligatorio en algun registro
- **THEN** el sistema no muestra indicadores parciales y comunica que los datos no se han podido cargar

### Requirement: Comunicacion del estado de carga
El sistema SHALL comunicar que los datos se estan cargando y SHALL sustituir ese estado por contenido o por un mensaje de error comprensible cuando la operacion termine.

#### Scenario: Solicitud en curso
- **WHEN** se inicia la recuperacion de los datos
- **THEN** la region de contenido anuncia que los datos se estan cargando

#### Scenario: Error de red o de lectura
- **WHEN** la recuperacion del archivo falla
- **THEN** la region de contenido muestra un mensaje de error sin dejar indicadores obsoletos visibles
