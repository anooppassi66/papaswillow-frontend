import LocalStorageService from './LocalStorageService';
import axios from '../utils/axios';

export enum RACEINFO {
    RACING_CARD_DATA = 'raceinfo'
}

export enum Auth {
    AUTH_ACCESS_TOKEN = 'sessionid',
    AGE_CONSENT = 'ageconsent'
}

interface BetRulesDictionary<T> {
    [key: string]: T | BetRulesDictionary<T>;
}

//const BASE_URL = process.env.REACT_APP_RACING_API_URL;
const BASE_URL = import.meta.env.VITE_APP_API_URL;
const RACING_URL = import.meta.env.VITE_APP_RACING_API_URL;

const BET_RULES: BetRulesDictionary<object> = {
    win: {
        minRunners: 2,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    fowin: {
        minRunners: 2,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    vowin: {
        minRunners: 2,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    foshp: {
        minRunners: 2,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    foplc: {
        minRunners: 2,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    voplc: {
        minRunners: 2,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    shp: {
        minRunners: 3,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    thp: {
        minRunners: 4,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    plc: {
        minRunners: 4,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    shw: {
        minRunners: 4,
        bettingPos: 1,
        legs: 1,
        type: 'single'
    },
    for: {
        minRunners: 3,
        bettingPos: 2,
        legs: 1,
        type: 'single'
    },
    qui: {
        minRunners: 3,
        bettingPos: 2,
        legs: 1,
        type: 'single'
    },
    tan: {
        minRunners: 3,
        bettingPos: 3,
        legs: 1,
        type: 'single'
    },
    exa: {
        minRunners: 5,
        bettingPos: 4,
        legs: 1,
        type: 'single'
    }
};

for (let i = 1; i <= 15; i++) {
    BET_RULES['ddl' + i] = {
        minRunners: 2,
        bettingPos: 1,
        legs: 2,
        type: 'multi'
    };
    BET_RULES['trb' + i] = {
        minRunners: 2,
        bettingPos: 1,
        legs: 3,
        type: 'multi'
    };
    BET_RULES['mjp' + i] = {
        minRunners: 2,
        bettingPos: 1,
        legs: 4,
        type: 'multi'
    };
    BET_RULES['jpp' + i] = {
        minRunners: 2,
        bettingPos: 1,
        legs: 5,
        type: 'multi'
    };
    BET_RULES['jkp' + i] = {
        minRunners: 2,
        bettingPos: 1,
        legs: 5,
        type: 'multi'
    };
    BET_RULES['sjp' + i] = {
        minRunners: 2,
        bettingPos: 1,
        legs: 6,
        type: 'multi'
    };
    BET_RULES['wta' + i] = {
        minRunners: 2,
        bettingPos: 1,
        legs: 7,
        type: 'multi'
    };
}
export default class RacingService {
    public static getRaceData = async (id: string) => {
        const response = await axios.get(`${RACING_URL}racecard/${id}`);
        LocalStorageService.setItem(RACEINFO.RACING_CARD_DATA, JSON.stringify(response.data.body));
        return { status: true, data: response };
    };

    public static getAuthKey() {
        return Auth.AUTH_ACCESS_TOKEN;
    }

    public static submitBet = async (data: any) => {
        const response: any = await axios.post(`${BASE_URL}submitbet`, data);
        if (response.status === 'SUCCESS') {
            return { status: true, data: response.data };
        } else {
            return { status: false, data: response.error };
        }
    };

    public static getLocalRaceData = async () => {
        const response = await LocalStorageService.getItem(RACEINFO.RACING_CARD_DATA);
        return response;
    };

    public static getStreamData = async (id: string) => {
        const response = await axios.get(`${BASE_URL}stream/${id}`);
        return response;
    };

    public static submitOrder = async (order: any) => {
        const response = await axios.post(`${BASE_URL}submitbet`, order);
        return { status: true, data: response };
    };

    public static getSISStreamUrl = async (id: string) => {
        const response = await axios.get(`${BASE_URL}stream/sis/${id}`);
        return response;
    };

    public static getRaceEventList = async () => {
        const response = await axios.get(`${RACING_URL}events/active`);
        return { status: true, data: response };
    };

    public static getVenueDividendList = async (programId: string) => {
        const response = await axios.get(`${RACING_URL}racecard/${programId}`);
        return { status: true, data: response };
    };

    public static getPoolData = (poolName: string) => {
        return BET_RULES[poolName];
    };

    public static getTicketDetails = async (data: any) => {
        const response: any = await axios.post(`${BASE_URL}ticketdetails`, data);
        if (response.status === 'SUCCESS') {
            return { status: true, data: response.data };
        } else {
            return { status: false, data: response.error };
        }
    };
}
