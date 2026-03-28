import { EnqueueSnackbar } from 'notistack';
import { CartItem } from 'store/slices/checkout';

import axiosCartServices from 'utils/axios-cart';
/*
 * Get Game Category Events.
 */

export const apiOrders = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null> => {
    try {
        const result = await axiosCartServices.get(`/api/v1/orders`);
        console.log(result, 'result.status');
        if (result.status === 200) {
            console.log('result.data', result.data.data);
            return result.data.data as Array<CartItem>;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error?.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};

export const apiSubmitOrder = async (checkout: any, errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null> => {
    try {
        const result = await axiosCartServices.post(`/api/v1/cart/checkout`, checkout);
        console.log(result, 'result.status');
        if (result.status === 201) {
            console.log('result.data', result.data.data);
            return { status: 200, data: result.data.data as Array<CartItem> };
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        // return { status: 200, data: result.data.data as Array<CartItem> };
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error?.message}: ${error.response?.data?.message || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
        return { status: 400, message: error.response?.data?.message };
    }
    return null;
};

export const apiAddProductsToCart = async (
    item: Pick<CartItem, 'id' | 'quantity' | 'variant'>,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | Array<CartItem>> => {
    try {
        let result = '';

        if (item?.cartId) result = await axiosCartServices.put(`/api/v1/cart`, item);
        else result = await axiosCartServices.post(`/api/v1/cart`, item);
        console.log(result, 'result.status');
        if (result.status === 201) {
            console.log('result.data', result.data.data);
            return result.data.data as Array<CartItem>;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error?.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};

export const apiGetProductsFromCart = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null | Array<CartItem>> => {
    try {
        const result = await axiosCartServices.get(`/api/v1/cart`);
        if (result.status === 200) {
            console.log('result.data', result.data);
            return result.data as Array<CartItem>;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error?.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};

export const deleteProductToCart = async (
    item: Pick<CartItem, 'cartId'>,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | Array<CartItem>> => {
    try {
        // debugger;
        const result = await axiosCartServices.delete(`/api/v1/cart/item/${item.cartId}`);

        console.log(result, 'result.status');
        if (result.status === 201) {
            console.log('result.data', result.data.data);
            return result.data.data as Array<CartItem>;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error?.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};

export const apiApplyCoupon = async (couponCode: string, errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<any> => {
    try {
        const result = await axiosCartServices.post(`/api/v1/cart/coupon`, { couponCode });
        console.log(result, 'result.status');
        if (result.status === 201) {
            console.log('result.data', result.data.data);
            return result.data.data;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error?.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};

// export const getGamesData = async () => {
//     const response = await axios.get(`games/home`);
//     return { status: true, data: response };
// };

// export const fetchGameDetails = async (url: string) => {
//     try {
//         const response = await axios.get(`${url}`);
//         return { status: true, data: response };
//     } catch (err: any) {
//         return { status: false, error: err.error };
//     }
// };
