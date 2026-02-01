# Authentication Middleware

This directory contains middleware for authentication and role-based access control in the application.

## Available Middlewares

### 1. `isAuthenticated`

This middleware checks if the user is authenticated (logged in).

```js
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/protected-route', isAuthenticated, someController.method);
```

### 2. `hasRole`

This middleware checks if the authenticated user has the required role(s).

```js
const { hasRole } = require('../middlewares/authMiddleware');

// Single role
router.get('/admin-route', hasRole('ADMIN'), adminController.method);

// Multiple roles
router.get('/editor-route', hasRole(['ADMIN', 'EDITOR']), editorController.method);
```

## Best Practice: Combine Middlewares

```js
// Import from index file
const { isAuthenticated, hasRole } = require('../middlewares');

// Protect routes requiring both authentication and specific role
router.post('/create', isAuthenticated, hasRole('ADMIN'), controller.create);
```

## Securing Routes

The following routes should typically be protected:

1. **User Management Routes**
   - User profile, except login/register

2. **Content Management Routes**
   - Article creation/update/delete 
   - Category management

3. **Admin Routes**
   - Email campaigns
   - Newsletter management
   - Subscriber management

4. **API Routes**
   - Any routes that modify data
   - Routes returning sensitive information

## Role Hierarchy

The application currently has these roles:
- `ADMIN`: Full access to all features
- Additional roles can be added as needed

## Example: Protected Route Implementation

```js
// Route with role-based access
router.post('/articles/create', 
  isAuthenticated,                // First check if user is logged in
  hasRole(['ADMIN', 'EDITOR']),   // Then check if user has required role
  articleController.createArticle
);
``` 