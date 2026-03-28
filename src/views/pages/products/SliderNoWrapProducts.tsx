import { useSelector } from 'store';

// material-ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled, useTheme } from '@mui/material/styles';

// third-party
import Slider from 'react-slick';
import FadeInWhenVisible from '../Animation';
/* images */
import { ProductCards as ProductCardsSkeleton } from 'views/Skeleton/Products/ProductCards';
import { TrendingProductCard } from './subcard/TrendingProductCard';
import ProductModel from 'types/products/ProductModel';

// =============================|| Fetured SECTION ||============================= //

const FeaturedproductsStyle = styled(Box)(() => ({
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
            height: '8px'
        },
        'li button:before': {
            opacity: 0.5,
            color: 'primary.main',
            content: '""',
            background: '#fff',
            borderRadius: '50px',
            width: '22px',
            height: '8px'
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
        button: {
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
    // padding: '35px 10px 15px 10px',
    marginBottom: '100px',
    marginTop: '60px',
    // border: '2px solid #48464b',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '0px',
        paddingRight: '0px',
        marginBottom: '20px',
        marginTop: '20px'
    },
    [theme.breakpoints.down('md')]: {
        paddingLeft: '0px',
        paddingRight: '0px'
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
    centerPadding: '30px',
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: false,
    swipeToSlide: true,
    responsive: [
        {
            breakpoint: 1534,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                autoplay: true,
            }
        }
    ]
};
export const SliderNoWrapProducts = ({ title, url, isLoading, isSuccess, products }: SectionModel) => {
    return (
        <>
            <Container sx={{ padding: '0px !important' }}>
                <FadeInWhenVisible>
                    <ProductInnerBox>
                        {isLoading ? (
                            <ProductCardsSkeleton />
                        ) : (
                            <FeaturedproductsStyle>
                                <Slider {...settings}>
                                    {isSuccess && products?.map((item, index) => <TrendingProductCard url={url} key={index} {...item} />)}
                                </Slider>
                            </FeaturedproductsStyle>
                        )}
                    </ProductInnerBox>
                </FadeInWhenVisible>
            </Container>
        </>
    );
};
