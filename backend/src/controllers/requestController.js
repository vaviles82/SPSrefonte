//import prisma from "../config/db.js";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Créer une nouvelle demande (Formulaire de contact)
export const createRequest = async (req, res) => {
  const {
    company, first_name, last_name, email,
    phone_number, newsletter, content, status,
  } = req.body;

  try {
    // Utilisation du nom de modèle généré par Prisma : contactRequest
    const request = await prisma.contactRequest.create({
      data: {
        company,
        first_name,
        last_name,
        email,
        phone_number,
        newsletter: newsletter || false,
        content,
        status: status || "NEW",
        // 'subject' et 'type' utiliseront les valeurs @default du schema.prisma
      },
    });
    res.status(201).json(request);
  } catch (error) {
    console.error("Erreur Prisma lors de la création:", error);
    res.status(500).json({ message: "An error occurred while creating the request." });
  }
};

// Récupérer toutes les demandes (Dashboard Admin)
export const getRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) {
      where.status = status.toUpperCase();
    }

    const requests = await prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    const formattedRequests = requests.map(request => ({
      id: request.id,
      subject: request.subject || `Request from ${request.company || request.last_name}`,
      content: request.content,
      status: request.status,
      userName: `${request.first_name} ${request.last_name}`,
      userEmail: request.email,
      newsletter: request.newsletter,
      phone_number: request.phone_number,
      company: request.company,
      type: request.type,
      createdAt: request.createdAt,
    }));

    res.json(formattedRequests);
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    res.status(500).json({ message: "An error occurred while fetching the requests." });
  }
};

// Récupérer une demande par ID
export const getRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await prisma.contactRequest.findUnique({
      where: { id: parseInt(id) },
    });
    if (!request) return res.status(404).json({ message: "Request not found." });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

// Mettre à jour une demande
export const updateRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRequest = await prisma.contactRequest.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

// Supprimer une demande
export const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contactRequest.delete({ 
      where: { id: parseInt(id) } 
    });
    res.json({ message: "Request deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

// Statistiques pour le Dashboard
export const getRequestStats = async (req, res) => {
  try {
    const totalRequests = await prisma.contactRequest.count();
    const newRequests = await prisma.contactRequest.count({ 
      where: { status: "NEW" } 
    });
    const distinctEmails = await prisma.contactRequest.findMany({
      select: { email: true },
      distinct: ['email']
    });

    res.json({
      totalRequests,
      newRequests,
      totalUsers: distinctEmails.length,
      responseRate: totalRequests > 0 ? Math.round(((totalRequests - newRequests) / totalRequests) * 100) : 0
    });
  } catch (error) {
    console.error("Erreur Stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};