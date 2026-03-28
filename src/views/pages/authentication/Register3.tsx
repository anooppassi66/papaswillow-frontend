

// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// project imports

import AuthCardWrapper from '../AuthCardWrapper';
import AuthRegister from './auth-forms/AuthRegister';
import { useState } from 'react';
import JWTOtpVerification from './auth-forms/otpVerification';
import RegisterSuccess from './auth-forms/registerSuccess';
// import RegisterSuccess from './auth-forms/registerSuccess';
type LoginType = 'email' | 'phone';
// type Registerlables = 'Sign up' | 'Otp verification' | 'Success';
// type RegisterSublables = 'Enter your credentials to continue' | 'Enter Otp to verify your mobile' | 'Successfully registered';
type RegisterStep = 'signup' | 'verification' | 'registerSuccess';

interface RegisterStepInfo {
    title: string;
    subTitle: string;
    data: any;
}

interface RegisterObj {
    [key: string]: RegisterStepInfo;
}

const registerObj: RegisterObj = {
    signup: {
        title: 'Registration',
        subTitle: '',
        data: ''
    },
    verification: {
        title: 'Otp verification',
        subTitle: 'Enter Otp to verify your mobile ',
        data: ''
    },
    registerSuccess: {
        title: '',
        subTitle: '',
        data: ''
    }
};

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

interface SignUpTabs {
    theme: Theme;
}

const SignUpTabs = styled(Tabs)(({ theme }: SignUpTabs) => ({
    '.MuiTab-root': {
        padding: '.3125rem .625rem',
        minHeight: '32px',
        // background:'#d4e8e1',
        backgroundColor: alpha(theme.palette.secondary.main, 1),

        color: '#212121',
        marginRight: '1px',
        fontSize: '0.875rem',
        width: 'calc(50% - 1px)',
        fontWeight: '500',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.775rem',
        }
    },
    '.Mui-selected': {
        padding: '.3125rem .625rem',
        //backgroundColor: theme.palette.dark.dark,
        background: '#000',
        minHeight: '32px',
        color: '#fff !important',
        fontSize: '0.875rem',
        width: '50%',
        fontWeight: '500',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.775rem',
        }
    },
    '.MuiTabs-indicator': {
        display: 'none'
    }
}));

const Register = ({ forceOpen }: { forceOpen: Function }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [activeTab, setActiveTab] = useState<LoginType>('email');
    const [registerStep, setRegisterStep] = useState<RegisterStep>('signup');

    // Function to get data for the current step
    const getCurrentStepData = (): RegisterStepInfo => {
        return registerObj[registerStep];
    };

    // Handler function to update the step
    const handleStepChange = (newStep: RegisterStep) => {
        setRegisterStep(newStep);
    };

    const getRegisterData = (newdata: any) => {
        return (registerObj[registerStep].data = newdata);
    };
    // Call getCurrentStepData whenever the registerStep changes
    const currentStepData = getCurrentStepData();

    const handleChange = (event: React.SyntheticEvent, newValue: LoginType) => {
        setActiveTab(newValue);
    };

    return (
        <Grid container direction="column" justifyContent="flex-end" className="11111">
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item sx={{ margin: '0px' }} >
                        <AuthCardWrapper sx={{padding:'8px',
                        [theme.breakpoints.down('sm')]: {
                            padding:'3px',
                        }

                        }} className='989898'>
                            <Grid sx={{ margin: '0px', padding:'5px !important' }} container alignItems="center" justifyContent="center" >
                                <Grid sx={{ margin: '0px' }} item xs={12}>
                                    <Grid
                                        container
                                        direction={matchDownSM ? 'column-reverse' : 'row'}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Grid item >
                                            <Stack alignItems="center" justifyContent="center" spacing={0}>
                                                <Typography
                                                    // color={theme.palette.secondary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h1'}
                                                    sx={{
                                                        color: '#212121',
                                                        marginBottom: '1.5625rem !important',
                                                        textTransform: 'uppercase',
                                                        fontSize: '1.25rem',
                                                        fontWeight: '700',
                                                        lineHeight: '1.5625rem ',
                                                        [theme.breakpoints.down('sm')]: {
                                                            fontSize: '0.95rem',
                                                        }
                                                    }}
                                                >
                                                    {currentStepData.title}
                                                </Typography>
                                                <Grid>
                                                    {currentStepData.title && (
                                                        <Typography
                                                            variant="caption"
                                                            fontSize="16px"
                                                            textAlign={matchDownSM ? 'center' : 'inherit'}
                                                            sx={{
                                                                [theme.breakpoints.down('sm')]: {
                                                                    fontSize: '14px',
                                                                }
                                                            }}
                                                            
                                                        >
                                                            {currentStepData.subTitle}
                                                        </Typography>
                                                    )}
                                                    {registerStep === 'registerSuccess' && (
                                                        <RegisterSuccess />

                                                        // <Typography
                                                        //     component={Link}
                                                        //     to={'/login'}
                                                        //     variant="subtitle1"
                                                        //     sx={{ textDecoration: 'none' }}
                                                        // >
                                                        //     here
                                                        // </Typography>
                                                    )}
                                                </Grid>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    {registerStep === 'signup' && (
                                        <SignUpTabs value={activeTab} onChange={handleChange} aria-label="wrapped label tabs example" sx={{display:'none'}}>
                                            <Tab value="phone" label="BY PHONE" wrapped />
                                            <Tab value="email" label="BY E-MAIL" />
                                        </SignUpTabs>
                                    )}
                                    <Grid sx={{ display: registerStep === 'signup' ? 'block' : 'none', padding: '0px' }}>
                                        <AuthRegister
                                            loginMode={activeTab}
                                            currentStepData={currentStepData}
                                            handleStepChange={handleStepChange}
                                            getRegisterData={getRegisterData}
                                        />
                                    </Grid>
                                    <Grid sx={{ display: registerStep === 'verification' ? 'block' : 'none' }}>
                                        <JWTOtpVerification
                                            loginMode={activeTab}
                                            currentStepData={currentStepData}
                                            handleStepChange={handleStepChange}
                                            registerObj={registerObj}
                                        />
                                    </Grid>
                                    {/* <Grid sx={{ display: registerStep === 'registerSuccess' ? 'block' : 'none' }}>
                                            <RegisterSuccess />
                                        </Grid> */}
                                </Grid>
                                {registerStep !== 'registerSuccess' && (
                                    <>
                                        <Grid item xs={12} sx={{ padding: '10px 0px' }}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Button
                                                    onClick={() => forceOpen('login')}
                                                    sx={{
                                                        background: 'none',
                                                        color: '#000',
                                                        //color: theme.palette.dark.dark,
                                                        fontSize: '0.875rem',
                                                        fontWeight: '600',
                                                        ':hover': {
                                                            background: 'none'
                                                        }
                                                    }}
                                                >
                                                    {' '}
                                                    Already have an account?
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </AuthCardWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Register;
