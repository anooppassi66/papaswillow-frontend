import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import RacingService from 'services/RacingService';

interface IStream {
    provider?: string;
    programId?: string;
    venueCode?: string;
    iframeFlag: string;
    streamId?: string;
    streamUrl: string;
    message: string;
    isPaid: boolean;
    player?: string;
}

interface IRaceInfo {
    data?: any;
    venueId?: number;
    raceNumber?: number;
    positionsForSelectedPool?: number;
    legsForSelectedPool?: number;
    poolName?: number;
    isLoading: boolean;
    isSuccess?: boolean;
    raceCardEventChange?: number;
    raceCardChange?: number;
    isError?: boolean;
    errorMessage?: any;
    raceStreamData: IStream | undefined;
}

const initialState: IRaceInfo = {
    data: undefined,
    venueId: undefined,
    raceNumber: undefined,
    poolName: undefined,
    isLoading: false,
    isSuccess: undefined,
    isError: undefined,
    errorMessage: undefined,
    positionsForSelectedPool: 1,
    legsForSelectedPool: 1,
    raceCardEventChange: 1,
    raceCardChange: 0,
    raceStreamData: undefined
};

export const getRacingData = createAsyncThunk('racing/card', async (id: string) => {
    try {
        const response = await RacingService.getRaceData(id);
        return response;
    } catch (error) {
        //return thunkAPI.rejectWithValue(error);
    }
});

const racecardSlice = createSlice({
    name: 'raceinfo',
    initialState,
    reducers: {
        setVenueId: (state, action) => {
            state.venueId = action.payload;
        },
        setRaceNumber: (state, action) => {
            state.raceNumber = action.payload;
        },
        setRaceStreamData: (state, action) => {
            state.raceStreamData = action.payload;
        },
        setPoolName: (state, action) => {
            state.poolName = action.payload;
        },
        setRaceCardEventChage: (state) => {
            if (state.raceCardEventChange) state.raceCardEventChange += 1;
        },
        setRaceCardChange: (state) => {
            if (state.raceCardChange) state.raceCardChange += 1;
        },
        setPositionsForSelectedPool: (state, action) => {
            state.positionsForSelectedPool = action.payload;
        },
        setLegsForSelectedPool: (state, action) => {
            state.legsForSelectedPool = action.payload;
        }
    },
    extraReducers(builder): void {
        builder.addCase(getRacingData.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
        });
        builder.addCase(getRacingData.fulfilled, (state, action: any) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getRacingData.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            // state.errorMessage = action.payload;
        });
    }
});
export const {
    setPositionsForSelectedPool,
    setPoolName,
    setRaceNumber,
    setVenueId,
    setLegsForSelectedPool,
    setRaceCardChange,
    setRaceStreamData,
    setRaceCardEventChage
} = racecardSlice.actions;
export const racecardReducer = racecardSlice.reducer;
