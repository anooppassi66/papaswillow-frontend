import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
//Page imports
import cartService from 'utils/axios-cart';
import { PaymentSectionRef } from './types/Cart';
import useAuth from 'hooks/useAuth';

const PaymentMethodRadio = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 0px',
    color: '#fff',
    svg: { color: '#fff' },
    [theme.breakpoints.down('sm')]: {
        span: { fontSize: '12px !important' }
    }
}));

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_URL);

const PaymentSection = forwardRef<PaymentSectionRef>((props, ref) => {
    const {
        user: { roleId }
    } = useAuth();
    console.log(roleId, 'useruseruser');
    const isAdmin = roleId === 1;

    const [paymentMethod, setPaymentMethod] = useState<string>(isAdmin ? 'cash' : 'stripe');

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod((event.target as HTMLInputElement).value);
    };
    const redirectToPayPal = async (amount: number): Promise<void> => {
        try {
            // Create order in your server
            const {
                data: { orderID }
            } = await cartService.post('/api/v1/cart/create-paypal-order', {
                amount: amount, // Replace with your order amount
                currency: 'USD' // Replace with your currency
            });
            // debugger;
            window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`;
        } catch (error) {
            console.error('Error redirecting to PayPal:', error);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createStripePayment = async (Order: any, amount: number): Promise<void> => {
        try {
            const stripe = await stripePromise;
            // Call your backend to create a Checkout Session
            const {
                data: { id }
            } = await cartService.post('/api/v1/cart/create-checkout-session', {
                amount: amount,
                Order
            });
            console.log(id, 'checkout session id');
            // debugger;
            // Redirect to Stripe Checkout
            const { error } = (await stripe?.redirectToCheckout({ sessionId: id })) ?? {};
            if (error) {
                console.error('Error redirecting to Checkout:', error);
            }
        } catch (error) {
            console.error('Error creating Stripe payment:', error);
        }
    };

    useImperativeHandle(ref, () => ({
        getPaymentMethod: (): string => paymentMethod,
        createStripePayment,
        redirectToPayPal
    }));

    return (
        <Stack className="111">
            <Typography variant="h6" gutterBottom sx={{ color: '#f89b35', fontWeight: '600', fontSize: '22px', padding: '0px' }}>
                Payment Methods
            </Typography>
            <Typography sx={{ color: '#fff', fontSize: '10px' }}>All transactions are secure and encrypted.</Typography>
            <FormControl component="fieldset">
                <Stack className="343434" sx={{ display: 'flex', flexDirection: 'row' }}>
                    <RadioGroup
                        sx={{ display: 'flex', flexDirection: 'row', padding: '10px 0px', color: '#fff' }}
                        value={paymentMethod}
                        onChange={handlePaymentChange}
                    >
                        <PaymentMethodRadio>
                            {(
                                <>
                                    <FormControlLabel
                                        sx={{ fontSize: '12px', fontWeight: '400', padding: '0px !important' }}
                                        value="stripe"
                                        control={<Radio />}
                                        label="Pay with Stripe"
                                    />
                                    <FormControlLabel
                                        sx={{ fontSize: '12px', fontWeight: '400', padding: '0px !important' }}
                                        value="paypal"
                                        control={<Radio />}
                                        label="Pay with PayPal"
                                    />
                                </>
                            )}
                            {isAdmin && (
                                <>
                                    <FormControlLabel
                                        sx={{ fontSize: '12px', fontWeight: '400', padding: '0px !important' }}
                                        value="cash"
                                        control={<Radio />}
                                        label="Cash"
                                    />
                                    {/* <FormControlLabel
                                        sx={{ fontSize: '12px', fontWeight: '400', padding: '0px !important' }}
                                        value="zelle"
                                        control={<Radio />}
                                        label="Zelle"
                                    /> */}
                                </>
                            )}
                        </PaymentMethodRadio>
                    </RadioGroup>
                </Stack>
            </FormControl>
        </Stack>
    );
});

export default PaymentSection;
