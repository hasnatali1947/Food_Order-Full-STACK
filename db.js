const mongoose = require('mongoose');
const mongooseUrl = "mongodb+srv://hasnatking1947:N1POLZQdO67FWaaC@pizza-app-db.slp3msx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslValidate: false
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB Connection Successful');
});

db.on('error', (error) => {
    console.log("MongoDB has an error:", error);
});

module.exports = mongoose;
