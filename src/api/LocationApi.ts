import { EnqueueSnackbar } from 'notistack';
import axios from 'utils/axios-auth';
/*
 * Get Game Category Events.
 */

// : Promise<null | Array<ProductModel>>
export const getCountryList = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null) => {
    try {
        const result = await axios.get(`api/v1/locations/countries`);
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

export const getStateList = async (country: string, errorEnqueueSnackbar: null | EnqueueSnackbar = null) => {
    try {
        const result = await axios.get(`api/v1/locations/statesByCountry/${country}`);
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

export const getCityList = async (state: string, errorEnqueueSnackbar: null | EnqueueSnackbar = null) => {
    try {
        const result = await axios.get(`api/v1/locations/citiesByState/${state}`);
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
