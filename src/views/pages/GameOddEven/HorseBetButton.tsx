import { useParams } from 'react-router-dom';
// Mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { RaceCardBetType } from '../../../api/RacingCardApi';
import useAuth from 'hooks/useAuth';
import {styled,  Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// TODO move this to MUI-Theme
const themeColor = import.meta.env.REACT_APP_THEME === 'fairplay' ? '#2F594D' : '#384766';

// This must be fix on a global state when header is added.
// const ScreenDiv = styled('div')(({ theme }) => ({
//     position: 'relative',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column-reverse',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     margin: 0,
//     padding: '0px 0px 8px 0px',

//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',

//     [theme.breakpoints.up('md')]: {
//         marginTop: 80
//     },
//     marginTop: 0
// }));

// const BetButton = styled(ButtonBase)(({ theme }) => ({
//     display: 'block',
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     borderRadius: 5,
//     padding: '10px 8px 6px 8px',
//     [theme.breakpoints.up('md')]: {
//         padding: '1rem'
//     },
//     border: `1px solid ${theme.palette.action.disabledBackground}`
// }));

// const OddWrapperDiv = styled('div')(({ theme }) => ({
//     borderRadius: 18,
//     border: '1.5px solid #FFFFFFCB',
//     padding: 2,
//     backgroundColor: '#00000021',
//     minWidth: '4rem'
// }));

// const OddsDiv = styled('div')(({ theme }) => ({
//     borderRadius: 16,
//     border: '1px solid #FFFFFF78',
//     padding: '0px 16px',
//     background: 'rgba(0, 0, 0, 0.20)',
//     textShadow: 'none',
//     fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
//     fontSize: '1.1rem',
//     fontWeight: '500',
//     lineHeight: '1.5'
// }));

// const StyledDivider = styled(Typography)(({ theme }) => ({
//     backgroundColor: 'white',
//     width: '100%'
// }));

const XOButton = styled(Button)(({ theme }) => ({
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    border:' 0',
    borderRadius: '8px',
    '&.tnt.X':{
        background: 'url(https://static-web.fra1.cdn.digitaloceanspaces.com/arionplay/xiconnew.png),linear-gradient(90deg,#be1c31,#ec3f56 22.4%,#ec3f56 77.08%,#be1c31)',
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        border:' 0',
        borderRadius: '8px',
        padding:'1rem',
        
    },
    '&.tnt.O':{
        background:'url(https://static-web.fra1.cdn.digitaloceanspaces.com/arionplay/oiconnew.png),linear-gradient(90deg,#031df8,#3046ff 22.4%,#3046ff 77.08%,#031df8)',
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        border:' 0',
        borderRadius: '8px',
        padding:'1rem',
    }
    
    

   
    
}));

const betCardTransparencyFactor = 'C8';
const redGradient = ['BE1C31', 'EC3F56'];
const blueGradient = ['228817', '42B935'];
const greenGradient = ['031DF8', '3046FF'];

export const BET_ODD = 'ODD';
export const BET_EVEN = 'EVEN';

type Props = {
    type: RaceCardBetType;
    odds: null | undefined | number;
    betAmountTotal: null | undefined | number;
    betAmount: null | undefined | number;
    onClick: (type: RaceCardBetType) => void;
    disabled?: boolean;
};

const HorseBetButton = ({ type, odds, betAmountTotal, betAmount, onClick, disabled }: Props) => {
    const { module } = useParams();
    const { user } = useAuth();
    let gradient;
    let label;
    let backgroundImage;
    let backgroundImage1;
    let backgroundColor;
    let backgroundColor1;
    switch (type) {
        case BET_ODD:
            gradient = redGradient;
            label = 'X';
            backgroundImage = 'url("/icons/xo-logo-bg.png")';
            backgroundImage1 = 'url("/icons/X-Icon.svg")';
            backgroundColor = '#957c52';
            backgroundColor1 = `linear-gradient(90deg, #BE1C31 0%, #EC3F56 22.4%, #EC3F56 77.08%, #BE1C31 100%)`;
            break;
        case BET_EVEN:
            gradient = greenGradient;
            label = 'O';
            backgroundImage = 'url("/icons/ox-logo-bg.png")';
            backgroundImage1 = 'url("/icons/O-Icon.svg")';
            backgroundColor = '#726969';
            backgroundColor1 = `linear-gradient(90deg, #031DF8 0%, #3046FF 22.4%, #3046FF 77.08%, #031DF8 100%)`;
            break;
        default:
            gradient = ['#000', '#FFF'];
    }
    //background: `linear-gradient(90deg, #${gradient[0]}${betCardTransparencyFactor} 0%, #${gradient[1]}${betCardTransparencyFactor} 22.4%, #${gradient[1]}${betCardTransparencyFactor} 77.08%, #${gradient[0]}${betCardTransparencyFactor} 100%)`,

    return (
        /* <BetButton    className={`${module} ${label}`} */
        <Grid>
            <XOButton
            sx={{display:'flex', flexDirection:'column', width:'100%'}}
                className={`tnt ${label}`}
                //style= {module == 'horseracing' ? {backgroundImage: backgroundImage,backgroundColor: backgroundColor,backgroundSize: '100% 100%'} : {backgroundImage: backgroundImage1,background: `linear-gradient(90deg, #${gradient[0]}${betCardTransparencyFactor} 0%, #${gradient[1]}${betCardTransparencyFactor} 22.4%, #${gradient[1]}${betCardTransparencyFactor} 77.08%, #${gradient[0]}${betCardTransparencyFactor} 100%)` }}
                //style= {module == 'horseracing' ? {backgroundImage: backgroundImage,backgroundColor: backgroundColor,backgroundSize: '100% 100%'} : {backgroundImage: backgroundImage1,background: backgroundColor1,backgroundSize: '100% 100%'}}
                onClick={() => onClick(type)}
                //                disabled={disabled}
            >
                <Stack direction="column" spacing={0} alignItems="center" justifyContent="center" style={{ marginBottom: '1rem' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                            fontSize: '1.5rem',
                            lineHeight: '1.5rem',
                            fontWeight: '500',
                            color:'#fff',
                        }}
                        className="xotext"
                    >
                        {label}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.875rem !important',
                            fontWeight: '600',
                            fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                            color:'#fff',
                        }}
                    >
                        ({type})
                    </Typography>
                </Stack>
                <Stack direction="column" spacing={1} alignItems="center" className="betamounttext" sx={{width:'100%'}}>
                    <Stack sx={{borderRadius:'18px', border:'1.5px solid #FFFFFFCB', padding:'2px', minWidth:'4rem'}}>
                        <Stack sx={{borderRadius:'16px', border:'1px solid #FFFFFFCB', background:'rgba(0, 0, 0, 0.20)', fontSize:'1.1rem', fontWeight:'600', padding:'2px', color:'#fff', lineHeight:'22px'}}>{odds || '-'}</Stack>
                    </Stack>
                    <Box sx={{ width: '100%', marginTop: '.7rem !important' }}>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%">
                            <Typography
                                variant="caption"
                                component="h4"
                                sx={{
                                    fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                                    fontSize: '.7rem',
                                    fontWeight: '500',
                                    color:'#fff',
                                }}
                            >
                                Bet
                            </Typography>
                            <Typography
                                variant="caption"
                                component="h6"
                                sx={{
                                    fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                                    fontSize: '.875rem',
                                    fontWeight: '600',
                                    color:'#fff',
                                }}
                            >
                                {disabled ? 'Disabled' : betAmount || '-'}
                            </Typography>
                        </Stack>
                        <Divider
                            sx={{
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'inherit'
                            }}
                        />
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            width="100%"
                            margin={0}
                        >
                            <Typography
                                variant="caption"
                                component="h4"
                                sx={{
                                    fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                                    fontSize: '.7rem',
                                    fontWeight: '500',
                                    color:'#fff',
                                }}
                            >
                                Est.Payout
                            </Typography>
                            <Typography
                                variant="caption"
                                component="h6"
                                sx={{
                                    fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                                    fontSize: '.875rem',
                                    fontWeight: '600',
                                    color:'#fff',
                                }}
                            >
                                {!disabled && betAmount && odds ? Number(Number(betAmount * odds).toFixed(2)) : '-'}
                            </Typography>
                        </Stack>
                        {user && user.roles === 'gameoperator' && (
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                justifyContent="space-between"
                                flexWrap="wrap"
                                width="100%"
                                margin={0}
                            >
                                <Typography
                                    variant="caption"
                                    component="h4"
                                    sx={{
                                        fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                                        fontSize: '.7rem',
                                        fontWeight: '500',
                                        color:'#fff',
                                    }}
                                >
                                    Total Amount
                                </Typography>
                                <Typography
                                    variant="caption"
                                    component="h6"
                                    sx={{
                                        fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                                        fontSize: '.875rem',
                                        fontWeight: '600',
                                        color:'#fff',
                                    }}
                                >
                                    {!disabled && betAmount && odds && betAmountTotal ? betAmountTotal.toFixed(2) : '-'}
                                </Typography>
                            </Stack>
                        )}
                    </Box>
                </Stack>
            </XOButton>
        </Grid>
    );
};

export default HorseBetButton;
