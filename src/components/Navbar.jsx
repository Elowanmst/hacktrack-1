import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/" className="text-xl font-bold">HackTrack</Link>
      <div>
        <Link to="/hackathons" className="mr-4">Hackathons</Link>
        {user ? (
          <>
            <Link to="/create-team" className="mr-4">Créer une équipe</Link>
            <Link to="/join-team" className="mr-4">Rejoindre une équipe</Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-2">Connexion</Link>
            <Link to="/register" className="bg-blue-500 px-4 py-2 rounded">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;