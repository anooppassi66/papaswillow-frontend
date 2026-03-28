// Lib
import axios from '../utils/axios';
import { EnqueueSnackbar } from 'notistack';

export type RaceCardBetType = 'ODD' | 'EVEN';
export type RaceYesNoType = 'Y' | 'N';

export type RaceBetType = {
    type: RaceCardBetType;
    poolName: string;
    runners: number;
    startTime: string;
    //
    venueId: string | number;
    venueName: string; ///
    programId: string | number;
    eventId: string | number;
    eventName: string; ///
    //
    userId: string;
    sessionId: string;
    amount: number;
    currency: string;
};

export type EventRunnerType = {
    id: number;
    horseName: string;
    jockeyName: string;
    scratchStatus: RaceYesNoType;
    betStatus: RaceYesNoType;
    stats: null | Array<number>;
    jerseyUrl: null | string;
    drawNumber: null | string;
};

interface EventType {
    id: string;
    programId: number;
    eventId: string;
    name: string;
    startTime: string;
    currentFlag: RaceYesNoType;
    startBetFlag: RaceYesNoType;
    stopBetFlag: RaceYesNoType;
    releaseDividendFlag: RaceYesNoType;
    whiteConeHoistedFlag: null | string;
    runners: null | Array<EventRunnerType>;
    activeRunners: string;
    withDrawals: string;
    nonStarters: string;
    number: null | string;
}

interface VenueType {
    venueId: number;
    venueCode: string;
    venueName: string;
    venueStatus: RaceYesNoType;
    programId: number;
    programName: string;
    programStatus: RaceYesNoType;
    displayOrder: string;
    showCard: RaceYesNoType;
    streamUrl: null | string;
    events?: null | Array<EventType>;
}

type RaceCardsGroupType = {
    date: string;
    venues: Array<VenueType>;
};

export interface RaceEventType extends VenueType, EventType {
    eventStatus?: string;
    eventResult?: string;
    winnerOdds?: string;
    odds?: any;
}

/*
 * Fetch Race Cards from external server to display user
 */
export const apiGetSportEventModels = async (
    sportType: string,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | Array<RaceEventType>> => {
    try {
        const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/provider/na/events/${sportType}`);
        if (result.status === 200) {
            return result.data as Array<RaceEventType>;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};

/*
 * Fetch Race Cards from external server to display user
 */
export const apiGetTote = async (toteId: string, errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null | any> => {
    try {
        const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}tote/${toteId}`);
        if (result.status === 200) {
            //return result.data as ToteModel;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};

/*
 * Fetch Race Cards from external server to display user
 */
export const apiPlaceRaceCardBet = async (
    programId: string | number,
    eventId: string | number,
    body: RaceBetType,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | any> => {
    try {
        //
        const timestamp = Date.now();
        const result = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/provider/na/debit`,
            Object.assign(
                {
                    betId: timestamp,
                    transactionId: timestamp
                },
                body
            )
        );
        if (result.status === 200) {
            return result.data;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};

/*
 * Fetch Race Cards from external server to display user
 */
export const apiPlaceRaceCardBetX = async (
    programId: number,
    eventId: number,
    body: RaceBetType,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | RaceCardsGroupType> => {
    try {
        //
        const result = await axios.post(`https://dev-admin.arionplay.com/na-api/api/program/${programId}/event/${eventId}/bet`, body);
        if (result.status === 200) {
            return result.data as RaceCardsGroupType;
        } else {
            console.error(`Not a 200 OK, but ${result.status}`);
        }
    } catch (error: any) {
        console.error(error);
        if (errorEnqueueSnackbar) {
            errorEnqueueSnackbar(`${error.message}: ${error.response?.data?.error || 'n/a'}`, {
                variant: 'error',
                autoHideDuration: 1000
            });
        }
    }
    return null;
};
