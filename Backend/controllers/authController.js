const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//  Inscription d'un utilisateur
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Tentative d'inscription avec :", { name, email });

        if (!name || !email || !password) {
            console.log(" Champs obligatoires manquants !");
            return res.status(400).json({ error: "Tous les champs sont obligatoires." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(" Email déjà utilisé !");
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,                           
            email,
            password: hashedPassword,
            role: 'user'                      
        });

        await newUser.save();

        console.log(" Utilisateur créé avec succès :", newUser);
        res.json({ message: "Utilisateur enregistré avec succès." });

    } catch (err) {
        console.error(" Erreur lors de l'inscription :", err);
        res.status(500).json({ error: "Erreur lors de l'inscription." });
    }
};


//  Connexion et envoi de l'OTP
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(" Tentative de connexion pour :", email);

        if (!email || !password) {
            return res.status(400).json({ error: "Email et mot de passe sont requis." });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log(" Identifiants incorrects !");
            return res.status(400).json({ error: "Email ou mot de passe incorrect." });
        }

        console.log(" Connexion réussie, génération de l'OTP...");

        // Supprime les anciens OTP avant d'en générer un nouveau
        await Otp.deleteMany({ user_id: user._id });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60000); // Expire dans 5 minutes

        await Otp.create({ user_id: user._id, otp_code: otpCode, expires_at: expiresAt });

        console.log(" Envoi de l'OTP par email...");

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Votre code OTP",
                text: `Votre code OTP est : ${otpCode}`
            });

            console.log(" OTP envoyé avec succès !");
            res.json({ message: "Un code OTP a été envoyé à votre email." });

        } catch (emailError) {
            console.error(" Erreur d'envoi de l'OTP :", emailError);
            res.status(500).json({ error: "Impossible d'envoyer l'OTP. Vérifiez votre configuration d'email." });
        }

    } catch (err) {
        console.error(" Erreur lors de l'envoi de l'OTP :", err);
        res.status(500).json({ error: "Erreur lors de l'envoi de l'OTP." });
    }
};

//  Vérification de l'OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé.' });

        const validOtp = await Otp.findOne({ user_id: user._id, otp_code: otp, expires_at: { $gt: new Date() } });
        if (!validOtp) return res.status(400).json({ error: 'OTP invalide ou expiré.' });

        await Otp.deleteOne({ _id: validOtp._id });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          

        res.json({
            message: 'Connexion réussie.',
            token,
            redirectUrl: "http://localhost:3000"
        });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la vérification de l'OTP." });
    }
};


// Récupère les infos de l'utilisateur connecté
exports.getCurrentUser = async (req, res) => {
    try {
      // req.user.id vient du token (grâce au middleware auth)
      const user = await User.findById(req.user.id).select('-password'); // exclure le mot de passe
      
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(" Erreur dans /me :", error);
      res.status(500).json({ error: "Erreur serveur lors de la récupération de l'utilisateur." });
    }
  };
  