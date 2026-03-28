import React from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { IconDiscountCheck } from '@tabler/icons-react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const PaymentConfirmation = styled(Stack)(({ theme }) => ({
    displayPrint: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '400px',
    width: '400px',
    padding: '30px',
    borderRadius: '20px',
    border: '2px solid #fff',
    textAlign: 'center',
    background: '#ddd9d9',
    paddingBottom: '80px',
    svg: {
        width: ' 120px',
        height: '120px'
    }
}));

function ConfirmationPage() {
    const { orderId } = useParams<{ orderId: string }>();
    return (
        <>
            <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 0px' }}>
                <PaymentConfirmation>
                    <Stack>
                        <IconDiscountCheck color="#079f44" />
                    </Stack>
                    <Stack sx={{ marginBottom: '20px', marginTop: '30px' }}>
                        <Typography
                            sx={{
                                color: '#079f44',
                                fontSize: '18px',
                                background: '#e8e8e8',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                fontWeight: '900'
                            }}
                        >
                            ORDER # {orderId}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography sx={{ color: '#079f44', fontSize: '28px', paddingTop: '20px', paddingBottom: '40px' }}>
                            Payment Confirmation
                        </Typography>
                        <Typography sx={{ color: '#000', fontSize: '14px', fontWeight: '400', lineHeight: '25px' }}>
                            Your payment was successful! <br />
                            Thank you for your purchase.
                        </Typography>
                    </Stack>
                    <Stack>
                        <Link
                            sx={{
                                background: '#f89b35',
                                width: 'auto',
                                color: '#212121',
                                padding: '5px 15px',
                                fontWeight: '600',
                                fontSize: '12px',
                                marginTop: '20px',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                ':hover': { textDecoration: 'none' }
                            }}
                            to="/"
                            underline="hover"
                            component={RouterLink}
                        >
                            Continue shopping
                        </Link>
                    </Stack>
                </PaymentConfirmation>
            </Stack>
        </>
    );
}

export default ConfirmationPage;
