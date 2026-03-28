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

// =============================|| LANDING - CARD SECTION ||============================= //

interface MyBox {
    theme: Theme;
}

interface RacingCard {
    theme: Theme;
}
interface CasinoCard {
    theme: Theme;
}

interface SportsCard {
    theme: Theme;
}

interface EgameCard {
    theme: Theme;
}

const MyBox = styled(Box)(({ theme }: MyBox) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    // background: '#1A654A',
    backgroundColor:  theme.palette.dark[800],
    borderRadius: '0px'
}));

const RacingCard = styled(Box)(({ theme }: RacingCard) => ({
    background: 'linear-gradient(180deg,rgba(196,107,2,.2) 0%,rgba(196,107,2,0) 100%),#1C1E22',
    borderRadius: '0px',
    position: 'relative',
    aspectRatio: '326/330',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid ',
    borderColor: theme.palette.secondary.main,
    [theme.breakpoints.down(1023)]: {
        width:'240px',
        height:'240px',
      },
    '.racecard': {
        // background:'linear-gradient(180deg,rgba(98,22,233,.2) 0%,rgba(98,22,233,0) 100%),#1C1E22',
        position: 'relative',
        aspectRatio: '326 / 330',
        overflow: 'hidden'
    },
    '.blur': {
        transform: 'translate3d(-50%,-50%,0)',
        width: '109.54%',
        aspectRatio: '356/196',
        filter: 'blur(2.625rem)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#c46b02',
        borderRadius: '22.25rem',
        zIndex: '1'
    },
    '.mask': {
        backgroundImage: 'linear-gradient(180deg,rgba(0,0,0,.2) 0%,rgba(0,0,0,0) 100%)',
        transition: 'opacity cubic-bezier(.42,0,.03,1) .7s',
        position: 'absolute',
        zIndex: '3',
        inset: '0',
        borderRadius: '10px'
    },
    '.cover': {
        position: 'relative',
        zIndex: 2,
        display: 'block',
        width: '100%',
        objectfit: 'cover',
        transition: 'transform cubic-bezier(.42,0,.03,1) .7s'
    },
    '.maincontent': {
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '-60px',
        zIndex: '10',
        padding: '1.25rem .75rem',

        backdropFilter: 'blur(1.5625rem)',
        transition: 'all cubic-bezier(.42,0,.03,1) .7s',
        textAlign: 'left'
    },
    ':hover': {
        '.maincontent': {
            bottom: '0px'
        }
    }
}));

const SportsCard = styled(Box)(({ theme }: SportsCard) => ({
    background: 'linear-gradient(180deg,rgba(23,183,69,.2) 0%,rgba(30,130,59,0) 100%),#1C1E22',
    borderRadius: '0px',
    position: 'relative',
    aspectRatio: '326/330',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid ',
    borderColor: theme.palette.secondary.main,
    [theme.breakpoints.down(1023)]: {
        width:'240px',
        height:'240px',
      },
    '.racecard': {
        // background:'linear-gradient(180deg,rgba(98,22,233,.2) 0%,rgba(98,22,233,0) 100%),#1C1E22',
        position: 'relative',
        aspectRatio: '326 / 330',
        overflow: 'hidden'
    },
    '.blur': {
        transform: 'translate3d(-50%,-50%,0)',
        width: '109.54%',
        aspectRatio: '356/196',
        filter: 'blur(2.625rem)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#079234',
        borderRadius: '22.25rem',
        zIndex: '1'
    },
    '.mask': {
        backgroundImage: 'linear-gradient(180deg,rgba(0,0,0,.2) 0%,rgba(0,0,0,0) 100%)',
        transition: 'opacity cubic-bezier(.42,0,.03,1) .7s',
        position: 'absolute',
        zIndex: '3',
        inset: '0',
        borderRadius: '10px'
    },
    '.cover': {
        position: 'relative',
        zIndex: 2,
        display: 'block',
        width: '100%',
        objectfit: 'cover',
        transition: 'transform cubic-bezier(.42,0,.03,1) .7s'
    },
    '.maincontent': {
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '-60px',
        zIndex: '10',
        padding: '1.25rem .75rem',

        backdropFilter: 'blur(1.5625rem)',
        transition: 'all cubic-bezier(.42,0,.03,1) .7s',
        textAlign: 'left'
    },
    ':hover': {
        '.maincontent': {
            bottom: '0px'
        }
    }
}));

const CasinoCard = styled(Box)(({ theme }: CasinoCard) => ({
    background: 'linear-gradient(180deg,rgba(98,22,233,.2) 0%,rgba(98,22,233,0) 100%),#1C1E22',
    borderRadius: '0px',
    position: 'relative',
    aspectRatio: '326/330',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid ',
    borderColor: theme.palette.secondary.main,
    [theme.breakpoints.down(1023)]: {
        width:'240px',
        height:'240px',
      },
    '.racecard': {
        // background:'linear-gradient(180deg,rgba(98,22,233,.2) 0%,rgba(98,22,233,0) 100%),#1C1E22',
        position: 'relative',
        aspectRatio: '326 / 330',
        overflow: 'hidden'
    },
    '.blur': {
        transform: 'translate3d(-50%,-50%,0)',
        width: '109.54%',
        aspectRatio: '356/196',
        filter: 'blur(2.625rem)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#6216e9',
        borderRadius: '22.25rem',
        zIndex: '1'
    },
    '.mask': {
        backgroundImage: 'linear-gradient(180deg,rgba(0,0,0,.2) 0%,rgba(0,0,0,0) 100%)',
        transition: 'opacity cubic-bezier(.42,0,.03,1) .7s',
        position: 'absolute',
        zIndex: '3',
        inset: '0',
        borderRadius: '10px'
    },
    '.cover': {
        position: 'relative',
        zIndex: 2,
        display: 'block',
        width: '100%',
        objectfit: 'cover',
        transition: 'transform cubic-bezier(.42,0,.03,1) .7s'
    },
    '.maincontent': {
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '-60px',
        zIndex: '10',
        padding: '1.25rem .75rem',

        backdropFilter: 'blur(1.5625rem)',
        transition: 'all cubic-bezier(.42,0,.03,1) .7s',
        textAlign: 'left'
    },
    ':hover': {
        '.maincontent': {
            bottom: '0px'
        }
    }
}));

const EgameCard = styled(Box)(({ theme }: EgameCard) => ({
    background: 'linear-gradient(180deg,rgba(217,33,33,.2) 0%,rgba(188,34,34,0) 100%),#1C1E22',
    borderRadius: '0px',
    position: 'relative',
    aspectRatio: '326/330',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid ',
    borderColor: theme.palette.secondary.main,
    [theme.breakpoints.down(1023)]: {
        width:'240px',
        height:'240px',
      },
    '.racecard': {
        // background:'linear-gradient(180deg,rgba(98,22,233,.2) 0%,rgba(98,22,233,0) 100%),#1C1E22',
        position: 'relative',
        aspectRatio: '326 / 330',
        overflow: 'hidden'
    },
    '.blur': {
        transform: 'translate3d(-50%,-50%,0)',
        width: '109.54%',
        aspectRatio: '356/196',
        filter: 'blur(2.625rem)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#f42525',
        borderRadius: '22.25rem',
        zIndex: '1'
    },
    '.mask': {
        backgroundImage: 'linear-gradient(180deg,rgba(0,0,0,.2) 0%,rgba(0,0,0,0) 100%)',
        transition: 'opacity cubic-bezier(.42,0,.03,1) .7s',
        position: 'absolute',
        zIndex: '3',
        inset: '0',
        borderRadius: '10px'
    },
    '.cover': {
        position: 'relative',
        zIndex: 2,
        display: 'block',
        width: '100%',
        objectfit: 'cover',
        transition: 'transform cubic-bezier(.42,0,.03,1) .7s'
    },
    '.maincontent': {
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '-60px',
        zIndex: '10',
        padding: '1.25rem .75rem',

        backdropFilter: 'blur(1.5625rem)',
        transition: 'all cubic-bezier(.42,0,.03,1) .7s',
        textAlign: 'left'
    },
    ':hover': {
        '.maincontent': {
            bottom: '0px'
        }
    }
}));

const SubCardSection = () => {
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

    const subcardSX = {
        overflow: 'hidden',
        position: 'relative',
        border: 'none',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 150,
            height: 150,
            border: '35px solid',
            borderColor: 'background.paper',
            opacity: theme.palette.mode === ThemeMode.DARK ? 0.1 : 0.4,
            borderRadius: '50%',
            top: -72,
            right: -63
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: 150,
            height: 150,
            border: '2px solid',
            borderColor: 'background.paper',
            opacity: theme.palette.mode === ThemeMode.DARK ? 0.05 : 0.21,
            borderRadius: '50%',
            top: -97,
            right: -3
        },
        '& .MuiCardContent-root': {
            padding: '0px 0px 0px 0px !important'
        }
    };

    return (
        <MyBox sx={{ p: '15px 10px', mb: '20px' }}>
            <Grid container justifyContent="center" spacing={{ xs: 2, sm: 2 }} sx={{ textAlign: 'center', flexWrap:'initial', overflow:'auto', justifyContent:'flex-start' }}>
                <Grid item md={3} sm={6} xs={12}>
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '5px', background: theme.palette.secondary.main, }} height={250} />

                            {/* <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} /> */}
                        </>
                    ) : (
                        <CasinoCard>
                            <Stack className="racecard">
                                <Stack className="blur"></Stack>
                                <Stack className="mask"></Stack>
                                <img className="cover" src={casinoCardImg} alt="" />
                                <Stack className="maincontent">
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.3rem',
                                            zIndex: '99',
                                            pb: '.75rem',
                                            color: '#fff',
                                            textTransform: 'uppercase',
                                            transition: 'color cubic-bezier(.42,0,.03,1) .7s',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Casino
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '.875rem',
                                            zIndex: '99',
                                            pb: '0px',
                                            color: '#fff',
                                            textOverflow: 'ellipsis',
                                            WebkitLineClamp: '2',
                                            fontFamily: 'Poppins'
                                            // transition:'color cubic-bezier(.42,0,.03,1) .7s',
                                        }}
                                    >
                                        Dive into our in-house games, live casino and slots
                                    </Typography>
                                    <Button
                                        sx={{
                                            backgroundImage: 'linear-gradient(91deg,#5617cb 0%,#8447f6 96.49%)',
                                            height: '2.5rem',
                                            marginTop: '.75rem',
                                            color: '#fff',
                                            width: '100%',
                                            fontWeight: '800',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Go to Casino
                                    </Button>
                                </Stack>
                            </Stack>
                        </CasinoCard>
                    )}
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '5px', background: theme.palette.secondary.main, }} height={250} />

                            {/* <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} /> */}
                        </>
                    ) : (
                        <SportsCard>
                            <Stack className="racecard">
                                <Stack className="blur"></Stack>
                                <Stack className="mask"></Stack>
                                <img className="cover" src={SportsImg} alt="" width="140" />
                                <Stack className="maincontent">
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.3rem',
                                            zIndex: '99',
                                            pb: '.75rem',
                                            color: '#fff',
                                            textTransform: 'uppercase',
                                            transition: 'color cubic-bezier(.42,0,.03,1) .7s',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Sports
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '.875rem',
                                            zIndex: '99',
                                            pb: '0px',
                                            color: '#fff',
                                            textOverflow: 'ellipsis',
                                            WebkitLineClamp: '2',
                                            fontFamily: 'Poppins'
                                            // transition:'color cubic-bezier(.42,0,.03,1) .7s',
                                        }}
                                    >
                                        Dive into our in-house games, live casino and slots
                                    </Typography>
                                    <Button
                                        sx={{
                                            backgroundImage: 'linear-gradient(91deg,#1e7d3a 0%,#2cae53 100%)',
                                            height: '2.5rem',
                                            marginTop: '.75rem',
                                            color: '#fff',
                                            width: '100%',
                                            fontWeight: '800',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Go to Sports
                                    </Button>
                                </Stack>
                            </Stack>
                        </SportsCard>
                    )}
                </Grid>
                <Grid item md={3} sm={6} xs={12} >
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '5px', background: theme.palette.secondary.main, }} height={250} />

                            {/* <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} /> */}
                        </>
                    ) : (
                        <RacingCard>
                            <Stack className="racecard">
                                <Stack className="blur"></Stack>
                                <Stack className="mask"></Stack>
                                <img className="cover" src={racingCardImg} alt="" width="140" />
                                <Stack className="maincontent">
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.3rem',
                                            zIndex: '99',
                                            pb: '.75rem',
                                            color: '#fff',
                                            textTransform: 'uppercase',
                                            transition: 'color cubic-bezier(.42,0,.03,1) .7s',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Racing
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '.875rem',
                                            zIndex: '99',
                                            pb: '0px',
                                            color: '#fff',
                                            textOverflow: 'ellipsis',
                                            WebkitLineClamp: '2',
                                            fontFamily: 'Poppins'
                                            // transition:'color cubic-bezier(.42,0,.03,1) .7s',
                                        }}
                                    >
                                        Dive into our in-house games, live casino and slots
                                    </Typography>
                                    <Button
                                        sx={{
                                            backgroundImage: 'linear-gradient(91deg,#cc6504 0%,#eb9c53 100%)',
                                            height: '2.5rem',
                                            marginTop: '.75rem',
                                            color: '#fff',
                                            width: '100%',
                                            fontWeight: '800',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Go to Racing
                                    </Button>
                                </Stack>
                                <Stack
                                    sx={{
                                        padding: '20px',
                                        backdropFilter: 'blur(10.5625rem)',
                                        transition: 'all cubic-bezier(.42,0,.03,1) .7s'
                                    }}
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                >
                                    <Stack alignItems="flex-start">
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontWeight: 800,
                                                fontSize: '1.8rem',
                                                zIndex: '99',
                                                pb: '20px',
                                                color: theme.palette.mode === ThemeMode.DARK ? 'dark.900' : 'grey.900'
                                            }}
                                        ></Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '0.8rem',
                                                textAlign: 'left',
                                                color: theme.palette.mode === ThemeMode.DARK ? 'dark.900' : 'grey.900'
                                            }}
                                        ></Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </RacingCard>
                    )}
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '5px', background: theme.palette.secondary.main, }} height={250} />

                            {/* <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={30} />
                                    <Skeleton variant="rectangular" sx={{ mt: '0px', mb: '15px', background: '#18835D' }} height={20} /> */}
                        </>
                    ) : (
                        <EgameCard>
                            <Stack className="racecard">
                                <Stack className="blur"></Stack>
                                <Stack className="mask"></Stack>
                                <img className="cover" src={EGameImg} alt="" width="140" />
                                <Stack className="maincontent">
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.3rem',
                                            zIndex: '99',
                                            pb: '.75rem',
                                            color: '#fff',
                                            textTransform: 'uppercase',
                                            transition: 'color cubic-bezier(.42,0,.03,1) .7s'
                                        }}
                                    >
                                        e-Games
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '.875rem',
                                            zIndex: '99',
                                            pb: '0px',
                                            color: '#fff',
                                            textOverflow: 'ellipsis',
                                            WebkitLineClamp: '2'
                                            // transition:'color cubic-bezier(.42,0,.03,1) .7s',
                                        }}
                                    >
                                        Dive into our in-house games, live casino and slots
                                    </Typography>
                                    <Button
                                        sx={{
                                            backgroundImage: 'linear-gradient(91deg,#5617cb 0%,#8447f6 96.49%)',
                                            height: '2.5rem',
                                            marginTop: '.75rem',
                                            color: '#fff',
                                            width: '100%',
                                            fontWeight: '800'
                                        }}
                                    >
                                        Go to e-Games
                                    </Button>
                                </Stack>
                                <Stack
                                    sx={{
                                        padding: '20px',
                                        backdropFilter: 'blur(10.5625rem)',
                                        transition: 'all cubic-bezier(.42,0,.03,1) .7s'
                                    }}
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                >
                                    <Stack alignItems="flex-start">
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontWeight: 800,
                                                fontSize: '1.8rem',
                                                zIndex: '99',
                                                pb: '20px',
                                                color: theme.palette.mode === ThemeMode.DARK ? 'dark.900' : 'grey.900'
                                            }}
                                        ></Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '0.8rem',
                                                textAlign: 'left',
                                                color: theme.palette.mode === ThemeMode.DARK ? 'dark.900' : 'grey.900'
                                            }}
                                        ></Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </EgameCard>
                    )}
                </Grid>
            </Grid>
        </MyBox>
    );
};

export default SubCardSection;
