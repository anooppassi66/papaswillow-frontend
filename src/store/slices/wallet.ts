import { createSlice } from '@reduxjs/toolkit';
interface IWallet {
    id: string;
    name: string;
    balance: number;
    currency: string;
    parentWalletId: string;
    type: string;
    typename: string;
    userId: string;
}

interface IWalletInfo {
    selectedUserWallet: IWallet;
    userWalletList: IWallet[];
}
interface userWallet {
    balance: number | undefined;
}
const initialState: userWallet = {
    balance: undefined
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setUserWallet(state, action) {
            state.balance = action.payload;
        }
    }
});
export const { setUserWallet } = walletSlice.actions;
export const walletReducer = walletSlice.reducer;
