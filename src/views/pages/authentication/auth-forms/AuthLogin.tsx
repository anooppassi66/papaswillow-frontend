import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
// import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import SpinnerLoader from 'ui-component/Spinner';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconMail, IconPhone, IconChevronLeft } from '@tabler/icons-react';

type LoginType = 'email' | 'phone';
const phone = 'phone';
const email = 'email';

// ===============================|| JWT LOGIN ||=============================== //

const LoginBox = styled(Box)({
    //background:'#ff0000'

    '.MuiOutlinedInput-notchedOutline': { borderColor: '#000', fontSize: '10px !important' },
    '.MuiInputBase-input': { fontSize: '14px !important' },
    '.Mui-error':{ fontWeight:'600', marginLeft:'0px', fontSize:'10px' }
});

const JWTLogin = () => {
    const theme = useTheme();

    const { login } = useAuth();
    const scriptedRef = useScriptRef();

    // const [checked, setChecked] = React.useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [loginMode, setLoginMode] = useState<LoginType>(email);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickChangeLoginMode = () => {
        return;
        setLoginMode((mode) => (mode === email ? phone : email));
    };

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };

    const schema =
        loginMode === phone
            ? {
                  phone: Yup.string().max(13).required('Mobile is required'),
                  password: Yup.string().max(255).required('Password is required'),
                  email: Yup.string().notRequired()
              }
            : {
                  email: Yup.string().email().required('Email is required'),
                  password: Yup.string().max(255).required('Password is required'),
                  phone: Yup.string().notRequired()
              };

    return (
        <Formik
            initialValues={{
                phone: '',
                password: '',
                email: '',
                submit: null
            }}
            validationSchema={Yup.object().shape(schema)}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await login(values.phone, values.email, values.password, loginMode);
                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err: any) {
                    // debugger;
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.response.data.error });
                        //     setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <LoginBox>
                        {loginMode === phone && (
                            <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                                {/* <InputLabel htmlFor="outlined-adornment-email-login">Mobile</InputLabel> */}

                                <TextField
                                    id="outlined-adornment-phone-login"
                                    type="text"
                                    value={values.phone}
                                    name="phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{}}
                                    error={touched.phone && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    label="Mobile"
                                    sx={{ fontSize: '12px' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="login"
                                                    onClick={handleClickChangeLoginMode}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: '600',
                                                        fontFamily: 'Poppins',
                                                        color: '#212121',
                                                        ':hover': {
                                                            borderColor: 'inherit',
                                                            bgcolor: 'inherit'
                                                        }
                                                    }}
                                                >
                                                    <IconChevronLeft /> <IconMail />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {/* {touched.phone && errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.phone}
                                </FormHelperText>
                            )} */}
                            </FormControl>
                        )}
                        {loginMode === email && (
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                {/* <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel> */}

                                <TextField
                                    id="outlined-adornment-email-login"
                                    type="text"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{}}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    label="Email"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="login"
                                                    onClick={handleClickChangeLoginMode}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: '600',
                                                        fontFamily: 'Poppins',
                                                        color: '#212121',
                                                        ':hover': {
                                                            borderColor: 'inherit',
                                                            bgcolor: 'inherit'
                                                        }
                                                    }}
                                                >
                                                    <IconChevronLeft /> <IconMail />
                                                    {/* <IconPhone /> */}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {/* {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )} */}
                            </FormControl>
                        )}

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            {/* <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel> */}
                            <TextField
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                                sx={{ color: '#212121' }}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                label="Password"
                            />
                            {/* {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )} */}
                        </FormControl>

                        {/* <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={
                                    loginProp
                                        ? `/pages/forgot-password/forgot-password${loginProp}`
                                        : '/pages/forgot-password/forgot-password3'
                                }
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Grid>
                    </Grid> */}

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    sx={{
                                        backgroundColor: '#f89b35 ',
                                        color: '#212121',
                                        boxShadow: 'inherit',
                                        mb: '10px',
                                        '&:hover': {
                                            backgroundColor: '#f89b35 ',
                                            color: '#212121',
                                            boxShadow: 'inherit'
                                        }
                                    }}
                                    color="secondary"
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign In {isSubmitting && <SpinnerLoader />}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </LoginBox>
                </form>
            )}
        </Formik>
    );
};

export default JWTLogin;
