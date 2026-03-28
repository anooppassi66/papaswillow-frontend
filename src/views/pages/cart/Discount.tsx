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
        background: '#ffb001',
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

const Diescount = () => {
    const [couponCode, setCouponCode] = useState<string>('');
    const applyCouponCode = () => {
        alert('');
        store.dispatch(applyCouponApi(couponCode));
    };
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px', paddingTop: '20px' }}>
                <DiscountInput sx={{ width: '100%' }}>
                    <input
                        id="outlined-size-small"
                        onChange={(e) => setCouponCode(e.target.value)}
                        value={couponCode}
                        style={{ width: '100%', background: '#fff', height: '60px', border: '0px', color:'#000' }}
                    />
                </DiscountInput>
                <ApplyButton>
                    <Button
                        onClick={applyCouponCode}
                        className="applybtn"
                        variant="contained"
                        sx={{ ':hover': { backgroundColor: '#ffb001' } }}
                    >
                        Apply
                    </Button>
                </ApplyButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    paddingTop: '20px',
                    marginBottom: '40px'
                }}
            >
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#fff' }}>Subtotal: </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>$421,000.00 </Typography>
                </Stack>
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #f7f7f788',
                        paddingTop: '6px'
                    }}
                >
                    <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#fff' }}>Discount: </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>$1,000.00 </Typography>
                </Stack>
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #f7f7f788',
                        borderBottom: '1px solid #f7f7f788',
                        padding: '8px 0px'
                    }}
                >
                    <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>Total: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>$422,000.00 </Typography>
                </Stack>
            </Box>
        </>
    );
};

export default Diescount;
