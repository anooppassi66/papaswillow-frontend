import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// assets

import RacingFixeImg from 'assets/images/landing/HorseRacing-Fixed.jpg';
import RacingFixeImgxo from 'assets/images/landing/HorseRacingXO.jpg';

// types

import { IconCircleArrowRight } from '@tabler/icons-react';
import Skeleton from '@mui/material/Skeleton';

//project Import
import useAuth from 'hooks/useAuth';

// =============================|| LANDING - CARD SECTION ||============================= //

interface TopGameStyle {
    theme: Theme;
}

interface GameProviderBox {
    theme: Theme;
}

interface HorseRacingFixedBox {
    theme: Theme;
}

interface HorseRacingXOBox {
    theme: Theme;
}

const TopGameStyle = styled(Box)(({ theme }: TopGameStyle) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    backgroundColor: theme.palette.dark[800],
    // background: '#1A654A',
    borderRadius: '0px'
}));

const HorseRacingXOBox = styled(Box)(({ theme }: HorseRacingXOBox) => ({
    // background: '#ff0000',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    width: '100%',
    border: '1px solid ',
    borderColor: theme.palette.secondary.main,
    padding: '0px',

    backgroundImage: `url(${RacingFixeImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat'
}));

const HorseRacingFixedBox = styled(Box)(({ theme }: HorseRacingFixedBox) => ({
    // background: '#ff0000',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    width: '100%',
    border: '1px solid ',
    borderColor: theme.palette.secondary.main,
    padding: '0px',
    // backgroundImage:'url(assets/images/landing/Horse Racing-Fixed.jpg)',
    backgroundImage: `url(${RacingFixeImgxo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat'
}));

const HorseRacingFixed = () => {
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
        <TopGameStyle sx={{ p: '15px 10px 15px 10px', mb: '20px', mt: '20px', pb: '20px' }}>
            <Grid container justifyContent="center" sx={{}} spacing={{ xs: 2, sm: 2 }}>
                <Grid item md={4} sm={4} xs={12}>
                    {loading ? (
                        <>
                            <Skeleton
                                variant="rectangular"
                                sx={{ mt: '0px', mb: '5px', background: theme.palette.secondary.main }}
                                height={188}
                            />

                            {/* <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} /> */}
                        </>
                    ) : (
                        <HorseRacingFixedBox>
                            <Stack sx={{ padding: '20px', background: 'rgba(0,0,0,.8)' }}>
                                <Typography variant="h4" sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: '800' }}>
                                    Horse Racing - TOTE
                                </Typography>
                                <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: '600', marginTop: '20px' }}>
                                    ArionPlay is Philippines's most trusted betting company. We've got a wide range of horse racing markets
                                    for you to bet on.
                                </Typography>
                                <Button
                                    onClick={() => handleClickOpen('tote')}
                                    sx={{
                                        width: '110px',
                                        color: '#212121',
                                        background: '#FFCD05',
                                        marginTop: '20px',
                                        ':hover': {
                                            background: '#FFCD05'
                                        }
                                    }}
                                >
                                    <IconCircleArrowRight />
                                    <Typography sx={{ paddingLeft: '5px' }}>Play Now</Typography>
                                </Button>
                            </Stack>
                        </HorseRacingFixedBox>
                    )}
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                    {loading ? (
                        <>
                            <Skeleton
                                variant="rectangular"
                                sx={{ mt: '0px', mb: '5px', background: theme.palette.secondary.main }}
                                height={188}
                            />

                            {/* <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} /> */}
                        </>
                    ) : (
                        <HorseRacingXOBox>
                            <Stack sx={{ padding: '20px', background: 'rgba(0,0,0,.8)' }}>
                                <Typography variant="h4" sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: '800' }}>
                                    Horse Racing - Fixed
                                </Typography>
                                <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: '600', marginTop: '20px' }}>
                                    ArionPlay is Philippines's most trusted betting company. We've got a wide range of horse racing markets
                                    for you to bet on.
                                </Typography>
                                <Button
                                    onClick={() => handleClickOpen('fixed')}
                                    sx={{
                                        width: '110px',
                                        color: '#212121',
                                        background: '#FFCD05',
                                        marginTop: '20px',
                                        ':hover': {
                                            background: '#FFCD05'
                                        }
                                    }}
                                >
                                    <IconCircleArrowRight />
                                    <Typography sx={{ paddingLeft: '5px' }}>Play Now</Typography>
                                </Button>
                            </Stack>
                        </HorseRacingXOBox>
                    )}
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                    {loading ? (
                        <>
                            <Skeleton
                                variant="rectangular"
                                sx={{ mt: '0px', mb: '5px', background: theme.palette.secondary.main }}
                                height={188}
                            />

                            {/* <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} /> */}
                        </>
                    ) : (
                        <HorseRacingFixedBox>
                            <Stack sx={{ padding: '20px', background: 'rgba(0,0,0,.8)' }}>
                                <Typography variant="h4" sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: '800' }}>
                                    Horse Racing - XO
                                </Typography>
                                <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: '600', marginTop: '20px' }}>
                                    ArionPlay is Philippines's most trusted betting company. We've got a wide range of horse racing markets
                                    for you to bet on.
                                </Typography>
                                <Button
                                    onClick={() => handleClickOpen('racing')}
                                    sx={{
                                        width: '110px',
                                        color: '#212121',
                                        background: '#FFCD05',
                                        marginTop: '20px',
                                        ':hover': {
                                            background: '#FFCD05'
                                        }
                                    }}
                                >
                                    <IconCircleArrowRight />
                                    <Typography sx={{ paddingLeft: '5px' }}>Play Now</Typography>
                                </Button>
                            </Stack>
                        </HorseRacingFixedBox>
                    )}
                </Grid>
            </Grid>
        </TopGameStyle>
    );
};

export default HorseRacingFixed;
