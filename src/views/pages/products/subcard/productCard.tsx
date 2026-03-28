// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

// third-party
import { IconEye, IconGardenCart, IconHeart } from '@tabler/icons-react';

/* images */

import ProductModel from 'types/products/ProductModel';
import { store } from 'store';
import { addProductsToCartApi } from 'store/slices/checkout';

import useAuth from 'hooks/useAuth';
import { PriceCard } from './priceCard';
import { productsDetail, wishlistAdd } from 'store/slices/productStore';
import { Link } from 'react-router-dom';

// =============================|| Fetured SECTION ||============================= //

const SaleLable = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: '#fff',
    padding: '5px',
    // position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%',
    zIndex: 99, minHeight:'36px',
}));

// <newIconText>New</newIconText>
// <OfferIconText>23% Off</OfferIconText>
// <saleIconText>SALE</saleIconText>
const NewIconText = styled(Typography)(({ theme }) => ({
    background: '#000',
    padding: '5px',
    fontSize: '12px',
    fontWight: '500',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        padding: '3px',
        fontSize: '10px',
        height: '20px'
    }
}));
const OfferIconText = styled(Typography)(({ theme }) => ({
    background: '#f85464',
    padding: '5px',
    fontSize: '12px',
    fontWight: '500',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        padding: '3px',
        fontSize: '10px',
        height: '20px'
    }
}));
const SaleIconText = styled(Typography)(({ theme }) => ({
    background: '#f89b35',
    padding: '5px',
    fontSize: '12px',
    fontWight: '500',
    color: '#000',
    [theme.breakpoints.down('sm')]: {
        padding: '3px',
        fontSize: '10px',
        height: '20px'
    }
}));

const ProductCardView = styled(Box)(({ theme }) => ({
    background: '#212129',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
        margin: '0px 5px 0px 5px',
        padding: '10px'
        // minHeight: '315px'
    },
    img: {
        aspectRatio: 'auto 107/ 600',
        objectPosition: 'center center',
        objectFit: 'contain !important',
        '--ratio-percent': ' 125.0%',
        display: 'block',
        maxWidth: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%'
    },

    transitionDuration: '.55s',
    borderRadius: '10px',
    // minHeight: '410px',
    '.hover': {
        position: 'absolute',
        display: 'flex',
        transform: 'scale(0, 0)',
        top: '50%',
        //left: '50%',
        gap: '5px',
        flexDirection: 'row',
        justifyContent: 'center',
        transition: 'all 500ms ease'
        //opacity: '0'
    },
    button: {
        borderRadius: '4px',
        background: '#ffb001',
        gap: '5px',
        display: 'flex',
        flexDirection: 'row',
        width: '35px',
        height: '35px',
        minWidth: '35px',
        ':hover': {
            background: '#424242',
            color: '#fff',
            svg: {
                stroke: '#fff',
                width: '20px'
            }
        },
        svg: {
            stroke: '#000',
            width: '20px'
        }
    },

    ':hover': {
        boxShadow: '#00000026 0 50px 95px -15px',
        //transform: 'scaleX(1.05) scaleY(1.05)',
        transitionDuration: '.55s',
        borderRadius: '10px',
        // padding: '10px',
        [theme.breakpoints.down('sm')]: {
            // padding: '5px'
        }
    },

    '&': {
        ':hover': {
            //  transform: 'scale(1, 1)',
            // opacity:'1',
            '.hover': {
                position: 'absolute',
                display: 'flex',
                //transform: 'translate3d(-50%,-50%,0)',
                top: '50%',
                //left: '50%',
                gap: '5px',
                flexDirection: 'row',
                justifyContent: 'center',
                transition: 'all 500ms ease',
                //opacity: '1',
                transform: 'scale(1, 1)',
                button: {
                    borderRadius: '4px',
                    background: '#f89b35',
                    gap: '5px',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '35px',
                    height: '35px',
                    minWidth: '35px',
                    ':hover': {
                        background: '#424242',
                        color: '#fff',
                        svg: {
                            stroke: '#fff',
                            width: '20px'
                        }
                    },
                    svg: {
                        stroke: '#000',
                        width: '20px'
                    }
                }
            }
        }
    }
}));
const LinkButton = styled(Link)(({ theme }) => ({
    borderRadius: '4px',
    background: '#f89b35 !important',
    gap: '5px',
    display: 'flex',
    flexDirection: 'row',
    width: '35px',
    height: '35px',
    minWidth: '35px !important',
    svg: {
        stroke: '#000',
        width: '20px'
    }
}));

const LinkButtonProduct = styled(Link)(({ theme }) => ({

    display: 'flex',
    flexDirection: 'row',
    height:'100%',
    width:'100%',
    position:'relative',
    zIndex:'9'
}));


const Amounttext = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    paddingTop: '0px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        paddingTop: '0px',
        justifyContent: 'space-between'
    }
}));

const ProductTagText = styled(Typography)(({ theme }) => ({
    fontSize: '13px',
    fontWeight: '400',
    marginTop: '5px',
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    textTransform: 'uppercase',
    lineHeight: '16px',
    minHeight: '30px'
}));

const ProductNameText = styled(Typography)(({ theme }) => ({
    // ':after': {
    //     bottom: '0',
    //     content: '""',
    //     left: '0',
    //     position: 'absolute',
    //     right: '0',
    //     top: '0',
    //     zIndex: '1'
    // },
    fontSize: '14px',
    fontWeight: '400',
    marginTop: '10px',
    marginBottom: '5px',
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    textTransform: 'uppercase',
    lineHeight: '16px',
    minHeight: '30px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        marginTop: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical'
    }
}));



export const ProductCard = ({ id, content, name, price, salePrice, image, stockinHand = 0,attributesData,isFeatured }: ProductModel) => {
    const { isLoggedIn, forceLogin } = useAuth();
 
    const theme = useTheme();
    const addToCart = () => {
        if (!isLoggedIn) {
            // debugger;
            forceLogin(true);
            return;
        }
        const item = { name, quantity: 1 };
        store.dispatch(addProductsToCartApi(item));
    };
    const addToWishlist = () => {
        if (!isLoggedIn) {
            forceLogin(true);
            return;
            // alert('Please login');
            // return;
        }

        store.dispatch(wishlistAdd(name));
    };
    const getDiscountPercentage = (originalPrice: number | string, salePrice?: number | string): string => {
        if (salePrice === undefined) {
           return '0';
        }
    
        const original = Number(originalPrice);
        const sale = Number(salePrice);
    
        if (isNaN(original) || isNaN(sale) || original <= 0 || sale < 0) {
            return '0';
        }
    
        const discount = Math.round(((original - sale) / original) * 100);
        return discount.toString();
    };
    const item = { price, salePrice };


    function getProductPrice(product) {
        if (product.attributesData && product.attributesData?.length > 0) {
            // Get the first variant's price and sale price
            const firstVariant = product.attributesData[0];
            return {
                productPrice: firstVariant.attributePrice,
                productSalePrice: firstVariant.attributeSalePrice
            };
        } else {
            // Return root-level price and sale price
            return {
                productPrice: product.price,
                productSalePrice: product.salePrice
            };
        }
    }
    const product = {
        price, salePrice,
        attributesData,
    }
  
    const {productPrice,productSalePrice} = getProductPrice(product);
    const salePercentage =  getDiscountPercentage(productPrice,productSalePrice) || '0';

    return (
        <ProductCardView
           
            sx={{ margin: '0px 5px', position: 'relative', '--ratio-percent': ' 125.0%', overflow: 'hidden', height: '100%' }}
        >
            <Stack
                sx={{
                    textAlign: 'left',
                    position: 'relative',
                    '--ratio-percent': ' 125.0%',
                    transform: 'scaleX(1) scaleY(1)',
                    transitionDuration: '.55s'
                }}
            >
                <SaleLable>
                   {isFeatured > 0 && <NewIconText>New</NewIconText>} 
                   { salePercentage !=='0' && <><OfferIconText>{salePercentage}% Off</OfferIconText> <SaleIconText>SALE</SaleIconText></> } 
                   
                </SaleLable>
                <Stack
                    sx={{
                        transitionDuration: '.55s',
                        transform: 'perspective(0)',

                        width: '100%',
                        display: 'flex',
                        alignItems: 'stretch',
                        ':before': {
                            content: '""',
                            width: '0',
                            height: '0',
                            paddingBottom: '125.0%'
                        }
                    }}
                >
                    <Stack className='33333'
                        sx={{
                            overflow: 'hidden',
                            background: '#fff',
                            zIndex: '0',
                            width: 'calc(100% - 2 * 0px)',
                            position: 'absolute',
                            top: '0',
                            bottom: '0',
                            
                        }}
                    >
                        <Button component={LinkButtonProduct}  to={`/product/${name}`} sx={{'&:hover': {
                                    background: 'none',
                                  
                                }}}>
                        <img
                            className="productimg"
                            src={image}
                            alt=""
                            sizes="(min-width: 1200px) 267px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
                        />
                        </Button>
                    </Stack>
                </Stack>
                <Stack sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    {/* <ProductTagText className="textcontent">{content}</ProductTagText> */}
                    <ProductNameText className="productname">{name}</ProductNameText>
                    <Amounttext>
                        {/* <PriceCard item={item} /> */}
                    </Amounttext>
                </Stack>
            </Stack>
            <Stack className="hover" sx={{ width: '100%', transition: '0.5s ease', }}>
                {/* <Button onClick={() => (stockinHand > 0 || true ? addToCart() : null)}>
                    <IconGardenCart />
                </Button> */}

                <Button onClick={() => addToWishlist()}>
                    <IconHeart />
                </Button>
                <Button component={LinkButton} to={`/product/${name}`}>
                    <IconEye />
                </Button>
            </Stack>
        </ProductCardView>
    );
};
