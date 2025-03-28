import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HackathonDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [hackathon, setHackathon] = useState(null);
  
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
        <p>Description: {hackathon.description}</p>
  
        {user ? (
          <>
            <Link to="/join-team">
              <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                Rejoindre une équipe
              </button>
            </Link>
            <Link to="/create-team">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Créer une équipe
              </button>
            </Link>
          </>
        ) : (
          <p className="text-red-500 mt-4">
            Vous devez être connecté pour effectuer cette action.
          </p>
        )}
      </div>
    );
  };

export default HackathonDetail;