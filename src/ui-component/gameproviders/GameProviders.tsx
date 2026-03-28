// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, Theme } from '@mui/material/styles';

// third-party
import Slider from 'react-slick';

// project imports
import SubCard from 'ui-component/cards/SubCard';

// assets
import Angular from 'assets/images/landing/jililogo.png';
import Bootstrap from 'assets/images/landing/sagaming.png';
import Django from 'assets/images/landing/habanerologo.png';
import Codeigniter from 'assets/images/landing/aruzegaminglogo.png';
import DotNet from 'assets/images/landing/sagaming.png';
import Flask from 'assets/images/landing/habanerologo.png';
import Shopify from 'assets/images/landing/aruzegaminglogo.png';
import FullStack from 'assets/images/landing/jililogo.png';
import Vue from 'assets/images/landing/sagaming.png';

// types
import { ThemeMode } from 'types/config';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';

export const frameworks = [
    {
        title: 'Bootstrap 5',
        logo: Bootstrap,
        link: 'https://links.codedthemes.com/VpESi'
    },
    {
        title: 'Angular',
        logo: Angular,
        link: 'https://links.codedthemes.com/iNpKo'
    },
    {
        title: 'CodeIgniter',
        logo: Codeigniter,
        link: 'https://links.codedthemes.com/AdRiB'
    },
    {
        title: '.Net',
        logo: DotNet,
        link: 'https://links.codedthemes.com/wkQEu'
    },
    {
        title: 'Shopify',
        logo: Shopify,
        link: '/',
        isUpcoming: false
    },
    {
        title: 'Vuetify 3',
        logo: Vue,
        link: 'https://links.codedthemes.com/RqhwV'
    },
    {
        title: 'Full Stack',
        logo: FullStack,
        link: 'https://links.codedthemes.com/quhuG'
    },
    {
        title: 'Django',
        logo: Django,
        link: 'https://links.codedthemes.com/Wfbiy'
    },
    {
        title: 'Flask',
        logo: Flask,
        link: 'https://links.codedthemes.com/quhuG'
    }
];

// =============================|| LANDING - FRAMWORK SECTION ||============================= //

interface TopGameProviders {
    theme: Theme;
}

const TopGameProviders = styled(Box)(({ theme }: TopGameProviders) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    // background: '#1A654A',
    backgroundColor:  theme.palette.dark[800],
    borderRadius: '0px',
    padding: '10px'
}));

const GameProviders = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an API call or data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
        // const downMD = useMediaQuery(theme.breakpoints.down('md'));
    }, []);

    const settings = {
        dots: true,
        className: 'center',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 6,
        slidesToScroll: 6,
        speed: 1500,
        autoplay: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1534,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    dots: false
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <>
            <TopGameProviders>
                <Typography
                    variant="h4"
                    sx={{
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: '1.4rem',
                        paddingBottom: '10px',
                        fontFamily: 'Poppins',
                        paddingTop: '10px'
                    }}
                >
                    Providers
                </Typography>

                <Box
                    sx={{
                        overflow: 'hidden',
                        div: {
                            textAlign: 'center',
                            
                        },
                        '.slick-track': {
                            display: { xs: 'flex', xl: 'inherit' }
                        },
                        '& .slick-dots': {
                            position: 'initial',
                            mt: 4,
                            '& li button:before': {
                                fontSize: '0.75rem'
                            },
                            '& li.slick-active button:before': {
                                opacity: 1,
                                color: 'primary.main'
                            }
                        }
                    }}
                >
                    <Slider {...settings}>
                        {frameworks.map((item, index) => (
                            <Badge
                                key={index}
                                color="primary"
                                badgeContent={item.isUpcoming ? 'Coming Soon' : 0}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                sx={{
                                    padding:'0px 15px 0px 0px',
                                    '& .MuiBadge-badge': {
                                        left: '50%',
                                        transform: 'scale(1) translate(-50%, 0)',
                                        padding:'5px',
                                        ...(item.isUpcoming && {
                                            bgcolor: 'background.paper',
                                            color: 'primary.main',
                                            border: '1px solid',
                                            borderColor: 'primary.main'
                                        })
                                    }
                                }}
                            >
                                <SubCard
                                    content={false}
                                    sx={{
                                        width: '100% !important',
                                        height: '160px',
                                        border: 'none',
                                        display: 'inline-flex !important',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        my: 1,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        backgroundColor:  theme.palette.dark.dark,
                                        // bgcolor: '#02583A',
                                        // border:'1px solid #013D28 !important',
                                        // bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.800' : 'grey.100',
                                        '&:hover': {
                                            backgroundColor:  theme.palette.dark.dark,
                                            // bgcolor: '#02583A'
                                            // bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.main' : 'primary.light'
                                        }
                                    }}
                                >
                                    <Box
                                        component={Link}
                                        href={item.link}
                                        target="_blank"
                                        underline="none"
                                        sx={{
                                            display: 'flex',
                                            flex: 1,
                                            height: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <Skeleton
                                                    variant="rectangular"
                                                    sx={{ mt: '2px', mb: '2px', background: theme.palette.secondary.main, }}
                                                    height={213}
                                                />
                                            </>
                                        ) : (
                                            <Stack spacing={2} alignItems="center" sx={{ padding: '0px' }}>
                                                <Stack sx={{ width: 'auto', height: 48 }} alignItems="center" justifyContent="center">
                                                    <CardMedia
                                                        // alt={item.title}
                                                        src={item.logo}
                                                        component="img"
                                                    />
                                                </Stack>
                                                {/* <Typography variant="h4" sx={{ width: 'max-content' }}>
                                                    {item.title}
                                                </Typography> */}
                                            </Stack>
                                        )}
                                    </Box>
                                </SubCard>
                            </Badge>
                        ))}
                    </Slider>
                </Box>
            </TopGameProviders>
        </>
    );
};

export default GameProviders;
