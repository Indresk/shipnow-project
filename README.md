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

## Uso de Mocking para testeo de la API

Para poder acceder a los endpoints de Mocking de la API, se debe levantar el servidor con la variable de entorno `NODE_ENV` en `development`, una vez levantado el servidor, se puede acceder a los siguientes endpoints de Mocking:

Revisión individual:

```bash
GET /api/mocks/mockingusers // Retorna un listado mock de la cantidad de usuarios proporcionada en el valor "users" del body en json de la solicitud.
GET /api/mocks/mockingproducts // Retorna un listado mock de la cantidad de productos proporcionada en el valor "products" del body en json de la solicitud.
GET /api/mocks/mockingorders // Retorna un listado mock de la cantidad de órdenes proporcionada en el valor "orders" del body en json de la solicitud.
GET /api/mocks/mockingdeliveries // Retorna un listado mock de la cantidad de entregas proporcionada en el valor "deliveries" del body en json de la solicitud.
GET /api/mocks/mockingcouriers // Retorna un listado mock de la cantidad de repartidores proporcionada en el valor "couriers" del body en json de la solicitud.
```

Revisión masiva y escritura en la DB:

```bash
GET /api/mocks/generateData // Retorna un listado mock de la cantidad de usuarios, productos, órdenes, entregas y repartidores proporcionada en los valores "users", "products", "orders", "deliveries" y "couriers" del body en json de la solicitud.
POST /api/mocks/generateData // Retorna un listado mock de la cantidad de usuarios, productos, órdenes, entregas y repartidores proporcionada en los valores "users", "products", "orders", "deliveries" y "couriers" del body en json de la solicitud y los escribe en la base de datos.
```

Nota: En los endpoints de revisión masiva no es necesario enviar todos los valores en el body, se puede enviar solo los que se quieran generar.

Nota 2: Para mayor claridad pueden usarse como ejemplo los archivos de coleccion para importar en [Postman](./testing/ShipNow%20API%20v1%20-%20Postman%20Collection.json) o Bruno y poder testear los endpoints de la API.

## Porque se separó la logica

- Bajo la carpeta repository quedó unicamente las solicitudes a la base de datos y la conexion con los modelos requeridos.
- Bajo la carpeta services todo tipo de filtrado de los datos para evitar que llegue al repository datos incompletos o erroneos que puedan causar errores en la base de datos.
