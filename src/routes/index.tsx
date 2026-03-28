import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';

// routes
import MainRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
// sample page routing

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
    [
        MainRoutes,
        {
            path: '/',
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [
                // {
                //     path: '/',
                //     element: <HomePage />
                // }
                { ...PrivateRoutes }
            ]
        },
        AuthenticationRoutes,
        LoginRoutes
    ],
    {
        basename: import.meta.env.VITE_APP_BASE_NAME
    }
);
export default router;
