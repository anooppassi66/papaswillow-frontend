import { checkoutModel } from 'store/slices/checkout';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiAddProductsToCart, apiGetProductsFromCart, apiApplyCoupon, deleteProductToCart, apiSubmitOrder, apiOrders } from 'api/CartApi';

import ProductModel from 'types/products/ProductModel';

// Item in the cart
export interface CartItem extends ProductModel {
    quantity?: number;
    productTotal?: number;
    variant?: any;
    cartId?: any;
    content?: string;
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
    CartItems: CartItem[];
    tax : number;
    PaymentInfo: PaymentInfo | null;
    ShippingMethod: ShippingMethod | null;
    Address: AddressModel | null;
    couponCode?: string | null;
    couponApplied?: boolean;
    couponData: Coupon | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

const initialState: checkoutModel = {
    Orders: [],
    CartItems: [],
    tax : 7,
    PaymentInfo: null,
    Address: null,
    couponData: {
        couponOptions: '',
        couponValue: '',
        couponCode: '',
        couponType: ''
    },
    isLoading: false,
    isSuccess: false,
    isError: false
};

interface CouponResponse {
    // Define the structure of the response you expect from apiApplyCoupon
    cartItems: CartItem[];
    // Add any other fields you expect
}

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

export const addProductsToCartApi = createAsyncThunk<Array<CartItem>, Pick<CartItem, 'name' | 'quantity' | 'variant' | 'cartId'>>(
    'checkout/addProductsToCartApi',
    async (item: Pick<CartItem, 'name' | 'quantity' | 'variant'>) => {
        try {
            const result = await apiAddProductsToCart(item);
            if (result) {
                return result; // Assuming apiAddProductsToCart returns an array of CartItem or null
            } else {
                throw new Error('Failed to add products to cart');
            }
        } catch (error) {
            // Handle error cases here
            throw error;
        }
    }
);
export const deleteProductsToCartApi = createAsyncThunk<Array<CartItem>, Pick<CartItem, 'cartId'>>(
    'checkout/deleteProductsToCartApi',
    async (item: Pick<CartItem, 'cartId'>) => {
        try {
            const result = await deleteProductToCart({ cartId: item.cartId });
            if (result) {
                return result; // Assuming apiAddProductsToCart returns an array of CartItem or null
            } else {
                throw new Error('Failed to add products to cart');
            }
        } catch (error) {
            // Handle error cases here
            throw error;
        }
    }
);
export const productsFromCartApi = createAsyncThunk<Array<CartItem>>('checkout/productsFromCartApi', async () => {
    try {
        const result = await apiGetProductsFromCart();

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

export const applyCouponApi = createAsyncThunk<CouponResponse, string>(
    'checkout/applyCouponApi',
    async (couponCode, { rejectWithValue }) => {
        try {
            const result = await apiApplyCoupon(couponCode);

            if (result) {
                return result as CouponResponse; // Assuming apiApplyCoupon returns a response of type CouponResponse
            } else {
                throw new Error('Failed to apply coupon');
            }
        } catch (error) {
            // Narrow down the type of error
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('Unknown error occurred while applying coupon');
            }
        }
    }
);

export const submitOrder = createAsyncThunk<any, any>('checkout/submitOrder', async (checkout) => {
    try {
        const result = await apiSubmitOrder(checkout);
        console.log(result, 'order');
        if (result) {
            return result;
        } else {
            throw new Error('Failed to submit order');
        }
    } catch (error) {
        throw error;
    }
});
const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addAddressToCart: (state, action) => {
            state.Address = action.payload;
        }
    },
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
        builder.addCase(addProductsToCartApi.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            console.log('addProductsToCartApi.pening');
        });
        builder.addCase(addProductsToCartApi.fulfilled, (state, action: any) => {
            // debugger;
            console.log(action, 'action.payload');
            state.isSuccess = true;
            state.isLoading = false;
            state.CartItems = filterProductData(action.payload);
            console.log('addProductsToCartApi.success');
        });
        builder.addCase(addProductsToCartApi.rejected, (state) => {
            console.log('action.failed');
            state.isLoading = false;
            state.isError = true;
            // state.errorMessage = action.payload;
        });
        builder.addCase(productsFromCartApi.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            console.log('productsFromCartApi.pening');
        });
        builder.addCase(productsFromCartApi.fulfilled, (state, action: any) => {
            console.log(action.payload, 'action.payload');
            // debugger;
            state.isSuccess = true;
            state.isLoading = false;
            state.CartItems = filterProductData(action.payload.data.items);
            console.log('productsFromCartApi.success');
        });
        builder.addCase(productsFromCartApi.rejected, (state) => {
            console.log('productsFromCartApi.failed');
            state.isLoading = false;
            state.isError = true;
            // state.errorMessage = action.payload;
        });
        builder.addCase(deleteProductsToCartApi.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            console.log('deleteProductsToCartApi.pening');
        });
        builder.addCase(deleteProductsToCartApi.fulfilled, (state, action: any) => {
            console.log(action.payload, 'action.payload');
            state.isSuccess = true;
            state.isLoading = false;
            state.CartItems = filterProductData(action.payload);
            console.log('deleteProductsToCartApi.success');
        });
        builder.addCase(deleteProductsToCartApi.rejected, (state) => {
            console.log('deleteProductsToCartApi.failed');
            state.isLoading = false;
            state.isError = true;
            // state.errorMessage = action.payload;
        });

        // Coupon
        builder.addCase(applyCouponApi.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            console.log('deleteProductsToCartApi.pening');
        });
        builder.addCase(applyCouponApi.fulfilled, (state, action: PayloadAction<CouponResponse>) => {
            state.couponApplied = true;
            state.isSuccess = true;
            state.isLoading = false;
            state.couponData = action.payload;
        });
        builder.addCase(applyCouponApi.rejected, (state, action) => {
            state.isError = true; // Access the custom error message from rejectWithValue
            state.isLoading = false;
        });
    }
});

const filterProductData = (products: any): CartItem[] => {
    // console.log(item, 'item fff');
    // products.map(({ product : { id ,name,salePrice,price,image,images}}) => return {

    //     return {id ,name,salePrice,price,image,images}
    // });
    // return item;
    // debugger;
    return products.map((product: any) => {
        const {
            quantity,
            id: cartId,
            Product: { id, name, content, salePrice, price, image, attributesData }
        } = product;
        return { id, name, salePrice, content, price, image, quantity, cartId, attributesData };
    });
};

// const updateCartItems = (cartItems: CartItem[], item: CartItem) => {
//     const itemExists = cartItems.some((cartItem) => cartItem.name === item.name);

//     // remove if user sets quntity 0
//     if (itemExists && item.quantity === 0) {
//         return cartItems.filter((cartItem) => cartItem.name !== item.name);
//     }

//     if (itemExists) {
//         return cartItems.map((cartItem) => {
//             if (cartItem.name === item.name) {
//                 // if quantity sent then set direct to cart quantity or else incement 1
//                 return { ...cartItem, quantity: item.quantity || (cartItem.quantity && cartItem.quantity + 1) };
//             }
//             return cartItem;
//         });
//     } else {
//         // Item does not exist in the cart, add it as a new item
//         return [...cartItems, { ...item, quantity: item.quantity || 1 }];
//     }
// };

export const { addAddressToCart } = checkoutSlice.actions;
export const checkoutSliceReducer = checkoutSlice.reducer;
