import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { store, useSelector } from 'store';
// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import EmptyCartIcon from 'assets/images/landing/empty-cart.png';

//Page imports
import { addProductsToCartApi, CartItem, deleteProductsToCartApi, productsFromCartApi, setCartItem } from 'store/slices/checkout';
import IconProduct from 'assets/images/landing/imagecart.png';
//third party imports
import { IconTrash } from '@tabler/icons-react';
import useCartTotal from 'hooks/useCart';
import { PriceCard } from '../products/subcard/priceCard';
import { displayPrice } from 'utils/util';
import useItemPrice from 'hooks/useItemPrice';
import useProductPrice from 'hooks/useItemPrice';
import FreeDeliveryProgress from './FreeDeliveryProgress';
import Variant from './Variant';
// import useFetchProductDetails from 'hooks/useFetchProductDetails';
const CartHead = styled(Stack)(({ theme }) => ({
    background: '#212129',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

const CartHeadContainer = styled(Container)(({ theme }) => ({
    padding: '20px 0px',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
        padding: '20px 0px'
    }
}));

CartHeadContainer;

const CheckoutBtn = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        padding: '0px 2rem'
    },
    gap: '30px',
    marginTop: '30px',
    marginBottom: '30px',
    '.checkout': {
        background: '#f89b35',
        padding: '5px 35px',
        height: '45px',
        color: '#212121',
        fontWeight: '700',
        borderRadius: '0px',
        textTransform: 'uppercase'
    }
}));

const ProdectPrice = styled(Stack)(({ theme }) => ({
    paddingLeft: '4rem',
    width: '100%',
    textAlign: 'right',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: '20px',
    fontWeight: '600',
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
    img: {
        // aspectRatio: 'auto 150 / 150',
        border: '1px solid #f89b35',
        borderRadius: '5px',
        width: '130px',
        height:'100px',
        maxWidth:'100%',
        aspectRatio: 'auto 140 / 140',
        [theme.breakpoints.down('sm')]: {   
            height: 'auto',
            maxWidth: '100%',
            width: '100px'
        }
    }
}));

const ProductNameText = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: '600',
    marginTop: '4px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        marginTop: '0px'
    }
}));

const ProductPriceText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '400',
    marginTop: '4px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
        fontWeight: '500'
    }
}));

const ProductWeightText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '400',
    marginTop: '4px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
        fontWeight: '500'
    }
}));

const ProductSizeText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '400',
    marginTop: '4px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
        fontWeight: '500'
    }
}));

const RemoveIconButton = styled(IconButton)(({ theme }) => ({
    color: '#000',
    width: '60px',
    height: '40px',
    [theme.breakpoints.down('sm')]: {
        width: '35px'
    }
}));

const ProductQuantityText = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    fontSize: '16px',
    color: '#000',
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    height: '40px',
    width: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

const AddIconButton = styled(IconButton)(({ theme }) => ({
    color: '#000',
    width: '60px',
    height: '40px',
    [theme.breakpoints.down('sm')]: {
        width: '35px'
    }
}));

const CartProductList = styled(List)(({ theme }) => ({
    gap: '0px',
    display: 'flex',
    flexDirection: 'column',
    borderTop: '2px solid #12121214',
    borderBottom: '1px solid #12121214',
    padding: '2rem 0px',
    [theme.breakpoints.down('sm')]: {
        padding: '1rem'
    }
}));

const CartProductListItem = styled(ListItem)(({ theme }) => ({
    padding: '20px 0px',
    borderBottom: '1px solid  #3a3a3a'
}));

const QuanityBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '50px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const TrashIconButton = styled(IconButton)(({ theme }) => ({
    color: '#fff'
}));

const CartTotalView = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '0px 0px 30px 0px',
    gap: '20px',
    justifyContent: 'flex-end',
    borderBottom: '1px solid  #3a3a3a',
    [theme.breakpoints.down('sm')]: {
        padding: '0px 2rem'
    }
}));

const YourCartContinue = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: '0px 2rem'
    }
}));

const HeadCartText = styled(Typography)(({ theme }) => ({
    fontSize: '28px',
    color: '#fff',
    fontWeight: '500',
    padding: '20px 0px',
    [theme.breakpoints.down('sm')]: {
        padding: '0px 0px',
        fontSize: '18px'
    }
}));

const ShoppingButton = styled(Button)(({ theme }) => ({
    background: 'none',
    border: '1px solid #f89b35',
    color: '#fff',
    fontSize: '14px',
    height: '40px',
    padding: ' 20px 40px',
    fontWeight: '400',
    borderRadius: '0px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        padding: ' 20px 20px'
    }
}));

const ShoppingLink = styled(Link)(({ theme }) => ({
    background: 'none',
    border: '1px solid #f89b35',
    color: '#fff',
    fontSize: '14px',
    height: '40px',
    padding: ' 10px 40px',
    fontWeight: '400',
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

const LinkButton = styled(Link)(({ theme }) => ({
    background: '#f89b35 !important',
    padding: '5px 35px !important',
    height: '45px',
    color: '#212121 !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    borderRadius: '0px',
    textTransform: 'uppercase',
    ':hover': { backgroundColor: '#ffc032 !important' }
}));

const CartTotalText = styled(Typography)(({ theme }) => ({
    fontWeight: '700',
    color: '#fff',
    fontSize: '20px'
}));

const CartTotalAmountText = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    color: '#fff',
    fontSize: '22px'
}));

const Cart = () => {
    const { CartItems } = useSelector((state) => state.checkout);
    const theme = useTheme();
    console.log(CartItems, 'CartItems');
    // const { ProductDetails }: { ProductDetails: CartItem[] } = useFetchProductDetails(CartItems) || [];
    const cartTotal = useCartTotal(CartItems);
    console.log(cartTotal, 'cartTotal');

    const handleIncCartItems = (item: CartItem) => {
        const { name, cartId } = item;
        store.dispatch(addProductsToCartApi({ name, quantity: 1, cartId }));
        // store.dispatch(setCartItem({ ...item, quantity: !!quantity ? ++quantity : 0 }));
    };
    const handleDecCartItems = (item: CartItem) => {
        const { name, quantity, cartId } = item;
        if (quantity <= 1) return;
        // debugger;
        store.dispatch(addProductsToCartApi({ name, quantity: -1, cartId }));
    };
    const handleDeleteItem = (item: CartItem) => {
        // debugger;
        const { name, cartId } = item;
        store.dispatch(deleteProductsToCartApi({ name, cartId }));
    };
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

    // const updateVariant = (attributeName: string, attributeValue: any, attributePrice: any, attributeSalePrice: any) => {
    //     setVariants((prevVariants) => ({
    //         ...prevVariants,
    //         [attributeName]: attributeValue
    //     }));
    //     debugger;
    //     setPrice(attributePrice);
    //     setSalePrice(attributeSalePrice);
    // };

    console.log(CartItemsData, 'CartItemsData');
    return (
        <>
            <CartHead>
                <CartHeadContainer>
                    <YourCartContinue>
                        <HeadCartText gutterBottom>Your cart</HeadCartText>
                        {/* <ShoppingButton className="shoppingcart">Continue shopping</ShoppingButton> */}
                        <ShoppingLink to="/" underline="hover" component={RouterLink}>
                            Continue shopping
                        </ShoppingLink>
                    </YourCartContinue>
                </CartHeadContainer>
            </CartHead>
            <Container sx={{ padding: '0px 0px' }}>
                <Box sx={{ display: { xs: 'block', md: 'none' }, padding: '0px 10px' }}>
                    {CartItems.length > 0 && <FreeDeliveryProgress />}
                </Box>
                {/* {CartItems.length > 0 && <FreeDeliveryProgress />} */}
                {CartItems.length === 0 && (
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
                            Cart items not available
                        </Typography>
                        <EmptyCartLink to="/" underline="hover" component={RouterLink}>
                            {' '}
                            Continue shopping
                        </EmptyCartLink>
                    </Stack>
                )}
                <CartProductList>
                    {CartItemsData.map((item, index) => (
                        <CartProductListItem key={index} divider>
                            <Box display="flex" alignItems="center" width="100%">
                                <Grid container sx={{}} spacing={{ xs: 0, sm: 0 }}>
                                    <Grid item md={6} sm={12} xs={12} sx={{ gap: '15px' }}>
                                        <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <ProductAddImg>
                                                <img src={item.image} alt="" />
                                            </ProductAddImg>
                                            <Stack sx={{ paddingLeft: '1rem', width: '100%' }}>
                                                <ProductNameText> {item.name}</ProductNameText>
                                                {item.content && <Typography sx={{fontSize:'12px', fontWeight:'600', color:'#fff', marginTop:'5px',}}>{item.content}</Typography>}
                                                {/* <ProductPriceText>{displayPrice(item.price)}</ProductPriceText> */}
                                                {/* <PriceCard item={item} /> */}
                                                {item?.attributesData && <Variant variants={item.attributesData} />}
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item md={4} sm={6} xs={6} sx={{ gap: '15px', display: 'flex', alignItems: 'center' }}>
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
                                            <QuanityBox>
                                                <RemoveIconButton onClick={() => handleDecCartItems(item)}>
                                                    <RemoveIcon />
                                                </RemoveIconButton>
                                                <ProductQuantityText>{item.quantity}</ProductQuantityText>
                                                <AddIconButton onClick={() => handleIncCartItems(item)}>
                                                    <AddIcon />
                                                </AddIconButton>
                                            </QuanityBox>
                                            <TrashIconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item)}>
                                                <IconTrash />
                                            </TrashIconButton>
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={6}
                                        xs={6}
                                        sx={{
                                            gap: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            [theme.breakpoints.down('sm')]: {
                                                paddingLeft: '0rem',
                                                gap: '10px',
                                                marginTop: '20px'
                                            }
                                        }}
                                    >
                                        <ProdectPrice>{displayPrice(item.productTotal)}</ProdectPrice>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CartProductListItem>
                    ))}
                </CartProductList>
                {CartItems.length > 0 && (
                    <>
                        <CartTotalView>
                            <CartTotalText>Total:</CartTotalText>
                            <CartTotalAmountText>${cartTotal}</CartTotalAmountText>
                        </CartTotalView>
                        <CheckoutBtn display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="contained" component={LinkButton} to="/checkout" sx={{}}>
                                Proceed To Checkout
                            </Button>
                        </CheckoutBtn>
                    </>
                )}
            </Container>
        </>
    );
};
export default Cart;
