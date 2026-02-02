import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext' // On importe le gestionnaire d'auth

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* On enveloppe l'App pour que useAuth() fonctionne partout */}
      <App />
    </AuthProvider>
  </StrictMode>,
)