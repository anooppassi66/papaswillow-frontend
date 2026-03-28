import { useEffect, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';


// material-ui
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import Header from './Header';
import Sidebar from './Sidebar';
import HorizontalBar from './HorizontalBar';
import MainContentStyled from './MainContentStyled';
import Loader from 'ui-component/Loader';
import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// types
import { MenuOrientation } from 'types/config';
import Footer from './Footer';
import { ThemeMode } from 'types/config';
import { HeaderTopMenu } from 'views/pages/Static/HeaderTopMenu';
import { productsFromCartApi } from 'store/slices/checkout';
import { store } from 'store';
import { getNotification, wishlistList, getBannerDetails } from 'store/slices/productStore';
import useAuth from 'hooks/useAuth';
import { getAddressList } from 'store/slices/addressStore';
import GuaranteedImg from 'assets/images/landing/price-matchnew.png';

// import { FooterMenu } from 'views/pages/Static/FooterMenu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
   
    const { borderRadius, miniDrawer, menuOrientation } = useConfig();
    const { menuMaster, menuMasterLoading } = useGetMenuMaster();
    const drawerOpen = menuMaster?.isDashboardDrawerOpened;
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        handlerDrawerOpen(!miniDrawer);
    }, [miniDrawer]);

    useEffect(() => {
        downMD && handlerDrawerOpen(false);
    }, [downMD]);
    useEffect(() => {
        if (isLoggedIn) {
            store.dispatch(productsFromCartApi());
            store.dispatch(wishlistList());
            store.dispatch(getAddressList());
        }
    }, [isLoggedIn]);
    useEffect(() => {
        store.dispatch(getNotification());
        store.dispatch(getBannerDetails());
    }, []);

    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

    // horizontal menu-list bar : drawer
    const menu = useMemo(() => (isHorizontal ? <HorizontalBar /> : <Sidebar />), [isHorizontal]);

    if (menuMasterLoading) return <Loader />;
    console.log(ThemeMode.DARK);

    return (
        <Box 
            sx={{
                display: 'flex'
            }}
        >
            {/* header */}
            <AppBar
                enableColorOnDark
                //position="relative"
                color="inherit"
                elevation={0}
                sx={{
                    background: '#000000',
                    //background: '#fff',
                    minHeight: '150px',
                    justifyContent: 'center',
                    [theme.breakpoints.down('sm')]: {
                        minHeight: '120px',
                    }
                }}
            >
                <Toolbar sx={{ p: isHorizontal ? 1.25 : 2, display: 'flex', flexDirection: 'column' }}>
                     <HeaderTopMenu  />
                  
                    <Header />
                </Toolbar>
            </AppBar>

            {/* menu / drawer */}
            {menu}

            {/* main content */}
            <MainContentStyled {...{ borderRadius, menuOrientation, open: drawerOpen, theme }}>
                <Outlet />
                {/* <Box sx={{position:'fixed', zIndex:'999', left: '0px', bottom: '0px'}}>
                <img className="cover" src={GuaranteedImg} style={{width:'130px'}} alt="" />
                

                </Box> */}
                <Box
                    sx={{
                        mt: 1,
                        py: 8.5,
                        paddingTop: '0px',
                        flexDirection: 'column',
                        display: 'flex',
                        pb: 0
                    }}
                ></Box>
                <Footer />
            </MainContentStyled>
        </Box>
    );
};

export default MainLayout;
