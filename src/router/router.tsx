import {createBrowserRouter} from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/breeds',
            },
            {
                path: '/gallery',
            },
        ]
    }
]);

export {
    router,
}