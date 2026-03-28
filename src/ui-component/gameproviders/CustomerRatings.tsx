// material-ui
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'store';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, Theme } from '@mui/material/styles';
import React from 'react';
import { IconQuote } from '@tabler/icons-react';
import { formatDate } from 'utils/util';
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
import Rating from '@mui/material/Rating';

// types
import { ThemeMode } from 'types/config';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import { SkeletonFullView } from 'views/Skeleton/Products/SkeletonFullView';
import axios from 'utils/axios-auth';

export const frameworks = [
    {
        title: '',
        link: ''
    },
    {
        title: 'r',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: '/',
        isUpcoming: false
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    },
    {
        title: '',
        link: ''
    }
];

// =============================|| LANDING - FRAMWORK SECTION ||============================= //

const Customercard = styled(Box)(() => ({
    width: '98% !important',
    height: 280,
    display: 'inline-flex !important',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    my: 1,
    borderRadius: 2,
    border: '2px solid rgba(164, 172, 179, 0.4)',

    cursor: 'pointer',
    background: '#000',
    a: { color: '#fff', alignItems: 'baseline' },

    '&:hover': {
        //background: '#fff',
    }
}));

const Customerratings = styled(Box)(({ theme }) => ({
    div: {
        textAlign: 'center'
    },
    '.slick-arrow ': { display: 'none !important' },
    '.slick-track': {
        display: { xs: 'flex', xl: 'inherit' }
    },
    '& .slick-dots': {
        position: 'initial',
        marginTop: '30px',
        '& li button:before': {
            fontSize: '20px'
        },
        '& li.slick-active button:before': {
            opacity: 1,
            color: 'primary.main',
            content: '""',
            background: '#feb406',
            borderRadius: '50px',
            width: '22px',
            height: '10px'
        },
        'li button:before': {
            opacity: 0.5,
            color: 'primary.main',
            content: '""',
            background: '#feb406',
            borderRadius: '50px',
            width: '22px',
            height: '10px'
        }
    },
    borderRadius: '0px',
    padding: '30px 0px',
    width: '100%',
    overflow: 'inherit !important',
    margin: '30px auto',
    background: '#212129',
    [theme.breakpoints.down('sm')]: {
        padding: '30px 15px'
    },

    'li button:before': {
        fontsize: '24px'
    },

    '.ratingtext': {
        color: '#fff',
        fontWeight: '400',
        textAlign: 'left',
        lineHeight: '22px',
        webkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '5',
        WebkitBoxOrient: 'vertical',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px'
        }
    },
    '.quoteicon': {
        svg: { width: '34px', height: '34px', position: 'absolute', bottom: '20px' }
    }
}));

const CustomerRatings = () => {
    const [value, setValue] = React.useState<number | null>(2);
    const { isLoading } = useSelector((state) => state.store);
    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const [ratings, setRatings] = useState<[]>([]);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                setLoading(true);
                const response = await axios('/api/v1/cratings');

                //localhost:8010/api/v1/auth/cratings
                if (response.status === 200) {
                    setRatings(response.data.data.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching categories:', error);
            }
        };

        fetchRatings();
    }, []);

    const settings = {
        dots: true,
        className: 'center',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 4,
        slidesToScroll: 3,
        speed: 500,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1534,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 400,
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
            {/* <Container> */}
            <Customerratings>
                <Container
                    sx={{
                        padding: '0px !important',
                        margin: '20px auto',
                        [theme.breakpoints.down('sm')]: {
                            margin: '10px auto'
                        }
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: '28px',
                            fontWeight: '700',
                            lineHeight: '30px',
                            margin: '0px 0px 38px 0px',
                            color: '#fff',
                            textAlign: 'center',
                            position: 'relative',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '18px'
                            },

                            ':after': {
                                content: '""',
                                width: '80px',
                                height: '3px',
                                background: '#feb406',
                                position: 'absolute',
                                left: '50%',
                                bottom: ' -8px',
                                marginLeft: '-25px'
                            }
                        }}
                    >
                        Customer Ratings
                    </Typography>
                    <Slider {...settings}>
                        {ratings.map((item, index) => (
                            <Customercard>
                                <Box
                                    component={Link}
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
                                        <SkeletonFullView />
                                    ) : (
                                        <Stack spacing={2}>
                                            <Stack
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    borderBottom: '1px solid rgba(164, 172, 179, 0.4)',
                                                    paddingBottom: '10px'
                                                }}
                                            >
                                                <Stack sx={{ display: 'flex', textAlign: 'left !important' }}>
                                                    <Typography
                                                        variant="h4"
                                                        sx={{
                                                            color: '#fff',
                                                            fontSize: '18px',
                                                            fontWight: '500',
                                                            [theme.breakpoints.down('sm')]: {
                                                                fontSize: '14px'
                                                            }
                                                        }}
                                                    >
                                                        {item.customerName}
                                                    </Typography>
                                                    <Typography
                                                        variant="h4"
                                                        sx={{
                                                            color: '#f89b35',
                                                            fontSize: '12px',
                                                            fontWight: '400',
                                                            paddingTop: '5px',
                                                            [theme.breakpoints.down('sm')]: {
                                                                fontSize: '12px'
                                                            }
                                                        }}
                                                    >
                                                        {formatDate(item.createdAt)}
                                                    </Typography>
                                                </Stack>
                                                <Rating name="simple-controlled" value={item.customerRating} readOnly />
                                            </Stack>
                                            <Typography className="ratingtext">{item.customerDescription}</Typography>
                                            <Stack
                                                className="quoteicon"
                                                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}
                                            >
                                                <IconQuote />
                                            </Stack>
                                        </Stack>
                                    )}
                                </Box>
                            </Customercard>
                        ))}
                    </Slider>
                </Container>
            </Customerratings>
            {/* </Container> */}
        </>
    );
};

export default CustomerRatings;
