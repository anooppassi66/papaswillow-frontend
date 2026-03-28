import { EnqueueSnackbar } from 'notistack';
import GameModel from 'types/GameModel';
import axios from 'utils/axios';
/*
 * Get Game Category Events.
 */
export const apiGetGamesByMenuCategory = async (
    menu: string,
    errorEnqueueSnackbar: null | EnqueueSnackbar = null
): Promise<null | Array<GameModel>> => {
    try {
        const result = await axios.get(`/games/menu/${menu}`);
        if (result.status === 200) {
            return result.data as Array<GameModel>;
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

export const getGamesData = async () => {
    const response = await axios.get(`games/home`);
    return { status: true, data: response };
};

export const fetchGameDetails = async (url: string) => {
    try {
        const response = await axios.get(`${url}`);
        return { status: true, data: response };
    } catch (err: any) {
        return { status: false, error: err.error };
    }
};
