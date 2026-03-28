import { useMemo } from 'react';
// import { useSelector } from 'react-redux';
import { CartItem } from 'store/slices/checkout';

const useCartTotal = (products: CartItem[]): number => {
    // Assuming CartItem is correctly imported and defined in 'store/slices/checkout'

    const total = useMemo(() => {
        return products.reduce((acc: number, item: CartItem) => {
            // Ensure salePrice and price have default values of 0 if they are undefined

            const item1 = { ...item };
            const vt = item?.attributesData;

            if (vt && vt.length > 0) {
                var { attributePrice, attributeSalePrice } = vt[0];
            }

            const price = item.price != null ? Number(item.price) : 0; // Ensure price is treated as a number
            const salePrice = item.salePrice != null ? Number(item.salePrice) : 0;
            const q = item.quantity ?? 0;
            console.log(price, ' ', q);
            // Calculate total for the current item
            const itemTotal = (attributeSalePrice || attributePrice || salePrice || price) * q;

            // Accumulate the total
            return acc + itemTotal;
        }, 0);
    }, [products]);

    // Return total as number, formatted to two decimal places
    return parseFloat(total.toFixed(2));
};

export default useCartTotal;
