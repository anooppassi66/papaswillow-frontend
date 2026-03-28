import React, { useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { BillingAddressRef } from './types/Cart';
import { getCityList, getCountryList, getStateList } from 'store/slices/locationStore';
import { dispatch, useSelector } from 'store';
import Button from '@mui/material/Button';
import { addAddress, AddressModel } from 'store/slices/addressStore';
import AddressList from '../address/AddressList';
import { IconMenu, IconPlus } from '@tabler/icons-react';

const BillingaddressStyles = styled(Grid)(({ theme }) => ({
    input: { color: '#fff', fontSize: '14px' },
    // background: '#212129',
    // padding: '20px 24px 20px 20px',
    label: { fontWeight: '400', color: '#fff', fontSize: '14px' },
    '.selectlist': {
        label: { fontWeight: '400', color: '#fff', fontSize: '12px' },
        '.MuiSelect-select': { border: '1px solid #fff', color: '#fff' }
    },
    // '.MuiOutlinedInput-notchedOutline': { border: '1px solid #fff !important', },
    '.Mui-focused': { color: '#fff !important' },
    '.Mui-focused fieldset': { border: '1px solid #fff !important' }
}));

// Styled component for error text
const ErrorText = styled('div')({
    color: '#ff5358',
    fontSize: '10px',
    marginTop: '0.25rem',
    position: 'relative',
    top: '-1px'
});

// Styled component for TextField with error handling
const ErrorTextField = styled(TextField)(({ error }: { error: boolean }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: error ? '#ff5358' : '#ccc' // Red border if there's an error
        },
        '&:hover fieldset': {
            borderColor: error ? '#ff5358' : '#aaa' // Darker border on hover if there's an error
        },
        '&.Mui-focused fieldset': {
            borderColor: error ? '#ff5358' : '#3f51b5' // Blue border when focused
        }
    }
}));

interface Country {
    id: number;
    countryName: string;
}
interface State {
    id: number;
    stateName: string;
}
interface City {
    id: number;
    cityName: string;
}

const BillingAddress = forwardRef<BillingAddressRef>((props, ref) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zipCode: '',
            country: '',
            phoneNumber: '',
            state: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            zipCode: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            phoneNumber: Yup.string().required('Required'),
            state: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            const address = {
                ...values,
                country: getCountryName(parseInt(values.country), country),
                state: getStateName(parseInt(values.state), state),
                city: getCityName(parseInt(values.city), city)
            };
            dispatch(addAddress(address));
            formik.resetForm();
        }
    });
    const { country, state, city } = useSelector((state) => state.location);
    const { addressList }: { addressList: AddressModel[] } = useSelector((state: any) => state.address);
    console.log(addressList, 'addressListaddressList');
    const [addressNew, setAddressNew] = useState<boolean>(addressList?.length === 0);

    const getCountryName = (id: number, countries: Country[]): string => {
        const countryFind = countries.find((c) => c.id === id);
        return countryFind ? countryFind.countryName : '';
    };
    const getStateName = (id: number, states: State[]): string => {
        const stateFind = states.find((c) => c.id === id);
        return stateFind ? stateFind.stateName : '';
    };
    const getCityName = (id: number, cities: City[]): string => {
        const cityFind = cities.find((c) => c.id === id);
        return cityFind ? cityFind.cityName : '';
    };

    useImperativeHandle(ref, () => ({
        validateForm: async () => {
            await formik.validateForm();
        },
        isValid: () => formik.isValid,
        values: formik.values,
        errors: formik.errors
    }));

    useEffect(() => {
        dispatch(getCountryList());
    }, []);

    useEffect(() => {
        if (addressList.length) setAddressNew(false);
    }, [addressList]);

    const handleStates = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const country = event.target.value;
        formik.setFieldValue('country', country);
        dispatch(getStateList(country));
    };

    const handleCities = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const state = event.target.value;
        formik.setFieldValue('state', state);
        dispatch(getCityList(state));
    };
    const handleAddNewAddress = () => {
        setAddressNew(!addressNew);
    };

    return (
        <>
            <Button
                sx={{
                    textTransform: 'uppercase',
                    padding: '6px 15px',
                    border: '1px solid #',
                    borderRadius: '4',
                    background: '#f89b35',
                    color: '#212121',
                    position: 'absolute',
                    right: '35px',
                    gap: '5px',
                    ':hover': { background: '#bf8400', color: '#212121' }
                }}
                onClick={handleAddNewAddress}
            >
                {!addressNew ? <IconPlus /> : <IconMenu />}
                {!addressNew ? 'Add new Address' : 'Show address list'}
            </Button>
            {!addressNew && <AddressList addressList={addressList} />}
            {addressNew && (
                <BillingaddressStyles>
                    <form onSubmit={formik.handleSubmit}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ color: '#fff', fontWeight: '600', fontSize: '18px', padding: '5px 0px' }}
                        >
                            Address
                        </Typography>
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                padding: '20px 24px 20px 20px',
                                borderRadius: '10px',
                                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))'
                            }}
                        >
                            <Grid item xs={12} md={6}>
                                <ErrorTextField
                                    fullWidth
                                    margin="normal"
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    size="small"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.firstName} // Ensure error is a boolean
                                    //helperText={formik.errors.fullName}
                                />
                                {formik.errors.firstName && <ErrorText>{formik.errors.firstName}</ErrorText>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ErrorTextField
                                    fullWidth
                                    margin="normal"
                                    id="Last name"
                                    name="lastName"
                                    label="Last name"
                                    size="small"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.lastName} // Ensure error is a boolean
                                    // helperText={formik.errors.lastName}
                                />
                                {formik.errors.lastName && <ErrorText>{formik.errors.lastName}</ErrorText>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <ErrorTextField
                                    fullWidth
                                    margin="normal"
                                    id="address"
                                    name="address"
                                    label="Address"
                                    size="small"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.address} // Ensure error is a boolean
                                    //helperText={formik.errors.address}
                                />
                                {formik.touched.address && formik.errors.address && <ErrorText>{formik.errors.address}</ErrorText>}
                            </Grid>

                            <Grid item xs={12} md={4} className="selectlist">
                                <InputLabel id="country">Country/Region</InputLabel>
                                <Select
                                    labelId="country"
                                    id="country"
                                    size="small"
                                    value={formik.values.country}
                                    label="Age"
                                    sx={{ width: '100%' }}
                                    name="country"
                                    onChange={(e) => handleStates(e)}
                                    error={!!formik.errors.country} // Ensure error is a boolean
                                >
                                    <MenuItem value=""></MenuItem>
                                    {country?.map((item: any, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.countryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.country && formik.errors.country && <ErrorText>{formik.errors.country}</ErrorText>}
                            </Grid>

                            <Grid item xs={12} md={4} className="selectlist">
                                <InputLabel id="demo-select-small-label">State</InputLabel>
                                <Select
                                    labelId="state"
                                    id="state"
                                    size="small"
                                    value={formik.values.state}
                                    label="Age"
                                    sx={{ width: '100%' }}
                                    name="state"
                                    onChange={(e) => handleCities(e)}
                                    error={!!formik.errors.state} // Ensure error is a boolean
                                    //onChange={handleChange}
                                >
                                    <MenuItem value=""></MenuItem>
                                    {state?.map((item: any, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.stateName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.state && formik.errors.state && <ErrorText>{formik.errors.state}</ErrorText>}
                            </Grid>
                            <Grid item xs={12} md={4} className="selectlist">
                                <InputLabel id="demo-select-small-label">City</InputLabel>
                                <Select
                                    labelId="city"
                                    id="city"
                                    size="small"
                                    value={formik.values.city}
                                    label="City"
                                    sx={{ width: '100%' }}
                                    name="cityCode"
                                    onChange={(e) => formik.setFieldValue('city', e.target.value)}
                                    error={!!formik.errors.city} // Ensure error is a boolean
                                    //onChange={handleChange}
                                >
                                    <MenuItem value=""></MenuItem>
                                    {city?.map((item: any, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.cityName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.city && formik.errors.city && <ErrorText>{formik.errors.city}</ErrorText>}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ErrorTextField
                                    fullWidth
                                    margin="normal"
                                    id="zipCode"
                                    name="zipCode"
                                    label="Postal Code"
                                    size="small"
                                    value={formik.values.zipCode}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.zipCode} // Ensure error is a boolean
                                    //helperText={formik.errors.zipCode}
                                />
                                {formik.touched.zipCode && formik.errors.zipCode && <ErrorText>{formik.errors.zipCode}</ErrorText>}
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <ErrorTextField
                                    fullWidth
                                    margin="normal"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone"
                                    size="small"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.phoneNumber} // Ensure error is a boolean
                                    // helperText={formik.errors.phoneNumber}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <ErrorText>{formik.errors.phoneNumber}</ErrorText>
                                )}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Button
                                    sx={{
                                        background: '#f89b35',
                                        width: '100%',
                                        color: '#212121',
                                        padding: '0px 50px',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        height: '40px',
                                        marginTop: '20px',
                                        ':hover': { background: '#f89b35' }
                                    }}
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                >
                                    Add New Address
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </BillingaddressStyles>
            )}
        </>
    );
});

export default BillingAddress;
