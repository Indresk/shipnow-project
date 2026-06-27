const mongoose = require("mongoose");

// Reutilizamos la misma URI hardcodeada del v1 (deuda tecnica conocida).
const MONGO_URI = "mongodb://localhost:27017/shipnow";

const User = require("./models/user");
const Product = require("./models/product");
const Courier = require("./models/courier");
const Order = require("./models/order");
const Delivery = require("./models/delivery");

// Script de seed: limpia las colecciones e inserta datos de ejemplo relacionados.
// Es tooling (no es una leccion del curso), por eso si se permite.
async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB para seed:", MONGO_URI);

    // Limpiamos las colecciones.
    await User.deleteMany({});
    await Product.deleteMany({});
    await Courier.deleteMany({});
    await Order.deleteMany({});
    await Delivery.deleteMany({});
    console.log("Colecciones limpiadas.");

    // Users (roles: admin / customer / driver).
    const users = await User.create([
      { name: "Admin ShipNow", email: "admin@shipnow.com", role: "admin" },
      { name: "Ana Lopez", email: "ana@example.com", role: "customer" },
      { name: "Carlos Diaz", email: "carlos@example.com", role: "customer" },
      { name: "Pedro Driver", email: "pedro@shipnow.com", role: "driver" },
    ]);
    console.log("Users insertados:", users.length);

    // Products.
    const products = await Product.create([
      { name: "Caja chica", price: 100, stock: 50, status: "available" },
      { name: "Caja mediana", price: 200, stock: 20, status: "available" },
      { name: "Caja grande", price: 350, stock: 0, status: "out_of_stock" },
    ]);
    console.log("Products insertados:", products.length);

    // Couriers (repartidores).
    const couriers = await Courier.create([
      { name: "Moto Express", zone: "Centro", available: true },
      { name: "Rapido Sur", zone: "Sur", available: true },
    ]);
    console.log("Couriers insertados:", couriers.length);

    // Orders (con refs a customer + items).
    const orders = await Order.create([
      {
        customerName: "Ana Lopez",
        customer: users[1]._id,
        address: "Calle Falsa 123",
        weight: 5,
        cost: 50,
        status: "pending",
        priority: "normal",
        items: [{ name: "Caja chica", quantity: 2, price: 100 }],
        courierId: couriers[0]._id,
      },
      {
        customerName: "Carlos Diaz",
        customer: users[2]._id,
        address: "Av Siempreviva 742",
        weight: 12,
        cost: 120,
        status: "in_transit",
        priority: "high",
        items: [
          { name: "Caja mediana", quantity: 1, price: 200 },
          { name: "Caja chica", quantity: 3, price: 100 },
        ],
        courierId: couriers[1]._id,
      },
    ]);
    console.log("Orders insertadas:", orders.length);

    // Deliveries (vinculan orders + couriers).
    const deliveries = await Delivery.create([
      {
        orderId: orders[0]._id,
        courierId: couriers[0]._id,
        status: "assigned",
        assignedAt: new Date(),
      },
      {
        orderId: orders[1]._id,
        courierId: couriers[1]._id,
        status: "in_transit",
        assignedAt: new Date(),
      },
    ]);
    console.log("Deliveries insertadas:", deliveries.length);

    // Resumen.
    console.log("--- Seed completado ---");
    console.log("Users:", users.length);
    console.log("Products:", products.length);
    console.log("Couriers:", couriers.length);
    console.log("Orders:", orders.length);
    console.log("Deliveries:", deliveries.length);

    await mongoose.disconnect();
    console.log("Desconectado de MongoDB.");
    process.exit(0);
  } catch (error) {
    console.log("Error en el seed:", error.message);
    process.exit(1);
  }
}

seed();
