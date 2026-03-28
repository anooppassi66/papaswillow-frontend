// material-ui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';

// project imports
// import FadeInWhenVisible from './../'
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
import GridViewIcon from '@mui/icons-material/GridView';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import imageSlider1 from 'assets/images/landing/racingimg.png';

// types
import { ThemeMode } from 'types/config';
import FadeInWhenVisible from 'views/pages/Animation';

// =============================|| LANDING - CARD SECTION ||============================= //

interface MyBox {
    theme: Theme;
}

const MyBox = styled(Box)(({ theme }: MyBox) => ({
    backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    borderRadius: '8px',
}));

const CardSection = () => {

    const theme = useTheme();

    const cardSX = {
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

    const landingCards = [
        {
            title: 'Experience the thrill of horse racing and enjoy the winnings',
            count: 'Racing',
            icon: <GridViewIcon sx={{ fontSize: '2.25rem', transform: 'rotate(45deg)' }} />,
            bgcolor: 'warning.main',
            color: 'warning.dark',
            Image:imageSlider1,
        },
        {
            title: 'Dive into our in-house games, live casino and slots',
            count: 'Casino',
            icon: <WidgetsOutlinedIcon sx={{ fontSize: '2.25rem' }} />,
            bgcolor: 'primary.200',
            color: 'primary.main'
        },
        {
            title: 'Bet on Football, Cricket, NFL, eSports & over 80 sports',
            count: 'Sports',
            icon: <WebOutlinedIcon sx={{ fontSize: '2.25rem' }} />,
            bgcolor: 'secondary.200',
            color: 'secondary.main'
        },
        {
            title: 'Live Casino gaming experiences Power Up new possibilities of Play by offering Twists on classic titles',
            count: 'e-Games',
            icon: <WebOutlinedIcon sx={{ fontSize: '2.25rem' }} />,
            bgcolor: 'secondary.200',
            color: 'secondary.main'
        }
    ];

    return (
        <MyBox sx={{ p: '14px', mb: '20px' }}  >
            <Grid container justifyContent="center" spacing={{ xs: 3, sm: 3 }} sx={{ textAlign: 'center' }}>
                {landingCards.map((card, index) => (
                    <Grid item md={3} sm={6} xs={12} key={index}>
                        {/* <FadeInWhenVisible> */}
                        <SubCard sx={{ bgcolor: card.bgcolor, ...cardSX }}>
                        <img src={imageSlider1} alt="" width="140" />
                            <Stack sx={{padding:'20px', backdropFilter:'blur(10.5625rem)', transition:'all cubic-bezier(.42,0,.03,1) .7s',}} direction="column" justifyContent="space-between" alignItems="flex-start">
                             
                                <Stack alignItems="flex-start">
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: '1.8rem',
                                            zIndex: '99',
                                            pb:'20px',
                                            color: theme.palette.mode === ThemeMode.DARK ? 'dark.900' : 'grey.900'
                                        }}
                                    >
                                        {card.count}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                            textAlign: 'left',
                                            color: theme.palette.mode === ThemeMode.DARK ? 'dark.900' : 'grey.900'
                                        }}
                                    >
                                        {card.title}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </SubCard>
                        {/* </FadeInWhenVisible> */}
                    </Grid>
                ))}
            </Grid>
            

        </MyBox>
        

    );
};

export default CardSection;
