import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import OrderView from 'views/pages/Order/OrderView';
import OrderListView from 'views/pages/Order/OrderListView';
import BillingAddress from 'views/pages/cart/BillingAddress';
import AddressBook from 'views/pages/address/AddressBook';
import Accountsettings from 'views/pages/cart/Accountsettings';

const Checkout = Loadable(lazy(() => import('views/pages/cart/Checkout')));
const Cart = Loadable(lazy(() => import('views/pages/cart')));
const Wishlist = Loadable(lazy(() => import('views/pages/Wishlist')));
const ConfirmationPage = Loadable(lazy(() => import('views/pages/cart/ConfirmationPage')));
const PaymentCallback = Loadable(lazy(() => import('views/pages/cart/PaymentCallback')));

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //
//dont use this
const PrivateRoutes = {
    children: [
        {
            path: '/cart',
            element: <Cart />
        },
        {
            path: '/address-book',
            element: <AddressBook />
        },
        {
            path: '/wishlist',
            element: <Wishlist />
        },
        {
            path: '/checkout',
            element: <Checkout />
        },
        {
            path: '/orders',
            element: <OrderView />
        },
        {
            path: '/order/:orderId',
            element: <OrderListView />
        },

        {
            path: '/stripe-success',
            element: <PaymentCallback />
        },
        {
            path: '/orderConfirmation/:orderId',
            element: <ConfirmationPage />
        },
        {
            path: '/accountsettings',
            element: <Accountsettings />
        }
    ]
};

export default PrivateRoutes;
