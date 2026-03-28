import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import OrderListView from 'views/pages/Order/OrderListView';

const ProductsDetail = Loadable(lazy(() => import('views/pages/products/ProductsDetail')));
const ProductsList = Loadable(lazy(() => import('views/pages/products/ProductsList')));
const HomePage = Loadable(lazy(() => import('views/landing-page')));

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //
//dont use this
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/product/:name',
            element: <ProductsDetail />
        },
        {
            path: 'products/:searchBy/:categoryName',
            element: <ProductsList />
        },

        {
            path: '/tags/:tagName',
            element: <ProductsList />
        },
        {
            path: '/orderslist',
            element: <OrderListView />
        }
    ]
};

export default MainRoutes;
