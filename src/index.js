const express = require("express");
const connectDB = require("./db");

const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const couriersRouter = require("./routes/couriers");

// DEUDA TECNICA (Modulo 1): PORT y SECRET estan HARDCODEADOS.
// Deberian venir de variables de entorno (.env + dotenv) y de una capa de config.
const PORT = 8080;
const SECRET = "super-secret-shipnow-key-123"; // fake secret / api key hardcodeada

const app = express();

// Middleware para parsear JSON.
app.use(express.json());

// Montamos los routers. Toda la logica vive adentro de las rutas (controllers gordos).
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);
app.use("/api/couriers", couriersRouter);

// Ruta de health check basica.
app.get("/", (req, res) => {
  res.send("ShipNow API v1 - corriendo");
});

// Conectamos a la base y levantamos el server.
connectDB();

app.listen(PORT, () => {
  // Logging solo con console.log (sin logger real). Deuda tecnica intencional.
  console.log("ShipNow escuchando en el puerto " + PORT);
  console.log("SECRET cargado:", SECRET);
});
