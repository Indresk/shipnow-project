const mongoose = require("mongoose"); // ORM -> mongodb

const MONGO_URI = "mongodb://localhost:27017/shipnow";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB:", MONGO_URI);
  } catch (error) {
    // Manejo de errores crudo: solo logueamos y matamos el proceso.
    console.log("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
