const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
    name: { type: String, required: true },
    sizes: [],
    prices: [],
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number }, // Add the quantity property with a default value of 0
}, {
    timestamps: true,
});

const pizzaModel = mongoose.model('pizza', pizzaSchema);

module.exports = pizzaModel;
