import { EnqueueSnackbar } from 'notistack';
import ProductModel from 'types/products/ProductModel';
import axios from 'utils/axios';
import axios_auth from 'utils/axios-auth';
/*
 * Get Game Category Events.
 */
export const apiHomeProducts = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null | Array<ProductModel>> => {
    try {
        const result = await axios.get(`/api/v1/homeproducts`);
        if (result.status === 200) {
            console.log('result.data', result.data.data);
            return result.data.data as Array<ProductModel>;
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

export const apiProductDetail = async (
    productCode: string,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | Array<ProductModel>> => {
    try {
        const result = await axios.get(`/api/v1/product/details/${productCode}`);
        if (result.status === 200) {
            console.log('result.data', result.data.data);
            return result.data.data as Array<ProductModel>;
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

export const categoryProducts = async (searchBy: string, categoryName: string, filters: any) => {
    try {
        const response = await axios.post(`api/v1/categoryproduct/search?${searchBy}=${categoryName}`, {
            category: categoryName,
            filters
        }); // Adjust the API endpoint accordingly

        return response.data.data;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        throw error;
    }
};

export const productFilters = async (searchBy: string, categoryName: string) => {
    try {
        const response = await axios.get(`api/v1/productfilters/filters?${searchBy}=${categoryName}`); // Adjust the API endpoint accordingly

        return response.data.data;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        throw error;
    }
};

export const apiGetWishlist = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null | Array<ProductModel>> => {
    try {
        const result = await axios.get(`/api/v1/wishlist`);
        if (result.status === 200) {
            console.log('result.data fav', result.data.data);
            return result.data.data.favitems as Array<ProductModel>;
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

export const apiAddWishlist = async (
    name: string,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | Array<ProductModel>> => {
    try {
        const result = await axios.post(`/api/v1/wishlist`, { name });
        if (result.status === 201) {
            console.log('result.data', result.data.data);
            return result.data.data as Array<ProductModel>;
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

export const apiRemoveWishlist = async (
    productCode: string,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | Array<ProductModel>> => {
    try {
        const result = await axios.delete(`/api/v1/wishlist/item/${productCode}`);
        if (result.status === 201) {
            console.log('result.data', result.data.data);
            return result.data.data as Array<ProductModel>;
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

export const apiNotification = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null | Array<[]>> => {
    try {
        //http://localhost:8010/api/v1/notification
        const result = await axios_auth.get(`/api/v1/notification`);
        if (result.status === 200) {
            console.log('result.data', result.data.data);
            // debugger;
            return result.data.data as Array<[]>;
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

export const apiBannerDetails = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null | Array<[]>> => {
    try {
        const result = await axios_auth.get(`/api/v1/banners`);
        if (result.status === 200) {
            console.log('result.data', result.data.data);
            // debugger;
            return result.data.data as Array<[]>;
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
