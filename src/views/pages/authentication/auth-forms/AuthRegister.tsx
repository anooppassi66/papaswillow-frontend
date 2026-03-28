import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Option } from '@mui/base/Option';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { styled } from '@mui/material/styles';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { StringColorProps } from 'types';
import SpinnerLoader from 'ui-component/Spinner';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';

const RegisterView = styled(Stack)(({ theme }) => ({
    '.MuiOutlinedInput-notchedOutline': {
        border: '1px solid #000'
    },
    '.MuiInputBase-input': { fontSize: '12px !important' },

    '.MuiFormLabel-root': { fontSize: '12px !important' },
    '.MuiOutlinedInput-input.MutlinedInput-input': { height: '18px' },
    '.selectcountry': { height: '50px' },
    '.Mui-error':{ fontWeight:'600', marginLeft:'0px', fontSize:'10px' }
}));

const countryCodes =
    //['+1', '+44', '+91']; // Add all the country codes you need
    [
        {
            label: 'India',
            src: 'https://flagicons.lipis.dev/flags/4x3/in.svg',
            value: '+91',
            country_code: '+91'
        },
        {
            label: 'USA',
            src: 'https://flagicons.lipis.dev/flags/4x3/us.svg',
            value: '+1',
            country_code: '+1'
        }
    ];
type LoginType = 'email' | 'phone';
const phone = 'phone';
const email = 'email';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({
    loginMode,
    handleStepChange,
    getRegisterData,
    ...others
}: {
    loginMode: LoginType;
    handleStepChange: Function;
    getRegisterData: Function;
    [key: string]: any;
}) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();
    const { register } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
        //handleStepChange('verification');
    }, []);

    let schema =
        loginMode === phone
            ? {
                  email: Yup.string().email('Must be a valid email').max(255),
                  phone: Yup.string().max(13).required('Mobile is required'),
                  firstName: Yup.string().max(30).required('First Name is required'),
                  lastName: Yup.string().max(30).required('Last Name is required'),
                  password: Yup.string().max(255).required('Password is required'),
                  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match')
              }
            : {
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  phone: Yup.string().max(13),
                  firstName: Yup.string().max(30).required('First Name is required'),
                  lastName: Yup.string().max(30).required('Last Name is required'),
                  password: Yup.string().max(255).required('Password is required'),
                  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match')
              };

    return (
        <>
            {/* <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with {loginMode === phone ? 'mobile number' : 'email address'}</Typography>
                    </Box>
                </Grid>
            </Grid> */}
            <RegisterView>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        passwordConfirmation: '',
                        firstName: '',
                        lastName: '',
                        phone: '',
                        submit: null,
                        countrycode: '+1',
                        token: ''
                    }}
                    validationSchema={Yup.object().shape(schema)}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            const result: any = await register(values.email, values.password, values.firstName, values.lastName);
                            if (result?.status === 200) {
                                //result?.token !== undefined

                                handleStepChange('registerSuccess');
                                values.token = result.token;
                                getRegisterData(values);
                            } else {
                                setStatus({ success: false });
                                setErrors({ submit: err.response.message });
                                setSubmitting(false);
                            }
                        } catch (err: any) {
                            if (scriptedRef.current) {
                                setStatus({ success: false });

                                setErrors({ submit: err.response.data.message || err.response.data });
                                setSubmitting(false);
                                dispatch(
                                    openSnackbar({
                                        open: true,
                                        message: err.response.data.message || err.response.data,
                                        variant: 'alert',
                                        alert: {
                                            color: 'error'
                                        },
                                        close: false
                                    })
                                );
                            }
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} {...others}>
                            <Grid container spacing={{ xs: 0, sm: 2 }} sx={{ padding: '0px' }}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.firstName && errors.firstName)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <TextField
                                            fullWidth
                                            id="firstName"
                                            name="firstName"
                                            label="First Name"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.firstName && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <TextField
                                            fullWidth
                                            id="outlined-adornment-email-register"
                                            type="text"
                                            value={values.lastName}
                                            label="Last Name"
                                            name="lastName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                            error={touched.lastName && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {loginMode === 'email' && (
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <TextField
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        label="Email Address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </FormControl>
                            )}
                            {loginMode === 'phone' && (
                                <>
                                    <Box display="flex" alignItems="center" gap={1} sx={{ alignItems: 'flex-start' }}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.countrycode && errors.countrycode)}
                                            sx={{ ...theme.typography.customInput, width: '40%' }}
                                        >
                                            <InputLabel
                                                sx={{ position: 'absolute', top: '0px !important', color: '#121926 !important' }}
                                                id="age-select"
                                            >
                                                Country Code
                                            </InputLabel>
                                            <Select
                                                labelId="outlined-adornment-countrycode-register"
                                                id="outlined-adornment-countrycode-register"
                                                value={values.countrycode}
                                                name="countrycode"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Country Code"
                                                sx={{ padding: '0px' }}
                                                className="selectcountry"
                                            >
                                                {countryCodes.map((country: any) => (
                                                    <MenuItem key={country.country_code} value={country.country_code}>
                                                        <img
                                                            loading="lazy"
                                                            width={20}
                                                            height={20}
                                                            src={country.src}
                                                            alt={`Flag of ${country.label}`}
                                                            style={{ marginRight: 8 }}
                                                        />
                                                        {country.label} ({country.country_code})
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        {/* <FormControl
                                    fullWidth
                                    error={Boolean(touched.countrycode && errors.countrycode)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <TextField
                                        id="outlined-adornment-email-register"
                                        type="text"
                                        value={values.countrycode}
                                        name="countrycode"
                                        label="Country Code"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                        error={touched.countrycode && Boolean(errors.countrycode)}
                                        helperText={touched.countrycode && errors.countrycode}
                                    />
                                    </FormControl> */}

                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.phone && errors.phone)}
                                            sx={{ ...theme.typography.customInput, width: '60%' }}
                                        >
                                            <TextField
                                                id="outlined-adornment-email-register"
                                                type="text"
                                                value={values.phone}
                                                name="phone"
                                                label="Mobile"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{}}
                                                error={touched.phone && Boolean(errors.phone)}
                                                helperText={touched.phone && errors.phone}
                                            />
                                        </FormControl>
                                    </Box>
                                </>
                            )}

                            <FormControl
                                fullWidth
                                error={Boolean(touched.password && errors.password)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <TextField
                                    id="outlined-adornment-password-register"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    label="Password"
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {/* {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )} */}
                            </FormControl>

                            {values.password && strength !== 0 && (
                                <FormControl fullWidth>
                                    <Box sx={{ mb: 2 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box sx={{ width: 85, height: 8, borderRadius: '7px', bgcolor: level?.color }} />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl>
                            )}
                            <FormControl
                                fullWidth
                                error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                {/* <InputLabel htmlFor="outlined-adornment-password-register">Confirm Password</InputLabel> */}
                                <TextField
                                    id="outlined-adornment-password-register"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.passwordConfirmation}
                                    name="passwordConfirmation"
                                    label="Confirm Password"
                                    onBlur={handleBlur}
                                    error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                                    helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
                                    inputProps={{}}
                                />
                                {/* {touched.passwordConfirmation && errors.passwordConfirmation && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.passwordConfirmation}
                                </FormHelperText>
                            )} */}
                            </FormControl>

                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1"
                                             sx={{
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: '12px',
                                                }
                                             }}
                                            >
                                                Agree with &nbsp;
                                                <Typography variant="subtitle1" component={Link} to="#"
                                                 sx={{
                                                    [theme.breakpoints.down('sm')]: {
                                                        fontSize: '12px',
                                                    }
                                                 }}
                                                >
                                                    Terms & Condition.
                                                </Typography>
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
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
                                            [theme.breakpoints.down('sm')]: {
                                                fontSize: '14px',
                                                fontWeight:'600,'
                                            },
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
                                        Sign up{isSubmitting && <SpinnerLoader />}
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </form>
                    )}
                </Formik>
            </RegisterView>
        </>
    );
};

export default JWTRegister;
