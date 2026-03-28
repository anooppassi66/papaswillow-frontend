import { AddressModel } from './../store/slices/addressStore';
import { EnqueueSnackbar } from 'notistack';
import axios from 'utils/axios-cart';
/*
 * Get Game Category Events.
 */

// : Promise<null | Array<ProductModel>>
export const getAddressListApi = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null) => {
    try {
        const result = await axios.get(`api/v1/cart/address`);
        if (result.status === 200) {
            console.log('result.data', result.data.data);
            // return result.data.data as Array<ProductModel>;
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

export const addAddressApi = async (address: AddressModel, errorEnqueueSnackbar: null | EnqueueSnackbar = null) => {
    try {
        const result = await axios.post(`api/v1/cart/address`, address);
        if (result.status === 201) {
            return result.data;
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
export const deleteAddressApi = async (addressId: string, errorEnqueueSnackbar: null | EnqueueSnackbar = null) => {
    try {
        const result = await axios.delete(`api/v1/cart/address/${addressId}`);
        if (result.status === 200) {
            console.log('result.data', result.data.data.data);
            // return result.data.data as Array<ProductModel>;
            return result.data.data.data;
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
