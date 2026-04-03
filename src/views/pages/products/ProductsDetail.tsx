import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import { styled, useTheme } from '@mui/material/styles';
import ReactImageMagnify from 'react-image-magnify';

import NativeSelect from '@mui/material/NativeSelect';
import IconButton from '@mui/material/IconButton';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Slider from 'react-slick';

// assets
import FreeShipping from 'assets/images/product/free-shipping.png';
import PriceMatch from 'assets/images/product/price-match.png';
import EasyReturn from 'assets/images/product/easy-return.png';

import { useNavigate, useParams } from 'react-router-dom';
import { store, useSelector } from 'store';
import { productsDetail, wishlistAdd } from 'store/slices/productStore';
import { PriceCard } from './subcard/priceCard';
import { addProductsToCartApi } from 'store/slices/checkout';
import { ShareProduct } from '../ShareProduct';

import { ProductReview } from './ProductReview';
import { IconArrowLeft, IconCheck } from '@tabler/icons-react';

import useAuth from 'hooks/useAuth';
import { SkeletonProductDetails } from 'views/Skeleton/Products/SkeletonProductDetails';
import { AddOnCard } from './subcard/AddOnCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// =============================|| LANDING - CARD SECTION ||============================= //

const ProductsDetails = styled(Box)(({ theme }) => ({
    borderRadius: '0px',
    padding: '15px 10px 20px 10px',
    marginTop: '10px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0px 20px 0px'
    },
    '.MuiBreadcrumbs-root': {
        color: '#fff',
        marginBottom: '20px'
    },
    '.MuiTypography-root': {
        color: '#fff'
    },
    '.product-right-container': {
        paddingLeft: '50px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0px',
            paddingTop: '130px'
        }
    }
}));

const ProductSlider = styled(Box)(({ theme }) => ({
    '.slider-container': {
        width: '100%',
        background: '#fff'
    },
    '.slick-list': {
        height: '580px',
        border: '1px solid rgba(18, 18, 18, 0.05)',
        [theme.breakpoints.down('sm')]: {
            height: '400px'
        },
        '.slick-track': {
            height: '100%'
        },
        '.product-large-img': {
            display: 'inline-flex!important',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                height: '400px'
            },
            img: {
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }
            }
        }
    },
    '.slick-next': {
        display: 'none!important'
    },
    '.slick-prev': {
        display: 'none!important'
    },
    '.slick-dots': {
        bottom: '-120px',
        width: '100%',
        background: '#fff',
        margin: '5px 0px',
        paddingTop: '5px',
        border: '1px solid rgba(18, 18, 18, 0.05)',
        [theme.breakpoints.down('sm')]: {
            height: '100px',
            display: 'flex!important',
            overflow: 'auto'
        },
        li: {
            width: '91px',
            height: '91px',
            minWidth: '91px',
            border: '1px solid rgba(18, 18, 18, 0.05)',
            overflow: 'hidden',
            margin: '0px 5px',
            transition: '.3s all ease-in',
            '&:hover': {
                borderColor: '#000'
            },
            '&.slick-active': {
                borderColor: '#000'
            },
            a: {
                width: '100%',
                height: '100%',
                display: 'block',
                img: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }
            }
        }
    },

    '.slick-slide': {
        div: {
            height: '100%'
        }
    }
}));

const ProductHeding = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '36px',
    textTransform: 'uppercase',
    marginBottom: '15px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
        lineHeight: '30px'
    }
}));

const AddOns = styled(Box)(({ theme }) => ({
    marginTop: '20px',
    '.MuiTypography-root': { fontSize: '12px' },
    '.Mui-checked svg path': {
        fill: '#fff'
    }
}));

const ProductPrice = styled(Box)(() => ({
    '.price-info': {
        borderTop: '1px solid #ccc',
        paddingTop: '15px',
        marginTop: '15px'
    },
    '.linethrough': {
        textDecoration: 'line-through',
        fontSize: '28px',
        paddingRight: '0px',
        margin: '0px 0px',
        fontWeight: '600',
        color: '#e23333',
        display: 'flex',
        alignItems: 'center'
    },
    '.price-info span': {
        fontSize: '28px',
        color: '#ed1c24',
        fontWeight: 500,
        letterSpacing: '-1px'
    },
    '.price-info strong': {
        fontSize: '16px',
        color: '#fff',
        fontWeight: 300,
        letterSpacing: '-1px',
        marginLeft: '10px',
        textDecoration: 'line-through',
        position: 'relative',
        top: '-4px'
    },
    '.shipping-text': {
        fontSize: '12px',
        color: '#fff',
        fontWeight: 400,
        marginTop: '10px',
        marginBottom: '20px'
    },
    '.shipping-text a': {
        fontSize: '12px',
        color: '#fff',
        fontWeight: 400,
        marginRight: '5px'
    }
}));

const ProductDropdown = styled(Box)(() => ({
    '.dropdown-field': {
        '.MuiFormControl-root': {
            '.MuiInputLabel-root': {
                color: '#fff'
            },
            '.MuiInputBase-root': {
                color: '#fff',
                '&:before': {
                    borderBottom: '1px solid #fff'
                }
            },
            '.MuiNativeSelect-icon': {
                fill: '#fff'
            }
        }
    }
}));

const CurrentStock = styled(Box)(() => ({
    fontSize: '13px',
    color: '#fff',
    marginTop: '20px',
    fontWeight: 400
}));

const ProductQty = styled(Box)(() => ({
    marginTop: '20px',
    '.qty': {
        fontSize: '14px',
        color: '#fff',
        fontWeight: 500,
        marginBottom: '10px'
    },
    '.qty_info': {
        backgroundColor: '#fff',
        width: '160px',
        border: '1px solid #ccc',
        borderRadius: '50px',
        overflow: 'hidden',
        padding: '5px 20px',
        '.MuiButtonBase-root': {
            width: '60px',
            height: '60px',
            borderRadius: '0px',
            '.MuiSvgIcon-root': {
                fill: '#ccc'
            }
        },
        '.MuiInputBase-input': {
            width: '100px',
            textAlign: 'center'
        },
        '.MuiNativeSelect-icon': {
            fill: '#ccc'
        },
        '.input_qty': {
            height: '60px',
            background: 'transparent',
            borderTop: 'none',
            borderBottom: 'none',
            borderLeft: '1px solid #7b7979',
            borderRight: '1px solid #7b7979',
            fontSize: '20px',
            color: '#fff',
            textAlign: 'center',
            width: 'calc(100% - 120px)'
        }
    }
}));

const ProductAvailability = styled(Box)(() => ({
    marginTop: '20px',
    marginBottom: '20px',
    '.product_avail': {
        fontSize: '16px',
        fontWeight: 700,
        color: '#fff',
        lineHeight: '28px'
    },
    '.product_avail_info': {
        border: '1px solid #d9d9d9',
        borderRadius: '5px',
        padding: '13px',
        '.prod_name': {
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '28px',
            color: '#fff'
        },
        '.prod_address': {
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '28px',
            color: '#fff'
        }
    }
}));

const ProductAddCart = styled(Box)(({ theme }) => ({
    marginTop: '40px',
    gap: '20px',
    display: 'flex',
    '.addtocart': {
        background: '#ffb001',
        border: '4px solid #d99500',
        borderRadius: '50px',
        height: '65px',
        textTransform: 'uppercase',
        fontWeight: 500,
        width: '50%',
        boxShadow: 'none',
        letterSpacing: '0px',
        fontSize: '20px',
        lineHeight: '33px',
        color: '#000',
        [theme.breakpoints.down('sm')]: {
            height: '50px',
            fontSize: '13px'
        },
        '&:hover': {
            background: '#ffb001',
            border: '1px solid #ffb001'
        }
    },
    '.addtowishlist': {
        //background: '#ffb001',
        border: '4px solid #d99500',
        borderRadius: '50px',
        height: '65px',
        textTransform: 'uppercase',
        fontWeight: 500,
        width: '50%',
        boxShadow: 'none',
        letterSpacing: '0px',
        fontSize: '20px',
        lineHeight: '33px',
        color: '#fff',
        [theme.breakpoints.down('sm')]: {
            height: '50px',
            fontSize: '13px'
        },
        '&:hover': {
            // background: '#ffb001',
            border: '4px solid #ffb001'
        },
        svg: { color: '#ffb001' }
    }
}));

const ProductWishList = styled(Box)(() => ({
    marginTop: '10px',
    '.MuiButton-text': {
        height: '40px',
        fontWeight: 500,
        boxShadow: 'none',
        letterSpacing: '0px',
        fontSize: '17px',
        lineHeight: 'normal',
        color: '#fff',
        '.MuiIconButton-root': {
            color: '#fff',
            marginLeft: '15px'
        }
    }
}));

const ProductShipping = styled(Box)(({ theme }) => ({
    marginTop: '35px',
    marginBottom: '15px',
    display: 'flex',
    '.MuiLink-root': {
        color: '#fff',
        textDecoration: 'none',
        flex: 1,
        alignItems: 'center',
        '.MuiTypography-root': {
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            marginTop: '10px',
            [theme.breakpoints.down('sm')]: {
                fontWeight: 400,
                fontSize: '12px',
                textAlign: 'center'
            }
        }
    }
}));

const ProductDescription = styled(Box)(({ theme }) => ({
    marginTop: '20px',
    marginBottom: '20px',
    background: '#181921',
    padding: '20px 20px',
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
        marginTop: '30px',
        padding: '24px'
    },

    p: {
        color: '#fff',
        fontSize: '16px',
        margin: '0px',
        fontWeight: '500',
        lineHeight: '22px',
        letterSpacing: '0.6px',
        span: { color: '#fff !important', fontSize: '14px', margin: '0px', fontWeight: '400' }
    },

    ul: {
        li: { color: '#fff', fontSize: '14px', margin: '0px', fontWeight: '400', marginBottom: '6px' }
    }
}));

const RelatedProducts = styled(Box)(() => ({
    marginBottom: '100px',
    textAlign: 'center'
}));

const ProductOptions = styled(Stack)(() => ({
    color: '#fff',
    border: '1px solid #dedede',
    minWidth: '90px',
    alignItems: 'center',
    fontWeight: '600',
    fontSize: '14px',
    padding: '5px',
    borderRadius: '2px',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    '.productbtn': { color: '#fff' },
    svg: { display: 'none' },
    '&.active': {
        border: '1px solid #ffbb25',
        color: '#ffbb25',
        '.productbtn': { color: '#ffbb25' },
        svg: {
            width: '18px',
            color: '#ffbb25',
            strokeWidth: '3.5',
            position: 'absolute',
            right: '8px',
            display: 'block'
        }
    }
}));
interface Variants {
    [key: string]: any;
}
const ProductsDetail = () => {
    const { name: paramName } = useParams<{ name: string }>();
    const [productQuantity, setProductQuantity] = useState(1);
    const [price, setPrice] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [stockinHand, setStockinHand] = useState(null);
    const [salePrice, setSalePrice] = useState(null);
    const [attributeData, setAttributeData] = useState(null);
    const [variants, setVariants] = useState<Variants>({});
    const [variantsData, setVariantsData] = useState({});
    const { isLoggedIn, forceLogin } = useAuth();
    const { isLoading, isSuccess, details } = useSelector((state: any): any => state.store.productDetail);
    const addOnProducts = details.addOnProducts;
    const navigate = useNavigate();
    const {
        name: productName,
        description,
        content,
        price: pPrice,
        salePrice: sPrice,
        images: pImages,
        productRating: rating,
        quantity: pStockinHand,
        attributesData: pAttributeData
    } = details;

    /* loading Images for slider */

    const settings = {
        customPaging: function (i: number) {
            // debugger;
            return <img src={productImages[i]} height={'100%'} alt={`product-img-${i}`} />;
        },
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    /* loading Images for slider end */
    const handleIncCartItems = () => {
        if (!isLoggedIn) {
            forceLogin(true);
            return;
            // alert('Please login');
            // return;
        }

        // const { id } = item;
        store.dispatch(addProductsToCartApi({ name: productName, quantity: productQuantity, variant: variants }));
        // store.dispatch(setCartItem({ ...item, quantity: !!quantity ? ++quantity : 0 }));
    };
    const addToWishlist = () => {
        if (!isLoggedIn) {
            forceLogin(true);
            return;
            // alert('Please login');
            // return;
        }

        store.dispatch(wishlistAdd(paramName));
    };
    // const handleDecCartItems = () => {
    //     // const { id } = item;
    //     store.dispatch(addProductsToCartApi({ name: productName, quantity: -1 }));
    // };
    // productsDetail
    const theme = useTheme();

    useEffect(() => {
        if (paramName) {
            store.dispatch(productsDetail(paramName));
        }
    }, [paramName]);

    const productQuantityFn = (e) => {
        setProductQuantity(parseInt(e.target.value));
    };

    const value = 3;

    // Function to add attributeName to each object

    // setVariantsData
    // Updated data with attributeName added

    const updateVariant = (
        attributeName: string,
        attributeValue: any,
        attributePrice: any,
        attributeSalePrice: any,
        attributeQuantity: any,
        images: any
    ) => {
        const checkVariantCombinationExists = {
            ...variants,
            [attributeName]: attributeValue
        };
        //if(!checkVariantCombination(checkVariantCombinationExists))
        //   return;

        setVariants((prevVariants) => ({
            ...prevVariants,
            [attributeName]: attributeValue
        }));
        // debugger;
        setPrice(attributePrice);
        setSalePrice(attributeSalePrice);
        setStockinHand(attributeQuantity);
        const productImages = images ? JSON.parse(images) : JSON.parse(pImages);
        setProductImages(productImages);
    };

    const handleVariantChange = (f: any) => {
        // debugger;
        // this should be variant model
        updateVariant(f.attributeName, f.attributeValueName, f.attributePrice, f.attributeSalePrice, f.attributeQuantity, f.images);
    };

    const checkVariantCombination = (checkVariantCombinationExists: any) => {
        // Function to check if variant matches selected variants
        const matchesSelectedVariants = (attributes, selectedVariants) => {
            const attributeMap = attributes.reduce((acc, attr) => {
                acc[attr.attributeName] = attr.attributeValueName;
                return acc;
            }, {});

            return Object.keys(selectedVariants).every((key) => attributeMap[key] === selectedVariants[key]);
        };

        // Find the variant that matches the selected variants
        const foundVariant = attributeData?.find((variant) => {
            // Parse attributeContent
            const attributes = JSON.parse(variant.attributeContent);

            // Check if this variant matches the selected variants
            return matchesSelectedVariants(attributes, checkVariantCombinationExists);
        });
        return !!foundVariant;
    };

    useEffect(() => {
        // Function to check if variant matches selected variants
        const matchesSelectedVariants = (attributes, selectedVariants) => {
            const attributeMap = attributes.reduce((acc, attr) => {
                acc[attr.attributeName] = attr.attributeValueName;
                return acc;
            }, {});

            return Object.keys(selectedVariants).every((key) => attributeMap[key] === selectedVariants[key]);
        };

        // Find the variant that matches the selected variants
        const foundVariant = attributeData?.find((variant) => {
            // Parse attributeContent
            const attributes = JSON.parse(variant.attributeContent);

            // Check if this variant matches the selected variants
            return matchesSelectedVariants(attributes, variants);
        });

        // Extract relevant information if a matching variant is found

        const result = foundVariant
            ? {
                  attributePrice: foundVariant.attributePrice,
                  attributeQuantity: foundVariant.attributeQuantity,
                  attributeSalePrice: foundVariant.attributeSalePrice,
                  images: JSON.parse(foundVariant.images) // foundVariant.images && foundVariant.images!==''  ? JSON.parse(foundVariant.images) : [] // Parse images to array
              }
            : null;
        if (result !== null) {
            setPrice(result.attributePrice);
            setSalePrice(result.attributeSalePrice);
            setStockinHand(result.attributeQuantity);
            if (result.images !== null) {
                const productImages = result.images;
                setProductImages(productImages);
            }
        } else {
            setPrice(0);
            setSalePrice(0);
            setStockinHand(0);
            // alert('test');
        }
    }, [variants]);

    useEffect(() => {
        type ItemType = {
            attributeName: string;
            attributeValueName: string;
            // Add any other properties here
        };
        const addAttributeNameAndTransform = (data: Record<string, ItemType[]>) => {
            return Object.keys(data).reduce<Record<string, ItemType[]>>((acc, key) => {
                data[key].forEach((item) => {
                    // Ensure each object has an attributeName
                    if (item.attributeName) {
                        if (!acc[item.attributeName]) {
                            acc[item.attributeName] = [];
                        }
                        const exists = acc[item.attributeName]?.some(
                            (attribute) => attribute.attributeValueName === item.attributeValueName
                        );
                        if (!exists) acc[item.attributeName].push(item);
                    }
                    // Add the item to the accumulator object using attributeName as the key
                });
                return acc;
            }, {});
        };

        const variantDataTemp =
            attributeData &&
            attributeData?.map((product: any) => {
                return JSON.parse(product.attributeContent).map((f: any) => {
                    // if (product.attributeQuantity > 0) {
                    updateVariant(
                        f.attributeName,
                        f.attributeValueName,
                        product.attributePrice,
                        product.attributeSalePrice,
                        product.attributeQuantity,
                        product.images
                    );
                    //  }
                    return {
                        ...f,
                        attributePrice: product.attributePrice,
                        attributeSalePrice: product.attributeSalePrice,
                        attributeQuantity: product.attributeQuantity,
                        images: product.images
                    };
                });
            });
        const updatedData = variantDataTemp?.length > 0 && addAttributeNameAndTransform(variantDataTemp);
        console.log(updatedData, 'updatedDataupdatedDataupdatedDataupdatedData');

        setVariantsData(updatedData);
    }, [attributeData]);

    useEffect(() => {
        setPrice(pPrice);
        setSalePrice(sPrice);
        setStockinHand(pStockinHand);

        const productImages = pImages ? JSON.parse(pImages) : [];

        setProductImages(productImages);
        // debugger;
    }, [pPrice, sPrice, pStockinHand, pImages]);

    useEffect(() => {
        setAttributeData(pAttributeData);
    }, [pAttributeData]);

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page in the browser's history
    };

    console.log(productImages, 'productImages');
    return (
        <Container>
            {/* {CartItems.length && <FreeDeliveryProgress />} */}
            <ProductsDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Box>
                            <Button
                                onClick={handleGoBack}
                                sx={{
                                    color: '#fff',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    display: 'flex',
                                    gap: '10px',
                                    paddingLeft: '0px',
                                    marginBottom: '10px'
                                }}
                            >
                                <IconArrowLeft /> Back
                            </Button>
                            {/* <Breadcrumbs aria-label="breadcrumb">
                                <Link underline="hover" color="inherit" href="/">
                                    Home
                                </Link>
                                
                                <Button onClick={handleGoBack}>Go Back</Button>
                                 

                                
                                <Typography color="text.primary">{productName}</Typography>
                            </Breadcrumbs> */}
                        </Box>
                    </Grid>
                </Grid>
                {isLoading && <SkeletonProductDetails />}
                {!isLoading && isSuccess && (
                    <>
                        <Grid container spacing={0}>
                            <Grid item md={6} sm={6} xs={12}>
                                <ProductSlider>
                                    <Stack className="slider-container">
                                        <Slider {...settings}>
                                            {productImages?.map((image: string, index: number) => (
                                                <Stack className="product-large-img">
                                                    {/* <img src={image} alt={image} key={image} /> */}
                                                    <ReactImageMagnify
                                                        {...{
                                                            smallImage: {
                                                                alt: `Image ${index + 1}`,
                                                                isFluidWidth: true,
                                                                src: image
                                                            },
                                                            largeImage: {
                                                                src: image,
                                                                width: 1200,
                                                                height: 1200
                                                            },
                                                            enlargedImagePosition: 'over'
                                                        }}
                                                    />
                                                </Stack>
                                            ))}
                                        </Slider>
                                    </Stack>
                                </ProductSlider>
                            </Grid>
                            <Grid item md={6} sm={6} xs={12} className="product-right-container">
                                <ProductHeding>{productName}</ProductHeding>
                                {/* {content !== '' && <Typography>{content}</Typography>} */}
                                {/* <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Rating name="simple-controlled" value={rating || value} readOnly />
                                    <ShareProduct productName={productName || ''} />
                                </Stack> */}
                                <ProductPrice>
                                    {/* <Typography className="price-info">
                                <span>{displayPrice(salePrice)}</span>
                                <strong>{displayPrice(price)}</strong>
                            </Typography> */}
                                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <PriceCard item={{ price, salePrice }} />
                                    </Box>
                                    {/* <Typography className="shipping-text">
                                <Link href="/">Shipping</Link>
                                calculated at checkout.
                            </Typography> */}
                                </ProductPrice>
                                <ProductDropdown>
                                    <Grid>
                                        {variantsData &&
                                            Object.keys(variantsData).map((key) => (
                                                <Grid item key={key}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }} className="dropdown-field">
                                                        <Stack
                                                            sx={{ color: '#fff', fontSize: '16px', fontWeight: '600', padding: '5px 0px' }}
                                                        >
                                                            {key} :
                                                        </Stack>
                                                        <Stack
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                gap: '10px',
                                                                padding: '4px 0px',
                                                                flexWrap: 'wrap'
                                                            }}
                                                        >
                                                            {variantsData[key].map((option) => (
                                                                <ProductOptions
                                                                    className={variants[key] === option.attributeValueName ? 'active' : ''}
                                                                    key={option.id}
                                                                >
                                                                    <Button
                                                                        className="productbtn"
                                                                        sx={{ padding: '0px', color: '#fff' }}
                                                                        onClick={() => handleVariantChange(option)}
                                                                    >
                                                                        {option.attributeValueName}
                                                                    </Button>

                                                                    {variants[key] === option.attributeValueName && <IconCheck />}
                                                                </ProductOptions>
                                                            ))}
                                                        </Stack>
                                                    </Box>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </ProductDropdown>
                                {/* <CurrentStock>Current Stock: {stockinHand}</CurrentStock> */}
                                <ProductQty>
                                    <Typography className="qty">QUANTITY</Typography>
                                    <Box className="qty_info" display="flex" alignItems="center">
                                        {/* <IconButton onClick={() => handleDecCartItems()}>
                                    <RemoveIcon />
                                </IconButton>
                                <input className="input_qty" value={1} />
                                <IconButton onClick={() => handleIncCartItems()}>
                                    <AddIcon />
                                </IconButton> */}
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native'
                                            }}
                                            onChange={(e) => productQuantityFn(e)}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </NativeSelect>
                                    </Box>
                                </ProductQty>
                                {addOnProducts !== null && addOnProducts?.length && <AddOnCard />}
                                <ProductAddCart>
                                    {stockinHand !== null && stockinHand > 0 && (
                                        <>
                                            <Button className="addtocart" onClick={handleIncCartItems} variant="contained">
                                                ADD TO CART
                                            </Button>

                                            {/* <Button
                                                sx={{
                                                    background: '#818181 !important',
                                                    borderRadius: '50px',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 500,
                                                    fontSize: '20px',
                                                    width: '50%',
                                                    border: '4px solid #686868',
                                                    [theme.breakpoints.down('sm')]: {
                                                        height: '50px',
                                                        fontSize: '13px'
                                                    }
                                                }}
                                                variant="contained"
                                            >
                                                ADD TO CART
                                            </Button> */}
                                        </>
                                    )}
                                    {stockinHand !== null && !stockinHand && (
                                        <>
                                            <Button
                                                sx={{
                                                    background: '#818181 !important',
                                                    borderRadius: '50px',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 500,
                                                    fontSize: '20px',
                                                    width: '50%',
                                                    border: '4px solid #686868',
                                                    [theme.breakpoints.down('sm')]: {
                                                        height: '50px',
                                                        fontSize: '13px'
                                                    }
                                                }}
                                                variant="contained"
                                            >
                                                Out of stock
                                            </Button>
                                        </>
                                    )}
                                    <Button
                                        className="addtowishlist"
                                        sx={{ border: '4px solid #d99500' }}
                                        variant="text"
                                        onClick={() => addToWishlist()}
                                    >
                                        Add to wishlist
                                        <IconButton>
                                            <FavoriteBorderIcon />
                                        </IconButton>
                                    </Button>
                                </ProductAddCart>
                                {/* <ProductWishList>
                                    <Button variant="text" onClick={() => addToWishlist()}>
                                        Add to wishlist
                                        <IconButton>
                                            <FavoriteBorderIcon  />
                                        </IconButton>
                                    </Button>
                                </ProductWishList> */}
                                <ProductShipping>
                                    <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                        <img className="prod-ship" src={FreeShipping} alt="Free Shipping" width={64} />
                                        <Typography>*Free Shipping</Typography>
                                    </Stack>
                                    <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                        <img className="prod-ship" src={PriceMatch} alt="Price Match" width={64} />
                                        <Typography>Price Match Guarantee</Typography>
                                    </Stack>
                                    <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                        <img className="prod-ship" src={EasyReturn} alt="Easy Return" width={64} />
                                        <Typography>Easy Return Policy</Typography>
                                    </Stack>
                                </ProductShipping>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: '130px' }}>
                            <Grid item md={12} sm={12} xs={12}>
                                <Stack sx={{ borderBottom: '1px solid #f89b35' }}>
                                    <Typography
                                        className="prod-desc"
                                        sx={{
                                            padding: '8px 30px',
                                            width: '200px',
                                            fontSize: '24px',
                                            color: '#000 !important',
                                            fontWeight: '600',
                                            background: '#f89b35'
                                        }}
                                    >
                                        Description
                                    </Typography>
                                </Stack>
                                <ProductDescription>
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                </ProductDescription>
                            </Grid>
                        </Grid>
                    </>
                )}
                <ProductReview />
                {/* <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <RelatedProducts>
                            <SliderProducts title="FeaturedProducts" />
                        </RelatedProducts>
                    </Grid>
                </Grid> */}
            </ProductsDetails>
        </Container>
    );
};

export default ProductsDetail;
