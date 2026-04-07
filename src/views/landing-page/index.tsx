import { useEffect, useState } from 'react';
import { store, useSelector } from 'store';

/*api calls*/
//import { featuredProducts } from 'store/slices/home';

/*material <Ui*/
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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
    const [popupOpen, setPopupOpen] = useState(true);

    useEffect(() => {
        const handleClick = (e) => {
            const anchor = e.target.closest("a");

            // Exclude tel: and mailto: links so users can still call/email from the popup
            if (anchor && anchor.href && !anchor.href.startsWith("tel:") && !anchor.href.startsWith("mailto:")) {
                e.preventDefault();
                e.stopPropagation(); // Stop React Router from navigating
                handleOpenPopup();
            }
        };

        // Use capture phase to intercept the click before React Router
        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, []);

    console.log('55featuredProductsfeaturedProducts', FeaturedProducts);
    //hotDealsProducts
    useEffect(() => {
        store.dispatch(homeProducts());
    }, []);

    const handleClosePopup = () => {
        setPopupOpen(false);
    };
    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    return (
        <>
            <Dialog open={popupOpen} onClose={handleClosePopup}>
                <DialogTitle sx={{ pb: 1 }}>Game Break! 🏏</DialogTitle>
                <DialogContent>
                    Our website is under maintenance and will be back stronger soon.
                    Meanwhile, you can place your orders by calling <a href="tel:+1 (409) 344-3513">+1 (409) 344-3513</a>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Box className="2345" sx={{ mb: '20px' }} onClick={handleOpenPopup}>
                <BannerDashBoard />
            </Box>
            <SliderProducts
                title="Featured Products"
                url="Featured Products"
                products={FeaturedProducts}
                isLoading={isLoading}
                isSuccess={isSuccess}

            />
            <HomeProducts/>
            {/* <LimitedDiscount/> */}
            {/* <SliderNoWrapProducts
                title={'Discount Products'}
                url="Discount Products"
                products={DiscountProducts}
                isLoading={isLoading}
                isSuccess={isSuccess}
            /> */}
            <CategoriesCardSection/>
            <SliderProducts title="Hot Deals" url="Hot Deals" products={HotDeals} isLoading={isLoading} isSuccess={isSuccess}/>
            <InstagramFollowe/>
            <OurBrands/>
            <WhyChoose/>
            <CustomerRatings/>
        </>
    );
};

export default LandingPage;