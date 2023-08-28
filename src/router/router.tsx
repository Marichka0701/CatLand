import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Breeds from "../components/Breeds/Breeds";
import DetailedBreeds from "../components/Breeds/DetailedBreeds/DetailedBreeds";
import {MainRoutes} from "./MainRoutes";
import Voting from "../components/Voting/Voting";
import Likes from "../components/Likes/Likes";
import Favourites from "../components/Favourites/Favourites";
import Dislikes from "../components/Dislikes/Dislikes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: MainRoutes.BREEDS,
                element: <Breeds/>,
            },
            {
                path: MainRoutes.BREEDS_ID,
                element: <DetailedBreeds/>,
            },
            {
                path: MainRoutes.VOTING,
                element: <Voting/>,
            },
            {
                path: MainRoutes.LIKES,
                element: <Likes/>,
            },
            {
                path: MainRoutes.FAVOURITES,
                element: <Favourites/>,
            },
            {
                path: MainRoutes.DISLIKES,
                element: <Dislikes/>,
            },
        ]
    }
]);

export {
    router,
}