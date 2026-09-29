# dashboard-shell Specification

## Purpose
Define el marco visible y accesible del Token Dashboard para que las personas puedan orientarse y consultar sus indicadores iniciales en cualquier tamano de pantalla.

## Requirements

### Requirement: Contenedor semantico del dashboard
El sistema SHALL presentar una cabecera identificable, una region principal con titulo y una region de estado para el contenido dinamico. La estructura SHALL permanecer navegable con teclado y conservar su jerarquia semantica cuando cambie el ancho de la pantalla.

#### Scenario: Visualizacion inicial en escritorio
- **WHEN** una persona abre el dashboard en un navegador moderno
- **THEN** ve el nombre del producto, el titulo de la vista y una region de contenido sin necesidad de desplazamiento horizontal

#### Scenario: Visualizacion en pantalla estrecha
- **WHEN** el ancho disponible es de 480 pixeles o menos
- **THEN** los bloques se reordenan o ajustan sin ocultar contenido, provocar solapamientos ni crear desplazamiento horizontal

### Requirement: Resumen inicial de datos cargados
El sistema SHALL mostrar indicadores resumidos derivados del conjunto de datos valido: numero de modelos, volumen total diario de tokens, volumen total semanal de tokens y menor TTFT registrado.

#### Scenario: Resumen tras una carga valida
- **WHEN** el conjunto de modelos se carga y supera la validacion
- **THEN** el dashboard muestra los cuatro indicadores con valores legibles y coherentes con los registros cargados
