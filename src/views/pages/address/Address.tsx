import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AddressModel } from 'store/slices/addressStore';

const RadioCheck = styled(FormControlLabel)(({ theme }) => ({
    '.MuiRadio-root.Mui-checked': { color: '#fff' },
    '.MuiRadio-root': { color: '#fff' }
}));

const Address = ({ address, selectedValue, handleChange }: { address: AddressModel; selectedValue?: string; handleChange?: any }) => {
    console.log(selectedValue, 'selectedValue');
    return (
        <Card sx={{ minWidth: 275, margin: 0, marginBottom: '15px' }}>
            <CardContent sx={{ background: '#282933', minHeight:'100px' }}>
                <RadioCheck
                    className="333"
                    value={address.id}
                    control={<Radio sx={{}} checked={selectedValue == address.id} onChange={handleChange} />}
                    label={
                        <div>
                            <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '16px' }} variant="h6" component="div">
                                {address.firstName} {address.lastName}
                            </Typography>
                            <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '12px' }} variant="body2">
                                {address.address}, {address.city}, {address.state}, {address.zipCode}, {address.country}
                            </Typography>
                            <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '12px' }} variant="body2">
                                Phone: {address.phoneNumber}
                            </Typography>
                        </div>
                    }
                />
            </CardContent>
        </Card>
    );
};

export default Address;
