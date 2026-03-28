import numeral from 'numeral';
export function fNumber(number: string | number) {
    return numeral(number).format();
}
