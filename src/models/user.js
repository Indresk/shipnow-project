const mongoose = require("mongoose");

// Modelo de User (cliente).
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "customer" }, // customer | admin
});

module.exports = mongoose.model("User", userSchema);
