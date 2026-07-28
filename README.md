# ShipNow

## Como correr localmente este proyecto

Requisitos: Node.js y setear previamente las varables de entorno con la MONGODB_URI.

```bash
# 1. Instalar dependencias
npm install

# 2. (Opcional) Cargar datos de ejemplo relacionados
npm run seed

# 3. Levantar el servidor
npm start
# o
npm run dev
```

## Cómo armar el .env para correr este proyecto

El .env debe seguir la estrucutra propuesta en el archivo [.env.example](./.env.example).

## Testing de API endpoints con herramientas como Postman

En el folder "testing" se encuentran los archivos de coleccion para importar en [Postman](./testing/ShipNow%20API%20v1%20-%20Postman%20Collection.json) o Bruno y poder testear los endpoints de la API.

## Porque se separó la logica

- Bajo la carpeta repository quedó unicamente las solicitudes a la base de datos y la conexion con los modelos requeridos.
- Bajo la carpeta services todo tipo de filtrado de los datos para evitar que llegue al repository datos incompletos o erroneos que puedan causar errores en la base de datos.
