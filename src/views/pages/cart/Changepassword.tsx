import React, { useEffect } from 'react';

import Stack from '@mui/material/Stack';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';

import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';

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

import { StringColorProps } from 'types';
import SpinnerLoader from 'ui-component/Spinner';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';
import { IconX } from '@tabler/icons-react';

const ChangepasswordView = styled(Stack)(({ theme }) => ({
    position: 'fixed',
    zIndex: '1600',
    right: '0',
    bottom: '0',
    top: '0',
    left: '0',
    borderRadius: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));
const Changepassword = styled(Stack)(({ theme }) => ({
    background: '#fff',
    padding: '40px 30px 30px 30px',
    width: '400px',
    position: 'relative',
    overflowY: 'auto',
    borderRadius: '6px',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    boxShadow: '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 64px)',
    maxWidth: '600px',
    '.MuiOutlinedInput-notchedOutline': {
        border: '1px solid #000'
    },
    '.MuiInputBase-input': { fontSize: '12px !important' },

    '.MuiFormLabel-root': { fontSize: '12px !important' },
    '.MuiOutlinedInput-input.MutlinedInput-input': { height: '18px' },
    '.selectcountry': { height: '50px' },
    '.Mui-error': { fontWeight: '600', marginLeft: '0px', fontSize: '10px' },
    '.MuiInputLabel-root': {
        background: '#fff',
        Padding: '5px'
    }
}));

// ===========================|| FIREBASE - REGISTER ||=========================== //

const ChangePassword = ({ handlePassword }: { handlePassword: Function }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();
    const { updatePassword } = useAuth();

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    let schema = {
        // email: Yup.string().email('Must be a valid email').max(255),
        // phone: Yup.string().max(13).required('Mobile is required'),
        oldPassword: Yup.string().max(30).required('Old Password is required'),
        newPassword: Yup.string().max(255).required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    };

    return (
        <>
            <ChangepasswordView>
                <Changepassword>
                    <Formik
                        initialValues={{
                            newPassword: '',
                            oldPassword: '',
                            confirmPassword: ''
                        }}
                        validationSchema={Yup.object().shape(schema)}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                const result: any = await updatePassword(values);
                            
                                if (result?.status === 200) {
                                    handlePassword(true);
                                    //result?.token !== undefined
                                }
                            } catch (err: any) {
                            
                                setStatus({ success: false });
                                setErrors({ oldPassword: err.response.data.message || err.response.data });
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={{ xs: 0, sm: 2 }} sx={{ padding: '0px' }}>
                                    <Grid item xs={12} sm={12}>
                                        <Button onClick={()=>handlePassword(false)} sx={{position:'absolute', right:'0px', top:'4px', margin:'5px',
                                            ':hover':{ background:'none'}
                                        }}><IconX color='#000'/></Button>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.newPassword && errors.oldPassword)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <TextField
                                                fullWidth
                                                id="oldPassword"
                                                name="oldPassword"
                                                label="Old Password"
                                                type={'password'}
                                                value={values.oldPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.oldPassword && Boolean(errors.oldPassword)}
                                                helperText={touched.oldPassword && errors.oldPassword}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.newPassword && errors.newPassword)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <TextField
                                        id="outlined-adornment-password-register"
                                        type={'password'}
                                        name="newPassword"
                                        label="newPassword"
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.newPassword && Boolean(errors.newPassword)}
                                        helperText={touched.newPassword && errors.newPassword}
                                        // onChange={(e) => {
                                        //     handleChange(e);
                                        //     changePassword(e.target.value);
                                        // }}
                                        // InputProps={{
                                        //     endAdornment: (
                                        //         <InputAdornment position="end">
                                        //             <IconButton
                                        //                 aria-label="toggle password visibility"
                                        //                 onClick={handleClickShowPassword}
                                        //                 onMouseDown={handleMouseDownPassword}
                                        //                 edge="end"
                                        //                 size="large"
                                        //             >
                                        //                 {showPassword ? <Visibility /> : <VisibilityOff />}
                                        //             </IconButton>
                                        //         </InputAdornment>
                                        //     )
                                        // }}
                                    />
                                </FormControl>

                                {values.newPassword && strength !== 0 && (
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
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <TextField
                                        id="outlined-adornment-password-register"
                                        type={'password'}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                </FormControl>

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
                                                    fontWeight: '600,'
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
                                            Save{isSubmitting && <SpinnerLoader />}
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Changepassword>
            </ChangepasswordView>
        </>
    );
};

export default ChangePassword;
