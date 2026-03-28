import React, { useEffect, useState } from 'react';

import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Address from './Address';
import { AddressModel } from 'store/slices/addressStore';
import { store } from 'store';
import { addAddressToCart } from 'store/slices/checkout';

const AddressList = ({ addressList }: { addressList: AddressModel[] }) => {
    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSelectedValue(event.target.value);
    };
    const [defaultAddress = null] = addressList;
    const [selectedValue, setSelectedValue] = useState(defaultAddress?.id);

    useEffect(() => {
        if (selectedValue !== '') {
            const cartAddress = addressList.find((add) => add.id == parseInt(selectedValue));
            store.dispatch(addAddressToCart(cartAddress));
        }
    }, [selectedValue, addressList, defaultAddress?.id]);
    return (
        <Grid>
            <Box>
                <RadioGroup value={selectedValue} onChange={handleChange}>
                    <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '22px', paddingBottom: '20px', paddingTop: '60px' }}>
                        Addresses
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            overflow: 'auto',
                            // height: '580px',
                            paddingRight: '20px'
                        }}
                    >
                        {addressList?.map((address, index) => (
                            <Grid item md={6} sm={12} xs={12} key={index}>
                                <Address
                                    address={address}
                                    selectedValue={(selectedValue || defaultAddress?.id) ?? ''}
                                    handleChange={handleChange}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>
            </Box>
        </Grid>
    );
};

export default AddressList;
