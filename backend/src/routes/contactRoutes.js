const express = require("express");
const router = express.Router();
const connection = require('../db'); // Importation de la connexion à la DB

// Route pour gérer le formulaire de contact
router.post("/", async (req, res) => {
  const { name, company, email, phone, message } = req.body;

  // Validation des données
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Nom, email et message sont requis" });
  }

  // Préparation de la requête SQL pour insérer les données dans la table "contacts"
  const sql = "INSERT INTO contacts (name, company, email, phone, message) VALUES (?, ?, ?, ?, ?)";
  const values = [name, company, email, phone, message];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      return res.status(500).json({ error: "Erreur interne lors de l'enregistrement du message" });
    }

    console.log('Message enregistré dans la base de données:', results);
    res.status(200).json({ message: "Message reçu et enregistré dans la base de données, merci de nous avoir contacté !" });
  });
});

module.exports = router;
