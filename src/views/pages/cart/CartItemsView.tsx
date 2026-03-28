import React, { useMemo } from 'react';
import { useSelector } from 'store';

// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

//Page Imports
import IconProduct from 'assets/images/landing/imagecart.png';
import { PriceCard } from '../products/subcard/priceCard';
import useCartTotal from 'hooks/useCart';
import { displayPrice } from 'utils/util';
import { checkoutModel, Coupon } from 'store/slices/checkout';
import useDiscount from 'hooks/useDiscount';
import { string } from 'yup';
import { enqueueSnackbar } from 'notistack';
import useAuth from 'hooks/useAuth';
const ProdectText = styled(Stack)(({ theme }) => ({
    width: '60%',
    span: { fontSize: '12px', lineHeight: '14px', fontWeight: '500' }
}));

const ProdectPrice = styled(Stack)(({ theme }) => ({
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    '.linethrough': {
        textDecoration: 'line-through',
        fontSize: '14px',
        paddingRight: '0px',
        margin: '0px 0px',
        fontWeight: '600',
        color: '#e23333',
        display: 'flex',
        alignItems: 'center'
    }
}));

const CartItems = ({selectedPaymentMethod}:{selectedPaymentMethod: string}) => {
    debugger;
    const { CartItems , tax, Address} = useSelector((state) => state.checkout);
    
    debugger;
    const taxAmount = selectedPaymentMethod === 'cash' ? 0 : tax;
    // const taxAmount = selectedPaymentMethod ==='cash' ? 0 : tax;
    const {
        couponData: { couponOptions, couponValue }
    } = useSelector((state) => state.checkout);
    const {
        logout,
        user: { roleId }
    } = useAuth();
    const cartTotal = useCartTotal(CartItems);
    const discountAmount = useDiscount({ discountOnAmount: cartTotal, couponOptions, couponValue });
    const CartItemsData = CartItems.map((item) => {
        const item1 = { ...item };
        const vt = item?.attributesData;

        if (vt && vt.length > 0) {
            var { attributePrice, attributeSalePrice } = vt[0];
        }
        // Default to price if salePrice is not available
        const effectivePrice = attributeSalePrice || attributePrice || item1.salePrice || item1.price || '0';
        item1.productTotal = item1.quantity * parseFloat(effectivePrice);
        return item1;
    });
    // enqueueSnackbar('This is an error message!', { variant: 'error' });
    const freeDevlivery = 1000 - cartTotal;
    
    const isAdmin = roleId === 1;
    const isFreeZipCOdeDelivery = Address?.zipCode === '30004' || isAdmin;
    const charge = isFreeZipCOdeDelivery ? 0 : 30;
    const devlieryCharges =  freeDevlivery > 0 ? charge : 0;
    
    return (
        <List sx={{ display: 'flex', gap: '15px', flexDirection: 'column', paddingBottom: '10px', border: '0px' }}>
            <Typography sx={{ color: '#fff', fontSize: '20px', fontWeight: '600', padding: '10px 0px' }}>Order Summary</Typography>
            {CartItemsData.map((item, index) => (
                <ListItem key={index} divider sx={{ paddingLeft: '0px', paddingRight: '0px', borderBottom: '1px solid  #3a3a3a' }}>
                    <Box sx={{ display: 'flex', width: '100%', gap: '15px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Stack sx={{ position: 'relative' }}>
                            <img
                                src={item.image}
                                alt=""
                                height="50x"
                                width="50"
                                style={{ border: '1px solid #f89b35', borderRadius: '5px' }}
                            />
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    background: '#f89b35',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'rgba(0, 0, 0, 0.87)',
                                    width: '20px',
                                    height: '20px',
                                    fontSize: '12px',
                                    display: 'flex',
                                    fontWeight: '800',
                                    borderRadius: '100px'
                                }}
                            >
                                {item.quantity}
                            </Typography>
                        </Stack>
                        <ProdectText>
                            <ListItemText sx={{ fontSize: '14px', color: '#fff' }} primary={item.name} />
                            {/* {item.content && <Typography sx={{fontSize:'12px', fontWeight:'600', color:'#fff', marginTop:'0px',}}>{item.content}</Typography>} */}
                        </ProdectText>
                        <ProdectPrice>
                            {/* <PriceCard item={item} /> */}
                            {displayPrice(item.productTotal)}
                        </ProdectPrice>
                    </Box>
                </ListItem>
            ))}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    borderTop: '1px solid #12121218',
                    paddingTop: '0px',
                    marginBottom: '40px'
                }}
            >
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#fff' }}>Subtotal: </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}> {displayPrice(cartTotal)}</Typography>
                </Stack>

                {!!discountAmount && (
                    <>
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderTop: '1px solid #3a3a3a',
                                paddingTop: '6px'
                            }}
                        >
                            <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#fff' }}>Discount: </Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                                {' '}
                                {displayPrice(discountAmount)}{' '}
                            </Typography>
                        </Stack>
                    </>
                )}

                <>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #3a3a3a',
                            paddingTop: '6px'
                        }}
                    >
                        <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#fff' }}>Devlivery Charges: </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                            {' '}
                            {displayPrice(devlieryCharges)}{' '}
                        </Typography>
                    </Stack>
                </>
               {taxAmount > 0 &&  <>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #3a3a3a',
                            paddingTop: '6px'
                        }}
                    >
                        <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#fff' }}>Tax : </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                            {' '}
                            {displayPrice(tax)}{' '}
                        </Typography>
                    </Stack>
                </>}
               

                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #3a3a3a',
                        borderBottom: '1px solid #3a3a3a',
                        padding: '8px 0px'
                    }}
                >
                    <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#f89b35' }}>Total: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#f89b35' }}>
                        {' '}
                        {displayPrice(cartTotal - discountAmount + devlieryCharges + tax)}{' '}
                    </Typography>
                </Stack>
            </Box>
        </List>
    );
};
export default CartItems;
