import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";


const schema = z.object({
  teamName: z.string().min(3, "Nom trop court"),
  description: z.string().min(10, "Description trop courte"),
});

const CreateTeam = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3002/teams/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      
      <textarea {...register("description")} placeholder="Description" className="block mb-2 p-2 border" />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Créer</button>
    </form>
  );
};

export default CreateTeam;