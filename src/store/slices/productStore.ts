import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    apiHomeProducts,
    apiProductDetail,
    apiGetWishlist,
    apiAddWishlist,
    apiRemoveWishlist,
    apiNotification,
    apiBannerDetails
} from 'api/ProductApi';

import ProductModel from 'types/products/ProductModel';

export type FavoritesModel = {
    name: string;
    price: string;
    salePrice: string;
};

export type homeProductsModel = {
    isLoading: boolean;
    isSuccess: boolean;
    featuredProducts: ProductModel[];
    hotDealsProducts: ProductModel[];
    discountProducts: ProductModel[];
};

export interface storeModel {
    store: any;
    products: homeProductsModel;
    userFavorites: FavoritesModel[];
    notifications: Array<[]>;
    banners: { slides: Array<[]>; isLoading: boolean; isSuccess: boolean };
    productDetail: {
        isLoading: boolean;
        isSuccess: boolean;
        details: { name?: string };
    };
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

const initialState: storeModel = {
    products: {
        isLoading: false,
        isSuccess: false,
        featuredProducts: [],
        hotDealsProducts: []
    },
    store: {},
    productDetail: {
        isLoading: false,
        isSuccess: false,
        details: {}
    },
    userFavorites: [],
    notifications: [],
    banners: {
        isLoading: false,
        isSuccess: false,
        slides: []
    },
    isLoading: false,
    isSuccess: true,
    isError: false
};

export const homeProducts = createAsyncThunk('productStore', async () => {
    return await apiHomeProducts();
});

export const productsDetail = createAsyncThunk('productDetail', async (name: string) => {
    return await apiProductDetail(name);
});
export const wishlistList = createAsyncThunk('wishlistList', async () => {
    return await apiGetWishlist();
});
export const wishlistAdd = createAsyncThunk('wishlistAdd', async (name: string) => {
    return await apiAddWishlist(name);
});
export const wishlistRemove = createAsyncThunk('wishlistRemove', async (name: string) => {
    return await apiRemoveWishlist(name);
});

export const getNotification = createAsyncThunk('notification', async () => {
    return await apiNotification();
});
export const getBannerDetails = createAsyncThunk('bannerDetails', async () => {
    return await apiBannerDetails();
});

const productStore = createSlice({
    name: 'productStore',
    initialState,
    reducers: {
        setVenueId: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers(builder): void {
        builder.addCase(homeProducts.pending, (state) => {
            state.products.isLoading = true;
            state.products.isSuccess = false;
            console.log('homeProducts.pening');
        });
        builder.addCase(homeProducts.fulfilled, (state, action: any) => {
            // state.products.isLoading = false;
            // state.products.isSuccess = true;
            state.products = { ...tranformPHomeproducts(action.payload), isLoading: false, isSuccess: true };
            console.log('homeProducts.success');
        });
        builder.addCase(homeProducts.rejected, (state) => {
            state.products.isLoading = false;
            state.products.isSuccess = false;
            state.isError = true;
            // state.errorMessage = action.payload;
        });
        builder.addCase(productsDetail.pending, (state) => {
            state.productDetail.isLoading = true;
            state.productDetail.isSuccess = false;
            state.productDetail.details = {};
            console.log('productsDetail.pening');
        });
        builder.addCase(productsDetail.fulfilled, (state, action: any) => {
            state.productDetail.isSuccess = true;
            state.productDetail.isLoading = false;
            state.productDetail.details = action.payload;
            console.log('productsDetail.success');
        });
        builder.addCase(productsDetail.rejected, (state) => {
            state.productDetail.isLoading = false;
            // state.productDetail.isError = true;
            state.productDetail.isSuccess = false;
            state.productDetail.details = {};
            // state.errorMessage = action.payload;
            console.log('productsDetail.failed');
        });
        builder.addCase(wishlistAdd.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.userFavorites = [];
            console.log('wishlistAdd.pening');
        });
        builder.addCase(wishlistAdd.fulfilled, (state, action: any) => {
            console.log(action.payload, 'action.payload');
            state.isSuccess = true;
            state.isLoading = false;
            state.userFavorites = action.payload;
            console.log('wishlistAdd.success');
        });
        builder.addCase(wishlistAdd.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.userFavorites = [];
            console.log('wishlistAdd.rejected');
            // state.errorMessage = action.payload;
        });
        builder.addCase(wishlistList.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.userFavorites = [];
            console.log('wishlistList.pening');
        });
        builder.addCase(wishlistList.fulfilled, (state, action: any) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.userFavorites = action.payload;
            console.log('wishlistList.success');
        });
        builder.addCase(wishlistList.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.userFavorites = [];
            // state.errorMessage = action.payload;
            console.log('wishlistList.failed');
        });
        builder.addCase(wishlistRemove.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.userFavorites = [];
            console.log('wishlistList.pening');
        });
        builder.addCase(wishlistRemove.fulfilled, (state, action: any) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.userFavorites = action.payload;
            console.log('wishlistList.success');
        });
        builder.addCase(wishlistRemove.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.userFavorites = [];
            // state.errorMessage = action.payload;
            console.log('wishlistList.failed');
        });
        builder.addCase(getNotification.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.notifications = [];
            console.log('notifications.pening');
        });
        builder.addCase(getNotification.fulfilled, (state, action: any) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.notifications = action.payload;
            console.log('notifications.success');
        });
        builder.addCase(getNotification.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.notifications = [];
            // state.errorMessage = action.payload;
            console.log('notifications.failed');
        });
        builder.addCase(getBannerDetails.pending, (state) => {
            state.banners.isLoading = true;
            state.banners.isSuccess = false;
            state.banners.slides = [];
            console.log('getBannerDetails.pening');
        });
        builder.addCase(getBannerDetails.fulfilled, (state, action: any) => {
            state.banners.isSuccess = true;
            state.banners.isLoading = false;
            state.banners.slides = action.payload;
            console.log('getBannerDetails.success');
        });
        builder.addCase(getBannerDetails.rejected, (state) => {
            state.banners.isLoading = false;
            state.isError = true;
            state.banners.slides = [];
            // state.errorMessage = action.payload;
            console.log('getBannerDetails.failed');
        });
    }
});

const tranformPHomeproducts = (
    products: ProductModel
): Pick<homeProductsModel, 'featuredProducts' | 'hotDealsProducts' | 'discountProducts'> => {
    const convertedData = products.reduce((acc, category) => {
        if (category.categoryName) {
            const catName = category.categoryName.replace(/ /g, '');
            acc[catName] = category.products;
        }
        //debugger;
        return acc;
    }, {});

    return convertedData;
};
export const { setVenueId } = productStore.actions;
export const storeSliceReducer = productStore.reducer;
