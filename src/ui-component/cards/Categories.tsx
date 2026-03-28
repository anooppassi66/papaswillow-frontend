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


// types
import { useEffect, useState } from 'react';
import CricketPads from 'assets/images/landing/batting-pads.png';
// import CricketPads from 'assets/images/landing/Batting-Padsicon.png';
import HelmetIcon from 'assets/images/landing/cricket-helmetnew.png';
// import ClothesIcon from 'assets/images/landing/clothes_icon.png';
import ClothesIcon from 'assets/images/landing/jacket.png';

//import GlovesIcon from 'assets/images/landing/batting-glovesicon.png';
import GlovesIcon from 'assets/images/landing/batting-gloves.png';

import CapiconIcon from 'assets/images/landing/fashion-cap.png';
import CricketBagsIcon from 'assets/images/landing/cricket-bag.png';
import ShoesIcon from 'assets/images/landing/cricket-shoesicon.png';
import BatsIcon from 'assets/images/landing/batting-batsicon.png';
import GeeperGloveIcon from 'assets/images/landing/keeper-gloves.png';
import { Link } from 'react-router-dom';


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
    background: '#fff',

    '.categorie-product': {
        display: 'flex', gap: '10px',
        cursor:'pointer',
        
        BorderRadius:'10px',
        'img': { transition: 'all .8s ease', },
        ':hover': {
            'img': {
                transform: 'scale(1.15)'

            }
        },

    }
}));

const LinkButton = styled(Link)(({ theme }) => ({
    padding:'0px',
      // textAlign: 'left',
      // flexDirection: 'row',
      // justifyContent: 'flex-start',
      // alignItems: 'center',
      // width: '100%',
      // gap: '10px',
      // ':hover': {
      //     backgroundColor: 'rgba(251, 221, 155, 0.5) !important'
      // }
  }));

const Categoriescard = styled(Stack)(({ theme }: MyBox) => ({
   background: '#212129', 
   flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
   [theme.breakpoints.down('sm')]: {
    minWidth: '180px',
},
'.img-responsive':{ width:'45px'},

   
   border:'1px solid rgba(164, 172, 179, 0.4)', borderRadius:'0px', padding: '15px', width: '100%', position: 'relative', overflow: 'hidden',
   '.categoriestext':{fontSize: '20px', fontWeight: '700',  color:'#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        fontWeight: '700',
        
    },
   }
}));

const ItemsList = styled(Grid)(({ theme }: ItemsList) => ({
    background: '',
    p: {
        color: '#000'
    }
}));
Stack
const CategoriesCardSection = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);

    return (
        <Container sx={{ paddingTop: '0px', padding:'0px !important', paddingBottom: '0px', background: 'none !important',
            [theme.breakpoints.down('sm')]: {
                marginBottom:'40px',
                
            },
         }}>

            <MyBox
                sx={{
                    p: '0px 0px 0px 0px',

                    // border: '2px solid #48464b',
                    position: 'relative',
                    background:'none',
                    // background: '#fff
                    
                }}
            >

                {/* <Container> */}
                <Grid
                    container
                    justifyContent="center"
                    sx={{ flexWrap: 'initial', background:'none !important', overflow: 'auto', justifyContent: 'flex-start', gap: '20px', flexDirection: 'column',
                        [theme.breakpoints.down('sm')]: {
                            flexDirection: 'row',
                            padding:'0px 20px',
                            marginBottom:'20px',
                            
                        },
                     }}
                >
                    <Box sx={{ flexWrap: 'initial',  justifyContent: 'flex-start', gap: '20px', display: 'flex',
                        [theme.breakpoints.down('sm')]: {
                            padding:'0px 0px',
                        },
                     }}>
                        <Grid className='categorie-product' item md={4} sm={4} xs={12} >
                        <Button className='categoriestext' sx={{width:'100%', padding:'0px'  }} component={LinkButton} to={`/products/category/Batting%20Pads`}>
                            <Categoriescard >
                                <Stack sx={{ padding: '0px 10px', minHeight: '80px', justifyContent: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        minHeight: '50px',
                                    },
                                 }}>
                                    <Typography className='categoriestext' >Batting Pads</Typography>
                                    
                                    {/* <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Pellentesque cosmo dinciduntos</Typography> */}
                                </Stack>
                                <Stack sx={{  right: '0px', top: '0px' }}>
                                    <img className='img-responsive' src={CricketPads} alt="" width="60" />
                                </Stack>
                            </Categoriescard>
                            </Button>

                        </Grid>
                        <Grid className='categorie-product' item md={4} sm={4} xs={12} >
                        <Button className='categoriestext' sx={{width:'100%', padding:'0px'  }} component={LinkButton} to={`/products/category/CLOTHING`}>
                            <Categoriescard >
                                <Stack sx={{ padding: '0px 10px', minHeight: '80px', justifyContent: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        minHeight: '50px',
                                    },
                                 }}>
                                    <Typography className='categoriestext'  >Clothes</Typography>
                                    {/* <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Pellentesque cosmo dinciduntos</Typography> */}
                                </Stack>
                                <Stack sx={{  right: '0px', top: '0px' }}>
                                    <img className='img-responsive' src={ClothesIcon} alt="" width="60" />
                                </Stack>
                            </Categoriescard>
                        </Button>

                        </Grid>
                        <Grid className='categorie-product' item md={4} sm={4} xs={12} >
                        <Button className='categoriestext' sx={{width:'100%', padding:'0px'  }} component={LinkButton} to={`/products/category/Batting%20Gloves`}>
                            <Categoriescard >
                                <Stack sx={{ padding: '0px 10px', minHeight: '80px', justifyContent: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        minHeight: '50px',
                                    },
                                 }}>
                                    <Typography className='categoriestext' >Batting Gloves</Typography>
                                    {/* <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Pellentesque cosmo dinciduntos</Typography> */}
                                </Stack>
                                <Stack sx={{  right: '0px', top: '0px' }}>
                                    <img className='img-responsive' src={GlovesIcon} alt="" width="55" />
                                </Stack>
                            </Categoriescard>
                        </Button>
                        </Grid>
                        <Grid className='categorie-product' item md={4} sm={4} xs={12} >
                        <Button className='categoriestext' sx={{width:'100%', padding:'0px'  }} component={LinkButton} to={`/products/category/BAGS`}>
                            <Categoriescard >
                                <Stack sx={{ padding: '0px 10px', minHeight: '80px', justifyContent: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        minHeight: '50px',
                                    },
                                 }}>
                                    <Typography className='categoriestext' >Cricket Bags</Typography>
                                    {/* <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Pellentesque cosmo dinciduntos</Typography> */}
                                </Stack>
                                <Stack sx={{  right: '0px', top: '0px' }}>
                                    <img className='img-responsive' src={CricketBagsIcon} alt="" width="70" />
                                </Stack>
                            </Categoriescard>
                        </Button>
                        </Grid>

                    </Box>
                    <Box sx={{ flexWrap: 'initial',  justifyContent: 'flex-start', gap: '20px', display: 'flex',
                        [theme.breakpoints.down('sm')]: {
                            padding:'0px 0px',
                        },
                     }}>
                        <Grid className='categorie-product' item md={4} sm={4} xs={12} >
                        <Button className='categoriestext' sx={{width:'100%', padding:'0px'  }} component={LinkButton} to={`/products/category/Shoes`}>
                            <Categoriescard >
                                <Stack sx={{ padding: '0px 10px', minHeight: '80px', justifyContent: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        minHeight: '50px',
                                    },
                                 }}>
                                    <Typography className='categoriestext' >Cricket Shoes</Typography>
                                    {/* <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Pellentesque cosmo dinciduntos</Typography> */}
                                </Stack>
                                <Stack sx={{  right: '0px', top: '0px' }}>
                                    <img className='img-responsive' src={ShoesIcon} alt="" width="70" />
                                </Stack>
                            </Categoriescard>
                        </Button>
                        </Grid>
                        <Grid className='categorie-product' item md={4} sm={4} xs={12} >
                        <Button className='categoriestext' sx={{width:'100%', padding:'0px'  }} component={LinkButton} to={`/products/category/Keeping%20Gloves`}>
                            <Categoriescard >
                                <Stack sx={{ padding: '0px 10px', minHeight: '80px', justifyContent: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        minHeight: '50px',
                                    },
                                 }}>
                                    <Typography className='categoriestext' >Keeper Gloves</Typography>
                                    {/* <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Pellentesque cosmo dinciduntos</Typography> */}
                                </Stack>
                                <Stack sx={{  right: '0px', top: '0px' }}>
                                    <img className='img-responsive' src={GeeperGloveIcon} alt="" width="60" />
                                </Stack>
                            </Categoriescard>
                        </Button>
                        </Grid>
                        <Grid className='categorie-product' item md={4} sm={4} xs={12} >
                        <Button className='categoriestext' sx={{width:'100%', padding:'0px'  }} component={LinkButton} to={`/products/tags/Bats`}>
                            <Categoriescard >
                                <Stack sx={{ padding: '0px 10px', minHeight: '80px', justifyContent: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        minHeight: '50px',
                                    },
                                 }}>
                                    <Typography className='categoriestext' >Cricket Bats</Typography>
                                    {/* <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Pellentesque cosmo dinciduntos</Typography> */}
                                </Stack>
                                <Stack sx={{  right: '0px', top: '0px' }}>
                                    <img className='img-responsive' src={BatsIcon} alt="" width="50"  />
                                </Stack>
                            </Categoriescard>
                        </Button>
                        </Grid>
                        <Grid className='categorie-product' item md={4} sm={4} xs={12} >
                        <Button className='categoriestext' sx={{width:'100%', padding:'0px'  }} component={LinkButton} to={`/products/category/Helmets`}>
                            <Categoriescard >
                                <Stack sx={{ padding: '0px 10px', minHeight: '80px', justifyContent: 'center' ,
                                    [theme.breakpoints.down('sm')]: {
                                        minHeight: '50px',
                                    },
                                }}>
                                    <Typography className='categoriestext' >Helmet</Typography>
                                    {/* <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Pellentesque cosmo dinciduntos</Typography> */}
                                </Stack>
                                <Stack sx={{  right: '0px', top: '0px' }}>
                                    <img className='img-responsive' src={HelmetIcon} alt="" width="60" />
                                </Stack>
                            </Categoriescard>
                        </Button>
                        </Grid>

                    </Box>
                </Grid>
            </MyBox>

        </Container>
    );
};

export default CategoriesCardSection;
