# ShipNow

## Como correr localmente este proyecto

Requisitos: Node.js y setear previamente las varables de entorno con la MONGODB_URI.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor
npm start
# o
npm run dev
```

## Cómo armar el .env para correr este proyecto

El .env debe seguir la estrucutra propuesta en el archivo [.env.example](./.env.example).

## Manejo de errores

### Estructura de los errores

Los errores de la API siguen la siguiente estructura:

```json
{
	"status": "string", // "error" en todos los casos de momento
	"code": "string", // basado en las strings de la biblioteca de errores
	"message": "string" // mensaje personalizado para el error especifico o default con base en el diccionario de errores
}
```

Se encuentran estructurados desde el [middleware de manejo de errores](./src/middlewares/error.middleware.js), y estan construidos a partir del custom error [AppError](./src/errors/app.error.js) que espera los siguientes parametros:

- code: El code es un string que representa el tipo de error que ocurrió y se debe asignar desde [la bibloteca de errores](./src/errors/app.error.js) que esta relacionado con [el diccionario de errores](./src/errors/error.dictionary.js)
- message: El message es un string que describe el error.
- details: El details es un objeto que puede contener información adicional sobre el error.

Nota: Los parametros message y details son opcionales, pero el code es obligatorio.

Nota 2: Si se desea añadir un error a la biblioteca de errores se debe tambien agregar el error al diccionario de errores con su respectivo message y statusCode.

### Cómo probar los errores de la API

Ahora mismo se encuentran implementados los siguientes errores en la API:

- Error de ruta no encontrada (404): Se lanza cuando se intenta acceder a una ruta que no existe en la API.
- Error de bad request (400): Se lanza cuando en cualquiera de los endpoints disponibles (users, products, orders, deliveries, couriers) se envía un body con datos incompletos o erroneos incluyendo verificacion de posibles roles y estados de elementos.
- Error de elemento no encontrado (404): Se lanza cuando en cualquiera de los endpoints disponibles (users, products, orders, deliveries, couriers) se intenta buscar un elemento por ID y esta es inexistente.
- Errores de mocking (400 y 500): Se lanzan cuando se intenta generar datos mock con valores de 0, negativos o cuando ocurre un error interno en el servidor al intentar generar los datos mock.

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
