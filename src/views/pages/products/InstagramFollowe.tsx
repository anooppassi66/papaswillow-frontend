import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { styled, useTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';

// assets

import QrCodeImg from 'assets/images/product/PapasWillow-Cricket-Store.png';
import { color } from 'framer-motion';

// =============================|| LANDING - CARD SECTION ||============================= //

const ProductsDetails = styled(Box)(({ theme }) => ({
    background: '#181921',
    marginTop: '30px',
   
}));


const LocationMap = styled(Stack)(({ theme }) => ({
    width: '100%', height: '100%', border: '0', borderRadius:'20px',
    'iframe':{
        width:'100%',
        height:'350px',
         border:' 0', borderRadius:'20px' ,
         [theme.breakpoints.down('sm')]: {
            height:'250px',
        },
        }

}));



const SocialPost = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        padding: '20px 0px !important'
    },
    position: 'relative',
    '&::after': {
        content: '""',
        width: '1px',
        height: '100%',
        background: '#f89b35',
        position: 'absolute',
        left: '-30px',
        bottom: '0px'
    },
    '.social-text': {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        paddingRight: '50px',
        [theme.breakpoints.down('sm')]: {
            paddingRight: '0px',
            paddingBottom: '30px'
        },
        '.heading-info': {
            fontSize: '30px',
            lineHeight: '40px',
            position: 'relative',
            marginBottom: '40px',
            color: '#fff',
            [theme.breakpoints.down('sm')]: {
                fontSize: '24px',
                lineHeight: '30px'
            },
            '&::after': {
                content: '""',
                width: '70px',
                height: '2px',
                background: '#f89b35',
                position: 'absolute',
                left: '0px',
                bottom: '-15px'
            }
        },
        '.sub-heading-info': {
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 400,
            color: '#fff'
        },
        ul: {
            marginTop: '6px',
            color: '#fff',
            marginLeft: '16px',
            padding: '0px',
            marginBottom: '40px',
            li: {
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 500
            }
        },
        '.MuiButton-contained': {
            marginTop: '24px',
            width: '120px',
            background: '#f89b35',
            color: '#000'
        }
    },
    '.img-wrap': {
        width: '100%',
        padding: '24px',
        borderRadius: '10px',
        background: '#fff',
        [theme.breakpoints.down('sm')]: {
            padding: '10px',display: 'flex', alignItems: 'center',
        },

        'img': {
            width: 'auto',
            height: 'auto',
            [theme.breakpoints.down('sm')]: {
                width: '100px',
                height: '100px',
            },
            //objectFit: 'cover'
        }
    }
}));

const InstagramFollowe = () => {
    const [value, setValue] = useState<number | null>(4);
    const theme = useTheme();
    return (
        <ProductsDetails>
            <Container sx={{ padding: '40px 0px !important',
                [theme.breakpoints.down('sm')]: {
                    padding: '10px 15px!important',
                    marginBottom:'40px'
                }
             }}>

                <Grid container>
                    <Grid item md={6} sm={12} xs={12} sx={{paddingRight:'60px',
                    [theme.breakpoints.down('sm')]: {
                        paddingRight:'0px',
                    }

                    }}>
                        
                                <LocationMap sx={{}}>
                                
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13207.084907986437!2d-84.250475!3d34.1521946!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59b6166b81a4f%3A0x79c26db3f0f71e16!2sPapas%20Willow%20Cricket%20Store!5e0!3m2!1sen!2sin!4v1721396200627!5m2!1sen!2sin"
                                       
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                
                                </LocationMap>
                            
                        
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <SocialPost>
                            <Grid container sx={{ alignItems: 'center' }}>
                                <Grid item md={8} sm={12} xs={12}>
                                    <Stack className="social-text">
                                        <Typography className="heading-info">Follow us for more update</Typography>
                                        <Typography className="sub-heading-info">
                                            Stay in the loop with all the latest updates! Follow us on instagram for exclusive content,
                                            promotions, and behind-the-scenes action!
                                        </Typography>
                                        <ul>
                                            <li>Get exclusive previews of new arrivals and upcoming promotions.</li>
                                        </ul>
                                        <Typography className="sub-heading-info">
                                            Join @papaswillow page of cricket lovers and never miss a beat. Hit that follow button now!
                                            #papaswillow #cricketstore #cricketshop
                                        </Typography>
                                        <Button variant="contained" className="follown-btn">
                                            FOLLOW US
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12}>
                                    <Stack className="img-wrap">
                                        <img src={QrCodeImg} alt="" />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </SocialPost>
                    </Grid>
                </Grid>
            </Container>
        </ProductsDetails>
    );
};

export default InstagramFollowe;
