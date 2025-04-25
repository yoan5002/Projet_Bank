const Otp = require('../models/Otp');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configuration du transporteur d'email
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Fonction pour envoyer un OTP
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60000); // Expire en 5 minutes
        await Otp.create({ user_id: user._id, otp_code: otpCode, expires_at: expiresAt });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Votre code OTP',
            text: `Votre code OTP est : ${otpCode}`
        });

        res.json({ message: 'OTP envoyé' });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'envoi de l'OTP" });
    }
};

// Fonction pour vérifier un OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

        const validOtp = await Otp.findOne({ user_id: user._id, otp_code: otp, expires_at: { $gt: new Date() } });
        if (!validOtp) return res.status(400).json({ error: 'OTP invalide ou expiré' });

        await Otp.deleteOne({ _id: validOtp._id });
        res.json({ message: 'Connexion réussie' });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la vérification de l'OTP" });
    }
};
