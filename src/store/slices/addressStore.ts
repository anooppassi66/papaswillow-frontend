import { AddressModel } from 'store/slices/addressStore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addAddressApi, getAddressListApi } from 'api/AddressApi';

export interface AddressModel {
    id?: string;
    city: string;
    state: string;
    address: string;
    zipCode: string;
    country: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isDefault?: boolean;
}

export interface AddressStoreModel {
    addressList: AddressModel[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

const initialState: AddressStoreModel = {
    addressList: [],
    isLoading: false,
    isSuccess: true,
    isError: false
};

export const getAddressList = createAsyncThunk('getAddressList', async () => {
    return await getAddressListApi();
});
export const addAddress = createAsyncThunk('addAddressList', async (address: AddressModel) => {
    return await addAddressApi(address);
});

const locationStore = createSlice({
    name: 'addressStore',
    initialState,
    reducers: {
        // setVenueId: (state, action) => {
        //     state.isLoading = action.payload;
        // }
    },
    extraReducers(builder): void {
        builder.addCase(getAddressList.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.addressList = [];
            console.log('getAddressList.pening');
        });
        builder.addCase(getAddressList.fulfilled, (state, action: any) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.addressList = action.payload;
            console.log('getAddressList.success');
        });
        builder.addCase(getAddressList.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.addressList = [];
            // state.errorMessage = action.payload;
        });
        builder.addCase(addAddress.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            // state.addressList = [];
            console.log('addAddress.pening');
        });
        builder.addCase(addAddress.fulfilled, (state, action: any) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.addressList = formatAddress(action.payload);
            console.log('addAddress.success');
        });
        builder.addCase(addAddress.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            // state.addressList = [];
            // state.errorMessage = action.payload;
        });
    }
});
const formatAddress = (payload: any) => {
    return payload.userAdresses.map((address: any) => {
        address.isDefault = address.id === payload.data.id;
        return address;
    });
};
// export const { setVenueId } = locationStore.actions;
export const addressSliceReducer = locationStore.reducer;
