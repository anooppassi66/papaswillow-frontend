import * as React from 'react';
// Mui
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
// Api
import { RaceBetType } from '../../../api/RacingCardApi';

type Props = {
    raceBet: null | RaceBetType;
    handleConfirm: any;
    handleCancel: () => void;
};

const ConfirmBet = styled(Card)(({ theme }) => ({
    //backgroundColor: 'rgba(0, 0, 0, .17) !important',
    position: 'fixed',
    right: '0',
    bottom: '0',
    top: '0',
    left: '0',
    height:'100%',
    width:'100%',
    zIndex:'9999'
}));

export default function SportEventsMenu({ raceBet, handleConfirm, handleCancel }: Props) {
    const open = Boolean(raceBet);
    console.log(raceBet,'raceBet');

    return (
        
       
        <Popover
            aria-labelledby="racebet-confirm-popover"
            open={open}
            onClose={handleCancel}
            marginThreshold={48}
            // BackdropProps={{ invisible: false }}
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            transformOrigin={{ vertical: 'center', horizontal: 'center' }}
            PaperProps={{
                elevation: 2,
                sx: {
                    //padding: '24px',
                    minWidth: '100%',
                    minHeight:'100%',
                    //background: ' linear-gradient(141.73deg, rgba(65, 69, 80, 1) 2.64%, rgba(32, 35, 43, 1) 96.27%)',
                    //border: '1.5px solid rgba(97, 97, 97, 0.35)',
                   // boxShadow: 'none',
                   
                    zIndex:'999999',
                    position:'relative',
                    left:'0px !important',
                    top:'0px !important',
                    background:'rgba(0,0,0,.87)!important',
                }
            }}
        >
             <ConfirmBet className='34343434' sx={{background:'none'}}>
          <Grid className='11111' sx={{
            padding: '24px',
            minWidth: 300,
            background: ' linear-gradient(141.73deg, rgba(65, 69, 80, 1) 2.64%, rgba(32, 35, 43, 1) 96.27%)',
            border: '1.5px solid rgba(97, 97, 97, 0.35)',
            boxShadow: 'none',
            borderRadius: '20px',
            zIndex:'999999',
            width:'300px',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            position: 'absolute',
            top: '58%',
          }}>
            <Typography
                variant="subtitle1"
                textAlign="center"
                sx={{ fontSize: '1.275rem', fontFamily: '"Roboto", sans-serif, Helvetica, Arial', fontWeight: '500', color: '#fff', }}
            >
                Confirm Bet
            </Typography>
            {raceBet && (
                <Card elevation={1} sx={{ border: '1.5px solid #414853', margin: '1rem 0', padding: 2, background: 'rgba(21, 31, 37, 1)' }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '.875rem',
                            paddingBottom: '4px',
                            fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                            fontWeight: '600',
                            color: '#fff',
                        }}
                    >
                        {raceBet.venueName}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '.875rem',
                            paddingBottom: '8px',
                            fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                            fontWeight: '400',
                            color: '#fff',
                        }}
                    >
                        {raceBet.eventName} - {raceBet.startTime}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1.2rem',
                            paddingBottom: '8px',
                            fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                            fontWeight: '500',
                            color: '#fff',
                        }}
                    >
                        {raceBet.type} - {raceBet.type === 'ODD' ? 'X' : 'O'}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            borderTop: '1px solid #414853',
                            paddingTop: '8px',
                            fontSize: '.875rem',
                            fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                            fontWeight: '400',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#fff',
                        }}
                    >
                        Bet amount:{' '}
                        <span style={{ fontSize: '1rem', fontWeight: '600', fontFamily: '"Roboto", sans-serif, Helvetica, Arial' }}>
                            {raceBet.amount} {raceBet.currency}
                        </span>
                    </Typography>
                </Card>
            )}
            <Stack direction="row" justifyContent="space-between" spacing={2.5} sx={{ marginTop: '20px' }}>
                <Button
                    variant="outlined"
                    fullWidth={true}
                    onClick={handleCancel}
                    size="large"
                    sx={{
                        fontFamily: '"Roboto", sans-serif, Helvetica, Arial',
                        color: '#fff',
                        fontWeight: '600',
                        border: '1.5px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '16px',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    fullWidth={true}
                    onClick={() => handleConfirm(raceBet)}
                    size="large"
                    sx={{ fontFamily: '"Roboto", sans-serif, Helvetica, Arial', fontWeight: '600', borderRadius: '16px' }}
                >
                    Confirm
                </Button>
            </Stack>
            </Grid>
            </ConfirmBet>
        </Popover>
       
        
    );
}
