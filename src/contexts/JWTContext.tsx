import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT, FORCE_LOGIN } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import axiosAuthServices from 'utils/axios-auth';

// types
import { KeyedObject } from 'types';
import { InitialLoginContextProps, JWTContextType } from 'types/auth';

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    isForceLogin: false,
    user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded: KeyedObject = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    // return true;
    console.log(decoded.exp > Date.now() / 1000, 'valid');
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null, refreshToken?: string | null) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        // localStorage.setItem('refreshToken', refreshToken);
        axiosAuthServices.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        // localStorage.removeItem('refreshToken');
        delete axiosAuthServices.defaults.headers.common.Authorization;
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            const serviceToken = window.localStorage.getItem('serviceToken');
            // const refreshToken = window.localStorage.getItem('refreshToken');
            if (serviceToken) {
                const response = await axiosAuthServices.get('/api/v1/auth/me');
                // Sockets.setSocketForUser(response.data.id, updateModelAttributes);
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        isForceLogin: false,
                        user: response.data
                    }
                });
            } else {
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (phone: string, email: string, password: string, loginMode: string) => {
        const response = await axiosAuthServices.post(
            '/api/v1/auth/login',
            loginMode === 'phone' ? { phone, password } : { userName: email, password }
        );
        // debugger;
        const { token } = response.data;
        setSession(token);

        // Sockets.setSocketForUser(response.data.id, updateModelAttributes);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                isForceLogin: false,
                user: response.data
            }
        });
    };

    const forceLogin = async (status: boolean) => {
        // debugger;
        // Sockets.setSocketForUser(response.data.id, updateModelAttributes);
        dispatch({
            type: FORCE_LOGIN,
            payload: {
                isForceLogin: status
            }
        });
    };
    //values.phone, values.email, values.password, values.countrycode, loginMode
    const signupOtp = async (phone: string, email: string, password: string, countrycode: string, loginMode: string) => {
        const temp = `${countrycode}${phone}`;
        const response = await axiosAuthServices.post('/signup/phone/otp', loginMode === 'phone' ? { phone: temp } : { email });
        return response.data;
    };
    const updatePassword = async (userData: any) => {
        const response = await axiosAuthServices.post('/api/v1/auth/changepassword', userData);
        return response.data;
        // dispatch({
        //     type: REGISTER,
        //     payload: {
        //         isLoggedIn: false,
        //         user: response.data
        //     }
        // });

        // let users = response.data;

        // if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
        //     const localUsers = window.localStorage.getItem('users');
        //     users = [
        //         ...JSON.parse(localUsers!),
        //         {
        //             id,
        //             email,
        //             password
        //             //name: `${firstName} ${lastName}`
        //         }
        //     ];
        // }

        // window.localStorage.setItem('users', JSON.stringify(users));
    };
    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        const response = await axiosAuthServices.post('/api/v1/auth/signup', {
            password,
            email,
            userName: email,
            firstName,
            lastName
        });
        return response.data;
        // dispatch({
        //     type: REGISTER,
        //     payload: {
        //         isLoggedIn: false,
        //         user: response.data
        //     }
        // });

        // let users = response.data;

        // if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
        //     const localUsers = window.localStorage.getItem('users');
        //     users = [
        //         ...JSON.parse(localUsers!),
        //         {
        //             id,
        //             email,
        //             password
        //             //name: `${firstName} ${lastName}`
        //         }
        //     ];
        // }

        // window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null, null);
        dispatch({ type: LOGOUT });
        window.location.reload();
    };

    const resetPassword = async (email: string) => {};

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider
            value={{ ...state, forceLogin, login, logout, signupOtp, updatePassword, register, resetPassword, updateProfile }}
        >
            {children}
        </JWTContext.Provider>
    );
};

export default JWTContext;
