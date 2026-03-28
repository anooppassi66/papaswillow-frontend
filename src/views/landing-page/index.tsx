import { useEffect } from 'react';
import { store, useSelector } from 'store';

/*api calls*/
//import { featuredProducts } from 'store/slices/home';

/*material <Ui*/
import Box from '@mui/material/Box';

/*components*/
import BannerDashBoard from 'ui-component/banner/BannerDashBoard';
import CategoriesCardSection from 'ui-component/cards/Categories';
import OurBrands from 'ui-component/cards/OurBrands';
import CustomerRatings from 'ui-component/gameproviders/CustomerRatings';
import { SliderProducts } from 'views/pages/products/SliderProducts';
import HomeProducts from 'views/pages/products/HomeProducts';
import LimitedDiscount from 'views/pages/products/LimitedDiscount';
import { SliderNoWrapProducts } from 'views/pages/products/SliderNoWrapProducts';
import WhyChoose from 'ui-component/cards/WhyChoose';
import InstagramFollowe from 'views/pages/products/InstagramFollowe';
import { homeProducts } from 'store/slices/productStore';

// ==============================|| Home Page ||============================== //
const LandingPage = () => {
    const { FeaturedProducts, DiscountProducts, HotDeals, isLoading, isSuccess } = useSelector((state) => state.store.products);
    console.log('55featuredProductsfeaturedProducts', FeaturedProducts);
    //hotDealsProducts
    useEffect(() => {
        store.dispatch(homeProducts());
    }, []);

    return (
        <>
            <Box className="2345" sx={{ mb: '20px' }}>
                <BannerDashBoard />
            </Box>
            <SliderProducts
                title="Featured Products"
                url="Featured Products"
                products={FeaturedProducts}
                isLoading={isLoading}
                isSuccess={isSuccess}
                
                
            />
            <HomeProducts />
            {/* <LimitedDiscount/> */}
            {/* <SliderNoWrapProducts
                title={'Discount Products'}
                url="Discount Products"
                products={DiscountProducts}
                isLoading={isLoading}
                isSuccess={isSuccess}
            /> */}
            <CategoriesCardSection />
            <SliderProducts title="Hot Deals" url="Hot Deals" products={HotDeals} isLoading={isLoading} isSuccess={isSuccess} />
            <InstagramFollowe />
            <OurBrands />
            <WhyChoose />
            <CustomerRatings />
        </>
    );
};

export default LandingPage;
