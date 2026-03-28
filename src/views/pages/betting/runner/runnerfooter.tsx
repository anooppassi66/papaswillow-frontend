import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIconSvg } from 'assets/svg';
import Button from '@mui/material/Button';
import { getTicketCount } from './ticketService';
import { intToOrdinalNumberString } from 'utils/util';
import BetAmount from '../betamount';
import PlaceBetPopup from '../placebetpopup';
import BetSuccess from '../betsuccess';
import CookieStorageService from 'services/CookieStorageService';
import RacingService from 'services/RacingService';
import md5 from 'md5';
import { useSelector as useAppSelector } from 'react-redux';
import useAuth from 'hooks/useAuth';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Padding } from '@mui/icons-material';

const WinPlacesView = styled(Grid)(({ theme }) => ({
    
    'ul':{
        padding:'0px',
        margin:'0px',
        'li':{
            display:'flex',
            gap:'5px',
            'a':{
                fontSize:'12px',
                padding:'0px 4px',
                height:'18px',
                marginRight:'5px',
                backgroundColor:  theme.palette.dark[800],
                fontWeight:'800',
                color:'#fff',
                textDecoration:'none',
            }

        }
    }
    
}));

const PlaceBetting = styled(Grid)(({ theme }) => ({
    
    '.betslip_select':{
        backgroundColor:  theme.palette.dark[800],
        border: '1px solid #6279a6',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
        height: '35px',
        padding: '5px 10px',
        textAlign: 'left',
        marginRight: '20px',
        width: '120px',
        fontWeight:'600',
        ':hover': {
            backgroundColor:  theme.palette.dark[800],
        }
    },
    '.betslip_button': {
        backgroundColor: '#FFCD05',
        // background: '#DD631A',
        border:' none',
        borderRadius: '6px',
        fontSize: '14px',
        height: '35px',
        width: '140px',
        padding: '0px 0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#212121',
        fontWeight:'600',
        ':hover': {
            backgroundColor:  '#FFCD05',
        }
    }
    
}));




const RunnerFooter = ({
    selectedRunnersList,
    venueCode,
    programId,
    unitBet,
    setUnitBetFn,
    venueName,
    raceNumber,
    resetTicket,
    betCalculateAmount,
    poolName,
    legs,
    oddsValuePaid
}: {
    selectedRunnersList: any;
    venueCode: string;
    programId: number;
    venueName: string;
    unitBet: number;
    setUnitBetFn: Function;
    raceNumber: any;
    resetTicket: Function;
    betCalculateAmount: Function;
    poolName: string;
    legs: number;
    oddsValuePaid: any;
}) => {
    //const { userInfo } = useAppSelector((state) => state.auth);
    const [totalTickets, setTotalTickets] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [enableBetSlip, setEnableBetSlip] = useState(false);
    const [enableBetSuccess, setEnableBetSuccess] = useState(false);
    const [customAmountSlip, setCustomAmountSlip] = useState(false);
    const [betAmount, setBetAmount] = useState(10);
    const [message, setMessage] = useState('');
    const [betLoad, setBetLoad] = useState(false);
    const [gstData, setGstData] = useState([]);
    const theme = useTheme();
    const { user } = useAuth();

    const calculateTicketAmount = () => {
        const ticketCount = getTicketCount(selectedRunnersList, poolName, legs);
        if (betAmount === 0) setBetAmount(unitBet);
        setTotalTickets(ticketCount);
        setTotalAmount(ticketCount * betAmount);
        betCalculateAmount(ticketCount * betAmount);
    };

    const handleBetAmount = (val: number) => {
        setBetAmount(val);
        setUnitBetFn(val);
        setCustomAmountSlip(false);
    };

    const handleCloseBetAmount = () => {
        setCustomAmountSlip(false);
    };

    const previewSubmitBet = async () => {
        const ticket = {
            minimumBet: unitBet,
            pool: poolName,
            raceNumber: raceNumber,
            totalTickets: totalTickets
        };
        setEnableBetSlip(true);

        const ticketFormat = selectedRunnersList.map((item: any) => {
            return item.join(',');
        });
        let finalTicket = ticketFormat.join('-');
        if (legs > 1) {
            finalTicket = ticketFormat.join('/');
        }

        const temp = {
            programId: programId,
            raceNumber: raceNumber,
            betType: poolName.toUpperCase(),
            betString: 1,
            betQuantity: 1,
            betAmount: totalAmount,
            totalAmount: totalAmount,
            oddsValuePaid: oddsValuePaid ? oddsValuePaid : undefined
        };
        const response = await RacingService.getTicketDetails(temp);
        if (response.status) {
            setGstData(response.data);
        }
    };

    const submitBet = async () => {
        setBetLoad(true);
        const ticketFormat = selectedRunnersList.map((item: any) => {
            return item.join(',');
        });
        let finalTicket = ticketFormat.join('-');
        if (legs > 1) {
            finalTicket = ticketFormat.join('/');
        }

        const token: any = await CookieStorageService.getItem(RacingService.getAuthKey());
        const sessionId = ''; //`${md5(token)}#${user?.selectedWalletId}`;

        const ticketObject = {
            entryType: 'sale',
            betAmount: betAmount,
            unitBet: unitBet,
            totalAmount: totalAmount,
            sessionId: sessionId,
            action: 'submit',
            runners: finalTicket,
            runnersDisplay: finalTicket,
            betQuantity: 1,
            programId: programId,
            poolName: poolName,
            eventId: raceNumber,
            venueCode: venueCode,
            groupCode: '',
            customerId: sessionId,
            betType: 'tote'
        };

        const response = await RacingService.submitBet(ticketObject);
        if (response.status) {
            setBetLoad(false);
            setEnableBetSlip(false);
            setEnableBetSuccess(true);
            setMessage(response.data.msg);
        } else {
            setBetLoad(false);
        }
    };

    const previewCustomAmountList = () => {
        setCustomAmountSlip(true);
    };

    const closeBetSlip = () => {
        setEnableBetSlip(false);
    };

    const closeBetSuccess = () => {
        setEnableBetSuccess(false);
    };

    const trashOrder = () => {
        resetTicket();
    };

    useEffect(() => {
        calculateTicketAmount();
    }, [betAmount]);

    useEffect(() => {
        calculateTicketAmount();
    }, [selectedRunnersList]);

    // useEffect(() => {
    //     console.log(user, 'shafi-user');
    // });

    return (
        <>
            {totalAmount > 0 && (
                <Grid sx={{display:'flex',  backgroundColor: alpha(theme.palette.secondary.main, 1), borderRadius:'0px 0px 10px 10px', position:'absolute', padding:'12px', bottom:'0px', width:'100%'}}>
                    <Grid sx={{display:'flex', width:'100%',flexDirection:'column'}}>
                        <Grid sx={{display:'flex', width:'100%', alignItems:'center' }}>
                            <Stack sx={{color:'#fff', fontWeight:'600', marginRight:'15px'}}>{poolName.toUpperCase()}</Stack>
                            <Stack sx={{flexDirection:'row', display:'flex',paddingBottom:'8px', overflow:'auto' }}>
                                {selectedRunnersList.map((items: any[], index: number) => (
                                    <WinPlacesView className="winplaces" key={index} sx={{display:'flex', alignItems:'center'}}>
                                        {selectedRunnersList.length > 1 && items.length > 0 && (
                                            <span  className="ordinal_text" style={{whiteSpace:'nowrap', fontWeight:'600'}}>
                                                {index + 1}
                                                <sup> {intToOrdinalNumberString(index + 1)}</sup>
                                            </span>
                                        )}
                                        <ul style={{display:'flex', marginLeft:'5px'}} key={index}>
                                            {items && items.length == 0 ? (
                                                <li>&nbsp;</li>
                                            ) : (
                                                items.map((item: number) => (
                                                    <li key={item}>
                                                        <Link to={''}>{item}</Link>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </WinPlacesView>
                                ))}
                            </Stack>
                        </Grid>
                        <PlaceBetting sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Stack>
                                <Link to={''} onClick={() => trashOrder()}>
                                    <TrashIconSvg />
                                </Link>
                            </Stack>

                            <Stack sx={{display:'flex', flexDirection:'row'}}>
                                <Button
                                    style={{ justifyContent: 'flex-start' }}
                                    className="betslip_select"
                                    onClick={() => previewCustomAmountList()}
                                >
                                    <span>&#8369;</span> {unitBet}
                                </Button>
                                {totalAmount > 0 && (
                                    <Button className="betslip_button" onClick={() => previewSubmitBet()}>
                                        Place Bet - <span>&#8369;</span>
                                        <span>{totalAmount}</span>
                                    </Button>
                                )}
                            </Stack>
                        </PlaceBetting>
                        {customAmountSlip && (
                            <BetAmount
                                parentHandlerFunction={handleBetAmount}
                                parentCloseHandlerFunction={handleCloseBetAmount}
                                unitBet={unitBet}
                            />
                        )}
                        {enableBetSlip && (
                            <PlaceBetPopup
                                parentCloseHandlerFunction={closeBetSlip}
                                parentSubmitBetHandlerFunction={submitBet}
                                betLoad={betLoad}
                                venueName={venueName}
                                poolName={poolName}
                                raceNumber={raceNumber}
                                selectedRunnersList={selectedRunnersList}
                                totalAmount={totalAmount}
                                gstData={gstData}
                            />
                        )}
                        {enableBetSuccess && <BetSuccess parentCloseHandlerFunction={closeBetSuccess} />}
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default RunnerFooter;
