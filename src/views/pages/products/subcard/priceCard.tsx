import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CartItem } from 'store/slices/checkout';
import { displayPrice } from 'utils/util';

// Define the type for the item prop
export type PriceOnlyItem = Pick<CartItem, 'price' | 'salePrice'>;
const StrikePrice = styled(Typography)(({ theme }) => ({
    textDecoration: 'line-through',
    fontSize: '14px',
    paddingRight: '10px',
    margin: '0px 0px',
    fontWeight: '600',
    color: '#ff0000 !important',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
        paddingRight: '0px',
        fontWeight: '500',
    }
}));
const Price = styled(Typography)(({ theme }) => ({
    paddingRight: '10px',
    margin: '0px 0px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        paddingRight: '0px',
        fontWeight: '500',
    }
}));

export const PriceCard = ({ item }: { item: PriceOnlyItem }) => {
    return (
        <>
            {item.salePrice != undefined &&  item.salePrice > 0 && <StrikePrice> {displayPrice(item.price)}</StrikePrice>}

            {<Price className="pricetext"> {displayPrice(item.salePrice || item.price)}</Price>}
        </>
    );
};
