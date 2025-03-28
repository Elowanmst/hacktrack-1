import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [hackathons, setHackathons] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:3002/hackathons?limit=3")
          .then((res) => res.json())
          .then((data) => setHackathons(data))
          .catch((err) => console.error("Erreur de chargement :", err));
      }, []);
  
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Bienvenue sur HackTrack</h1>
        <p>Découvrez et participez aux meilleurs hackathons !</p>
        <ul>
          {hackathons.map((hackathon) => (
            <li key={hackathon.id} className="mb-2 p-4 border rounded">
              <h2 className="text-xl">{hackathon.name}</h2>
              <p>{hackathon.date}</p>
            </li>
          ))}
        </ul>
        <Link to="/hackathons" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded">
          Voir tous les hackathons
        </Link>
      </div>
    );
  };

export default Home;