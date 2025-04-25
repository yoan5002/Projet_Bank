const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bank_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout pour éviter les erreurs de connexion
        });
        console.log(' Connecté à MongoDB');
    } catch (err) {
        console.error(' Erreur de connexion MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
