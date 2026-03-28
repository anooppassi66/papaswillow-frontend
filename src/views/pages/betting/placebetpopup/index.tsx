import React from 'react';
import { CloseIconSvg } from 'assets/svg';
import moment from 'moment';
import { intToOrdinalNumberString } from 'utils/util';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {styled,  Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { BorderColor, BorderStyle } from '@mui/icons-material';
const BetPopupPlace = styled(Grid)(({ theme }) => ({
    backgroundColor:  theme.palette.dark[800],
    //backgroundColor: alpha(theme.palette.secondary.main, 1), // Adjust this color as needed
    borderRadius: '30px',
    left: '50%',
    position: 'fixed',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    zIndex: '99999',
    '.closebtn':{
        backgroundColor: 'transparent',
        border: '0',
        appearance: 'none',
        color: '#4a6285',
        fontSize: '40px',
        cursor: 'pointer',
        right: '18px',
        top: '18px',
        height: '20px',
        lineHeight: '20px',
        position: 'absolute',
        width: '20px',
    },
    
}));
const BetPopup = styled(Grid)(({ theme }) => ({
    
    background: 'hsla(0, 0%, 5%, 0.8)',
    height: '100%',
    left:' 0',
    position: 'fixed',
    top:' 0',
    width: '100%',
    zIndex: '9999',
   
    
}));

const BetPopupPlaceView = styled(Grid)(({ theme }) => ({
    
    padding: '30px 40px 25px 40px',
    display: 'flex',
    flexDirection: 'column',
   
    
}));

const BetPopupPlaceFotter = styled(Grid)(({ theme }) => ({
    
    padding: '20px 40px 35px 40px',
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',

    '.cancelbtn':{
      borderColor:alpha(theme.palette.secondary.main, 1),
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      height: '38px',
      fontSize: '14px',
      padding: '0px 24px',
      borderRadius: '6px',
      background:'none',
      color:'#fff',
      fontWeight:'600',
      borderWidth:1,
      borderStyle:'solid',      
    },
    '.yesbtn':{
        backgroundColor: alpha(theme.palette.secondary.main, 0.55),
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      height: '38px',
      fontSize: '14px',
      padding: '0px 24px',
      borderRadius: '6px',
      border:'0px',
      fontWeight:'600',
    }
    
}));



interface ChildProps {
    parentCloseHandlerFunction: Function;
    parentSubmitBetHandlerFunction: Function;
    betLoad: boolean;
    venueName: string;
    raceNumber: string;
    selectedRunnersList: any;
    totalAmount: number;
    poolName: string;
    gstData: any;
}

const PlaceBetPopup = (props: ChildProps) => {
    const theme = useTheme();
    return (
        <>
        <BetPopup className='2345'></BetPopup>
        <BetPopupPlace className='2323'>

            <Grid>
                <button
                    className="closebtn"
                    type="button"
                    onClick={() => props.parentCloseHandlerFunction()}
                    data-dismiss="modal"
                    aria-label="Close"
                    style={{ width: '30px', height: '30px' }}
                >
                    <CloseIconSvg />
                </button>
                <BetPopupPlaceView>
                    <h4 style={{ display: 'flex', width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', padding: '0px', margin: '0px' }}>
                        {' '}
                        {props.venueName} - Race {props.raceNumber}
                    </h4>
                    <p style={{ fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>{moment().format('DD-MM-YYYY H:m:s')}</p>
                    <Stack sx={{ width: '100%', alignItems: 'flex-start' }}>
                        <h3 className="poolname" style={{ fontSize: '13px', textAlign: 'center', }}>{props.poolName}</h3>
                        <ul className="racenumberlist" style={{ listStyle: 'none', padding: '0px', margin: '0px', display: 'flex', width: '100%', borderBottomColor: alpha(theme.palette.secondary.main, 1), borderBottom: 1, borderBottomStyle: 'solid', }}>
                            {props.selectedRunnersList.map((items: any[], index: number) => (
                                <li style={{ fontSize: '13px', padding: '5px', color: '#fff' }} key={index}>
                                    {props.selectedRunnersList.length > 1 && (
                                        <>
                                            <>
                                                <span>{index + 1}</span>
                                            </>
                                            <sup>{intToOrdinalNumberString(index + 1)}</sup>
                                        </>
                                    )}
                                    <span> {items.join(', ')}</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className="betface" style={{ fontSize: '13px', padding: '8px 0px', color: '#fff', textTransform: 'capitalize', margin: '0px', width: '100%', borderBottomColor: alpha(theme.palette.secondary.main, 1), borderBottom: 1, borderBottomStyle: 'solid', }}>
                            BetFace Value <span>{props.gstData.betFaceValue}</span>
                        </h3>
                        <h3 style={{ fontSize: '13px', padding: '8px 0px', color: '#fff', textTransform: 'capitalize', margin: '0px', width: '100%' }}>
                            Odds Value <span>{props.gstData.oddsValuePaid}</span>
                        </h3>
                        <h3 style={{ fontSize: '13px', padding: '8px 0px', color: '#fff', textTransform: 'capitalize', margin: '0px', width: '100%' }}>
                            CGST@ 14% <span>{props.gstData.cGST}</span>
                        </h3>
                        <h3 style={{ fontSize: '13px', padding: '8px 0px', color: '#fff', textTransform: 'capitalize', margin: '0px', width: '100%' }}>
                            SGST@ 14% <span>{props.gstData.sGST}</span>
                        </h3>
                        <h3 className="totalamount" style={{ fontSize: '13px', padding: '8px 0px', color: '#fff', textTransform: 'capitalize', margin: '0px', width: '100%', borderBottomColor: alpha(theme.palette.secondary.main, 1), borderBottom: 1, borderBottomStyle: 'solid', }}>
                            Total <span>{props.gstData.totalAmount}</span>
                        </h3>
                        <h3 className="potential" style={{ fontSize: '13px', padding: '8px 0px', color: '#fff', textTransform: 'capitalize', margin: '0px', width: '100%' }}>
                            Potential Payout <span>{props.gstData.potentialPay}</span>
                        </h3>
                    </Stack>
                </BetPopupPlaceView>
                <BetPopupPlaceFotter>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p>Total Amount</p>
                        <p>
                            <span>&#8369;</span> {props.totalAmount}
                        </p>
                    </Stack>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <button className="cancelbtn" id="exit_consent" onClick={() => props.parentCloseHandlerFunction()}>
                            Cancel
                        </button>
                        <button style={{}} className="yesbtn" id="age_consent" onClick={() => props.parentSubmitBetHandlerFunction()}>
                            {props.betLoad ? <CircularProgress color="secondary" /> : null}Place Bet
                        </button>
                    </Stack>
                </BetPopupPlaceFotter>
            </Grid>
        </BetPopupPlace></>
    );
};

export default PlaceBetPopup;
