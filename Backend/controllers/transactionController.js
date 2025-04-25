const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const User = require('../models/User');

// Envoi d'argent entre utilisateurs
exports.sendMoney = async (req, res) => {
    try {
        const { sender_email, receiver_email, amount } = req.body;

        if (amount <= 0) return res.status(400).json({ error: "Le montant doit être supérieur à zéro." });

        const sender = await User.findOne({ email: sender_email });
        const receiver = await User.findOne({ email: receiver_email });

        console.log(" Utilisateur expéditeur trouvé :", sender);
        console.log(" Utilisateur destinataire trouvé :", receiver);

        if (!sender) return res.status(400).json({ error: `Expéditeur non trouvé: ${sender_email}` });
        if (!receiver) return res.status(400).json({ error: `Destinataire non trouvé: ${receiver_email}` });

        const senderAccount = await Account.findOne({ user_id: sender._id });
        const receiverAccount = await Account.findOne({ user_id: receiver._id });

        console.log(" Compte expéditeur trouvé :", senderAccount);
        console.log(" Compte destinataire trouvé :", receiverAccount);

        if (!senderAccount) return res.status(400).json({ error: `Compte bancaire introuvable pour ${sender_email}` });
        if (!receiverAccount) return res.status(400).json({ error: `Compte bancaire introuvable pour ${receiver_email}` });

        if (senderAccount.balance < amount) return res.status(400).json({ error: "Solde insuffisant." });

        senderAccount.balance -= amount;
        await senderAccount.save();

        receiverAccount.balance += amount;
        await receiverAccount.save();

        const transaction = new Transaction({
            sender_id: sender._id,
            receiver_id: receiver._id,
            amount: amount,
            status: "completed"
        });

        await transaction.save();
        res.json({ message: "Transaction réussie", transaction });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la transaction.", details: err.message });
    }
};


// Récupérer l'historique des transactions d'un utilisateur
exports.getTransactions = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "Utilisateur non trouvé." });

        const transactions = await Transaction.find({
            $or: [{ sender_id: user._id }, { receiver_id: user._id }]
        }).populate("sender_id receiver_id", "email");

        res.json({ transactions });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des transactions." });
    }
};
