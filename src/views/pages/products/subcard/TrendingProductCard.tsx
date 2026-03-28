// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';

/* images */

import ProductModel from 'types/products/ProductModel';
import { Link as routerLink } from 'react-router-dom';
import { displayPrice } from 'utils/util';

// =============================|| Fetured SECTION ||============================= //

const Productcard = styled(Box)(({ theme }) => ({
    //background: '#fff',
    padding: '0px',
    // transitionDuration: '.55s',
    borderRadius: '10px',
    minHeight: '220px',
    marginLeft: '0px !important',
    [theme.breakpoints.down('sm')]: {
        marginRight: '0px !important'
    },

    ':hover': {
        //boxShadow: '#00000026 0 50px 95px -15px',
        //transform: 'scaleX(1.05) scaleY(1.05)',
        //transitionDuration: '.55s',
        borderRadius: '0px'

        //padding: '0px',
    },
    '.cardinner': {
        width: ' 54%',
        background: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: ' 44%'
        },
        [theme.breakpoints.down('md')]: {
            width: ' 44%'
        }
    },

    '.cardcontent': {
        width: '45%',
        background: '#f89f43 !important',
        padding: '0px 11px 9px',
        position: 'relative',
        minHeight: '260px',
        display:'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '55%',
            minHeight: '210px',
        },
        [theme.breakpoints.down('md')]: {
            width: '55%',
            minHeight: '210px',
        },
        '.savevalue': {
            fontSize: '30px',
            fontWeight: '600',
            color: '#000',
            //position: 'absolute',
            top: '10px',
            [theme.breakpoints.down('sm')]: {
                fontSize: '20px'
            },
            [theme.breakpoints.down('md')]: {
                fontSize: '20px'
            }
        },
        '.productname': {
            fontSize: '14px',
            fontWeight: '500',
            color: '#000',
            margin: '8px 0px',
            textAlign: 'left',
            webkitBoxOrient: 'vertical',
            textTransform: 'uppercase',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            [theme.breakpoints.down('sm')]: {
                fontSize: '12px'
            }
        },
        '.saleprice': {
            fontSize: '18px',
            fontWeight: '400',
            color: '#000',
            textAlign: 'left',
            margin: '5px 0px',
            [theme.breakpoints.down('sm')]: {
                fontSize: '14px'
            }
        },
        '.offerprice': {
            fontSize: '18px',
            fontWeight: '400',
            color: '#ff0000',
            textAlign: 'left',
            textDecoration: 'line-through',
            margin: '5px 0px',
            [theme.breakpoints.down('sm')]: {
                fontSize: '14px'
            }
        },
        '.shopnowbtn': {
            background: 'transparent',
            borderRadius: '100px',
            border: '1px solid #000',
            fontWeight: '700',
            color: '#000',
            fontSize: '16px',
            marginTop: '10px',
            textTransform: 'uppercase',
            letterSpacing: ' .5px',
            minHeight: '40px',
            [theme.breakpoints.down('sm')]: {
                fontSize: '13px',
                fontWeight: '700'
            },
            [theme.breakpoints.down('md')]: {
                fontSize: '13px',
                fontWeight: '700'
            }

        }
    }
}));

export const TrendingProductCard = ({ url, name, price, salePrice, discountName, image, stockinHand = 0 }: ProductModel) => {
    const theme = useTheme();
    const item = { price, salePrice, discountName };
    return (
        <Productcard
            className="productlist"
            sx={{
                margin: '0px 10px',
                position: 'relative',
                [theme.breakpoints.down('sm')]: {
                    padding: '10px'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',

                    width: '100%',
                    height: '100%',
                    border: '2px solid #f89b35',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#f89b35',
                    

                }}
            >
                <Stack className="cardinner">
                    <img src={image} alt="" width="100%" />
                </Stack>
                <Stack className="cardcontent">
                    {item.discountName && <Typography className="savevalue">{item.discountName}</Typography>}
                    <Typography className="productname">{name}</Typography>

                    {<Typography className="saleprice">{displayPrice(item.salePrice || item.price)}</Typography>}
                    {item.salePrice !== undefined && item.salePrice > 0 && (
                        <Typography className="offerprice">{displayPrice(item.price)}</Typography>
                    )}

                    <Button component={routerLink} to={`/products/catagory/${url}`} className="shopnowbtn">
                        Shop now
                    </Button>
                </Stack>
            </Box>
        </Productcard>
    );
};
