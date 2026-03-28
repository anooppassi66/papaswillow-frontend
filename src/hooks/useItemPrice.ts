import { useMemo } from 'react';
import { CartItem } from 'store/slices/checkout';

const useProductPrice = (item: CartItem): number => {
    const { quantity = 0, salePrice, price } = item;

    return useMemo(() => {
        // Default to price if salePrice is not available
        const effectivePrice = salePrice || price || '0';
        return quantity * parseFloat(effectivePrice);
    }, [quantity, salePrice, price]);
};

export default useProductPrice;
