import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinTeam = () => {
  const [teamCode, setTeamCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Code d'équipe soumis :", teamCode);
    navigate("/hackathons");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rejoindre une équipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
          placeholder="Entrez le code d'équipe"
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