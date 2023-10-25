const express = require("express");
const app = express();
const db = require("./db.js");
const pizzaRoute = require("./routes/pizzaRoutes")
const pizzas = require("./pizzaData")
const cors = require("cors")


app.get("/", (req, res) => {
    res.send("Server is working");
});

app.use(express.json());
app.use(cors());
app.use('/api/pizzas', pizzaRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
