import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

/* images */

import ProductModel from 'types/products/ProductModel';

import { PriceCard } from './priceCard';

// =============================|| Fetured SECTION ||============================= //

// <newIconText>New</newIconText>
// <OfferIconText>23% Off</OfferIconText>
// <saleIconText>SALE</saleIconText>

const ProductCardView = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px'
}));

const LinkButton = styled(Link)(({ theme }) => ({
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
    ':hover': {
        backgroundColor: 'rgba(251, 221, 155, 0.5) !important'
    }
}));

const Amounttext = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    paddingTop: '15px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        paddingTop: '8px'
    }
}));

const ProductCardSearch = styled(Stack)(({ theme }) => ({
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
    paddingTop: '5px',
    borderBottom: '1px solid #dedede',
    paddingBottom: '5px',
    p: { color: '#000 !important' },
    '.pricetext': {
        fontSize: '12px',
        fontWight: '600',
        width: '150px',
        textAlign: 'right',
        paddingRight: '0px'
    }
}));

const ProductNameText = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '0px',
    color: '#000',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
    width: '100%'
}));

export const SearchProductCard = (product: ProductModel) => {
    const { id, name, price, salePrice, image } = product.item;
    const theme = useTheme();

    const item = { price, salePrice };
    return (
        <ProductCardView className="" sx={{}}>
            <ProductCardSearch sx={{}}>
                <Button component={LinkButton} to={`/product/${name}`}>
                    <img src={image} alt="" width="25" height="25" />
                    <ProductNameText>{name}</ProductNameText>
                    {/* <PriceCard item={item} /> */}
                </Button>
            </ProductCardSearch>
        </ProductCardView>
    );
};
