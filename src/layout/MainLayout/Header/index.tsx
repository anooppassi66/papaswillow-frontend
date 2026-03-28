import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { motion } from 'framer-motion';

// project imports
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
import { Link as RouterLink } from 'react-router-dom';
import MobileLogo from 'assets/images/PSW-LOGO-Mobile1.png';

import ProfileSection from './ProfileSection';

import useAuth from 'hooks/useAuth';
import { IconShoppingBag, IconHeart } from '@tabler/icons-react';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// types
import { MenuOrientation, ThemeMode } from 'types/config';
import LoginSection from './LoginSection';
import RegisterSection from './RegistrationSection';

import SearchSection from './SearchSection';
import FreeDeliveryProgress from 'views/pages/cart/FreeDeliveryProgress';

import { DASHBOARD_PATH } from 'config';
import { useEffect, useState } from 'react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const { isLoggedIn, isForceLogin } = useAuth();

    const { mode, menuOrientation } = useConfig();
    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster.isDashboardDrawerOpened;
    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;
    const { balance } = useAppSelector((state: any) => state.wallet);
    const CartItems = useAppSelector((state: any) => state.checkout.CartItems);
    const userFavorites = useAppSelector((state: any) => state.store.userFavorites);
    const [isAnimating, setIsAnimating] = useState(false);

    // const dispatch = useAppDispatch();
    // const { userInfo } = useAppSelector((state: any) => state.auth);
    // const [walletBal, setWalletBal] = useState(0);
    // const [walletId, setWalletId] = useState('');
    // const [walletCurrency, setWalletCurrency] = useState('');
    // const [walletRecords, setWalletRecords] = useState<Array<IWallet>>([]);

    const [loginForceOpen, setLoginForceOpen] = useState(false);
    const [registerForceOpen, setRegisterForceOpen] = useState(false);

    const forceOpen = (type: string) => {
        setLoginForceOpen(false);
        setRegisterForceOpen(false);
        if (type === 'register') {
            setLoginForceOpen(false);
            setRegisterForceOpen(true);
        } else if (type === 'login') {
            setLoginForceOpen(true);
            setRegisterForceOpen(false);
        }
    };

    useEffect(() => {
        if (!CartItems.length) return;
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 500); // duration of the animation
    }, [CartItems]);

    // const getUserWalletInfo = async () => {
    //     const response: any = await getMyWallets();
    //     const wallet = response?.data?.data.filter((wallet: any) => wallet.type === 'REAL');
    //     dispatch(setUserWallet(wallet[0].balance.toFixed(2)));
    //     setWalletBal(wallet[0].balance.toFixed(2));
    //     setWalletId(wallet[0].id);
    //     setWalletCurrency(wallet[0].currency);
    // };

    // const populateWalletList = (data: any) => {
    //     let filteredData = [];
    //     if (userInfo.selectedWalletId !== '') {
    //         filteredData = data.filter((item: any) => item.id === userInfo.selectedWalletId);
    //     } else {
    //         filteredData = data.filter((item: any) => item.type === 'DEMO');
    //     }
    //     setWalletRecords(data);

    //     if (filteredData.length > 0) {
    //         setWalletBal(filteredData[0].balance);
    //         setWalletCurrency(filteredData[0].currency);
    //         setWalletId(filteredData[0].id);
    //         dispatch(setSelectedUserWallet(filteredData[0]));
    //     } else {
    //         setWalletBal(data[0].balance);
    //         setWalletCurrency(data[0].currency);
    //         setWalletId(data[0].id);
    //         dispatch(setSelectedUserWallet(data[0]));
    //     }
    // };

    // const getSelectedWalletInfo = async (data: any) => {
    //     const response = await AuthService.getMyWallets();
    //     if (response.status && response.data.length > 0) {
    //         const filteredData = response.data.filter((item: any) => item.id === data.id);
    //         if (filteredData.length > 0) {
    //             dispatch(setSelectedUserWallet(filteredData[0]));
    //             setWalletBal(filteredData[0].balance);
    //             setWalletId(filteredData[0].id);
    //             setWalletCurrency(filteredData[0].currency);

    //             //Wallet Id Update Start
    //             const res = { selectedWalletId: data.id };
    //             const response = await AuthService.updateUserProfile(res);
    //             //Wallet Id Update End
    //         }
    //     }
    // };
    // useEffect(() => {
    //     if (isLoggedIn) getUserWalletInfo();
    // }, [isLoggedIn]);

    // useEffect(() => {
    //     setWalletBal(balance);
    // }, [balance]);

    return (
        <>
            {/* logo & toggler button */}
            <Grid
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    padding: '0px 24px',
                    height: '110px',
                    borderBottom: '2px solid #f89b35',
                    [theme.breakpoints.down('sm')]: {
                        height: '70px',
                        padding: '0px 14px'
                    }
                }}
            >
                <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex' }}>
                    <Box className='66666' component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                        <LogoSection />
                    </Box>
                    {!isHorizontal && (
                        <Avatar
                            variant="rounded"
                            sx={{
                                overflow: 'hidden',
                                transition: 'all .2s ease-in-out',
                                background: '#f89b35',
                                //backgroundColor: alpha(theme.palette.secondary.main, 0.55),
                                borderRadius: '0px',
                                color: mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
                                '&:hover': {
                                    background: 'rgba(255, 175, 1, 0.80)',
                                    color: mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.light'
                                }
                            }}
                            onClick={() => handlerDrawerOpen(!drawerOpen)}
                            color="inherit"
                        >
                            <IconMenu2 stroke={2} size="20px" color="#fff" />
                        </Avatar>
                    )}
                </Box>
                <Box className='' sx={{ display: { xs: 'block', md: 'none' }, marginLeft: '10px', background:'#ff0000' }}>
                    <Link
                        component={RouterLink}
                        to={DASHBOARD_PATH}
                        aria-label="theme-logo"
                        className=""
                        sx={{ alignItems: 'center', display: 'flex', position: 'relative', top: '0px' }}
                    >
                        <img className="cover " src={MobileLogo} alt="" style={{ borderRadius: '0px', height: '52px' }} />
                    </Link>
                </Box>

                {/* header search */}
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'block' }, m: '0 10px' }}>{CartItems.length && <FreeDeliveryProgress />}</Box>
                <SearchSection />

                {/* <Box>
                    <motion.div
                    // initial={{ scale: 1 }}
                    // animate={{ scale: isAnimating ? [1, 1.5, 1] : 1 }}
                    // transition={{ duration: 0.5 }}
                    // style={{ position: 'absolute', top: -10, right: -10 }}
                    >
                        <IconButton sx={{ padding: '0px' }}>
                            <Badge sx={{ color: '#fff' }}>
                                <IconHeart />
                            </Badge>
                        </IconButton>
                    </motion.div>
                </Box> */}

                {/* mega-menu */}
                {!isLoggedIn && (
                    <>
                        <Box sx={{ display: { xs: 'block', sm: 'block' } }}>
                            <RegisterSection registerForceOpen={registerForceOpen} forceOpen={forceOpen} />
                        </Box>
                        <Box sx={{ display: { xs: 'block', sm: 'block' } }}>
                            <LoginSection loginForceOpen={loginForceOpen || isForceLogin} forceOpen={forceOpen} />
                        </Box>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Box
                            sx={{
                                padding: '0px 10px',
                                [theme.breakpoints.down('sm')]: {
                                    padding: '0px 5px'
                                }
                            }}
                        >
                            <Link
                                to="/wishlist"
                                underline="hover"
                                component={RouterLink}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontWeight: '500',
                                    gap: '4px',
                                    textDecoration: 'none',
                                    position: 'relative'
                                }}
                            >
                                <IconButton color="inherit" sx={{ padding: '0px' }}>
                                    <Badge badgeContent={userFavorites?.length} color="secondary">
                                        <IconHeart />
                                    </Badge>
                                </IconButton>
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                padding: '0px 10px',
                                [theme.breakpoints.down('sm')]: {
                                    padding: '0px 5px'
                                }
                            }}
                        >
                            <Link
                                to="/cart"
                                underline="hover"
                                component={RouterLink}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontWeight: '500',
                                    gap: '4px',
                                    textDecoration: 'none',
                                    position: 'relative'
                                }}
                            >
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: isAnimating ? [1, 1.5, 1] : 1 }}
                                    transition={{ duration: 0.5 }}
                                    // style={{ position: 'absolute', top: -10, right: -10 }}
                                >
                                    <IconButton color="inherit" sx={{ padding: '0px' }}>
                                        <Badge badgeContent={CartItems?.length} color="secondary">
                                            <IconShoppingBag />
                                        </Badge>
                                    </IconButton>
                                </motion.div>
                            </Link>
                        </Box>
                        <ProfileSection />
                    </>
                )}

                {/* mobile header */}
            </Grid>
        </>
    );
};

export default Header;
