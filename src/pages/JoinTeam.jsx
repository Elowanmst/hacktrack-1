import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const JoinTeam = () => {
  const { user } = useContext(AuthContext);
  const [teamId, setTeamId] = useState(""); // Utiliser teamId au lieu de teamCode
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/teams/join/${teamId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        console.log("Rejoint avec succès :", teamId);
        navigate("/hackathons");
      } else {
        console.error("Erreur lors de la tentative de rejoindre l'équipe");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rejoindre une équipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          placeholder="Entrez l'ID de l'équipe"
          className="block mb-2 p-2 border"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Rejoindre
        </button>
      </form>
    </div>
  );
};

export default JoinTeam;