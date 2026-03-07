// ===========================
// CONTEXTE D'AUTHENTIFICATION (Adapté JWT)
// ===========================
import { createContext, useContext, useState, useEffect } from "react";
// On importe l'instance api et les helpers de token
import api, { setAccessToken, clearAccessToken } from "../api/axios";
import { USER_INFOS } from "../constants/appConstant";
import { URL_LOGIN } from "../constants/apiConstant";

// ===========================
// CREATION DU CONTEXTE
// ===========================
const AuthContext = createContext({
  userId: "",
  email: "",
  firstname: "",
  loading: true, // Ajout: pour savoir si on est en train de vérifier le token
  signIn: async () => {},
  signOut: async () => {},
});

// ===========================
// PROVIDER DU CONTEXTE
// ===========================
const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [loading, setLoading] = useState(true);

  // ===========================
  // METHODE DE CONNEXION
  // ===========================
  const signIn = async (emailInput, passwordInput) => {
    try {
      // 1. Appel API pour récupérer le token
      const response = await api.post(URL_LOGIN, {
        email: emailInput, 
        password: passwordInput 
      });

      const { token, user } = response.data;

      if (!token) {
        throw new Error("Token d'authentification introuvable dans la réponse");
      }

      // 2. Stockage du token (Indispensable pour JWT)
      setAccessToken(token);
      localStorage.setItem("token", token);
      
      // Force l'ajout du header sur l'instance axios pour les requêtes immédiates
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 3. Mise à jour des états
      // On gère le cas où l'API renvoie l'user directement ou s'il faut le déduire
      if (user) {
        setUserId(user.id);
        setEmail(user.email);
        setFirstname(user.firstname || user.nickname);
        // Sauvegarde dans le localStorage de l'utilisateur
        localStorage.setItem(USER_INFOS, JSON.stringify(user));
      } else {
        // Fallback si l'API ne renvoie pas l'objet user complet au login
        // On passe le token explicitement dans les headers pour s'assurer qu'il est pris en compte immédiatement
        const meResponse = await api.get("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(meResponse.data.id);
        setEmail(meResponse.data.email);
        setFirstname(meResponse.data.firstname || meResponse.data.nickname);
        // Sauvegarde dans le localStorage de l'utilisateur
        localStorage.setItem(USER_INFOS, JSON.stringify(meResponse.data));
      }
      
    } catch (error) {
      let errorMessage = error.response?.data?.message || error.message;
      if (error.response?.status === 401 && errorMessage === "JWT Token not found") {
        errorMessage += " (Le serveur Apache semble supprimer le header Authorization. Vérifiez votre .htaccess)";
      }
      throw new Error(`Erreur lors de la connexion: ${errorMessage}`);
    }
  };

  // ===========================
  // METHODE DE DECONNEXION
  // ===========================
  const signOut = () => {
    // 1. Nettoyage des états
    setUserId("");
    setEmail("");
    setFirstname("");

    // 2. Nettoyage du Token
    clearAccessToken();
    localStorage.removeItem("token");
    localStorage.removeItem(USER_INFOS);
  };

  // ===========================
  // VERIFICATION SESSION (F5)
  // ===========================
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem(USER_INFOS);

      if (token) {
        // 1. Restauration immédiate depuis le localStorage (affichage instantané)
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserId(user.id);
          setEmail(user.email);
          setFirstname(user.firstname || user.nickname);
        }

        try {
          // On remet le token dans Axios
          setAccessToken(token);
          // 2. Vérification en arrière-plan avec le serveur
          const response = await api.get("/api/me");
          
          setUserId(response.data.id);
          setEmail(response.data.email);
          setFirstname(response.data.firstname || response.data.nickname);
          // Mise à jour du localStorage avec les données fraîches
          localStorage.setItem(USER_INFOS, JSON.stringify(response.data));
        } catch (error) {
          // Si le token est invalide ou expiré
          signOut();
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const value = {
    userId,
    email,
    firstname,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };
