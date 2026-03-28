import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiOrders } from 'api/CartApi';

import ProductModel from 'types/products/ProductModel';

// Item in the cart
export interface CartItem extends ProductModel {
    quantity?: number;
    productTotal?: number;
}

// Address details
interface AddressModel {
    street: string;
    city: string;
    state: string;
    address: string;
    zipCode: string;
    country: string;
}

// Shipping method
interface ShippingMethod {
    id: string;
    name: string;
    cost: number;
    estimatedDelivery: string;
}

// Payment information
interface PaymentInfo {
    method: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    paypalEmail?: string;
}

export interface Coupon {
    couponCode: string;
    couponType: string;
    couponOptions: string;
    couponValue: string;
}

// checkout model
export interface checkoutModel {
    Orders: any;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

const initialState: checkoutModel = {
    Orders: [],
    isLoading: false,
    isSuccess: false,
    isError: false
};

export const orders = createAsyncThunk<any, any>('orders/get', async () => {
    try {
        const result = await apiOrders();
        if (result) {
            return result; // Assuming apiAddProductsToCart returns an array of CartItem or null
        } else {
            throw new Error('Failed to add products to cart');
        }
    } catch (error) {
        // Handle error cases here
        throw error;
    }
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers(builder): void {
        builder.addCase(orders.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            console.log('addProductsToCartApi.pening');
        });
        builder.addCase(orders.fulfilled, (state, action: any) => {
            // debugger;
            console.log(action, 'action.payload');
            state.isSuccess = true;
            state.isLoading = false;
            state.Orders = action.payload;
            console.log('addProductsToCartApi.success');
        });
        builder.addCase(orders.rejected, (state) => {
            console.log('action.failed');
            state.isLoading = false;
            state.isError = true;
            // state.errorMessage = action.payload;
        });
    }
});

// export const {} = checkoutSlice.actions;
export const ordersSliceSliceReducer = ordersSlice.reducer;
