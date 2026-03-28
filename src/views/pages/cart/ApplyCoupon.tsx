import React, { useState } from 'react';
import { store } from 'store';

// styles
import { styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

//page Imports
import { applyCouponApi } from 'store/slices/checkout';

const ApplyButton = styled(Stack)(({ theme }) => ({
    '.applybtn': {
        background: '#f89b35',
        padding: '5px 25px',
        height: '40px',
        color: '#212121',
        fontWeight: '700',
        borderRadius: '0px',
        textTransform: 'uppercase'
    }
}));

const DiscountInput = styled(Stack)(({ theme }) => ({
    label: { fontWeight: '400' }
}));

export const ApplyCoupon = () => {
    const [couponCode, setCouponCode] = useState<string>('');
    const applyCouponCode = () => {
        store.dispatch(applyCouponApi(couponCode));
    };
    console.log(couponCode, 'couponCode');
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px', paddingTop: '20px' }}>
                <DiscountInput sx={{ width: '100%' }}>
                    <input
                        id="outlined-size-small"
                        onChange={(e) => setCouponCode(e.target.value)}
                        value={couponCode}
                        style={{ width: '100%', background: '#fff', height: '40px', border: '0px', color:'#000',paddingLeft:'20px', fontWeight:'600', textTransform: 'uppercase', }}
                    />
                </DiscountInput>
                <ApplyButton>
                    <Button
                        onClick={applyCouponCode}
                        className="applybtn"
                        variant="contained"
                        sx={{ ':hover': { backgroundColor: '#f89b35' } }}
                    >
                        Apply
                    </Button>
                </ApplyButton>
            </Box>
        </>
    );
};
