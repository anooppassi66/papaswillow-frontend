// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

// project import
import Chip from 'ui-component/extended/Chip';
// import { frameworks } from './FrameworkSection';

// assets
import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import Payments from 'assets/images/landing/payments.png';
import GuaranteedImg from 'assets/images/landing/price-matchnew.png';

// types
import { ThemeMode } from 'types/config';
import { Padding } from '@mui/icons-material';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTelegram, IconBrandWhatsapp, IconBrandYoutube } from '@tabler/icons-react';

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.mode === ThemeMode.DARK ? theme.palette.text.secondary : theme.palette.text.hint,
    '&:hover': {
        color: theme.palette.primary.main
    },
    '&:active': {
        color: theme.palette.primary.main
    }
}));

const FooterView = styled(Container)(({theme}) => ({
    '.list-unstyled': {
        listStyle: 'none',
        padding: '0px',
        li: { listStyle: 'none', lineHeight: '28px' },
        a: { listStyle: 'none', textDecoration: 'none' },
        '.submitbtn': { background: '#fff' },
        
    },
    '.footerview':{
            'li a':{color: '#cfcfcf', fontSize: '14px', fontWeight: '400',
                [theme.breakpoints.down('sm')]: {
                    fontSize: '12px',
                },
            }
        }
}));

const Footer = () => {
    const theme = useTheme();
    const textColor = theme.palette.mode === ThemeMode.DARK ? 'text.secondary' : 'text.hint';

    return (
        <>
            <FooterView
                sx={{ maxWidth: '100% !important', background: '#000', padding: '80px 0px 0px 0px !important',
                    [theme.breakpoints.down('sm')]: {
                        padding: '30px 0px 0px 0px !important',
                    },
                 }}
                className="3333"
            >
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid className='footerview' container spacing={2}>
                                <Grid item sm={6} xs={6} md={3}>
                                    <Typography
                                        variant="h2"
                                        sx={{ color: '#fff', margin: '0px 0px 12px 0px', fontSize: '18px', fontWeight: '500',
                                            [theme.breakpoints.down('sm')]: {
                                                fontSize: '14px',
                                            },
                                            
                                         }}
                                    >
                                        {' '}
                                        SHOP
                                    </Typography>

                                    <Stack className="footer-block__list">
                                        <ul className="list-unstyled">
                                            <li>
                                                <a href="#" className="" 
                                                >
                                                    <span className="text">New in</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" 
                                                 >
                                                    <span className="text">Women</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" 
                                                 >
                                                    <span className="text">Men</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className=" " 
                                                 >
                                                    <span className="text">Shoes</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" 
                                                 >
                                                    <span className="text">Bags &amp; Accessories</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" 
                                                 >
                                                    <span className="text">Top Brands</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" 
                                                 >
                                                    <span className="text">Sale &amp; Special Offers</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </Stack>
                                </Grid>
                                <Grid item sm={6} xs={6} md={2}>
                                    <Typography
                                        variant="h2"
                                        sx={{ color: '#fff', margin: '0px 0px 12px 0px', fontSize: '18px', fontWeight: '500',
                                            [theme.breakpoints.down('sm')]: {
                                                fontSize: '14px',
                                            },
                                         }}
                                    >
                                        {' '}
                                        INFORMATION
                                    </Typography>
                                    <Stack className="footer-block__list">
                                        <ul className="list-unstyled">
                                            <li>
                                                <a href="#" className="" >
                                                    <span className="text">About Us</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" >
                                                    <span className="text">Privacy Policy</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" >
                                                    <span className="text">Terms &amp; Conditions</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className=" " >
                                                    <span className="text">Fast Delivery</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" >
                                                    <span className="text">Help &amp; FAQs</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" >
                                                    <span className="text">Customer Service</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </Stack>
                                </Grid>
                                <Grid item sm={6} xs={6} md={3}>
                                    <Typography
                                        variant="h2"
                                        sx={{ color: '#fff', margin: '0px 0px 12px 0px', fontSize: '18px', fontWeight: '500',
                                            [theme.breakpoints.down('sm')]: {
                                                fontSize: '14px',
                                            },
                                         }}
                                    >
                                        {' '}
                                        CUSTOMER SERVICE
                                    </Typography>
                                    <Stack className="footer-block__list" sx={{marginTop:'40px'}}>
                                    <img className="cover" src={GuaranteedImg} style={{width:'150px'}} alt="" />

                                        {/* <ul className="list-unstyled">
                                            <li>
                                                <a href="#" className="">
                                                    <span
                                                        className="text"
                                                        
                                                    >
                                                        Search Terms
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="">
                                                    <span
                                                        className="text"
                                                        
                                                    >
                                                        Advanced Search
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="">
                                                    <span
                                                        className="text"
                                                        
                                                    >
                                                        Orders and Returns
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/pages/contact-us-1"
                                                    className=""
                                                    
                                                >
                                                    <span className="text">Contact Us</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/pages/faqs" className="">
                                                    <span
                                                        className="text"
                                                        
                                                    >
                                                        Theme FAQs{' '}
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="" >
                                                    <span className="text">Consultant</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" className=" " >
                                                    <span className="text">Store Locations</span>
                                                </a>
                                            </li>
                                        </ul> */}
                                    </Stack>
                                </Grid>
                                <Grid item sm={12} xs={12} md={4}>
                                    <Typography
                                        variant="h2"
                                        sx={{ color: '#fff', margin: '0px 0px 12px 0px', fontSize: '18px', fontWeight: '500',
                                            [theme.breakpoints.down('sm')]: {
                                                fontSize: '14px',
                                            },
                                         }}
                                    >
                                        {' '}
                                        NEWSLETTER SIGN UP{' '}
                                    </Typography>
                                    <Stack>
                                        <div className="item clearfix">
                                            <Stack className="">
                                                <Typography
                                                    sx={{ fontSize: '12px', fontWeight: '400', color: '#fff', marginBottom: '10px' }}
                                                >
                                                    Sign up for exclusive updates, new arrivals &amp; insider only discounts
                                                </Typography>
                                            </Stack>

                                            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '15px', margin: '15px 0px 30px 0px' }}>
                                                <Stack sx={{ width: 'calc(100% - 130px)' }} className="field">
                                                    <input
                                                        style={{
                                                            border: '1px solid #d3d3d3',
                                                            color: '#cfcfcf',
                                                            background: '#232323',
                                                            padding: '10px 15px',
                                                            height: '44px'
                                                        }}
                                                        id="NewsletterForm--sections--14861248036954__footer-1"
                                                        type="email"
                                                        name="contact[email]"
                                                        className="field__input form-input-placeholder"
                                                        value=""
                                                        placeholder="enter your email address"
                                                    />
                                                </Stack>
                                                <button
                                                    className="submitbtn"
                                                    style={{
                                                        width: '130px',
                                                        background: '#f89b35',
                                                        color: '#232323',
                                                        borderColor: '#f89b35',
                                                        height: '44px',
                                                        fontSize:'16px',
                                                        fontWeight:'700'
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={{ xs: 3, sm: 1.5, md: 2 }}>
                                                <IconButton
                                                    size="small"
                                                    aria-label=""
                                                    // component={Link}F
                                                    href=""
                                                    target="_blank"
                                                    sx={{ color: '#000', background: '#fff',
                                                        ':hover':{background: '#f89b35',} }}
                                                >
                                                    <IconBrandFacebook />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    aria-label=""
                                                    // component={Link}
                                                    href=""
                                                    target="_blank"
                                                    sx={{ color: '#000', background: '#fff',
                                                        ':hover':{background: '#f89b35',}
                                                     }}
                                                >
                                                    <IconBrandInstagram />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    aria-label=""
                                                    // component={Link}
                                                    href=""
                                                    target="_blank"
                                                    sx={{ color: '#000', background: '#fff',
                                                        ':hover':{background: '#f89b35',}
                                                     }}
                                                >
                                                    <IconBrandTelegram />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    aria-label=""
                                                    // component={Link}
                                                    href=""
                                                    target="_blank"
                                                    sx={{ color: '#000', background: '#fff',
                                                        ':hover':{background: '#f89b35',}
                                                     }}
                                                >
                                                    <IconBrandYoutube />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    aria-label=""
                                                    // component={Link}
                                                    href=""
                                                    target="_blank"
                                                    sx={{ color: '#000', background: '#fff',
                                                        ':hover':{background: '#f89b35',}
                                                     }}
                                                >
                                                    <IconBrandWhatsapp />
                                                </IconButton>
                                            </Stack>
                                        </div>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Container>
                <Stack sx={{background:'#ffb001'}}>
                <Container>
                <Grid container >
                        <Box
                            sx={{
                                paddingTop: '20px',
                                width: '100%',
                                paddingBottom: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography sx={{ color: '#000', fontSize:'15px', fontWeight:'400' }}>© 2024 papaswillow.com All Rights Reserved</Typography>
                            {/* <img className="img-responsive" src={Payments} alt="Betting-platform" /> */}
                        </Box>
                    </Grid>
                    </Container>

                </Stack>
            </FooterView>
        </>
    );
};

export default Footer;
