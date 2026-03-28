import { useMemo } from 'react';

const useDiscount = ({
    couponOptions,
    couponValue,
    discountOnAmount
}: {
    couponOptions: string;
    couponValue: string;
    discountOnAmount: number;
}): number => {
    // Assuming CartItem is correctly imported and defined in 'store/slices/checkout'

    const couponAmount =
        useMemo((): number => {
            if (couponOptions?.toLowerCase() === 'amount') {
                return parseFloat(couponValue);
            } else if (couponOptions?.toLowerCase() === 'percentage') {
                return (discountOnAmount * parseFloat(couponValue)) / 100;
            }
            // if anything goes wrong simply send 0
            return 0;
        }, [discountOnAmount, couponValue, couponOptions]) || 0;

    // Return total as number, formatted to two decimal places
    return couponAmount;
};

export default useDiscount;
