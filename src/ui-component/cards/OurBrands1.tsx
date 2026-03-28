// material-ui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';

// assets
import racingCardImg from 'assets/images/landing/racingimg.png';
import casinoCardImg from 'assets/images/landing/casinocad.png';
import SportsImg from 'assets/images/landing/sportsimg.png';
import EGameImg from 'assets/images/landing/e-gameimg.png';
// types
import { ThemeMode } from 'types/config';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import imageSlider1 from 'assets/images/landing/omtex.jpg';
import { color } from 'framer-motion';

// =============================|| LANDING - CARD SECTION ||============================= //

interface MyBox {
    theme: Theme;
}

interface ItemsList {
    theme: Theme;
}



const MyBox = styled(Box)(({ theme }: MyBox) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    // background: '#1A654A',
   // backgroundColor:  theme.palette.dark[800],
    borderRadius: '0px',
    background:'#fff'
}));

const ItemsList = styled(Grid)(({ theme }: ItemsList) => ({
    background:'',
    borderRadius:'100px',
    'img':{
        borderRadius:'100px',
        border: '5px solid #ffb001',
        display:' flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '.6s',
    },
    'p':{
      color:'#000',
    }
}));

const OurBrands = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an API call or data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
        // const downMD = useMediaQuery(theme.breakpoints.down('md'));
    }, []);

   

    return (
        <Container sx={{paddingTop:'20px', paddingBottom:'20px', maxWidth:'100% !important'}}>
        <MyBox sx={{ p: '65px 10px 15px 10px', mb: '20px', mt:'30px', border:'2px solid #000000', position:'relative' }}>
            
             <h5 style={{textAlign:'center', display:'flex', justifyContent:'center', fontSize:'16px', margin:'0px 0px', background:'#ffb001', color:'#000', borderRadius:'100px', padding:'10px 20px', top:'-20px', fontWeight:'500', position:'absolute'}}>Our Brands</h5>
             {/* <Container> */}
            <Grid container justifyContent="center"  sx={{ textAlign: 'center', flexWrap:'initial', overflow:'auto', justifyContent:'flex-start',   }}>
               
                <Grid item md={12} sm={12} xs={12} sx={{display:'flex', gap:'10px'}}>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                <ItemsList item md={2} sm={2} xs={12}>
                    <img src={imageSlider1} alt="" width="140" />
                    
                </ItemsList>
                
                </Grid>
                
            </Grid>
           
        </MyBox>
        </Container>
    );
};

export default OurBrands;
