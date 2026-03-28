import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { store, useSelector } from 'store';
// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

//Page imports

import IconProduct from 'assets/images/landing/imagecart.png';
import EmptyCartIcon from 'assets/images/landing/empty-cart.png';
//third party imports
import { IconTrash } from '@tabler/icons-react';

import { PriceCard } from '../products/subcard/priceCard';
import { displayPrice } from 'utils/util';
import { wishlistRemove } from 'store/slices/productStore';
import ProductModel from 'types/products/ProductModel';

// import useFetchProductDetails from 'hooks/useFetchProductDetails';
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
            padding: '0px 0px'
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
        textTransform: 'uppercase'
    }
}));
const ShoppingLink = styled(Link)(({ theme }) => ({
    background: 'none',
    border: '1px solid #f89b35',
    color: '#fff',
    fontSize: '14px',
    height: '45px',
    padding: ' 10px 40px',
    fontWeight: '500',
    borderRadius: '0px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    ':hover': { textDecoration: 'none' },
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        padding: ' 10px 20px'
    }
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

const ProdectPrice = styled(Stack)(({ theme }) => ({
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
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

const ProductAddImg = styled(Stack)(({ theme }) => ({
    '.cartimg': {
        aspectRatio: 'auto 150 / 150',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
            maxWidth: '100%'
        }
    }
}));

const Wishlist = () => {
    const userFavorites = useSelector((state) => state.store.userFavorites);
    const theme = useTheme();

    const handleRemoveItem = (item: Pick<ProductModel, 'name' | 'price' | 'salePrice'>) => {
        const { name } = item;
        store.dispatch(wishlistRemove(name));
    };
    console.log(userFavorites?.length, 'userFavorites');
    return (
        <>
            <CartHead>
                <Container
                    sx={{
                        padding: '40px 0px',
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
                            Wishlist
                        </Typography>
                        <ShoppingLink to="/" component={RouterLink}>
                            Continue shopping
                        </ShoppingLink>
                    </Stack>
                </Container>
            </CartHead>
            <Container sx={{ padding: '0px 0px' }}>
                <List
                    sx={{
                        gap: '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderTop: '2px solid #12121214',
                        borderBottom: '1px solid #12121214',
                        padding: '2rem 0px',
                        [theme.breakpoints.down('sm')]: {
                            padding: '1rem'
                        }
                    }}
                >
                    {(userFavorites?.length === 0 || !userFavorites) && (
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
                                Wishlist items not available
                            </Typography>
                            <EmptyCartLink to="/" underline="hover" component={RouterLink}>
                                {' '}
                                Continue shopping
                            </EmptyCartLink>
                        </Stack>
                    )}
                    {userFavorites?.length !== 0 &&
                        userFavorites.map(({ Product }, index) => (
                            <ListItem sx={{ padding: '20px 0px', borderBottom: '1px solid  #3a3a3a' }} key={index} divider>
                                <Box display="flex" alignItems="center" width="100%">
                                    <Grid container sx={{}} spacing={{ xs: 0, sm: 0 }}>
                                        <Grid item md={6} sm={12} xs={12} sx={{ gap: '15px' }}>
                                            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <ProductAddImg>
                                                    <img
                                                        src={IconProduct}
                                                        alt=""
                                                        width="130"
                                                        className="cartimg"
                                                        style={{ border: '1px solid #ffb001', borderRadius: '5px' }}
                                                    />
                                                </ProductAddImg>
                                                <Stack sx={{ paddingLeft: '1rem', width: '100%' }}>
                                                    {/* {/ <ListItemText sx={{ fontSize: '16px', fontWeight: '400', color: '#fff' }} primary={item.name} /> /} */}
                                                    <Typography
                                                        sx={{
                                                            fontSize: '18px',
                                                            fontWeight: '600',
                                                            marginTop: '4px',
                                                            color: '#fff',
                                                            [theme.breakpoints.down('sm')]: {
                                                                fontSize: '12px',
                                                                marginTop: '0px'
                                                            }
                                                        }}
                                                    >
                                                        {Product.name}
                                                    </Typography>
                                                    {/* <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                            marginTop: '4px',
                                                            color: '#fff',
                                                            [theme.breakpoints.down('sm')]: {
                                                                fontSize: '10px',
                                                                fontWeight: '500'
                                                            }
                                                        }}
                                                    >
                                                        {displayPrice(Product.price ?? 0)}
                                                    </Typography> 
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                            marginTop: '4px',
                                                            color: '#fff',
                                                            [theme.breakpoints.down('sm')]: {
                                                                fontSize: '10px',
                                                                fontWeight: '500'
                                                            }
                                                        }}
                                                    >
                                                        Weight:Light ( 2.6-2.9){' '}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                            marginTop: '4px',
                                                            color: '#fff',
                                                            [theme.breakpoints.down('sm')]: {
                                                                fontSize: '10px',
                                                                fontWeight: '500'
                                                            }
                                                        }}
                                                    >
                                                        Size:SH - Short Handle (Regular Adult Cricket Bat){' '}
                                                    </Typography>*/}
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item md={4} sm={6} xs={6} sx={{ gap: '15px' }}>
                                            <Stack
                                                sx={{
                                                    paddingLeft: '3rem',
                                                    flexDirection: 'row',
                                                    gap: '20px',
                                                    [theme.breakpoints.down('sm')]: {
                                                        paddingLeft: '0rem',
                                                        gap: '10px',
                                                        marginTop: '20px'
                                                    }
                                                }}
                                            >
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleRemoveItem(Product)}
                                                    sx={{ color: '#fff' }}
                                                >
                                                    <IconTrash />
                                                </IconButton>
                                            </Stack>
                                        </Grid>
                                        {/* <Grid
                                            item
                                            md={2}
                                            sm={6}
                                            xs={6}
                                            sx={{
                                                gap: '15px',
                                                [theme.breakpoints.down('sm')]: {
                                                    paddingLeft: '0rem',
                                                    gap: '10px',
                                                    marginTop: '20px'
                                                }
                                            }}
                                        >
                                            <ProdectPrice sx={{ paddingLeft: '4rem', width: '100%', textAlign: 'right' }}>
                                                <PriceCard item={Product} />
                                            </ProdectPrice>
                                        </Grid> */}
                                    </Grid>
                                </Box>
                            </ListItem>
                        ))}
                </List>
                <Box
                    sx={{
                        display: 'flex',
                        padding: '20px 0px',
                        gap: '20px',
                        justifyContent: 'flex-end',
                        borderBottom: '1px solid #ffffff14',
                        [theme.breakpoints.down('sm')]: {
                            padding: '0px 2rem'
                        }
                    }}
                ></Box>
            </Container>
        </>
    );
};
export default Wishlist;
