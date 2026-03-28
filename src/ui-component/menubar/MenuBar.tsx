import { Link } from 'react-router-dom';

// material-ui

import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconClock } from '@tabler/icons-react';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';


// assets
import HorseIcon from 'assets/images/menu-icons/racing-icon.svg';
import CasinoIcon from 'assets/images/menu-icons/casino-icon.svg';
import BingoIcon from 'assets/images/menu-icons/bingo-icon.svg';
import SportsIcon from 'assets/images/menu-icons/sports-icon.svg';
import LotteryIcon from 'assets/images/menu-icons/lottery-icon.svg';
import PromotionsIcon from 'assets/images/menu-icons/promotions-icon.svg';
import LiveSupport from 'assets/images/menu-icons/livesupport.svg';
import LiveEvent from 'assets/images/menu-icons/liveevent.svg';
import Sponsorship from 'assets/images/menu-icons/sponsorships.svg';

// types
import { ThemeMode } from 'types/config';
import { useEffect, useState } from 'react';

// styles
const Images = styled('img')(({ theme }) => ({
    width: '100%',
    height: '248px',
    marginBottom: 0,
    backgroundSize: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
        height: '160px',
        backgroundSize: '100%',
        objectFit: 'fill'
    }
}));











const Menubar = () => {
    const theme = useTheme();




    return (
        <>
            <Grid sx={{ backgroundColor: alpha(theme.palette.secondary.main,0.55), minHeight: '55px', display: 'flex', alignItems: 'center', mb: '20px' }} >
                <Grid>
                    <Stack direction="row" sx={{ display: 'flex', gap: '0px', paddingLeft: '20px' }} >
                        <Button color="inherit" component={RouterLink} to="/"
                         sx={{
                            borderRadius:'4px',
                            padding:'6px 16px 6px 10px',
                            background:alpha(theme.palette.secondary.main, 0.55),
                            fontSize:'0.875',
                            fontWeight:'500',
                            color:'#fff',
                            height:'36px',
                            textTransform:'uppercase',
                            ':hover':{
                                borderRadius:'4px',
                                //background:alpha(theme.palette.secondary.main, 0.55),
                            }
                         }}
                        >
                          <img src={HorseIcon} style={{width:'1.4em', height:'1.4em', marginRight:'5px'}} />  Racing
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/login" 
                        sx={{
                            borderRadius:'0px',
                            padding:'6px 16px 6px 10px',
                            fontSize:'0.875',
                            fontWeight:'500',
                            color:'#fff',
                            height:'36px',
                            textTransform:'uppercase',
                            ':hover':{
                                borderRadius:'4px',
                                //background:alpha(theme.palette.secondary.main, 0.55),
                            }
                         }}>
                          <img src={CasinoIcon} style={{width:'1.4em', height:'1.4em', marginRight:'5px'}} />   Casino
                        </Button>
                        <Button color="inherit" component={Link} to="/" 
                        sx={{
                            borderRadius:'0px',
                            padding:'6px 16px 6px 10px',
                            fontSize:'0.875',
                            fontWeight:'500',
                            color:'#fff',
                            height:'36px',
                            textTransform:'uppercase',
                            ':hover':{
                                borderRadius:'4px',
                               // background:alpha(theme.palette.secondary.main, 0.55),
                            }
                         }}>
                           <img src={SportsIcon} style={{width:'1.4em', height:'1.4em', marginRight:'5px'}} />  Sports
                        </Button>
                        <Button color="inherit" component={Link} to="/" 
                        sx={{
                            borderRadius:'0px',
                            padding:'6px 16px 6px 10px',
                            fontSize:'0.875',
                            fontWeight:'500',
                            color:'#fff',
                            height:'36px',
                            textTransform:'uppercase',
                            ':hover':{
                                borderRadius:'4px',
                                //background:alpha(theme.palette.secondary.main, 0.55),
                            }
                         }}>
                          <img src={LotteryIcon} style={{width:'1.4em', height:'1.4em', marginRight:'5px'}} />   Lottery
                        </Button>
                        <Button color="inherit" component={Link} to="/" 
                        sx={{
                            borderRadius:'0px',
                            padding:'6px 16px 6px 10px',
                            fontSize:'0.875',
                            fontWeight:'500',
                            color:'#fff',
                            height:'36px',
                            textTransform:'uppercase',
                            ':hover':{
                                borderRadius:'4px',
                                //background:alpha(theme.palette.secondary.main, 0.55),
                            }
                         }}>
                         <img src={PromotionsIcon} style={{width:'1.4em', height:'1.4em', marginRight:'5px'}} />    Promotions
                        </Button>
                        <Button color="inherit" component={Link} to="/" 
                        sx={{
                            borderRadius:'0px',
                            padding:'6px 16px 6px 10px',
                            fontSize:'0.875',
                            fontWeight:'500',
                            color:'#fff',
                            height:'36px',
                            textTransform:'uppercase',
                            ':hover':{
                                borderRadius:'4px',
                               // background:alpha(theme.palette.secondary.main, 0.55),
                            }
                         }}>
                           <img src={LiveEvent} style={{width:'1.4em', height:'1.4em', marginRight:'5px'}} />  Live Events
                        </Button>
                        <Button color="inherit" component={Link} to="/" 
                        sx={{
                            borderRadius:'0px',
                            padding:'6px 16px 6px 10px',
                            fontSize:'0.875',
                            fontWeight:'500',
                            color:'#fff',
                            height:'36px',
                            textTransform:'uppercase',
                            ':hover':{
                                borderRadius:'4px',
                                background:alpha(theme.palette.secondary.main, 0.55),
                            }
                         }}>
                          <img src={LiveSupport} style={{width:'1.4em', height:'1.4em', marginRight:'5px'}} />   Live Support
                        </Button>


                    </Stack>
                </Grid>

            </Grid>
        </>
    );
};

export default Menubar;
