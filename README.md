# ShipNow

API de demostracion de una plataforma de **logistica / envios**, construida con
**Node.js + Express + MongoDB (Mongoose)**.

Este proyecto es **material didactico** del curso **Backend 3 de CoderHouse**.
Es la **version 1 (baseline)**: una API funcional pero escrita a proposito con
malas practicas, para que a lo largo del curso la refactoricemos hacia una
arquitectura profesional.

> ⚠️ **No copies este codigo como ejemplo de buenas practicas.** Es el punto de
> partida "sucio" sobre el que vamos a trabajar.

## Que hace ShipNow

Gestiona tres entidades:

- **Order** (envio/pedido): `customerName`, `address`, `weight`, `cost` (calculado), `status`, `courierId`.
- **User** (cliente): `name`, `email`, `role`.
- **Courier** (repartidor): `name`, `zone`, `available`.

Regla de negocio principal (hoy embebida en la ruta de orders):
`cost = weight * 10`. Al crear un envio tambien se dispara una notificacion falsa.

## Como correrlo

Requisitos: Node.js y una instancia de MongoDB corriendo en `localhost:27017`.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor
npm start
# o
npm run dev
```

El servidor queda escuchando en `http://localhost:8080`.

### Endpoints

| Metodo | Ruta                 | Descripcion                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/orders`        | Crear envio                |
| GET    | `/api/orders`        | Listar envios              |
| GET    | `/api/orders/:id`    | Obtener envio por id       |
| POST   | `/api/users`         | Crear cliente              |
| GET    | `/api/users`         | Listar clientes            |
| GET    | `/api/users/:id`     | Obtener cliente por id     |
| POST   | `/api/couriers`      | Crear repartidor           |
| GET    | `/api/couriers`      | Listar repartidores        |
| GET    | `/api/couriers/:id`  | Obtener repartidor por id  |

Ejemplo de creacion de envio:

```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Ana Lopez","address":"Calle Falsa 123","weight":5}'
```

## Deuda tecnica conocida

Esta seccion es **intencional y honesta**: lista los problemas que el codigo tiene
hoy a proposito, y que iremos resolviendo modulo a modulo durante el curso.

1. **Configuracion hardcodeada.** La URI de Mongo (`src/db.js`), el `PORT` y un
   `SECRET` falso (`src/index.js`) estan escritos directamente en el codigo, en
   lugar de leerse desde variables de entorno (`.env` + `dotenv`) y una capa de
   configuracion. *(Se corrige en el Modulo 1.)*

2. **Controllers gordos (fat controllers) / logica en las rutas.** Cada handler
   mezcla en un solo bloque la validacion manual, la logica de negocio, el acceso
   directo a la base y los efectos secundarios. No hay capa de **services** ni de
   **repositories**. El ejemplo mas claro es `src/routes/orders.js`.

3. **Acoplamiento del efecto secundario.** La notificacion
   (`src/services/notifications.js`) se importa y se llama inline dentro de la ruta
   de orders, acoplando la logica de negocio con el envio de notificaciones.

4. **Manejo de errores crudo.** Todos los `try/catch` responden con un generico
   `res.status(500).send("Error del servidor")`. No hay una capa de errores ni
   errores de dominio personalizados.

5. **Logging pobre.** Solo se usa `console.log`. No hay un logger real con niveles,
   formato ni transporte.

6. **Sin tests, sin Swagger, sin upload de archivos, sin Docker.** Estas piezas se
   agregan en modulos posteriores; su ausencia aca es intencional.

## Roadmap del curso (que vamos a refactorizar)

- **Modulo 1:** variables de entorno + capa de configuracion (matar el hardcode).
- **Modulos siguientes:** capa de services y repositories, manejo de errores,
  logger profesional, tests, documentacion con Swagger, uploads y Docker.
