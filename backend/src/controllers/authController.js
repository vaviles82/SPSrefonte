import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Si tu utilises le hashage

export const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Vérification de l'utilisateur (Exemple simplifié)
  // Dans un vrai cas, tu cherches dans prisma.user
  if (email === "admin@sps.ch" && password === "votre_password_securise") {
    
    // 2. Génération du Token
    const token = jwt.sign(
      { email, role: 'ADMIN' }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '1h' }
    );

    return res.json({ token, isAdmin: true });
  }

  // 3. Gestion structurée de l'erreur (Fiche 11)
  res.status(401).json({ error: "Identifiants invalides" });
};