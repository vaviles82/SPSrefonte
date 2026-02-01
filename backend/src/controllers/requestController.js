import prisma from "../config/db.js"; // On utilise ton instance existante

export const createRequest = async (req, res) => {
  const { company, first_name, last_name, email, phone_number, newsletter, content, status } = req.body;
  try {
    const request = await prisma.contactRequest.create({
      data: {
        company, first_name, last_name, email, phone_number,
        newsletter: !!newsletter,
        content,
        status: status || "NEW",
      },
    });
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur création" });
  }
};

export const getRequests = async (req, res) => {
  try {
    console.log("HELLO WORLD");
    console.log("Tentative d'accès à la table ContactRequest...");
    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log(`${requests.length} requêtes trouvées.`);
    res.json(requests);
  } catch (error) {
    // On log l'erreur RÉELLE pour Docker
    console.error("ERREUR PRISMA DÉTAILLÉE:", error);
    // On renvoie l'erreur au client pour ne pas rester dans le flou
    res.status(500).json({ 
      error: "Erreur lors de la récupération des données", 
      details: error.message 
    });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const request = await prisma.contactRequest.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Erreur" });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const updated = await prisma.contactRequest.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Erreur update" });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    await prisma.contactRequest.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Erreur delete" });
  }
};

export const getRequestStats = async (req, res) => {
  try {
    const totalRequests = await prisma.contactRequest.count();
    const newRequests = await prisma.contactRequest.count({ where: { status: "NEW" } });
    res.json({ totalRequests, newRequests });
  } catch (error) {
    res.status(500).json({ error: "Erreur stats" });
  }
};