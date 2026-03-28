import React, { useEffect, useMemo, useState } from 'react';
import { store, useSelector } from 'store';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
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
import Button from '@mui/material/Button';
import IconProduct from 'assets/images/landing/imagecart.png';

//Page Imports

import { orders } from 'store/slices/orders';
import { displayPrice, formatDate } from 'utils/util';
// import { Button } from '@mui/material';
import AddressList from '../address/AddressList';
import { AddressModel } from 'store/slices/addressStore';
import Address from '../address/Address';
import axiosCartServices from 'utils/axios-cart';

const ProdectText = styled(Stack)(({ theme }) => ({
    span: { fontSize: '14px', lineHeight: '14px', fontWeight: '400', color: '#fff' }
}));

const OrderListItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: '0px',
    background: '#212129',
    borderRadius: '10px',
    padding: '20px',
    borderBottom: '1px solid  #3a3a3a'
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
        fontWeight: '400',
        color: '#e23333',
        display: 'flex',
        alignItems: 'center'
    }
}));

const OrderTracking = styled(Stack)(({ theme }) => ({
    '.hh-grayBox': {
        // backgroundColor: '#f8f8f8',
        //marginBottom: '20px',
        //padding: '35px',
        //marginTop: '20px',
    },
    //   '.pt45 ':{
    //     paddingTop: '45px',
    //   },
    '.order-tracking': {
        textAlign: 'center',
        width: '33.33%',
        position: 'relative',
        display: 'block'
    },
    '.order-tracking .is-complete': {
        display: 'block',
        position: 'relative',
        borderRadius: '50%',
        height: '30px',
        width: '30px',
        border: '0px solid #afafaf',
        backgroundColor: '#f7be16',
        margin: '0 auto;',
        transition: 'background 0.25s linear',
        // -webkit-transition: background 0.25s linear;
        zIndex: ' 2'
    },
    '.order-tracking .is-complete:after': {
        display: 'block',
        position: 'absolute',
        content: '""',
        height: '14px',
        width: '7px',
        top: '-2px',
        bottom: '0',
        left: '5px',
        margin: 'auto 0',
        border: '0px solid #afafaf',
        borderWidth: '0px 2px 2px 0',
        transform: 'rotate(45deg)',
        opacity: '0'
    },
    '.order-tracking.completed .is-complete': {
        borderColor: '#089f33',
        borderWidth: '0px',
        backgroundColor: '#089f33'
    },
    '.order-tracking.completed .is-complete:after': {
        borderColor: '#fff',
        borderWidth: '0px 3px 3px 0',
        width: '7px',
        left: '11px',
        opacity: '1'
    },
    '.order-tracking p': {
        color: '#fff',
        fontSize: '16px',
        marginTop: '8px',
        marginBottom: '0',
        lineHeight: '20px'
    },
    '.order-tracking p span': {
        fontSize: '14px'
    },
    '.order-tracking.completed p': {
        color: '#fff'
    },
    '.order-tracking::before': {
        content: '""',
        display: 'block',
        height: '3px',
        width: 'calc(100% - 40px)',
        backgroundColor: '#f7be16',
        top: '13px',
        position: 'absolute',
        left: 'calc(-50% + 20px)',
        zIndex: '0'
    },
    '.order-tracking:first-child:before': {
        display: 'none'
    },
    '.order-tracking.completed:before': {
        backgroundColor: '#089f33'
    }
}));

const OrderListView = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const theme = useTheme();

    useEffect(() => {
        const orderDetails = async () => {
            // debugger;
            const order = await axiosCartServices.get(`/api/v1/ordersinfo/${orderId}`);
            console.log('orderDetails', order.data.data);
            setOrder(order.data.data);
        };
        orderDetails();
    }, [orderId]);
    console.log(order);

    const isOrderProcessed = ['processed', 'shipped', 'delivered']?.includes(order?.orderStatus);

    const isOrderShipped = ['shipped', 'delivered']?.includes(order?.orderStatus);
    const isOrderDelivered = ['delivered']?.includes(order?.orderStatus);
    // debugger;
    return (
        <Grid>
            <Container>
                <List sx={{ display: 'flex', gap: '15px', flexDirection: 'column', border: '0px', marginTop: '20px' }}>
                    <OrderListItem>
                        <Grid container justifyContent={'flex-end'} style={{}}>
                            <Grid item md={5} sm={12} xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                                {/* <AddressList addressList={addressList}/> */}
                                {/* <Address
                                address={addressList[0]}
                                selectedValue={'1'}
                                
                            /> */}
                                {order.addressInfo !== undefined && (
                                    <Stack sx={{ display: 'flex', gap: '10px' }}>
                                        <Typography
                                            sx={{ color: '#fff', fontWeight: '600', fontSize: '18px' }}
                                            variant="h6"
                                            component="div"
                                        >
                                            Shipping Address
                                        </Typography>
                                        <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '12px' }} variant="body2">
                                            {order.addressInfo.firstName} {order.addressInfo.lastName}
                                        </Typography>
                                        <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '12px' }} variant="body2">
                                            {order.addressInfo.address}
                                        </Typography>
                                        <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '12px' }}>
                                            {order.addressInfo.city},{order.addressInfo.state} {order.addressInfo.zipCode}{' '}
                                            {order.addressInfo.country}
                                        </Typography>
                                        {/* <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '12px' }}>
                                        HYDERABAD, TELANGANA 500072 India
                                    </Typography> */}
                                    </Stack>
                                )}
                            </Grid>
                            <Grid item md={4} sm={12} xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                                {/* <Stack sx={{ display: 'flex', gap: '10px', width: '100%' }}>
                                    <Typography sx={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>Payment Methods</Typography>
                                    <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>Visa ending in 2012</Typography>
                                </Stack> */}
                            </Grid>
                            <Grid item md={3} sm={12} xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Stack sx={{ display: 'flex', gap: '10px', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>Order Summary</Typography>
                                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>
                                            Item(s) Subtotal:{' '}
                                        </Typography>
                                        <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>
                                            {displayPrice(order.totalAmount)}
                                        </Typography>
                                    </Stack>
                                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>Tax: </Typography>
                                        <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>$0.00</Typography>
                                    </Stack>
                                    {!!order.couponValue && (
                                        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>Discount: </Typography>
                                            <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>
                                                {displayPrice(order.couponValue)}
                                            </Typography>
                                        </Stack>
                                    )}
                                    {!!order.deliveryCharges && (
                                        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>
                                                Delivery Charges:{' '}
                                            </Typography>
                                            <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: '400' }}>
                                                {displayPrice(order.deliveryCharges)}
                                            </Typography>
                                        </Stack>
                                    )}

                                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Grand Total: </Typography>
                                        <Typography sx={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                                            {' '}
                                            {displayPrice((order.totalAmount ?? 0)+(order.deliveryCharges ?? 0))}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </OrderListItem>
                    <OrderListItem>
                        <OrderTracking className="container" sx={{ width: '100%', display: 'flex' }}>
                            <Stack className="row" sx={{ width: '100%', display: 'flex' }}>
                                <Stack className="col-12 col-md-10 hh-grayBox pt45 pb20">
                                    <Stack
                                        className="row justify-content-between"
                                        sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'row' }}
                                    >
                                        <Stack className={`order-tracking ${isOrderProcessed ? 'completed' : ''}`}>
                                            <span className="is-complete"></span>
                                            <p>
                                                Ordered
                                                <br />
                                                {!!order.processed_date && <span>{formatDate(order.processed_date)}</span>}
                                            </p>
                                        </Stack>
                                        <Stack className={`order-tracking ${isOrderShipped ? 'completed' : ''}`}>
                                            <span className="is-complete"></span>
                                            <p>
                                                Shipped
                                                <br />
                                                {!!order.shipped_date && <span>{formatDate(order.shipped_date)}</span>}
                                            </p>
                                        </Stack>
                                        <Stack className={`order-tracking ${isOrderDelivered ? 'completed' : ''}`}>
                                            <span className="is-complete"></span>
                                            <p>
                                                Delivered
                                                <br />
                                                {!!order.delivered_date && <span>{formatDate(order.delivered_date)}</span>}
                                            </p>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </OrderTracking>
                    </OrderListItem>

                    <OrderListItem sx={{display:'none'}}>
                        <Box sx={{ display: 'flex', width: '100%', gap: '15px', alignItems: 'flex-start', flexDirection: 'column' }}>
                            {order !== undefined &&
                                order.OrderDetails !== undefined &&
                                order.OrderDetails.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        divider
                                        sx={{
                                            paddingLeft: '0px',
                                            paddingRight: '0px',
                                            border: '0px',
                                            width: '100%',
                                            [theme.breakpoints.down('sm')]: {
                                                flexDirection: 'column',
                                                gap: '15px'
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                gap: '15px',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start'
                                            }}
                                        >
                                            <Stack sx={{ position: 'relative' }}>
                                                <img
                                                    src={item.productImage}
                                                    alt=""
                                                    width="50"
                                                    height="40"
                                                    style={{ border: '1px solid #ffb001', borderRadius: '5px' }}
                                                />
                                                <Typography
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '-10px',
                                                        right: '-10px',
                                                        background: '#ffb001',
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
                                                <ListItemText
                                                    sx={{ fontSize: '14px', color: '#fff', fontWeight: '400' }}
                                                    primary={item.productName}
                                                />
                                            </ProdectText>
                                            <ProdectPrice>
                                                {/* <PriceCard item={item} /> */}
                                                {displayPrice(item.totalPrice)}
                                            </ProdectPrice>
                                        </Box>
                                        <Box
                                            sx={{
                                                [theme.breakpoints.down('sm')]: {
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    width: '100%'
                                                }
                                            }}
                                        >
                                            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                                <Button
                                                    sx={{
                                                        border: '1px solid #ffb001',
                                                        width: 'auto',
                                                        color: '#fff',
                                                        padding: '2px 20px',
                                                        fontWeight: '600',
                                                        fontSize: '14px',
                                                        textDecoration: 'none',
                                                        borderRadius: '4px',
                                                        minWidth: '120px',
                                                        ':hover': { textDecoration: 'none' }
                                                    }}
                                                >
                                                    Cancel Item{' '}
                                                </Button>
                                                <Button
                                                    sx={{
                                                        background: '#ffb001',
                                                        width: 'auto',
                                                        color: '#212121',
                                                        padding: '2px 15px',
                                                        fontWeight: '600',
                                                        fontSize: '14px',
                                                        textDecoration: 'none',
                                                        borderRadius: '4px',
                                                        minWidth: '120px',
                                                        ':hover': { textDecoration: 'none', background: '#ffb001' }
                                                    }}
                                                >
                                                    Return Item
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </ListItem>
                                ))}
                        </Box>
                    </OrderListItem>
                </List>
            </Container>
        </Grid>
    );
};
export default OrderListView;
