import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Définir le schéma de validation avec Zod
const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Utiliser react-hook-form avec Zod pour la validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        login(token); // Appelle la fonction login du contexte pour sauvegarder le token
        navigate("/"); // Redirige vers la page d'accueil après connexion
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erreur lors de la connexion");
      }
    } catch (err) {
      setError("Erreur réseau : " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Champ Email */}
      <input
        {...register("email")}
        placeholder="Email"
        className="block mb-2 p-2 border"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      {/* Champ Mot de passe */}
      <input
        type="password"
        {...register("password")}
        placeholder="Mot de passe"
        className="block mb-2 p-2 border"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Se connecter
      </button>
    </form>
  );
};

export default Login;