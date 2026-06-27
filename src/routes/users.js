const express = require("express");
const router = express.Router();

const User = require("../models/user");

// CRUD basico de usuarios. Tambien un poco "gordo": validacion + DB en la ruta.
// DEUDA TECNICA (Modulo 1+): extraer logica a service/repository.

// POST /api/users -> crea un cliente
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Validacion manual inline.
    if (!name || !email) {
      return res.status(400).send("Faltan datos obligatorios del usuario");
    }

    const user = await User.create({
      name,
      email,
      role: role || "customer",
    });

    console.log("User creado:", user._id);
    res.status(201).json(user);
  } catch (error) {
    console.log("Error al crear user:", error.message);
    res.status(500).send("Error del servidor");
  }
});

// GET /api/users -> lista clientes
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log("Error al listar users:", error.message);
    res.status(500).send("Error del servidor");
  }
});

// GET /api/users/:id -> obtiene un cliente por id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.json(user);
  } catch (error) {
    console.log("Error al buscar user:", error.message);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;
