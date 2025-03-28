import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        login(token); // Appelle la fonction login du contexte
        navigate("/"); // Redirige vers la page d'accueil
      } else {
        console.error("Erreur lors de la connexion");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block mb-2 p-2 border" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="block mb-2 p-2 border" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Se connecter</button>
    </form>
  );
};

export default Login;