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
import classicDice from 'assets/images/landing/classic-dice.png';
import Lucky from 'assets/images/landing/lucky6.png';
import Bcgame from 'assets/images/landing/bcgame.png';
import Kenneth from 'assets/images/landing/kenneth.png';
import Roulette from 'assets/images/landing/roulette.png';
import Sugarrush from 'assets/images/landing/sugarrush.png';
import Mine from 'assets/images/landing/mine.png';
import Limbo from 'assets/images/landing/limbo.png';
import Plinko from 'assets/images/landing/plinko.png';
import Twist from 'assets/images/landing/twist.png';
import Crash from 'assets/images/landing/crash.png';

// types
import { ThemeMode } from 'types/config';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

// =============================|| LANDING - CARD SECTION ||============================= //

interface TopGameStyle {
    theme: Theme;
}

interface GameProviderBox {
    theme: Theme;
}

const TopGameStyle = styled(Box)(({ theme }: TopGameStyle) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    // background: '#1A654A',
    backgroundColor:  theme.palette.dark[800],
    borderRadius: '0px'
}));

const GameProviderBox = styled(Box)(({ theme }: GameProviderBox) => ({
    // background: '#00492D',
    backgroundColor:  theme.palette.dark.dark,
    borderRadius: '5px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    width: '100%',
    border: '1px solid ',
    borderColor: theme.palette.secondary.main,
}));
const gamesData = [
    { image: Mine, title: 'Mine Games', buttonText: 'Play Now' },
    { image: Limbo, title: 'Limbo Games', buttonText: 'Play Now' },
    { image: Crash, title: 'Crash Games', buttonText: 'Play Now' },
    { image: Plinko, title: 'Plinko Games', buttonText: 'Play Now' },
    { image: Roulette, title: 'Roulette Games', buttonText: 'Play Now' },
    { image: Twist, title: 'Twist Games', buttonText: 'Play Now' }
];

const TopRatedGames = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [gameData, setGameData] = useState(gamesData);
    useEffect(() => {
        // Simulate an API call or data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
        // const downMD = useMediaQuery(theme.breakpoints.down('md'));
    }, []);

    return (
        <TopGameStyle sx={{ p: '10px 10px 15px 10px', mb: '20px', mt: '20px', pb: '20px' }}>
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: '1.30rem',
                    pb: '10px',
                    color: '#fff',
                    fontFamily: 'Poppins',
                    pt: '10px'
                    // transition:'color cubic-bezier(.42,0,.03,1) .7s',
                }}
            >
                Top Rated Games
            </Typography>
            <Grid container justifyContent="center" sx={{}} spacing={{ xs: 2, sm: 2 }}>
            {gameData.map((games) => (
                <Grid item md={2} sm={4} xs={4}>
                    <GameProviderBox>
                        {loading ? (
                            <>
                                <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', background: theme.palette.secondary.main, }} height={213} />
                            </>
                        ) : (
                            <Stack sx={{ padding: '0px' }}>
                                <img className="cover" src={games.image} alt="" style={{ borderRadius: '0px' }} />
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        pt: '6px',
                                        pb: '6px',
                                        pl: '10px',
                                        color: '#fff',
                                        fontFamily: 'Poppins',
                                        [theme.breakpoints.down(1023)]: {
                                            fontSize: '0.7rem',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                          },
                                    }}
                                >
                                    {games.title}
                                </Typography>
                                <Button
                                    sx={{
                                        background: '#FFCD05',
                                        width: '100px',
                                        ml: '10px',
                                        mb: '10px',
                                        color: '#212121',
                                        borderRadius: '0px',
                                        fontSize: '.875rem',
                                        height: '30px',
                                        [theme.breakpoints.down(1023)]: {
                                            fontSize: '0.7rem',
                                            width: '85px',
                                            height: '25px',
                                          },
                                        
                                        ':hover': {
                                            background: '#FFCD05'
                                        }
                                    }}
                                >
                                    {games.buttonText}
                                </Button>
                            </Stack>
                        )}
                    </GameProviderBox>
                </Grid>
            ))}
                
            </Grid>
        </TopGameStyle>
    );
};

export default TopRatedGames;
