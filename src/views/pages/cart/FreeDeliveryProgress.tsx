import React from 'react';

import Typography from '@mui/material/Typography';

import { styled, useTheme } from '@mui/material/styles';

import Stack from '@mui/material/Stack';

import { useSelector } from 'store';
import useCartTotal from 'hooks/useCart';

const FreeDeliveryStyle = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    span: { color: '#ffb001' },

   ' @keyframes progress-bar-stripes': {
        'from':  { backgroundPosition: '30px 0', },
        'to ':   { backgroundPosition: '0 0', }
      }
}));

const FreeDeliveryProgress: React.FC = () => {
    const theme = useTheme();

    const CartItems = useSelector((state) => state.checkout.CartItems);

    const cartTotal = useCartTotal(CartItems);

    const freeDevlivery = 1000 - cartTotal;

    const percentage = (cartTotal / 1000) * 100;

    return (
        <>
            {freeDevlivery > 0 && (
                <FreeDeliveryStyle>
                     
                    <Stack sx={{ border: '1px solid #ffb001', padding: '5px', marginBottom: '6px', borderRadius: '15px', height:'30px', }}>
                        <Stack
                            sx={{
                                background: '#ffb001',
                                width: `${percentage}%`,
                                color: '#000',
                                textAlign: 'center',
                                borderRadius: '15px',
                                fontSize: '16px',
                                transition: 'width .6s ease',
                                fontWeight:'700',
                                height:'18px',
                                backgroundImage:
                                    'linear-gradient(45deg,rgba(255,255,255,.35) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.35) 50%,rgba(255,255,255,.35) 75%,transparent 75%,transparent)',
                                animation: 'progress-bar-stripes 2s linear infinite',
                                backgroundSize: '30px 30px',
                                alignItems:'center',
                                justifyContent:'center', minWidth:'50px', flexDirection:'row',
                                
                            }}
                        >
                            {percentage}<span style={{color: '#000',}}>%</span>
                        </Stack>
                    </Stack>
                    <Typography sx={{fontSize:'13px', fontWeight:'600'}}>You're only <span>${freeDevlivery}</span> away from free shipping!</Typography>
                </FreeDeliveryStyle>
            )}
        </>
    );
};

export default FreeDeliveryProgress;
