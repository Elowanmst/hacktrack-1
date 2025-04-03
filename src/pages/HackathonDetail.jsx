import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HackathonDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [hackathon, setHackathon] = useState(null);

  console.log("Utilisateur connecté :", user);

  useEffect(() => {
    fetch(`http://localhost:3002/hackathons/${id}`)
      .then((res) => res.json())
      .then((data) => setHackathon(data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, [id]);

  if (!hackathon) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{hackathon.name}</h1>
      <p>Date: {hackathon.date}</p>
      <p>Thème: {hackathon.theme}</p>
      <h2 className="text-xl font-bold mt-4">Équipes inscrites :</h2>
      <ul>
        {hackathon.teams.map((team) => (
          <li key={team.id} className="mb-2 p-2 border rounded">
            <h3 className="text-lg font-bold">{team.name}</h3>
            <p>Membres : {team.members.join(", ")}</p>
          </li>
        ))}
      </ul>

      {user ? (
        <>
          <Link to="/join-team">
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 border border-red-500">
              Rejoindre une équipe
            </button>
          </Link>
          <Link to="/create-team">
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 border border-red-500">
              Créer une équipe
            </button>
          </Link>
        </>
      ) : (
        <p className="text-red-500 mt-4">
          Vous devez être connecté pour effectuer cette action.{" "}
          <Link to="/login" className="text-blue-500 underline">
            Connectez-vous
          </Link>{" "}
          ou{" "}
          <Link to="/register" className="text-blue-500 underline">
            inscrivez-vous
          </Link>.
        </p>
      )}
    </div>
  );
};

export default HackathonDetail;