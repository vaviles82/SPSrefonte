/**
 * Middleware to check if the user is authenticated
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized: You must be logged in" });
};

/**
 * Middleware to check if the user has the required role
 * @param {string|string[]} roles - Required role(s) for access
 * @returns {function} - Express middleware function
 */
const hasRole = (roles) => {
  return (req, res, next) => {
    // First check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized: You must be logged in" });
    }

    // Convert roles to array if it's a single string
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    
    // Check if the user has one of the required roles
    if (req.user && requiredRoles.includes(req.user.role)) {
      return next();
    }
    
    return res.status(403).json({ 
      message: "Forbidden: You don't have permission to access this resource" 
    });
  };
};

module.exports = {
  isAuthenticated,
  hasRole
}; 