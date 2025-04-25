import { createContext, useContext, useEffect, useState } from "react";

// Crée le contexte utilisateur
export const UserContext = createContext();

// Fournisseur du contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ Aucun token trouvé dans le localStorage.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log(" Utilisateur connecté :", data);
          setUser(data);
        } else {
          console.error(" Token invalide :", data.error);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(" Erreur lors de la requête vers /auth/me :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useUser = () => useContext(UserContext);
