# Token Dashboard

Dashboard de uso, coste y latencia de modelos construido con HTML5, CSS3 y JavaScript nativo.

## Ejecucion local

El dashboard carga `mock-data.json` mediante `fetch()`, por lo que debe servirse por HTTP. Desde la raiz del proyecto:

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000` en un navegador moderno.

## Docker

Para crear la imagen Docker desde la raíz del proyecto:

```bash
docker build -t tokendashboard .
```

Después, crea y ejecuta el contenedor:

```bash
docker run -d -p 8000:8000 --name tokendashboard tokendashboard
```

Abre `http://localhost:8000` en el navegador.
