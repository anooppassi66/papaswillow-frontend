// material-ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

// third-party
import Slider from 'react-slick';
import FadeInWhenVisible from '../Animation';
/* images */
import { ProductCard } from './subcard/productCard';
import { ProductCards as ProductCardsSkeleton } from 'views/Skeleton/Products/ProductCards';
import ProductModel from 'types/products/ProductModel';
import Button from '@mui/material/Button';
import { Link as routerLink } from 'react-router-dom';

// =============================|| Fetured SECTION ||============================= //

const HeaderTitle = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '0px 0px',
    background: '#f89b35',
    color: '#000',
    borderRadius: '100px',
    padding: '10px 20px',
    top: '-28px',
    position: 'absolute',
    height: '50px',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
        height: '30px',
        padding: '10px 10px',
        top: '-15px'
    },
    h5: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#000',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
            fontWeight: '500'
        }
    },
    a: { position: 'relative', fontWeight: '400', fontSize: '14px', color: '#000' },
    'a:before': {
        content: '""',
        width: '1px',
        height: '16px',
        backgroundColor: '#000',
        position: 'absolute',
        left: '-11px',
        top: '1px',
        zIndex: '3'
    }
}));

const FeaturedproductsStyle = styled(Box)(({ theme }) => ({
    height: '100%',
    div: {
        textAlign: 'left',
        //gap:'10px',
        cursor: 'pointer'
    },
    '.slick-arrow': { display: 'none !important' },
    '.slick-track': {
        display: { xs: 'flex', xl: 'inherit' }
    },
    '& .slick-dots': {
        //position: 'initial',
        bottom: '-65px',
        marginTop: 4,
        [theme.breakpoints.down('sm')]: {
            bottom: '-50px'
        },

        '& li button:before': {
            fontSize: '20px'
        },
        '& li.slick-active button:before': {
            opacity: 1,
            color: 'primary.main',
            content: '""',
            background: '#fff',
            borderRadius: '50px',
            width: '22px',
            height: '8px',
            [theme.breakpoints.down('sm')]: {
                height: '4px'
            }
        },

        'li button:before': {
            opacity: 0.5,
            color: 'primary.main',
            content: '""',
            background: '#fff',
            borderRadius: '50px',
            width: '22px',
            height: '8px',
            [theme.breakpoints.down('sm')]: {
                height: '4px'
            }
        }
    },
    borderRadius: '0px',
    //padding: '10px',
    //background:'#fff',
    '.hover': {
        position: 'absolute',
        display: 'flex',
        transform: 'scale(0, 0)',
        top: '50%',
        //left: '50%',
        gap: '5px',
        flexDirection: 'row',
        justifyContent: 'center',
        transition: 'all 500ms ease',
        //opacity: '0',
        a: {
            borderRadius: '4px',
            background: '#ffb001',
            gap: '5px',
            display: 'flex',
            flexDirection: 'row',
            width: '35px',
            height: '35px',
            minWidth: '35px',
            svg: {
                stroke: '#000',
                width: '20px'
            },
            button: {
                borderRadius: '4px',
                background: '#ffb001',
                gap: '5px',
                display: 'flex',
                flexDirection: 'row',
                width: '35px',
                height: '35px',
                minWidth: '35px',
                ':hover': {
                    background: '#424242',
                    color: '#fff',
                    svg: {
                        stroke: '#fff',
                        width: '20px'
                    }
                },
                svg: {
                    stroke: '#000',
                    width: '20px'
                }
            }
        }
        // transition: 'scale(1, 1)',
    },
    '.productlist': {
        ':hover': {
            //  transform: 'scale(1, 1)',
            // opacity:'1',
            '.hover': {
                position: 'absolute',
                display: 'flex',
                //transform: 'translate3d(-50%,-50%,0)',
                top: '50%',
                //left: '50%',
                gap: '5px',
                flexDirection: 'row',
                justifyContent: 'center',
                transition: 'all 500ms ease',
                //opacity: '1',
                transform: 'scale(1, 1)',
                button: {
                    borderRadius: '4px',
                    background: '#ffb001',
                    gap: '5px',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '35px',
                    height: '35px',
                    minWidth: '35px',
                    ':hover': {
                        background: '#424242',
                        color: '#fff',
                        svg: {
                            stroke: '#fff',
                            width: '20px'
                        }
                    },
                    svg: {
                        stroke: '#000',
                        width: '20px'
                    }
                }
            }
        }
    }
}));
const ProductInnerBox = styled(Box)(({ theme }) => ({
    padding: '35px 10px 15px 10px',
    marginBottom: '60px',
    marginTop: '60px',
    border: '2px solid #48464b',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
        padding: '25px 5px 15px 5px',
        marginBottom: '30px',
        marginTop: '20px'
    }
}));

interface SectionModel {
    title: string;
    url: string;
    isLoading: boolean;
    isSuccess: boolean;
    products: ProductModel;
}
export interface InnerSlider {
    list?: HTMLDivElement;
}
/* Slide settings */
const settings = {
    dots: true,
    className: 'center',
    infinite: true,
    centerPadding: '10px',
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 1500,
    autoplay: true,
    swipeToSlide: true,
    height: '100%',
    responsive: [
        {
            breakpoint: 1534,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                dots: true
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: true
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true
            }
        }
    ]
};
export const SliderProducts = ({ title, url, isLoading, isSuccess, products }: SectionModel) => {
    const theme = useTheme();

    return (
        <>
            <Container
                sx={{
                    background: '#00000080',
                    padding: '0px !important',
                    [theme.breakpoints.down('sm')]: {
                        padding: '0px  15px !important'
                    }
                }}
            >
                <FadeInWhenVisible >
                    <ProductInnerBox>
                        <HeaderTitle>
                            <Typography variant="h5">{title}</Typography>
                            <Button
                                sx={{ padding: '0px', color: '#000', fontSize: '12px', fontWeight: '500', minWidth: 'auto' }}
                                component={routerLink}
                                to={`/products/catagory/${url}`}
                            >
                                View all
                            </Button>
                        </HeaderTitle>
                        {isLoading ? (
                            <ProductCardsSkeleton />
                        ) : (
                            <FeaturedproductsStyle className='productitms'>
                                <Slider {...settings}>
                                    {isSuccess && products?.slice(0, 10)?.map((item, index) => <ProductCard key={index} {...item} />)}
                                </Slider>
                            </FeaturedproductsStyle>
                        )}
                    </ProductInnerBox>
                </FadeInWhenVisible>
            </Container>
        </>
    );
};
