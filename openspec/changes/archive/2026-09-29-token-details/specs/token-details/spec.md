# Spec Delta

## Purpose

Permitir consultar de forma enfocada las metricas operativas y de coste de un modelo seleccionado en la lista.

## ADDED Requirements

### Requirement: Apertura del detalle de un modelo
El sistema SHALL proporcionar una accion accesible para abrir el detalle de cada modelo listado. Al activarla, SHALL mostrar el nombre del modelo, modalidades, precios de entrada y salida, TTFT y volumenes diario y semanal correspondientes a ese registro.

#### Scenario: Consulta de un modelo
- **WHEN** una persona activa la accion de detalle de una fila
- **THEN** el dashboard presenta los datos del modelo seleccionado sin realizar otra carga de datos

### Requirement: Cierre accesible del detalle
El sistema SHALL permitir cerrar el panel de detalle mediante una accion visible. Al cerrarlo, SHALL ocultar el detalle y devolver el foco a la accion que lo abrio.

#### Scenario: Cierre con teclado
- **WHEN** una persona activa el cierre del panel con teclado
- **THEN** el panel deja de estar visible y el foco vuelve a la accion de detalle correspondiente
