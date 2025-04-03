import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const schema = z.object({
  teamName: z.string().min(3, "Nom trop court"),
  hackathonId: z.string().min(1, "Veuillez sélectionner un hackathon"),
});

const CreateTeam = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [hackathons, setHackathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/hackathons")
      .then((res) => res.json())
      .then((data) => setHackathons(data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/teams/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Équipe créée :", data);
        navigate("/hackathons");
      } else {
        console.error("Erreur lors de la création de l'équipe");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Créer une équipe</h1>

      <input {...register("teamName")} placeholder="Nom de l'équipe" className="block mb-2 p-2 border" />
      {errors.teamName && <p className="text-red-500">{errors.teamName.message}</p>}

      <select {...register("hackathonId")} className="block mb-2 p-2 border">
        <option value="">Sélectionnez un hackathon</option>
        {hackathons.map((hackathon) => (
          <option key={hackathon.id} value={hackathon.id}>
            {hackathon.name}
          </option>
        ))}
      </select>
      {errors.hackathonId && <p className="text-red-500">{errors.hackathonId.message}</p>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Créer</button>
    </form>
  );
};

export default CreateTeam;