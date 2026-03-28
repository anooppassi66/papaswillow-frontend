import { CartItem } from 'store/slices/checkout';
import { useState, useEffect } from 'react';
import axiosCartServices from 'utils/axios-cart';

const useFetchProductDetails = (products: CartItem[]) => {
    console.log(products, 'products');
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                //http://10.10.11.113:8030/api/v1/cart/cartprodcuts/list?productIds=1,2,3
                const queryString = products.map((product: CartItem) => product.id).join(',') || '';
                const { data } = await axiosCartServices.get(`api/v1/cart/cartprodcuts/list?productIds=${queryString}`);
                setProductDetails(data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [products]);

    return { ProductDetails: productDetails, loading, error };
};

export default useFetchProductDetails;
