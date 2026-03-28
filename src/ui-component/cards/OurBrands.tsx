// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, Theme } from '@mui/material/styles';

// third-party

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import FadeInWhenVisible from 'views/pages/Animation';
import brandimage1 from 'assets/images/landing/omtex.jpg';
import one from 'assets/images/1.jpg';
import two from 'assets/images/2.jpg';
import three from 'assets/images/3.jpg';
import four from 'assets/images/4.jpg';

import six from 'assets/images/6.jpg';

// import FadeInWhenVisible from '../Animation';

// =============================|| LANDING - FRAMWORK SECTION ||============================= //

const ProductsDetails = styled(Box)(({ theme }) => ({
    borderRadius: '0px',
    padding: '60px 0px 40px 0px',
    [theme.breakpoints.down('sm')]: {
        padding: '0px 0px 10px 0px'
    },

    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '15px',
    '.img-responsive': {
        //display: 'block',
        maxWidth: '100%',
        height: 'auto',
        //borderRadius: '100px',
        border: '5px solid #ed1c2400',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '.6s',
        ':hover ': {
            borderColor: '#f89b35'
        }
    },
    a: {
        //borderRadius: '100px'
    },
    '.viewbtn': {
        width: 'auto',
        padding: '8px 60px',
        marginTop: '30px',
        textTransform: 'uppercase',
        color: '#000',
        background: '#f89b35',
        //borderRadius: '100px',
        fontSize: '16px',
        fontWeight: '600',
        ':hover': {
            background: '#f89b35'
        }
    }
}));

const OurBrands = () => {
    const theme = useTheme();

    return (
        <>
            <Container
                sx={{
                    padding: '0px !important',
                    [theme.breakpoints.down('sm')]: {
                        padding: '0px 15px!important'
                    }
                }}
            >
                <FadeInWhenVisible>
                    <>
                        <ProductsDetails>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    lineHeight: '30px',
                                    margin: '0px 0px 38px 0px',
                                    color: '#fff',
                                    textAlign: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '22px',
                                        margin: '0px 0px 10px 0px'
                                    }
                                }}
                            >
                                Our Brands
                            </Typography>
                            <Grid
                                container
                                spacing={{ xs: 0, sm: 0 }}
                                sx={{
                                    flexWrap: 'initial',
                                    background: 'none !important',
                                    overflow: 'auto',
                                    justifyContent: 'flex-start',
                                    gap: '10px',
                                    flexDirection: 'column',
                                    [theme.breakpoints.down('sm')]: {
                                        flexDirection: 'row',
                                        gap: '5px'
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        flexWrap: 'initial',
                                        justifyContent: 'flex-start',
                                        gap: '20px',
                                        display: 'flex',
                                        [theme.breakpoints.down('sm')]: {
                                            padding: '0px 0px',
                                            gap: '8px'
                                        }
                                    }}
                                >
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img className="img-responsive" src={four} alt="brand logo" />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img
                                                className="img-responsive"
                                                src="https://papaswillow.com/uploads/ea75393147c61b68b525eee2b595f589.jpg"
                                                alt="brand logo"
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img
                                                className="img-responsive"
                                                src="https://papaswillow.com/uploads/8453ecb78552486162998621d8005ea6.jpg"
                                                alt="brand logo"
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img className="img-responsive" src={six} alt="brand logo" />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img className="img-responsive" src={one} alt="brand logo" />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img className="img-responsive" src={brandimage1} alt="brand logo" />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img className="img-responsive" src={four} alt="brand logo" />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img className="img-responsive" src={brandimage1} alt="brand logo" />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img className="img-responsive" src={three} alt="brand logo" />
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                        sm={3}
                                        xs={3}
                                        sx={{
                                            gap: '15px',
                                            [theme.breakpoints.down('sm')]: {
                                                minWidth: '100px'
                                            }
                                        }}
                                    >
                                        <Stack component={Link} sx={{ cursor: 'pointer' }}>
                                            <img className="img-responsive" src={two} alt="brand logo" />
                                        </Stack>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button className="viewbtn">View All brands</Button>
                            </Box>
                        </ProductsDetails>
                    </>
                </FadeInWhenVisible>
            </Container>
        </>
    );
};

export default OurBrands;
