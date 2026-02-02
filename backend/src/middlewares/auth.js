import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Récupération du token dans le header Authorization (format: "Bearer TOKEN")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Token manquant." });
  }

  try {
    // Vérification du token avec la clé secrète (définie dans ton .env)
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_pour_test');
    
    // On vérifie si l'utilisateur est admin pour les routes sensibles
    if (verified.role !== 'ADMIN') {
      return res.status(403).json({ error: "Accès interdit. Droits administrateur requis." });
    }

    req.user = verified;
    next(); // On passe au contrôleur suivant
  } catch (error) {
    res.status(403).json({ error: "Token invalide ou expiré." });
  }
};