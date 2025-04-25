const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { spawn } = require('child_process'); 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Autoriser les requêtes frontend-backend

//  Route pour exécuter un script Python
app.get('/run-python', (req, res) => {
    console.log(" Exécution du script Python...");
    const pythonProcess = spawn('python', ['script.py']);

    let resultData = "";

    pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(` Erreur Python : ${data}`);
        if (!res.headersSent) {
            res.status(500).json({ error: "Erreur lors de l'exécution du script Python." });
        }
    });

    pythonProcess.on('close', (code) => {
        console.log(`Processus Python terminé avec code ${code}`);
        if (!res.headersSent) {
            res.json({ message: resultData.trim() });
        }
    });
});


//  Import des routes
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

//  Utilisation des routes
app.use('/auth', authRoutes);
app.use('/otp', otpRoutes);
app.use('/account', accountRoutes);
app.use('/transaction', transactionRoutes);

//  Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connecté à MongoDB');
    createAdminIfNotExists(); // ← ajout ici
})
.catch(err => {
    console.error('❌ Erreur de connexion MongoDB:', err);
    process.exit(1);
});

//  Gestion des routes inexistantes
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée." });
});

const User = require('./models/User');
const bcrypt = require('bcrypt');

async function createAdminIfNotExists() {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('komlanvi2005', 10);
      const admin = new User({
        name: "Yoan Lablé", // ✅ ajoute le nom ici
        email: 'yoanlable@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin créé avec succès : yoanlable@gmail.com / komlanvi2005');
    } else {
      console.log('ℹ️ Admin déjà existant, aucune création');
    }
  }
  
  

  
// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Serveur lancé sur http://localhost:${PORT}`);
});
