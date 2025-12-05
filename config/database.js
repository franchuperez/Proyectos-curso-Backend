const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://franciscoperez:francisco191@francisco.nq5tutf.mongodb.net/?appName=francisco';

const connectDB = async () => {
try {
    await mongoose.connect(MONGODB_URI);
    console.log(' MongoDB conectado exitosamente');
} catch (error) {
    console.error(' Error al conectar MongoDB:', error.message);
    process.exit(1);
}
};

module.exports = connectDB;