// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import useScriptRef from 'hooks/useScriptRef';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import SpinnerLoader from 'ui-component/Spinner';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTOtpVerification = ({
    loginMode,
    currentStepData,
    handleStepChange,
    registerObj,
    ...others
}: {
    loginMode: any;
    currentStepData: any;
    handleStepChange: Function;
    registerObj: any;
    [key: string]: any;
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const { register } = useAuth();

    return (
        <>
            {/* <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with {loginMode === phone ? 'mobile number' : 'email address'}</Typography>
                    </Box>
                </Grid>
            </Grid> */}

            <Formik
                initialValues={{
                    phoneOtp: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    phoneOtp: Yup.string().max(6).required('Otp  is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log(registerObj['signup'].data, 'token');
                        const formData = registerObj['signup'].data;
                        const result = await register(
                            formData.phone,
                            formData.email,
                            formData.password,
                            formData.countrycode,
                            formData.token,
                            values.phoneOtp,
                            loginMode
                        );
                        if (scriptedRef.current) {
                            console.log(result, 'result');
                            setStatus({ success: true });
                            setSubmitting(false);
                            handleStepChange('registerSuccess');
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Your registration has been successfully completed.',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    },
                                    close: false
                                })
                            );

                            setTimeout(() => {
                                navigate('/', { replace: true });
                            }, 1500);
                        }
                    } catch (err: any) {
                        setStatus({ success: false });
                        setErrors({ submit: err.error });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.phoneOtp && errors.phoneOtp)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <TextField
                                inputProps={{}}
                                label="Enter Otp"
                                name="phoneOtp"
                                type="text"
                                value={values.phoneOtp}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {/* {touched.phoneOtp && errors.phoneOtp && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.phoneOtp}
                                    </FormHelperText>
                                )} */}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        backgroundColor: '#ffcd05 ',
                                        color: '#212121',
                                        boxShadow: 'inherit',
                                        mb: '10px',
                                        '&:hover': {
                                            backgroundColor: '#ffcd05 ',
                                            color: '#212121',
                                            boxShadow: 'inherit'
                                        }
                                    }}
                                >
                                    Verify Otp{isSubmitting && <SpinnerLoader />}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTOtpVerification;
