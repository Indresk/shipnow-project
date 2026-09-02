# ShipNow

Este proyecto es una API RESTful para la gestión de envíos y entregas, construida con Node.js, Express y MongoDB. Proporciona endpoints para manejar usuarios, productos, órdenes, entregas y repartidores, así como funcionalidades de subida de archivos y generación de datos mock para pruebas.

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

El .env debe seguir la estructura propuesta en el archivo [.env.example](./.env.example).

## Docker

La API puede ser ejecutada en contenedores Docker para un despliegue consistente y escalable.

### Requisitos para Docker

- Docker instalado y corriendo
- Docker Compose (opcional, para orquestación)

### Docker Compose

Para facilitar el despliegue local con MongoDB puedes usar docker compose:

- Inicia con: `docker-compose up -d`
- Cerrar con: `docker-compose down`

Nota: el docker-compose.yml está configurado para levantar un contenedor de MongoDB y otro de la API, con persistencia de datos en volúmenes locales. Si no se desea levantar MongoDB con Docker, se puede configurar la variable de entorno `MONGODB_URI` para apuntar a una instancia externa de MongoDB y comentar desde la linea 13 "depends_on" en el docker-compose.yml.

### Variables de Entorno en Producción

Para ejecutar la API en producción como imagen unicamente de la API desde el archivo `Dockerfile`, asegúrate de tener configuradas las siguientes variables en tu archivo `.env`:

```bash
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shipnow
```

**Importante**: En producción:

- Configura `NODE_ENV=production` para desactivar endpoints de desarrollo como `/api/mocks` y `/api/logger`
- Swagger no estará disponible en `/api/docs`

### Construir la Imagen Docker

Usa el script incluido en `package.json`:

```bash
npm run docker:build
```

O construye manualmente:

```bash
docker build -t shipnow-api .
```

### Ejecutar el Contenedor

Usa el script incluido:

```bash
npm run docker:run
```

O ejecuta manualmente con variables de entorno:

```bash
docker run -p 8080:8080 --env-file .env shipnow-api
```

Para ejecutar en producción:

```bash
docker run -p 8080:8080 \
  -e NODE_ENV=production \
  -e MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shipnow \
  -v shipnow-logs:/app/logs \
  -v shipnow-uploads:/app/uploads \
  shipnow-api
```

### Puerto de la API

La API expone el puerto **8080** por defecto (configurable con la variable `PORT`).

Accede a la API en: `http://localhost:8080`

### Archivos excluidos del contenedor (.dockerignore)

Los siguientes archivos y carpetas **no se incluyen** en la imagen Docker:

```
node_modules
.env (los secretos deben inyectarse en tiempo de ejecución)
.env.* (archivos de configuración local)
*.log (logs locales)
/logs/* (carpeta de logs - se crea en el contenedor)
/uploads/* (carpeta de uploads - se crea en el contenedor)
.git
.gitignore
.dockerignore
Dockerfile
seed.js
/postman
docker-compose.yml
/testing/collections
```

### Gestión de Logs en Docker

En producción, los logs se guardan en la carpeta `/app/logs` dentro del contenedor. Para persistir estos logs:

```bash
docker run -p 8080:8080 \
  --env-file .env \
  -v shipnow-logs:/app/logs \
  shipnow-api
```

Esto crea un volumen persistente llamado `shipnow-logs` donde se almacenan los logs.

Solo se guardan en archivos los niveles `error` y `fatal`. El archivo de logs rota diariamente y se elimina después de 14 días.

### Gestión de Uploads en Docker

Los archivos subidos (documentos de usuarios, pruebas de entregas, licencias de couriers) se guardan en `/app/uploads`. Para persistir estos archivos:

```bash
docker run -p 8080:8080 \
  --env-file .env \
  -v shipnow-uploads:/app/uploads \
  shipnow-api
```

Esto crea un volumen persistente llamado `shipnow-uploads`.

### Health Check del Contenedor

La API cuenta con el endpoint `/` para verificar que el contenedor está corriendo correctamente, puedes hacer un GET request a:

```bash
GET http://localhost:8080/
```

Esto retornará un JSON con el estado de la API.

### Ejecutar Tests en Contenedor

Para ejecutar los tests dentro de un contenedor:

```bash
docker run --env-file .env.test shipnow-api npm run test
```

**Nota importante**: Los tests utiliza por defecto `MongoDB Memory Server`, por lo que no necesitan una instancia de MongoDB externa.

## Tecnologías Utilizadas

### Backend & Runtime

- **Node.js** (v22+) - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Utilidades & Middlewares

- **Multer** - Manejo de subida de archivos
- **Helmet** - Seguridad HTTP
- **CORS** - Control de acceso cross-origin
- **dotenv** - Gestión de variables de entorno

### Documentación & Testing

- **Swagger/OpenAPI** - Documentación interactiva de API
- **Swagger-UI-Express** - Interfaz Swagger en Express
- **Mocha** - Framework de testing
- **Chai** - Librería de assertions
- **Supertest** - Testing de HTTP
- **MongoDB Memory Server** - Base de datos en memoria para tests

### Logging & Monitoreo

- **Winston** - Logger versátil
- **Winston-Daily-Rotate-File** - Rotación diaria de logs

### Desarrollo

- **Faker.js** - Generación de datos mock
- **Node Watch** - Recarga automática en desarrollo

## API de subida de archivos para Users y Deliveries

Para los modelos Users y Deliveries se encuentra implementada una API de subida de archivos con [Multer](https://www.npmjs.com/package/multer) para poder subir documentos y pruebas de entregas respectivamente.

Acorde a esto se actualizó el modelo de Users y Deliveries para poder almacenar la metadata en la base de datos de los elementos nuevos subidos en los archivos del sistema y se prepararon nuevos endpoints con este fin.

```bash

POST /api/users/:id/documents // Para subir documentos de un usuario
POST /api/deliveries/:id/proofs // Para subir pruebas de entrega de un delivery

```

Para poder subir archivos a estos endpoints se debe enviar un body de tipo `multipart/form-data` con el archivo a subir en el campo `document` o `proof` respectivamente, así mismo se debe indicar en el campo `type` el tipo de documento que se está subiendo, esto nos permite asignar la carpeta apropiada al documento y relacionarlo correctamente en la metadata del usuario o delivery.

Los valores permitidos para el campo `type` son los siguientes:

```bash
'courier_licence'
'delivery_proof'
'user_docs'
```

Los archivos a subir estan limitados a ser de tipo `image/webp`, `image/jpeg`, `image/png` o `application/pdf` y no pueden superar los 5MB de tamaño.

La documentación y los testings fueron actualizados con estos nuevos endpoints para mantener la robustes de la API y su información actualizada.

## Cómo correr los tests de la API

Los test para la api se realizaron con Mocha, Chai y Supertest, y se encuentran en la carpeta `./testing/` separados por tipo de test en carpetas y por modulo en archivos.

Actualmente en los testings se encuentran cubiertos los modulos de Users, Products, Orders, Deliveries y Couriers Adicionalmente se implementaron testing de la API de Upload para los modules Users y Deliveries. Tambien se encuentran testings para los endpoints de Mocking, test del logger, health check y para el middleware de manejo de errores. Suman en total 43 checks de testeo para la API.

Para ejecutar la suite de tests de la API, debemos tener instaladas las dependencias de desarrollador, con esto podremos crear la instancia de `mongodb-memory-server` y ejecutar los test sin ninguna complicación.

Si queremos tambien podemos probarlo con una base de dato de prueba, para ello se deben tener preparadas las variables de entorno en el archivo `.env.test` siguiendo la estructura de `.env.test.example`, de igual manera se recomienda apuntar la URI de la base de datos en el archivo de variables de entorno hacia una **base de datos de prueba** para evitar daños en la base de datos principal.

Nota: si se desean correr los test con una base de datos real podemos descomentar la línea de dotenv en el archivo `./testing/setup.js` y comentar lo relacionado con `mongodb-memory-server` para que se conecte a la base de datos real.

Con todo lo anterior listo se puede correr el siguiente comando:

```bash
npm run test
```

## Documentación de la API con Swagger

Actualmente todos los modulos de la API se encuentran documentados con Swagger, y se puede acceder a la documentación de la API en la ruta `/api/docs` una vez levantado el servidor.

La ruta `/api/docs` solo se encuentra disponible con la variable de entorno `NODE_ENV` en `development`.

La documentación esta escrita en formato OpenAPI y se encuentra bajo la ruta `./src/docs/` en archivos `.yaml` separados por modulo.

Nota: No todos los ejemplos registrados en la API son exactos para todos los endpoints ya que estamos reutilizando los esquemas, por lo general van a variar en la existencia de algunos campos como `_id` y `__v`, pero la idea es que sirvan como guia para el uso de los endpoints.

## Sistema de logger para registro de temporal y persistente de eventos

Para el registro de eventos del sistema se utiliza la libreria [winston](https://www.npmjs.com/package/winston) y se encuentra configurada en el archivo [logger.js](./src/utils/logger.js).

### Niveles de log

Se encuentran configurados los siguientes niveles de log:

```js
{
	debug: 5, // Solo disponible con la variable NODE_ENV en development
	http: 4, // para seguimiento de las respuestas HTTP en los endpoints
	info: 3, // para seguimiento de eventos del sistema
	warning: 2, // para seguimiento de eventos de error controlados y parte del funcionamiento del sistema
	error: 1, // para seguimiento de eventos de error en el sistema
	fatal: 0, // para seguimiento de errores que no permiten continuar con el funcionamiento del sistema
}
```

#### Para probar todos los niveles de log

Hay un endpoint para probar todos los niveles de log, este se encuentra en la ruta `/api/logger` y se puede probar realizando un GET request. Este endpoint solo se encuentra disponible con la variable de entorno `NODE_ENV` en `development`.

### Archivos de log

Los archivos de log solo contienen los niveles de log `error` y `fatal`, y se generan en la carpeta `logs` en la raíz del proyecto. Estos archivos estan siendo generados con la libreria de apoyo para **winston**, [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file). Estan configurados con una duracion de **14 días** y un maximo de tamaño de **20MB**, luego de esto se generan nuevos archivos de log y los viejos se eliminan.

### Git ignore y los logs

Se encuentran ignorados los logs y el audit en el archivo `.gitignore`, por lo que no se suben al repositorio. Por esto mismo en la configuracion del logger estamos creando la carpeta `logs` ya que no se encuentra en el repositorio.

### Comportamiento por entorno

Como ha sido descrito a lo largo de la info de los logs, el comportamiento del logger cambia segun el entorno en el que se encuentre corriendo la API.

Todos los niveles de log se encuentran disponibles en el entorno de desarrollo, mientras que en el entorno de produccion solo se encuentran disponibles los niveles de log en consola `http`, `info`, `warning`, `error` y `fatal`.

## Manejo de errores

### Estructura de los errores

Los errores de la API siguen la siguiente estructura:

```json
{
	"status": "string", // "error" en todos los casos de momento
	"error": "string", // basado en las strings de la biblioteca de errores
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

```js
GET / api / mocks / mockingusers; // Retorna un listado mock de la cantidad de usuarios proporcionada en el valor "users"  en query param de la solicitud.
GET / api / mocks / mockingproducts; // Retorna un listado mock de la cantidad de productos proporcionada en el valor "products" en query param de la solicitud.
GET / api / mocks / mockingorders; // Retorna un listado mock de la cantidad de órdenes proporcionada en el valor "orders" en query param de la solicitud.
GET / api / mocks / mockingdeliveries; // Retorna un listado mock de la cantidad de entregas proporcionada en el valor "deliveries" en query param de la solicitud.
GET / api / mocks / mockingcouriers; // Retorna un listado mock de la cantidad de repartidores proporcionada en el valor "couriers" en query param de la solicitud.
```

Nota: Estos endpoints de revisión individual pueden ser usados con el verbo POST para escribir en la debe pero sus respectivas claves valor deben ser enviadas en el body de la solicitud en formato JSON, por ejemplo:

```json
{
	"users": 10
}
```

Revisión masiva y escritura en la DB:

```bash
GET /api/mocks/generateData // Retorna un listado mock de la cantidad de usuarios, productos, órdenes, entregas y repartidores proporcionada en los valores "users", "products", "orders", "deliveries" y "couriers" en query param de la solicitud.
POST /api/mocks/generateData // Retorna un listado mock de la cantidad de usuarios, productos, órdenes, entregas y repartidores proporcionada en los valores "users", "products", "orders", "deliveries" y "couriers" del body en json de la solicitud y los escribe en la base de datos.
```

Nota: En los endpoints de revisión masiva no es necesario enviar todos los valores en el body, se puede enviar solo los que se quieran generar.

Nota 2: Para mayor claridad pueden usarse como ejemplo los archivos de coleccion para importar en [Postman](./testing/ShipNow%20API%20v1%20-%20Postman%20Collection.json) o Bruno y poder testear los endpoints de la API.

## Porque se separó la logica

- Bajo la carpeta repository quedó unicamente las solicitudes a la base de datos y la conexion con los modelos requeridos.
- Bajo la carpeta services todo tipo de filtrado de los datos para evitar que llegue al repository datos incompletos o erroneos que puedan causar errores en la base de datos.
