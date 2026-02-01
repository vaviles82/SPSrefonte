const prisma = require("../config/db");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);

    req.login(user, (err) => {
      if (err) return next(err);
      res.json(user);
    });
  })(req, res, next);
};

const getProfile = async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });

  try {
    const admin = await prisma.admin.findUnique({ where: { id: req.user.id } });
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the user profile." });
  }
};

const createTestAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const admin = await prisma.admin.create({
      data: {
        name: "John Doe",
        email: "john@example.com", // Make sure this email is unique!
        role: "ADMIN",
        password: hashedPassword, // Store hashed password
      },
    });

    res.status(201).json(admin);
  } catch (error) {
    // Handling Prisma errors
    if (error.code === "P2002") {
      // Handle unique constraint violation error
      res.status(400).json({
        message: `The email ${req.body.email} is already taken.`,
      });
    } else {
      // For any other errors, you can send a general server error response
      console.error(error);
      res.status(500).json({
        message: "An error occurred while creating the admin.",
      });
    }
  }
};

const logOut = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "An error occurred while logging out." });
    }
    res.json({ message: "Logged out successfully" });
  });
};

// Get all admin users
const getAdmins = async (req, res) => {
  // Check if the current user is an admin
  if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden: Only admins can view all users" });
  }

  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Failed to fetch admin users" });
  }
};

// Create a new admin user
const createAdmin = async (req, res) => {
  // Check if the current user is an admin
  if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden: Only admins can create users" });
  }

  const { name, email, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "CREATOR", // Default to CREATOR if role not specified
      },
    });

    // Return user without password
    const { password: _, ...adminWithoutPassword } = newAdmin;
    res.status(201).json(adminWithoutPassword);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// Update an admin user
const updateAdmin = async (req, res) => {
  // Check if the current user is an admin
  if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden: Only admins can update users" });
  }

  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    // Check if admin exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update admin
    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin:", error);
    if (error.code === "P2002") {
      // Unique constraint violation (likely email)
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete an admin user
const deleteAdmin = async (req, res) => {
  // Check if the current user is an admin
  if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden: Only admins can delete users" });
  }

  const { id } = req.params;
  
  // Prevent deleting self
  if (parseInt(id) === req.user.id) {
    return res.status(400).json({ message: "You cannot delete your own account" });
  }

  try {
    // Check if admin exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete admin
    await prisma.admin.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = { 
  login, 
  getProfile, 
  createTestAdmin, 
  logOut,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
