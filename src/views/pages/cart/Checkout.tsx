import React, { useRef, useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
// import CartItems from './CartItems';
import BillingAddress from './BillingAddress';
import PaymentSection from './PaymentSection';
import CartItemsView from './CartItemsView';
import Stack from '@mui/material/Stack';

import { BillingAddressRef, PaymentSectionRef } from './types/Cart';
import { ApplyCoupon } from './ApplyCoupon';
import { store, useSelector } from 'store';
import { submitOrder } from 'store/slices/checkout';
import useCartTotal from 'hooks/useCart';
import useDiscount from 'hooks/useDiscount';
import FreeDeliveryProgress from './FreeDeliveryProgress';
import { apiSubmitOrder } from 'api/CartApi';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
// import { dispatch } from 'store';
// import { setAddress } from 'store/slices/checkout';

const CartHead = styled(Stack)(({ theme }) => ({
    background: '#212129',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    h2: {
        fontSize: '28px',
        color: '#fff',
        fontWeight: '500',
        padding: '20px 0px',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 0px',
            fontSize: '22px',
            marginBottom: '0px'
        }
    },
    '.shoppingcart': {
        background: 'none',
        border: '1px solid #ffb001',
        color: '#fff',
        fontSize: '14px',
        height: '40px',
        padding: ' 20px 40px',
        fontWeight: '400',
        borderRadius: '0px',
        textTransform: 'uppercase',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
            padding: ' 20px 20px',
            fontWeight: '500'
        }
    }
}));

const Checkout: React.FC = () => {
    const addressRef = useRef<BillingAddressRef>(null);
    const paymentRef = useRef<PaymentSectionRef>(null);
    const selectedPaymentMethod = paymentRef?.current?.getPaymentMethod();
    const theme = useTheme();
    const navigate = useNavigate();
    const {
        logout,
        user: { roleId }
    } = useAuth();
    const isAdmin = roleId === 1;
    const [submitLoading, setOrderSubmit] = useState(false);

    const { couponData, CartItems, Address , tax } = useSelector((state) => state.checkout);
    const taxAmount = selectedPaymentMethod ==='cash' ? 0 : tax;
    const cartTotal = useCartTotal(CartItems);
    const discountAmount = useDiscount({
        discountOnAmount: cartTotal,
        couponOptions: couponData.couponOptions,
        couponValue: couponData.couponValue
    });

    const freeDevlivery = 1000 - cartTotal;

    const isFreeZipCOdeDelivery = Address?.zipCode === '30004' || isAdmin;
    const charge = isFreeZipCOdeDelivery ? 0 : 30;
    const devlieryCharges =  freeDevlivery > 0 ? charge : 0;

    const handleProceedToPay = async () => {
        debugger;
        if (addressRef.current && paymentRef.current) {
            await addressRef.current.validateForm();
            const paymentMethod = paymentRef?.current?.getPaymentMethod();

            const checkoutObj = {
                address: {
                    billingInfoId: Address?.id
                },
                payment: {
                    paymentSuccess: true,
                    paymentMethod
                },
                itemOrder: {
                    couponCode: couponData?.couponCode,
                    deliveryCharges: devlieryCharges,
                    tax:taxAmount
                }
            };

            // if (!addressRef.current.isValid()) {
            //     alert('Please enter a valid address.');
            //     return;
            // }

            if (!paymentMethod) {
                setOrderSubmit(false);
                alert('Please select a payment method.');
                return;
            }

            setOrderSubmit(true);
            // store.dispatch(submitOrder(checkoutObj));
            const { status, data: Order, message } = await apiSubmitOrder(checkoutObj);

            if (!Order && status === 400) {
                setOrderSubmit(false);
                alert(message);
                return;
            }

            if (!isAdmin && paymentMethod && Order) {
                // debugger;
                // Address form is valid and payment method is selected
                console.log('Address:', addressRef.current.values);
                console.log('Payment Method:', paymentMethod);
                // dispatch(setAddress(addressRef.current.values));
                // Proceed with payment
                if (paymentMethod === 'stripe') {
                    // Handle Stripe payment
                    paymentRef.current.createStripePayment(Order, cartTotal + devlieryCharges - discountAmount + taxAmount);
                } else if (paymentMethod === 'paypal') {
                    paymentRef.current.redirectToPayPal(Order, cartTotal + devlieryCharges - discountAmount + taxAmount);
                }
                // setOrderSubmit(false);
            } else {
                setOrderSubmit(false);
                if (isAdmin && Order) {
                    navigate(`/orderConfirmation/${Order.autoOrderId}`);
                } else {
                }
                // Show validation errors or select a payment method
            }
        }
    };
console.log(Address,'addressRef.current.values');
    return (
        <>
            <CartHead>
                <Container
                    sx={{
                        padding: '20px 0px !important',
                        flexDirection: 'row',
                        [theme.breakpoints.down('sm')]: {
                            padding: '20px 0px'
                        }
                    }}
                >
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            [theme.breakpoints.down('sm')]: {
                                padding: '0px 2rem'
                            }
                        }}
                    >
                        <Typography variant="h4" component="h2" gutterBottom>
                            Checkout
                        </Typography>
                    </Stack>
                </Container>
            </CartHead>
            <Container>
                {/* <Typography variant="h4" gutterBottom>
        Checkout
    </Typography> */}
                <Grid
                    container
                    spacing={3}
                    sx={{
                        [theme.breakpoints.down('sm')]: {
                            flexWrap: 'wrap-reverse'
                        }
                    }}
                >
                    <Grid sx={{ boxShadow: 'none' }} item xs={12} md={7}>
                        <Box sx={{ padding: '0px', position: 'relative', paddingTop: '20px' }}>
                            <BillingAddress ref={addressRef} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <CartItemsView selectedPaymentMethod={selectedPaymentMethod} />
                    
                        {CartItems.length && devlieryCharges > 0 &&  <FreeDeliveryProgress />}
                        <ApplyCoupon />
                        <Box sx={{ margin: '20px 0px 50px 0px', border: '0px solid rgba(227, 232, 239, 0.6)' }}>
                            <Paper
                                elevation={3}
                                style={{ background: '#212129', padding: '20px', marginTop: '40px', borderRadius: '10px' }}
                            >
                                {/* <CartItems /> */}
                                {<PaymentSection ref={paymentRef} />}
                                {!submitLoading && (
                                    <Button
                                        sx={{
                                            background: '#f89b35',
                                            width: '100%',
                                            color: '#212121',
                                            padding: '10px 50px',
                                            fontWeight: '600',
                                            fontSize: '18px',
                                            ':hover': { background: '#f89b35' }
                                        }}
                                        variant="contained"
                                        fullWidth
                                        onClick={handleProceedToPay}
                                    >
                                        Proceed to Pay
                                    </Button>
                                )}
                                {submitLoading && (
                                    <Button
                                        sx={{
                                            background: '#52cd70',
                                            width: '100%',
                                            color: '#FFFFFF',
                                            padding: '10px 50px',
                                            fontWeight: '600',
                                            fontSize: '18px',
                                            ':hover': { background: '#52cd70' }
                                        }}
                                        variant="contained"
                                        fullWidth
                                    >
                                        Redirecting to payment
                                    </Button>
                                )}
                            </Paper>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 16 }}>
            <PaymentSection ref={paymentRef} />
            <Button color="primary" variant="contained" fullWidth onClick={handleProceedToPay}>
                Proceed to Pay
            </Button>
        </Paper>
    </Grid> */}
                </Grid>
            </Container>
        </>
    );
};

export default Checkout;
