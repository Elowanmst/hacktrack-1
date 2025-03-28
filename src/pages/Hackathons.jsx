import { useEffect, useState } from "react";

const Hackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      fetch(`http://localhost:3002/hackathons?page=${page}`)
        .then((res) => res.json())
        .then((data) => setHackathons(data))
        .catch((err) => console.error("Erreur de chargement :", err));
    }, [page]);
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Liste des Hackathons</h1>
        <ul>
          {hackathons.map((hackathon) => (
            <li key={hackathon.id} className="mb-2 p-4 border rounded">
              <h2 className="text-xl">{hackathon.name}</h2>
              <p>{hackathon.date}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
            Précédent
          </button>
          <button onClick={() => setPage((prev) => prev + 1)} className="bg-gray-500 text-white px-4 py-2 rounded">
            Suivant
          </button>
        </div>
      </div>
    );
  };

export default Hackathons;