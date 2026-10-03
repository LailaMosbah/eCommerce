import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// Loaders
import { productsLoader } from '@loaders/productsLoader';

// Layouts
const MainLayout = lazy(() => import('@layouts/MainLayout/MainLayout'));

// Pages
const Home = lazy(() => import('@pages/Home'));
const AboutUs = lazy(() => import('@pages/AboutUs'));
const Products = lazy(() => import('@pages/Products'));
const Categories = lazy(() => import('@pages/Categories'));
const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));
const ErrorPage = lazy(() => import('@pages/ErrorPage'));
const ShoppingCart = lazy(() => import('@pages/ShoppingCart'));
const Wishlist = lazy(() => import('@pages/Wishlist'));


const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<div>Loading...</div>}><MainLayout /></Suspense>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>,
            },
            {
                path: "/about",
                element: <Suspense fallback={<div>Loading...</div>}><AboutUs /></Suspense>,
            },
            {
                path: "/cart",
                element: <Suspense fallback={<div>Loading...</div>}><ShoppingCart /></Suspense>,
            },
            {
                path: "/categories/products/:prefix",
                element: <Suspense fallback={<div>Loading...</div>}><Products /></Suspense>,
                loader: productsLoader,
            },
            {
                path: "/categories",
                element: <Suspense fallback={<div>Loading...</div>}><Categories /></Suspense>,
            },
            {
                path: "/login",
                element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
            },
            {
                path: "/signup",
                element: <Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>,
            },
            {
                path: "/wishlist",
                element: <Suspense fallback={<div>Loading...</div>}><Wishlist /></Suspense>,
            }
        ]
    }
]);
export default function AppRouter() {
    return <RouterProvider router={router} />
}
