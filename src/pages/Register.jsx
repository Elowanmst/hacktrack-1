import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Définir le schéma de validation avec Zod
const schema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const Register = () => {
  const navigate = useNavigate();

  // Utiliser react-hook-form avec Zod pour la validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3002/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur:", errorData);
        alert(errorData.error || "Erreur lors de l'inscription");
      } else {
        alert("Inscription réussie !");
        navigate("/login"); // Redirige vers la page de connexion après inscription
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Erreur réseau : " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>

      {/* Champ Nom */}
      <input
        {...register("name")}
        placeholder="Nom"
        className="block mb-2 p-2 border"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
        S'inscrire
      </button>
    </form>
  );
};

export default Register;