import React, { useEffect, useMemo } from 'react';
import { store, useSelector } from 'store';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import EmptyCartIcon from 'assets/images/landing/empty-cart.png';

//Page Imports

import { orders } from 'store/slices/orders';
import { displayPrice, formatDate } from 'utils/util';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { IconPackage } from '@tabler/icons-react';

const ProdectText = styled(Stack)(({ theme }) => ({
    span: { fontSize: '16px', lineHeight: '16px', fontWeight: '600', color: '#fff' }
}));

const OrderPlaceId = styled(Stack)(({ theme }) => ({
    position: 'relative'
}));

const EmptyCartLink = styled(Link)(({ theme }) => ({
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
}));

const OrderListItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: '0px',
    background: '#212129',
    borderRadius: '10px',
    padding: '20px',
    borderBottom: '1px solid  #3a3a3a'
}));

const OrderView = () => {
    const { Orders: ordersData } = useSelector((state) => state.orders);
    debugger;
    const [value, setValue] = React.useState<number | null>(4);
    console.log(ordersData, 'ordersData');
    useEffect(() => {
        store.dispatch(orders());
    }, []);

    return (
        <Grid>
            <Container>
                <List sx={{ display: 'flex', gap: '15px', flexDirection: 'column', border: '0px', marginTop: '20px' }}>
                    {ordersData.length === 0 && (
                        <>
                            <Stack
                                sx={{
                                    background: '#ddd9d9',
                                    border: '2px solid #fff',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '400px'
                                }}
                            >
                                <img src={EmptyCartIcon} alt="" width="200" />
                                <Typography sx={{ color: '#000', paddingTop: '40px', fontWeight: '400', fontSize: '14px' }}>
                                    Orders not available
                                </Typography>
                                <EmptyCartLink to="/" underline="hover" component={RouterLink}>
                                    {' '}
                                    Continue shopping
                                </EmptyCartLink>
                            </Stack>
                        </>
                    )}
                    {ordersData?.map((item, index) => (
                        <OrderListItem key={index} divider sx={{}}>
                            <Box sx={{ display: 'flex', width: '100%', gap: '15px', alignItems: 'flex-start' }}>
                                <Grid container justifyContent={'left'} style={{ alignItems: 'center' }}>
                                    <Grid item md={5} sm={12} xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <OrderPlaceId sx={{}}>
                                            {/* <img src={item.image} alt="" width="50" style={{ border: '1px solid #ffb001', borderRadius: '5px' }} /> */}
                                            <Link
                                                component={RouterLink}
                                                to={`/order/${item.id}`} // Use template literal to create dynamic route
                                                underline="none" // Optional: Remove underline if desired
                                            >
                                                <Typography sx={{ color: '#fff' }}>ORDER # {item.autoOrderId}</Typography>
                                            </Link>
                                        </OrderPlaceId>
                                    </Grid>
                                    <Grid item md={2} sm={12} xs={12}>
                                        <ProdectText>
                                            <ListItemText primary={displayPrice((item.totalAmount ?? 0) + (item.deliveryCharges ?? 0))} />
                                        </ProdectText>
                                    </Grid>
                                    <Grid
                                        item
                                        md={3}
                                        sm={12}
                                        xs={12}
                                        sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}
                                    >
                                        <Stack sx={{ color: '#22ffad' }}>
                                            <IconPackage />
                                        </Stack>
                                        <Stack sx={{ color: '#fff' }}>
                                            <Stack sx={{ fontSize: '14px', fontWeight: '600' }}>
                                                ORDER PLACED on {formatDate(item.OrderDetails[0]?.createdAt)}
                                            </Stack>

                                            <Stack sx={{ fontSize: '12px', fontWeight: '400' }}>Your item has been {item.itemStatus}</Stack>
                                        </Stack>
                                    </Grid>
                                    {/* <Grid item md={2} sm={12} xs={12}>
                                        <Stack sx={{ width: '120px' }}>
                                            <Button
                                                sx={{
                                                    background: '#c91b22',
                                                    width: 'auto',
                                                    // border:'1px solid #c91b22',
                                                    color: '#fff',
                                                    padding: '3px 3px',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    ':hover': { background: '#ed1d26' }
                                                }}
                                            >
                                                Cancel Product
                                            </Button>
                                        </Stack>
                                        <Stack sx={{ width: '120px', paddingTop: '10px' }}>
                                            <Button
                                                sx={{
                                                    background: '#ffb001',
                                                    width: 'auto',
                                                    color: '#212121',
                                                    padding: '3px 3px',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    ':hover': { background: '#ffb001' }
                                                }}
                                            >
                                                Download Invoice
                                            </Button>
                                        </Stack>
                                    </Grid> */}
                                </Grid>
                            </Box>
                        </OrderListItem>
                    ))}
                    {/* <Box
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
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderTop: '1px solid #3a3a3a',
                                borderBottom: '1px solid #3a3a3a',
                                padding: '8px 0px'
                            }}
                        ></Stack>
                    </Box> */}
                </List>
            </Container>
        </Grid>
    );
};
export default OrderView;
