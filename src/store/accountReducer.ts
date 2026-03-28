// action - state management
import { FORCE_LOGIN, LOGIN, LOGOUT, REGISTER } from './actions';
import { InitialLoginContextProps } from 'types/auth';

// ==============================|| ACCOUNT REDUCER ||============================== //

interface AccountReducerActionProps {
    type: string;
    payload?: InitialLoginContextProps;
}

const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    isForceLogin: false,
    user: null
};

const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload!;
            return {
                ...state,
                user
            };
        }
        case FORCE_LOGIN: {
            const { isForceLogin } = action.payload!;
            return {
                ...state,
                isForceLogin
            };
        }
        case LOGIN: {
            const { user } = action.payload!;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
