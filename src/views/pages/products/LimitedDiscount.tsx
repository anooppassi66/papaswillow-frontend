import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

// assets

import CricketBat from 'assets/images/landing/cricketbats.png';
import CricketShoe from 'assets/images/landing/cricketshoes.png';
import SaleOfffer from 'assets/images/landing/img07.jpg';
import Limitedbanner1 from 'assets/images/landing/Limitedbanner1.jpg';
import Limitedbanner2 from 'assets/images/landing/Limitedbanner2.jpg';
import Limitedbanner3 from 'assets/images/landing/Limitedbanner3.jpg';
import Limitedbanner4 from 'assets/images/landing/Limitedbanner4.jpg';



// types

import { IconCircleArrowRight } from '@tabler/icons-react';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';

//project Import
import useAuth from 'hooks/useAuth';

// =============================|| LANDING - CARD SECTION ||============================= //



const ProductsDetails = styled(Box)(() => ({
  borderRadius: '0px',
  padding: '15px 0px 20px 0px',

  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  gap: '15px',
  '.img-responsive': {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },

}));



const LimitedDiscount = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleClickOpen = (val: any) => {
    if (user !== null && val === 'tote') {
      navigate(`/racing/28224/1/${val}`);
    }
    if (user !== null && val === 'fixed') {
      navigate(`/racing/22528/1/${val}`);
    }
    if (user !== null && val === 'racing') {
      navigate(`/provider/${val}`);
    }
  };

  useEffect(() => {
    // Simulate an API call or data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
    // const downMD = useMediaQuery(theme.breakpoints.down('md'));
  }, []);

  return (
    <Container sx={{background:'#fff'}}>
      <ProductsDetails >
        <Grid container justifyContent="center" sx={{}} spacing={{ xs: 2, sm: 2 }}>
          <Grid item md={6} sm={6} xs={12} sx={{ gap: '15px', }}>
            <Stack component={Link} sx={{ cursor: 'pointer', border:'1px solid #424242' }}>
              <img className='img-responsive' src={Limitedbanner1} alt="" />
            </Stack>

          </Grid>
          <Grid item md={6} sm={6} xs={12} sx={{ gap: '15px', }}>
            <Grid item md={12} sm={12} xs={12} sx={{ marginBottom:'15px'}}>
              <Stack component={Link} sx={{ cursor: 'pointer', border:'1px solid #424242' }}>
                <img className='img-responsive' src={Limitedbanner2} alt="" />
              </Stack>
            </Grid>
            <Grid sx={{ display: 'flex', gap:'15px' }}>
              <Grid item md={6} sm={6} xs={12}>
                <Stack component={Link} sx={{ cursor: 'pointer', border:'1px solid #424242' }}>
                  <img className='img-responsive' src={Limitedbanner3} alt="" />
                </Stack>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Stack component={Link} sx={{ cursor: 'pointer', border:'1px solid #424242' }}>
                  <img className='img-responsive' src={Limitedbanner4} alt="" />
                </Stack>
              </Grid>
            </Grid>

          </Grid>

        </Grid>
      </ProductsDetails>
    </Container>
  );
};

export default LimitedDiscount;
