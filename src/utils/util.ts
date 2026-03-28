export const intToOrdinalNumberString = (num: number): string => {
    num = Math.round(num);
    const numString = num.toString();

    if (Math.floor(num / 10) % 10 === 1) {
        return numString + 'th';
    }

    switch (num % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

export const displayPrice = (number: number | string) => {
    if (typeof number === 'number') return `$ ${number.toFixed(2)}`;
    return `$ ${parseFloat(number).toFixed(2)}`;
};

export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // '5 July 2024' format
};
