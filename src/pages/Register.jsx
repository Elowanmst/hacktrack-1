// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";


// // Schéma de validation avec Zod
// const schema = z.object({
//   name: z.string().min(2, "Le nom est trop court"),
//   email: z.string().email("L'email est invalide"),
//   password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
// });

// const Register = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const navigate = useNavigate();
//   const [apiError, setApiError] = useState(null); // État pour gérer les erreurs API
//   const [loading, setLoading] = useState(false); // État pour gérer le chargement

//   const onSubmit = async (data) => {
//     setApiError(null); // Réinitialise les erreurs API
//     setLoading(true); // Active le chargement

//     try {
//       const response = await fetch("http://localhost:3002/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         navigate("/login"); // Redirige vers la page de connexion après succès
//       } else {
//         const errorData = await response.json();
//         setApiError(errorData.message || "Une erreur est survenue lors de l'inscription.");
//       }
//     } catch (err) {
//       setApiError("Erreur réseau. Veuillez réessayer plus tard.");
//     } finally {
//       setLoading(false); // Désactive le chargement
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Inscription</h1>

//       {/* Champ Nom */}
//       <input
//         {...register("name")}
//         placeholder="Nom"
//         className="block mb-2 p-2 border"
//       />
//       {errors.name && <p className="text-red-500">{errors.name.message}</p>}

//       {/* Champ Email */}
//       <input
//         {...register("email")}
//         placeholder="Email"
//         className="block mb-2 p-2 border"
//       />
//       {errors.email && <p className="text-red-500">{errors.email.message}</p>}

//       {/* Champ Mot de passe */}
//       <input
//         {...register("password")}
//         type="password"
//         placeholder="Mot de passe"
//         className="block mb-2 p-2 border"
//       />
//       {errors.password && <p className="text-red-500">{errors.password.message}</p>}

//       {/* Message d'erreur API */}
//       {apiError && <p className="text-red-500 mb-2">{apiError}</p>}

//       {/* Bouton d'inscription */}
//       <button
//         type="submit"
//         className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//         disabled={loading}
//       >
//         {loading ? "Chargement..." : "S'inscrire"}
//       </button>
//     </form>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("/login"); // Redirige vers la page de connexion après inscription
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur réseau : " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block mb-2 p-2 border"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        className="block mb-2 p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        S'inscrire
      </button>
    </form>
  );
};

export default Register;