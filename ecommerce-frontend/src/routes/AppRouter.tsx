import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// Loaders
import { productsLoader } from '@loaders/productsLoader';

//Lotties Handler
import { LottiesHandler } from '@components/feedback';

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
        element: <Suspense
            fallback={<div style={{ marginTop: "10%" }}>
                <LottiesHandler type="loading" message="Loading please wait..." />
            </div>}>
            <MainLayout />
        </Suspense>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<LottiesHandler type="loading" message="Loading..." />}><Home /></Suspense>,
            },
            {
                path: "/about",
                element: <Suspense fallback={<LottiesHandler type="loading" message="Loading..." />}><AboutUs /></Suspense>,
            },
            {
                path: "/cart",
                element: <Suspense fallback={<LottiesHandler type="loading" message="Loading..." />}><ShoppingCart /></Suspense>,
            },
            {
                path: "/categories/products/:prefix",
                element: <Suspense fallback={<LottiesHandler type="loading" message="Loading..." />}><Products /></Suspense>,
                loader: productsLoader,
            },
            {
                path: "/categories",
                element: <Suspense fallback={<LottiesHandler type="loading" message="Loading..." />}><Categories /></Suspense>,
            },
            {
                path: "/login",
                element: <Suspense fallback={<LottiesHandler type="loading" message="Loading..." />}><Login /></Suspense>,
            },
            {
                path: "/signup",
                element: <Suspense fallback={<LottiesHandler type="loading" message="Loading..." />}><Signup /></Suspense>,
            },
            {
                path: "/wishlist",
                element: <Suspense fallback={<LottiesHandler type="loading" message="Loading..." />}><Wishlist /></Suspense>,
            }
        ]
    }
]);
export default function AppRouter() {
    return <RouterProvider router={router} />
}
