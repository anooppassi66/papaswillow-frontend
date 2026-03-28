import axios from 'utils/axios';
import { EnqueueSnackbar } from 'notistack';
import UserModel from 'models/UserModel';
/*
 * Get Game Category Events.
 */

export const getMyWallets = async () => {
    try {
        const response = await axios.get(`user/wallets`);
        return { status: true, data: response };
    } catch (err: any) {
        return { status: false, error: err.error };
    }
};

/*
 * Get Game Category Events.
 */
export const apiGetCurrentUser = async (errorEnqueueSnackbar: null | EnqueueSnackbar = null): Promise<null | UserModel> => {
    try {
        const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user`);
        if (result.status === 200) {
            // TODO Just in case - add user to a context always when called?
            return result.data as UserModel;
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
