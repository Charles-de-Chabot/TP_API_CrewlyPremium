import { createContext, useState, useEffect } from "react";
import api, { setAccessToken, clearAccessToken } from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // infos utilisateur
  const [loading, setLoading] = useState(true); // vérification en cours

  // Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/login_check", { email, password });

      // Stocke le token pour toutes les requêtes
      setAccessToken(res.data.token);

      // Récupérer les infos utilisateur si tu as un endpoint /me
      const me = await api.get("/api/me"); 
      setUser(me.data);

      // Tu peux aussi stocker le token dans localStorage si tu veux persister
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error("Erreur login :", err);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    clearAccessToken();
    setUser(null);
    localStorage.removeItem("token");
  };

  // Vérifier si token déjà présent au chargement
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAccessToken(token);

      api.get("/api/me")
        .then((res) => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};