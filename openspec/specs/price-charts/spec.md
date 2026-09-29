# price-charts Specification

## Purpose
Permitir visualizar y comparar de forma accesible los precios de entrada y salida de los modelos cargados, usando exclusivamente los valores disponibles en la fuente comun del dashboard.

## Requirements

### Requirement: Grafico individual de precios en drawer

El sistema SHALL mantener la tabla de modelos a ancho completo sin un boton de grafico por fila y SHALL abrir desde la derecha un drawer con un grafico del precio de entrada y del precio de salida cuando la persona seleccione una fila. El drawer SHALL mostrar tambien los dos valores numericos y una leyenda que distinga ambas metricas.

#### Scenario: Seleccion de una fila

- **WHEN** la persona hace clic sobre una fila visible o la activa con Enter o Espacio
- **THEN** el sistema muestra desde la derecha el drawer con el modelo seleccionado y sus precios de entrada y salida representados en el grafico

#### Scenario: Cierre del grafico individual

- **WHEN** la persona activa la accion visible de cerrar el drawer, pulsa Escape o activa su fondo de cierre
- **THEN** el sistema oculta el drawer, permite volver a desplazar la pagina y devuelve el foco a la fila que lo abrio

### Requirement: Comparacion de modelos

El sistema SHALL permitir seleccionar varios modelos visibles mediante controles accesibles y SHALL ofrecer una accion para mostrar sus precios de entrada y salida en un grafico comparativo con una escala comun.

#### Scenario: Comparacion de varios modelos

- **WHEN** la persona selecciona dos o mas modelos y activa la accion de comparar
- **THEN** el sistema muestra una grafica conjunta con ambas metricas para cada modelo seleccionado y conserva sus valores numericos

#### Scenario: Comparacion con menos de dos modelos

- **WHEN** hay menos de dos modelos seleccionados
- **THEN** la accion de comparar permanece desactivada y el sistema no muestra una comparativa incompleta

### Requirement: Integracion con filtrado, drawer y responsive

El sistema SHALL mantener la comparativa sincronizada con los modelos visibles tras una busqueda y SHALL adaptar el drawer a pantallas estrechas sin provocar desplazamiento horizontal en la pagina.

#### Scenario: Modelo seleccionado deja de estar visible

- **WHEN** una busqueda excluye un modelo previamente seleccionado
- **THEN** el sistema elimina ese modelo de la seleccion y actualiza o cierra el grafico para que solo use modelos visibles

#### Scenario: Drawer en pantalla estrecha

- **WHEN** la persona abre el drawer con un ancho de 480 pixeles o menos
- **THEN** el drawer ocupa como maximo el ancho de la ventana, permite consultar el grafico y no provoca desplazamiento horizontal de la pagina
