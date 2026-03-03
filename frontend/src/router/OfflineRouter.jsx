import { createBrowserRouter } from "react-router-dom";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Login from "../screens/OfflineScreens/Login";
import Register from "../screens/OfflineScreens/Register";

const OfflineRouter = createBrowserRouter([
    {
        element: <HomeOffline/>, // L'élément retourné sour toutes nos vues
        errorElement: <ErrorPage/>, // L'élément retourné en cas d'erreur
        children:[
            {
                path: "/", // Chemain de la vue
                element: <Login/>, // L'élément retourné
            },
            {
                path: "/register",
                element: <Register/>, 
            },
        ]
    }
])

export default OfflineRouter;