// SVG

export default interface ProductModel {
    id: string;
    name: string;
    image: string;
    price: string;
    salePrice?: string;
    startDate?: string;
    endDate?: string;
    content?: string;
    stockinHand?: number;
    attributesData?: [],
    isFeatured : number
}
