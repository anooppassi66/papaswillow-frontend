import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCountryList as getCountryListApi, getStateList as getStateListApi, getCityList as getCityListAPi } from 'api/LocationApi';

export interface LocationeModel {
    country: [];
    state: [];
    city: [];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

const initialState: LocationeModel = {
    country: [],
    state: [],
    city: [],
    isLoading: false,
    isSuccess: true,
    isError: false
};

export const getCountryList = createAsyncThunk('getCountryList', async () => {
    return await getCountryListApi();
});
export const getStateList = createAsyncThunk('getStateList', async (country: string) => {
    return await getStateListApi(country);
});
export const getCityList = createAsyncThunk('getCityList', async (state: string) => {
    return await getCityListAPi(state);
});

const locationStore = createSlice({
    name: 'locationStore',
    initialState,
    reducers: {
        // setVenueId: (state, action) => {
        //     state.isLoading = action.payload;
        // }
    },
    extraReducers(builder): void {
        builder.addCase(getCountryList.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.country = [];
            state.state = [];
            state.city = [];
            console.log('getCountryList.pening');
        });
        builder.addCase(getCountryList.fulfilled, (state, action: any) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.country = action.payload;
            console.log('getCountryList.success');
        });
        builder.addCase(getCountryList.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.country = [];
            state.state = [];
            state.city = [];
            // state.errorMessage = action.payload;
        });

        builder.addCase(getStateList.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;

            state.state = [];
            state.city = [];
            console.log('productsDetail.pening');
        });
        builder.addCase(getStateList.fulfilled, (state, action: any) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.state = action.payload;
            console.log('productsDetail.success');
        });
        builder.addCase(getStateList.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.state = [];
            state.city = [];

            // state.errorMessage = action.payload;
        });

        builder.addCase(getCityList.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.city = [];
            console.log('wishlistAdd.pening');
        });
        builder.addCase(getCityList.fulfilled, (state, action: any) => {
            console.log(action.payload, 'action.payload');
            state.isSuccess = true;
            state.isLoading = false;
            state.city = action.payload;
            console.log('wishlistAdd.success');
        });
        builder.addCase(getCityList.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.city = [];
            console.log('wishlistAdd.rejected');
            // state.errorMessage = action.payload;
        });
    }
});
// export const { setVenueId } = locationStore.actions;
export const locationSliceReducer = locationStore.reducer;
