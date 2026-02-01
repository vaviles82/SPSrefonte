const prisma = require("../config/db");

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({ data: { name } });
    res.json(category);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: error.meta?.cause });
    }


    res.status(500).json({ message: "An error occurred while creating the category." });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      return res.status(404).json({ message: "No categories found." });
    }
    res.json(categories);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: error.meta?.cause });
    }

    res.status(500).json({ message: "An error occurred while fetching the categories." });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: error.meta?.cause });
    }


    res.status(500).json({ message: "An error occurred while fetching the category." });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await prisma.category.update({ where: { id: parseInt(id) }, data: { name } });
    res.json(category);
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: error.meta?.cause });
    }


    res.status(500).json({ message: "An error occurred while updating the category." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({
      where: { id: parseInt(req.params.id) },
    });

    return res.json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: error.meta?.cause });
    }


    return res.status(500).json({ message: "An error occurred while deleting the category." });
  }
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
