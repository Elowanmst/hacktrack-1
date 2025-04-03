import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ajout d'un état de chargement
    const [error, setError] = useState(null); // Ajout d'un état d'erreur
  
    useEffect(() => {
      const token = localStorage.getItem("jwt");
      console.log("Token récupéré :", token);
      if (token) {
        fetch("http://localhost:3002", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.valid) {
              setUser({ token });
            } else {
              localStorage.removeItem("jwt");
              setError("Session expirée. Veuillez vous reconnecter.");
            }
          })
          .catch(() => setError("Erreur de connexion au serveur."))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, []);
  
    const login = (token) => {
      localStorage.setItem("jwt", token);
      setUser({ token });
    };
  
    const logout = () => {
      localStorage.removeItem("jwt");
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout, loading, error }}>
        {children}
      </AuthContext.Provider>
    );
  };