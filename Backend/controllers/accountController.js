const Account = require('../models/Account');
const User = require('../models/User');

// Création d'un compte bancaire
exports.createAccount = async (req, res) => {
    try {
        const { email, initial_balance } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

        const account = new Account({
            user_id: user._id,
            balance: initial_balance,
            account_number: Math.random().toString().slice(2, 12) // Génère un numéro unique
        });

        await account.save();
        res.json({ message: "Compte bancaire créé", account });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création du compte" });
    }
};

// Récupérer le solde d'un utilisateur
exports.getBalance = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

        const account = await Account.findOne({ user_id: user._id });

        if (!account) return res.status(400).json({ error: "Compte bancaire introuvable" });

        res.json({ balance: account.balance });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du solde" });
    }
};
