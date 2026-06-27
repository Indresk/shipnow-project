const mongoose = require("mongoose");

// Modelo de Order (envio/pedido).
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  weight: { type: Number, required: true },
  cost: { type: Number }, // se calcula en la ruta: cost = weight * 10
  status: { type: String, default: "pending" }, // pending | in_transit | delivered
  courierId: { type: mongoose.Schema.Types.ObjectId, ref: "Courier" },
});

module.exports = mongoose.model("Order", orderSchema);
