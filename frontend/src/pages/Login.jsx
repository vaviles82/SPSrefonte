import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation simplifiée
    if (email === "admin@sps.ch" && password === "ADMIN") {
      login({ name: "Valentin", role: "ADMIN", email }, "token-123");
      navigate("/admin/dashboard");
    } else {
      alert("Erreur d'identifiants");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-5">Connexion Administration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input 
          type="email" placeholder="Email" className="border p-2 rounded"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" className="border p-2 rounded"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;