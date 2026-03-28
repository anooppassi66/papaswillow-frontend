import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

// assets


// types

import Container from '@mui/material/Container';

//project Import

import useBannerByFindPosition from 'hooks/useFindBanners';

// =============================|| LANDING - CARD SECTION ||============================= //

const ProductsDetails = styled(Box)(({ theme }) => ({
    borderRadius: '0px',
    padding: '15px 0px 20px 0px',
    marginBottom: '40px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '15px',
    '.img-responsive': {
        display: 'block',
        maxWidth: '100%',
        height: 'auto'
    },
    '.limitedoffer': {
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'end',
        img: {
            maxWidth: '250px',
            position: 'absolute',
            right: '13px',
            bottom: '26px',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '118px',
                bottom: '2px'
            }
        }
    },

    '.discountview': {
        background: 'linear-gradient(180deg, #0c0c0d, #181921)',
        marginBottom: '12px',
        padding: '26px',
        minHeight: '380px',
        position: 'relative',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minHeight: '210px',
            padding: '13px',
            marginBottom: '0px'
        },
        h4: {
            margin: '0 0 8px',
            color: '#fff',
            textTransform: 'capitalize',
            fontSize: '22px',
            lineHeight: '31px',
            letterSpacing: '0px',
            fontWeight: '600',
            [theme.breakpoints.down('sm')]: {
                fontSize: '15px',
                lineHeight: '19px'
            }
        }
    },
    p: {
        margin: ' 0',
        maxWidth: '268px',
        color: '#fff',
        textTransform: 'capitalize',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0px',
        fontWeight: '300',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
            lineHeight: '18px'
        }
    },
    '.shopnow': {
        display: 'block',
        marginTop: '14px',
        backgroundColor: '#fff',
        textDecoration: 'none !important',
        borderRadius: '50px',
        padding: '7px 10px',
        width: '130px',
        textAlign: 'center',
        textTransform: 'uppercase',
        transition: '.6s',
        zIndex: '1',
        fontSize: '14px',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            marginTop: '8px',
            padding: '5px',
            width: '78px',
            fontSize: '10px'
        }
    },
    '.originalplayers': {
        background: 'linear-gradient(180deg, #249501, #1b6304)',
        borderRadius: '10px',

        [theme.breakpoints.down('sm')]: {
            minHeight: '210px',
            padding: '13px',
            marginBottom: '0px'
        },
        '.original': {
            padding: '26px',
            [theme.breakpoints.down('sm')]: {
                padding: '13px'
            }
        },
        h4: {
            margin: '0 0 8px',
            color: '#fff',
            textTransform: 'capitalize',
            fontSize: '22px',
            lineHeight: '31px',
            letterSpacing: '0px',
            fontWeight: '600',
            [theme.breakpoints.down('sm')]: {
                fontSize: '15px',
                lineHeight: '19px'
            }
        }
    },
    '.shopforkids': { background: 'linear-gradient(180deg, #068737, #1ba854) !important' },
    '.clothing': { background: 'linear-gradient(180deg, #0acef9, #46bed8) !important', marginBottom: '0px' },
    '.befirstgm': { background: 'linear-gradient(180deg, #ffa800, #ffb001) !important', marginBottom: '0px' }
}));

const HomeProducts = () => {
    const theme = useTheme();
    const banner3 = useBannerByFindPosition('ads3');
    const ads3 = banner3?.bannerImages || '';
    const link3 = banner3?.bannerLink || '';

    const banner4 = useBannerByFindPosition('ads4');
    const ads4 = banner4?.bannerImages || '';
    const link4 = banner4?.bannerLink || '';

    const banner5 = useBannerByFindPosition('ads5');
    const ads5 = banner5?.bannerImages || '';
    const link5 = banner5?.bannerLink || '';

    const banner6 = useBannerByFindPosition('ads6');
    const ads6 = banner6?.bannerImages || '';
    const link6 = banner6?.bannerLink || '';

    const banner7 = useBannerByFindPosition('ads7');
    const ads7 = banner7?.bannerImages || '';
    const link7 = banner7?.bannerLink || '';

    const banner8 = useBannerByFindPosition('ads8');
    const ads8 = banner8?.bannerImages || '';
    const link8 = banner8?.bannerLink || '';

    const banner9 = useBannerByFindPosition('ads9');
    const ads9 = banner9?.bannerImages || '';
    const link9 = banner9?.bannerLink || '';

    const banner10 = useBannerByFindPosition('ads10');
    const ads10 = banner10?.bannerImages || '';
    const link10 = banner10?.bannerLink || '';

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
        <Container sx={{ background: '#fff' }}>
            <ProductsDetails>
                <Grid
                    container
                    justifyContent="center"
                    
                    sx={{
                        flexWrap: 'initial',
                        background: 'none !important',
                        justifyContent: 'flex-start',
                        gap: '20px',
                        [theme.breakpoints.down('sm')]: {
                            flexWrap: 'wrap',
                            gap: '10px'
                        }
                    }}
                >
                    <Grid
                        item
                        md={4}
                        sm={12}
                        xs={12}
                        sx={{
                            gap: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            [theme.breakpoints.down('sm')]: {
                                flexDirection: 'row'
                            }
                        }}
                    >
                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                            <Link to={link3}>
                                <img className="img-responsive" src={ads3} alt={link3} width="100%" />
                            </Link>
                        </Stack>
                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                            <Link to={link4}>
                                <img className="img-responsive" src={ads4} alt={link4} width="100%" />
                            </Link>
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        sm={12}
                        xs={12}
                        sx={{
                            gap: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            [theme.breakpoints.down('sm')]: {
                                display: 'none'
                            }
                        }}
                    >
                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                            <Link to={link5}>
                                <img className="img-responsive" src={ads5} alt={link5} />
                            </Link>
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        sm={12}
                        xs={12}
                        sx={{
                            gap: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            [theme.breakpoints.down('sm')]: {
                                flexDirection: 'row'
                            }
                        }}
                    >
                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                            <Link to={`/products/category/BALLS`}>
                                <img className="img-responsive" src={ads6} alt={link6} width="100%" />
                            </Link>
                        </Stack>
                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                            <Link to={`/products/category/Helmets`}>
                                <img className="img-responsive" src={ads7} alt={link7} width="100%" />
                            </Link>
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        sm={12}
                        xs={12}
                        sx={{
                            gap: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            [theme.breakpoints.down('sm')]: {
                                flexDirection: 'row'
                            }
                        }}
                    >
                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                            <Link to={link8}>
                                <img className="img-responsive" src={ads8} alt={link8} width="100%" />
                            </Link>
                        </Stack>
                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                            <Link to={`/products/category/Shoes`}>
                                <img className="img-responsive" src={ads9} alt={link9} width="100%" />
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
                {/* <Grid
          container
          justifyContent="center"
          sx={{
            flexWrap: 'initial', background: 'none !important', justifyContent: 'flex-start', gap: '20px',
            [theme.breakpoints.down('sm')]: {
              flexWrap: 'wrap', gap: '10px',
            },
          }}>
          <Grid item md={4} sm={4} xs={12}
            sx={{
              [theme.breakpoints.down('sm')]: {
                display: 'flex',
                gap: '10px',
                flexDirection:'row',
              },
            }}
          >
            <Grid item md={12} sm={6} xs={6}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  display: 'flex',
                  gap: '10px',
                  flexDirection:'row',
                },
              }}
            >
              <Stack className='discountview'>
                <Stack>
                  <Typography variant='h4'>Limited Time <br /> Discount</Typography>
                  <Typography>UpTo 40%off</Typography>
                  <Button className='shopnow'>Shop now</Button>
                </Stack>
                <Stack className='limitedoffer'>
                  <img className='' src={DiscountImg} alt="" />
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={12} sm={6} xs={6}>
              <Stack className='discountview befirstgm'>
                <Stack>
                  <Typography variant='h4'>Be First ! GM</Typography>
                  <Typography>2024 BAT</Typography>
                  <Button className='shopnow'>Shop now</Button>
                </Stack>
                <Stack className='limitedoffer'>
                  <img className='' src={DiscountImg} alt="" />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid item md={4} sm={4} xs={12} className='originalplayers'>
            <Grid item md={12} sm={12} xs={12} className=''>
              <Stack className='original'>
                <Stack>
                  <Typography variant='h4'>Original players  <br /> Cricket bats</Typography>
                  <Typography>Get Best Deals now! </Typography>
                  <Button className='shopnow'>Shop now</Button>
                </Stack>
                <Stack className='limitedoffer'>
                  <img className='' src={DiscountImg} alt="" />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid item md={4} sm={4} xs={12}
            sx={{
              [theme.breakpoints.down('sm')]: {
                display: 'flex',
                gap: '10px',
              },
            }}
          >
            <Grid item md={12} sm={12} xs={12} >
              <Stack className='discountview shopforkids'>
                <Stack>
                  <Typography variant='h4'>Shop for Kids</Typography>
                  <Typography>Check out our junior cricket bats & equipment</Typography>
                  <Button className='shopnow'>Shop now</Button>
                </Stack>
                <Stack className='limitedoffer'>
                  <img className='' src={DiscountImg} alt="" />
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Stack className='discountview clothing'>
                <Stack>
                  <Typography variant='h4'>Custom Clothing Available</Typography>
                  <Typography>Select Design, size, quantity & order</Typography>
                  <Button className='shopnow'>Shop now</Button>
                </Stack>
                <Stack className='limitedoffer'>
                  <img className='' src={DiscountImg} alt="" />
                </Stack>
              </Stack>
            </Grid>
          </Grid>

        </Grid> */}
            </ProductsDetails>
        </Container>
    );
};

export default HomeProducts;
