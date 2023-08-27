import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Breeds from "../components/Breeds/Breeds";
import DetailedBreeds from "../components/Breeds/DetailedBreeds/DetailedBreeds";
import {MainRoutes} from "./MainRoutes";

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
                element: <Breeds/>
            },
            {
                path: MainRoutes.BREEDS_ID,
                element: <DetailedBreeds/>
            },
        ]
    }
]);

export {
    router,
}