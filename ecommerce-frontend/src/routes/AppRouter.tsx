import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Loaders
import { productsLoader } from '@loaders/productsLoader';

// Layouts
import { MainLayout } from '@layouts/index';

// Pages
import Home from '@pages/Home';
import AboutUs from '@pages/AboutUs';
import Products from '@pages/Products';
import Categories from '@pages/Categories';
import Login from '@pages/Login';
import Signup from '@pages/Signup'
import ErrorPage from '@pages/ErrorPage';
import ShoppingCart from '@pages/ShoppingCart';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/about",
                element: <AboutUs />,
            },
            {
                path: "/cart",
                element: <ShoppingCart />,
            },
            {
                path: "/categories/products/:prefix",
                element: <Products />,
                loader: productsLoader,
            },
            {
                path: "/categories",
                element: <Categories />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ]
    }
]);
export default function AppRouter() {
    return <RouterProvider router={router} />
}
