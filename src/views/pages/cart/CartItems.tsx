import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { store, useSelector } from 'store';
import { CartItem, setCartItem } from 'store/slices/checkout';
import IconProduct from 'assets/images/landing/imagecart.png';
import useCartTotal from 'hooks/useCart';

const ProdectText = styled(Stack)(({ theme }) => ({
    width: '70%',
    span: { fontSize: '12px', lineHeight: '14px', fontWeight: '500' }
}));

const CartItems = () => {
    const { CartItems } = useSelector((state) => state.checkout);
    const cartTotal = useCartTotal(CartItems);

    return (
        <>
            {/* <Typography variant="h4" component="h2" gutterBottom>
                Cart Products44
            </Typography> */}

            <List sx={{ display: 'flex', gap: '15px', flexDirection: 'column', paddingBottom: '10px', border: '0px' }}>
                {CartItems.map((item, index) => (
                    <ListItem key={index} divider sx={{ paddingLeft: '0px', paddingRight: '0px', borderBottom: '1px solid #12121214' }}>
                        <Box sx={{ display: 'flex', width: '100%', gap: '15px', alignItems: 'flex-start' }}>
                            <Stack sx={{ position: 'relative' }}>
                                <img src={IconProduct} alt="" width="50" style={{ border: '1px solid #ffb001', borderRadius: '5px' }} />
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        background: '#ffb001',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#212121',
                                        width: '20px',
                                        height: '20px',
                                        fontSize: '12px',
                                        display: 'flex',
                                        fontWeight: '600',
                                        borderRadius: '100px'
                                    }}
                                >
                                    {item.quantity}
                                </Typography>
                            </Stack>
                            <ProdectText>
                                <ListItemText sx={{ fontSize: '14px', color: '#fff' }} primary={item.name} />
                            </ProdectText>
                            <Stack>
                                <Typography sx={{ color: '#fff' }}>{cartTotal}</Typography>
                            </Stack>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </>
    );
};
export default CartItems;
