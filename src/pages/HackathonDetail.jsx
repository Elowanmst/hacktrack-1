import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HackathonDetail = () => {
  const { id } = useParams(); // Récupère l'ID du hackathon depuis l'URL
  const [hackathon, setHackathon] = useState(null); // Détails du hackathon
  const [teams, setTeams] = useState([]); // Équipes associées
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  useEffect(() => {
    // Récupère les détails du hackathon et les équipes associées
    const fetchHackathonDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/hackathons/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        const data = await response.json();
        setHackathon(data); // Stocke les détails du hackathon
        setTeams(data.teams || []); // Stocke les équipes associées (si disponibles)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathonDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erreur : {error}</p>;
  }

  return (
    <div className="p-4">
      {/* Affichage des détails du hackathon */}
      {hackathon && (
        <>
          <h1 className="text-3xl font-bold mb-4">{hackathon.name}</h1>
          <p className="mb-4"><strong>Date :</strong> {hackathon.date}</p>
          <p className="mb-4"><strong>Description :</strong> {hackathon.description}</p>
        </>
      )}

      {/* Affichage des équipes inscrites */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Équipes inscrites</h2>
        {teams.length > 0 ? (
          <ul>
            {teams.map((team) => (
              <li key={team.id} className="mb-2 p-4 border rounded">
                <p><strong>ID :</strong> {team.id}</p>
                <p><strong>Nom de l'équipe :</strong> {team.name}</p>
                <p><strong>Hackathon :</strong> {hackathon.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune équipe inscrite pour ce hackathon.</p>
        )}
      </div>
    </div>
  );
};

export default HackathonDetail;