
//=====================
//ROUTER PRINCIPALE DE L'APPLICATION
//=====================
//ce router determine quel route afficher selno l'état de connexion 
//utilisateur connecté -> OnlineRouter (application complète)
//utilisateur deco -> OfflineRouteur (login/register)


import React, { createContext, useContext, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import OfflineRouter from './OfflineRouter'
import { useAuthContext } from '../contexts/AuthContext'
import { USER_INFOS } from '../constants/appConstant'
import PageLoader from '../components/Loader/PageLoader'
import OnlineRouter from './OnlineRouter'

//=====================
//CONTEXTE DE SESSION
//=====================
//Mini contexte pour partager l'état de connexion dans l'app
const SessionContext = createContext({inSession: false})

//Hook personnalisé 
export const useSessionContext = () => useContext(SessionContext)



const AppRouter = () => {
    //state pour gérer l'etat de connexion
    //null = chargement du composant, true = connecté, false = deconnecté
    const [inSession, setInSession] = useState(null); 

    //récup les fonction du contexte d'Authentification
    const {userId, setUserId, email, setEmail, nickname, setNickname} = useAuthContext();

    //recup des données utilisateur du local storage
    const userInfos = JSON.parse(localStorage.getItem(USER_INFOS));

    //=====================
    //VERIF DE SESSION AU MONTAGE
    //=====================
    useEffect(() => {
        const checkUserSession = async () => {
            if (userInfos){
                // si des infos utilisateur existe, on les charges dans le contexte
                setUserId(userInfos.userId);
                setEmail(userInfos.email);
                setFirstname(userInfos.firstname);
                setLastname(userInfos.lastname); 
                setNickname(userInfos.nickname);
                setInSession(true);
            }else{
                //aucune session utllisateur trouvé
                setInSession(false);
            }
        }

        checkUserSession();
    }, [userId])

    //=====================
    //Affichage du loader pendant la verif
    //=====================
    if (inSession === null){
        return <PageLoader/>;
    }
    
    
    return (
        <SessionContext.Provider value={{inSession}}>
        <RouterProvider router={inSession ? OnlineRouter : OfflineRouter}/>
        </SessionContext.Provider>

    )
}

export default AppRouter
