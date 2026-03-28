// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import { walletReducer } from './slices/wallet';

import { storeSliceReducer } from './slices/productStore';
import { checkoutSliceReducer } from './slices/checkout';
import { locationSliceReducer } from './slices/locationStore';
import { addressSliceReducer } from './slices/addressStore';
import { ordersSliceSliceReducer } from './slices/orders';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    wallet: walletReducer,
    store: storeSliceReducer,
    checkout: checkoutSliceReducer,
    location: locationSliceReducer,
    address: addressSliceReducer,
    orders: ordersSliceSliceReducer
});

export default reducer;
