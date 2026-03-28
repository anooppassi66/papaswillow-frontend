import React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import ProductModel from 'types/products/ProductModel';
import { PriceCard } from './priceCard';
import Button from '@mui/material/Button';
import { IconArrowNarrowRight, IconGardenCart } from '@tabler/icons-react';
import useAuth from 'hooks/useAuth';
import { addProductsToCartApi } from 'store/slices/checkout';
import { store } from 'store';
import { Link } from 'react-router-dom';

const AddOns = styled(Box)(({ theme }) => ({
    marginTop: '20px',
    '.MuiTypography-root': { fontSize: '12px' },
    '.Mui-checked svg path': {
        fill: '#fff'
    }
}));

const LinkButton = styled(Link)(({ theme }) => ({

}));

export const AddOnCard = () => {
    const { isLoggedIn, forceLogin } = useAuth();
    const theme = useTheme();
    const {
        isLoading,
        isSuccess,
        details: { addOnProducts }
    } = useSelector((state: any): any => state.store.productDetail);
    const addToCart = (name: string) => {
        if (!isLoggedIn) {
            // debugger;
            forceLogin(true);
            return;
        }
        const item = { name: name, quantity: 1 };
        store.dispatch(addProductsToCartApi(item));
    };
    return (
        <AddOns>
            <Stack>
                <Typography
                    sx={{
                        fontSize: '20px !important',
                        fontWeight: '600',
                        color: '#f89b35 !important',
                        paddingBottom: '10px'
                    }}
                >
                    Add Ons:
                </Typography>
            </Stack>
            <Stack sx={{ border: '1px solid #d99500', borderRadius: '10px' }}>
                {addOnProducts.map((product: ProductModel | 'stockinHand') => (

                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            //marginBottom: '10px',
                            color: '#fff',
                            gap: '0px',
                            fontSize: '12px',
                            borderBottom: '1px solid #d99500',
                            paddingBottom: '10px',
                            width: 'auto',
                            padding: '10px',
                            ':last-child': { borderBottom: '0px solid #d99500', }

                        }}
                    >
                        <IconArrowNarrowRight /><Button component={LinkButton} to={`/product/${product.name}`} sx={{
                            textOverflow: 'ellipsis', textAlign: 'left', justifyContent: 'left',
                            WebkitLineClamp: '1', overflow: 'hidden', width: '60%', whiteSpace: 'nowrap', color: '#ffb001',
                            ':hover': { background: 'none' },
                            [theme.breakpoints.down('sm')]: {
                                width: '40%',
                            }
                        }}>{product?.name} :</Button>
                        {/* <Stack sx={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>{product.price}</Stack> */}
                        <PriceCard item={{ price: product.price, salePrice: product.salePrice }} />
                        <Button sx={{
                            background: '#ffb001', color: '#000', padding: '5px 8px', minWidth: '30px',
                            ':hover': { background: '#ffb001', color: '#000', }
                        }} onClick={() => (product.quantity > 0 || true ? addToCart(product.name) : null)}>
                            <Typography sx={{ color: '#000 !important', textTransform: 'capitalize' }}>Add Cart</Typography>
                        </Button>
                    </Stack>

                ))}
            </Stack>
        </AddOns>
    );
};
