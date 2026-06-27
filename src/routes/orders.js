const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const sendNotification = require("../services/notifications");

// ===========================================================================
// CONTROLLER GORDO (FAT CONTROLLER) - este es EL archivo que el curso refactoriza.
// Cada handler mezcla en un solo bloque: validacion manual + logica de negocio
// + acceso directo a la base + efecto secundario (notificacion) + try/catch 500.
// DEUDA TECNICA (Modulo 1+): extraer a service + repository + capa de validacion.
// ===========================================================================

// POST /api/orders -> crea un envio
router.post("/", async (req, res) => {
  try {
    const { customerName, address, weight, courierId } = req.body;

    // Validacion manual inline (deberia ir a un middleware/validador).
    if (!customerName || !address || !weight) {
      return res.status(400).send("Faltan datos obligatorios del envio");
    }
    if (typeof weight !== "number" || weight <= 0) {
      return res.status(400).send("El peso debe ser un numero mayor a 0");
    }

    // Logica de negocio inline (deberia vivir en un service).
    // TODO (Modulo 1): extraer a un service -> cost = weight * 10
    const shippingCost = weight * 10;

    // Acceso directo a la base desde la ruta (sin repository).
    const order = await Order.create({
      customerName,
      address,
      weight,
      cost: shippingCost,
      status: "pending",
      courierId: courierId || null,
    });

    // Efecto secundario acoplado: notificacion inline.
    sendNotification(
      "Nuevo envio creado para " + customerName + " por $" + shippingCost
    );

    console.log("Order creada:", order._id);
    res.status(201).json(order);
  } catch (error) {
    // Manejo de errores crudo: 500 generico sin capa de errores.
    console.log("Error al crear order:", error.message);
    res.status(500).send("Error del servidor");
  }
});

// GET /api/orders -> lista todos los envios
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.log("Error al listar orders:", error.message);
    res.status(500).send("Error del servidor");
  }
});

// GET /api/orders/:id -> obtiene un envio por id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send("Envio no encontrado");
    }
    res.json(order);
  } catch (error) {
    console.log("Error al buscar order:", error.message);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;
