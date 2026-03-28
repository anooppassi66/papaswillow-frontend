import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// Libs
import { useSnackbar } from 'notistack';
// Mui
// import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
// Context
//import UserContext, { UserContextType } from '../contexts/UserContext';
// Sockets
import Sockets from 'services/SocketService';
// Models
import BaseModel from 'models/BaseModel';
import ToteModel from 'models/ToteModel';
import UserModel from 'models/UserModel';
// Components
import VideoPlayer from './VideoPlayer';
import HorseBetButton, { BET_ODD, BET_EVEN } from './HorseBetButton';
import HorsesPopover from './HorsesPopover';
import SportEventsPopover from './SportEventsPopover';
import SportEventsBetConfirmPopover from './SportEventsBetConfirmPopover';
// SVG
import { DotSVG, ClosePopSVG, CrownPopSVG, TimeIconSvg } from 'assets/svg';
// Api
import { apiGetCurrentUser } from '../../../api/UserApi';
import {
    apiGetSportEventModels,
    apiPlaceRaceCardBet,
    RaceEventType,
    RaceBetType,
    RaceCardBetType,
    apiGetTote
} from '../../../api/RacingCardApi';
import RaceVideo from './video';
import { KeyboardArrowDown } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import useAuth from 'hooks/useAuth';
import Input from '@mui/material/Input';
import { color } from 'framer-motion';

// TODO move this to MUI-Theme
const themeColor = import.meta.env.REACT_APP_THEME === 'fairplay' ? '#2F594D' : '#384766';
const MAX_AMOUNT = 50000;
const DEBUG_STREAM_SOURCE: null | string = null;
// We are refreshing the page just in case if sockets stop working.
const REFRESH_EVERY_SECONDS = 30;

const TrendsCard = styled(Card)(({ theme }) => ({
    zIndex: 1,
    maxWidth: 660,

    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    // margin: 8,
    //padding: '2px 10px 10px 10px',
    // marginTop: 4,
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    background: 'none'
}));

const BetCloseEvent = styled(Grid)(({ theme }) => ({
    background: 'rgba(0, 0, 0, .87)',
    height: '100vh',
    left: '0',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '9999'
}));

const BetCloseEventPopup = styled(Grid)(({ theme }) => ({
    backdropFilter: 'blur(40px)',
    backgroundColor: theme.palette.dark[800],
    border: '1.5px solid rgba(97, 97, 97, .45)',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    left: '50%',
    padding: '20px',
    position: 'absolute',
    top: '58%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    zIndex: '99',
    alignItems: 'center'
}));

const BetCloseEventPopupSucess = styled(Grid)(({ theme }) => ({
    backdropFilter: 'blur(40px)',
    background: 'linear-gradient(224deg,#ff8292 3.65%,#fb5a6f 31.56%,#ea3e54 65.16%,#c32035 102.22%)',
    border: '1.5px solid rgba(97, 97, 97, .45)',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    left: '50%',
    padding: '20px',
    position: 'absolute',
    top: '58%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    zIndex: '99',
    alignItems: 'center'
}));

const OpenCloseCard = styled(Grid)(({ theme }) => ({
    button: {
        background:
            'linear-gradient(90deg, rgba(0, 0, 0, .24), rgba(45, 45, 45, .24) 22.4%, rgba(47, 47, 47, .24) 77.08%, rgba(0, 0, 0, .24))',
        border: '1px solid hsla(0, 0%, 100%, .24)',
        padding: '1rem',
        color: '#fff'
    }
}));

const TrendsHead = styled(Card)(({ theme }) => ({
    display: 'flex',
    background: '#1D222B',
    borderTopLeftRadius: '8px !important',
    borderTopRightRadius: '8px !important',
    borderRadius: '0px',
    height: '34px',
    width: '100%',
    padding: '5px'
}));

const TrendsBody = styled(Card)(({ theme }) => ({
    display: 'flex',
    background: 'transparent',
    width: '100%',
    padding: '0px',
    borderRadius: '0px',
    overflow: 'auto'
}));

const BetAmountInput = styled(Card)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif, Helvetica, Arial',
    fontSize: '1.25rem',
    fontWeight: '600',
    height: '52px',
    gap: '20px',
    display: 'flex',
    //backgroundColor: alpha(theme.palette.secondary.main, 0.55),
    borderRadius: '10px',
    // padding: '6px 12px 6px 12px',  borderRadius: '10px', color: '#fff !important',
    '.betamount': {
        background: 'transparent'
    },
    'MuiInput-input': {
        color: '#fff'
    }
}));

const TrendsView = styled(Card)(({ theme }) => ({
    zIndex: 1,
    maxWidth: 660,
    flexShrink: 0,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    border: `1px solid #38404D`,
    background: `${theme.palette.background.default}A8`,
    backdropFilter: 'blur(2px)',
    display: 'flex',
    flexDirection: 'column',
    borderTopLeftRadius: '10px !important',
    borderTopRightRadius: '10px !important',
    borderRadius: '0px',
    borderBottom: '0px'
}));

const BorderCard = styled(Card)(({ theme }) => ({
    zIndex: 1,
    maxWidth: 660,
    width: '100%',
    position: 'relative',
    overflow: 'inherit',
    padding: '10px 0px',
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 8,
    display: 'flex',
    backgroundImage: 'none'
}));

const XOCard = styled(Card)(({ theme }) => ({
    zIndex: 1,
    maxWidth: 660,
    width: '100%',
    position: 'relative',
    overflow: 'inherit',
    padding: 5,
    marginTop: 4,
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 10,
    border: `1.5px solid ${alpha(theme.palette.secondary.main, 1)}`,
    background: `${theme.palette.background.default}A8`,
    backdropFilter: 'blur(2px)',
    display: 'flex',
    gap: '4px'
}));

const BetCard = styled(Card)(({ theme }) => ({
    zIndex: 1,
    maxWidth: 660,
    width: '100%',
    position: 'relative',
    overflow: 'inherit',
    padding: '4px 4px 8px 4px',
    marginTop: 4,
    // backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 10,
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.95)}`,
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    backdropFilter: 'blur(2px)',
    display: 'flex',
    flexDirection: 'column'
}));

// This must be fix on a global state when header is added.
const ScreenDiv = styled('div')(({ theme }) => ({
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'none'
}));

const StyledRaceInfoButtonBase = styled(ButtonBase)(({ theme }) => ({
    color: 'white',
    width: '100%',
    height: '100%',
    '&button': {
        background:
            'linear-gradient(90deg, rgba(0, 0, 0, .24), rgba(45, 45, 45, .24) 22.4%, rgba(47, 47, 47, .24) 77.08%, rgba(0, 0, 0, .24))',
        border: '1px solid hsla(0, 0%, 100%, .24)',
        padding: '1rem'
    }
}));

const StyledDividerDiv = styled('div')(({ theme }) => ({
    width: '100%',
    height: '1px',
    backgroundColor: '#FFFFFF29',
    borderRight: '1px solid #00000069',
    marginTop: '0px !important'
}));

const TrendsResultPopup = styled(Grid)(({ theme }) => ({
    
    backgroundColor:  theme.palette.dark[800],
    border: '1.25px solid linear-gradient(153.49deg, rgba(97, 97, 97, .45) 4.12%, rgba(97, 97, 97, .35) 96.52%)',
    bottom:' 0',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, .251)',
    maxWidth: '600px',
    position: 'fixed',
    width: '94%',
    zIndex: '999999',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '50%',
    height:'400px',
    borderRadius:'10px',
}));

const TrendsResultPopupView = styled(Grid)(({ theme }) => ({
    
    background:'hsla(0, 0%, 5%, 0.8)',
    position: 'fixed',
    height: '100%',
    width: '100%',
    left: '0px',
    top: '0px',
    zIndex:'9999',
}));





const betCardTransparencyFactor = 'C8';
const GameOddEven = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an API call or data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
        // const downMD = useMediaQuery(theme.breakpoints.down('md'));
    }, []);
    const { module } = useParams();
    const [mod, setMod] = useState<any>(module);
    const amounts = ['100', '200', '300', '400'];
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // ----------------------------------------------------------------------

    interface CircleProps {
        type: 'X' | 'O' | 'R' | 'N'; // Define the type for the 'type' prop
        currentEvent?: RaceEventType;
    }
    // State.
    // Anchors for popups.
    const [horsesAnchorEl, setHorsesAnchorEl] = useState<null | HTMLElement>(null);
    const [eventsAnchorEl, setEventsAnchorEl] = useState<null | HTMLElement>(null);
    // State represents the video full screen or adjusted screen.
    const [isExpandedVideoStream, setIsExpandedVideoStream] = useState<boolean>(false);
    // This state represent the refresh time.
    const [refreshTime, setRefreshTime] = useState(Date.now());
    // State to place a bet.
    const [betAmount, setBetAmount] = useState<any>(amounts[0]);
    const [stopBet, setStopBet] = useState(false);
    const [resultPopover, setResultPopover] = useState(false);
    const [betplacedPopover, setBetplacedPopover] = useState(false);

    const [placeRaceBet, setPlaceRaceBet] = useState<null | RaceBetType>(null);
    // Model, separately tote and events.
    const [toteModels, setToteModels] = useState<null | Array<ToteModel>>(null);
    const [sportEventModels, setSportEventModels] = useState<null | Array<RaceEventType>>(null);
    const [activeEventModel, setActiveEventModel] = useState<any>(null);
    const [stopEventModel, setStopEventModel] = useState<any>(null);
    const [trendStatsPopup, setTrendStatsPopup] = useState<any>(false);

    // ----------------------------------------------------------------------
    // Logic related to the state.

    // Based on the current state we have logic that find the current event.
    // const activeEventModel = (
    //   sportEventModels && sportEventModels.find((event: RaceEventType): boolean => event.currentFlag === 'Y') || null
    // );
    // Then check if the event can be used to place a bet.
    // Sometimes events can has a current flag but not be ready to place a bet.
    const isActiveEventOpenToBet =
        activeEventModel &&
        activeEventModel.startBetFlag === 'Y' &&
        activeEventModel.stopBetFlag !== 'Y' &&
        activeEventModel.eventStatus !== 'FINAL' &&
        !activeEventModel.eventResult;
    // Stream can be still active, but betting closed.
    const activeStreamSource = DEBUG_STREAM_SOURCE;
    // Select tote model related to active event.
    const selectedToteModel =
        toteModels && activeEventModel && isActiveEventOpenToBet
            ? toteModels.find((toteModel: ToteModel) => toteModel.id === activeEventModel.id)
            : null;

    console.log('current state', {
        activeEventModel,
        isActiveEventOpenToBet,
        activeStreamSource,
        selectedToteModel
    });

    useEffect(() => {
        if (!activeEventModel && sportEventModels) {
            const currentEvent =
                (sportEventModels &&
                    sportEventModels.find((event: RaceEventType): boolean => event.stopBetFlag === 'N' && event.currentFlag === 'Y')) ||
                null;
            setActiveEventModel(currentEvent);
        }
    }, [sportEventModels, activeEventModel]);

    const onChangeEvent = (event: any) => {
        setActiveEventModel(event);
    };
    // ----------------------------------------------------------------------
    // Functions.

    const updateToteModels = (toteModelData: ToteModel) => {
        if (toteModelData) {
            const newNoteModels = [...(toteModels || [])];
            let updateToteModelIndex = newNoteModels.findIndex((toteModel: ToteModel) => toteModel.id === toteModelData.id);
            if (updateToteModelIndex !== -1) {
                newNoteModels[updateToteModelIndex] = Object.assign(newNoteModels[updateToteModelIndex], toteModelData);
            } else {
                newNoteModels.push(toteModelData);
            }
            setToteModels(newNoteModels);
        }
    };

    const eventFromSocketListener = (socketModelData: BaseModel) => {
        if (socketModelData.typename === 'tote') {
            updateToteModels(socketModelData as ToteModel);
        } else if (socketModelData.typename === 'event' || socketModelData.typename === 'sportevent') {
            let updateSportEventModel = (sportEventModels ?? []).find((sportEventModel) => sportEventModel.id === socketModelData.id);

            if (updateSportEventModel) {
                const newEventModelArray = [...(sportEventModels ?? [])];
                updateSportEventModel = Object.assign(updateSportEventModel, socketModelData);
                const sortEventsByTime = newEventModelArray.sort((a: RaceEventType, b: RaceEventType) =>
                    a.startTime.localeCompare(b.startTime)
                );
                setSportEventModels(sortEventsByTime);
            }

            if (socketModelData?.eventStatus === 'FINAL') {
                setActiveEventModel(null);
            }

            if (socketModelData?.eventStatus === 'CLOSED') {
                setStopBet(true);
                setStopEventModel(updateSportEventModel);
            }

            if (socketModelData.eventResult) {
                setResultPopover(true);
                setStopEventModel(updateSportEventModel);
            }
        }
    };

    const fetchRaceCards = useCallback(
        async (useEnqueueSnackbar = true) => {
            const events = await apiGetSportEventModels(mod, useEnqueueSnackbar ? enqueueSnackbar : null);
            if (events) {
                const sortEventsByTime = events.sort((a: RaceEventType, b: RaceEventType) => a.startTime.localeCompare(b.startTime));
                setSportEventModels(sortEventsByTime);

                // After a new card, fetch the tote.
                fetchTote();
            }
        },
        [enqueueSnackbar]
    );

    const fetchTote = useCallback(
        async (useEnqueueSnackbar = true) => {
            if (activeEventModel) {
                const data = await apiGetTote(activeEventModel.id);
                updateToteModels(data);
            } else {
                console.log('fetchTote::activeEventModel is empty');
            }
        },
        [activeEventModel, enqueueSnackbar]
    );

    const getDotSVG = (green: boolean) => (
        <span style={{ color: green ? '#66B15F' : '#FF6161', height: '18px' }}>
            <DotSVG />
        </span>
    );

    // ----------------------------------------------------------------------
    // Handlers.

    const handleOpenRaceCardsClick = (event: React.MouseEvent<HTMLElement>) => {
        setHorsesAnchorEl(event.currentTarget);
    };

    const handleCloseRaceCards = () => {
        setHorsesAnchorEl(null);
    };

    const handleOpenEventsClick = (event: React.MouseEvent<HTMLElement>) => {
        fetchRaceCards();
        setEventsAnchorEl(event.currentTarget);
    };

    const handleCloseEvents = () => {
        setEventsAnchorEl(null);
    };

    const handleReset = () => {
        setBetAmount(amounts[0]);
    };

    const handleInputAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9\b]+$/;
        if (event.target.value === '' || regex.test(event.target.value)) {
            if (event.target.value === '') {
                setBetAmount(event.target.value);
            } else {
                let n = Number(event.target.value || '1');
                if (n < 1) n = 1;
                else if (n > MAX_AMOUNT) n = MAX_AMOUNT;
                setBetAmount(String(n));
            }
        }
    };

    // const changeState = () => {
    //     setBetplacedPopover(false);
    // };

    const handleSendBet = async (raceBet: RaceBetType) => {
        setPlaceRaceBet(null);
        const response = await apiPlaceRaceCardBet(raceBet.programId, raceBet.eventId, raceBet, enqueueSnackbar);
        if (response && response.status === 'OK') {
            enqueueSnackbar(`${raceBet.amount} ${raceBet.currency} <${raceBet.type}> bet placed successfully!`, { variant: 'success' });
        }
    };

    const validatingBetAmount = (val: number) => {
        if (val < 100) {
            enqueueSnackbar('The bet amount must be a minimum of 100.', {
                variant: 'error'
            });
            return false;
        }
        if (val % 10 !== 0) {
            enqueueSnackbar('The bet amount must be a multiple of 10.', {
                variant: 'error'
            });
            return false;
        }
        return true;
    };

    const handlePlaceBet = async (raceCardBetType: RaceCardBetType, paramUserModel: null | UserModel = null) => {
        const selectedWalletId = user && user.selectedWalletId ? user.selectedWalletId : '';
        if (selectedWalletId) {
            if (activeEventModel) {
                if (validatingBetAmount(Number(betAmount))) {
                    const data: RaceBetType = {
                        type: raceCardBetType,
                        poolName: 'WIN',
                        runners: raceCardBetType === BET_ODD ? 1 : 2,
                        startTime: activeEventModel.startTime,
                        //
                        venueId: activeEventModel.venueId,
                        venueName: activeEventModel.venueName,
                        programId: activeEventModel.programId,
                        eventId: activeEventModel.id,
                        eventName: activeEventModel.name.replace('Race', 'Event'),
                        //
                        userId: selectedWalletId,
                        sessionId: 'f01b3d72-ae49-41a0-b85f-678f78e14968',
                        amount: Number(betAmount),
                        currency: 'PHP'
                    };
                    setPlaceRaceBet(data);
                }
            } else {
                // Internal error that shall never happen.
                enqueueSnackbar('To place a bet event must be selected', {
                    variant: 'error'
                });
            }
        } else {
            // Internal error that shall never happen.
            // enqueueSnackbar('User model is not available', { variant: 'error' });
            // ---
            // Fetch the user model first.
            console.log('User model is not available at this point of time, fetch');
            const fetchedUserModel = await apiGetCurrentUser();
            if (fetchedUserModel) {
                console.log('Try again place a bet');
                handlePlaceBet(raceCardBetType, fetchedUserModel);
            }
        }
    };
    // ----------------------------------------------------------------------
    // React.useEffect.

    useEffect(() => {
        // Refresh interval time.
        const interval = setInterval(() => setRefreshTime(Date.now()), REFRESH_EVERY_SECONDS * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        fetchRaceCards();
    }, [fetchRaceCards, refreshTime]);

    useEffect(() => {
        if (activeEventModel) {
            fetchTote();
            console.log('ACTIVE EVENT MODEL', activeEventModel);

            const socket = Sockets.getCurrentSocket();

            if (socket) {
                //Sockets.setSocketForUser(activeEventModel.programId, updateModelAttributes);
                socket.subscribeEventId(`stream_${activeEventModel.programId}`, eventFromSocketListener);
                socket.subscribeEventId(activeEventModel.id, eventFromSocketListener);
                console.log('subscribeEventId', activeEventModel.id);
            }
        }
    }, [activeEventModel]);

    const Circle = ({ type, currentEvent }: CircleProps) => {
        const ColorCodeAttr = {
            X: '#D3544E',
            O: '#565DF5',
            R: '#FFA500',
            N: '#000000'
        };

        // const colorCode = type === 'X' ? '#D3544E' : tyo'#565DF5';
        return (
            <ListItem sx={{ padding: '4px', borderBottom: '1px solid #38404C' }}>
                <ListItemButton sx={{ 
                    padding: '0px',
                    ':hover':{
                        background: 'none',
                        color: '#009688',
                    },
                  
                    
                     }}>
                    <span
                        onClick={() => type !== 'N' && setTrendStatsPopup(true)}
                        style={{
                            border: `${type === 'N' ? '0' : '1'}px solid ${ColorCodeAttr[type] || '#000000'}`,
                            height: '10px',
                            width: '10px',
                            borderRadius: '100px',
                            
                        }}
                    ></span>
                </ListItemButton>
            </ListItem>
        );
    };

    function getCircleType(type: string): 'X' | 'O' | 'R' | undefined {
        if (type === 'WINNER-1') {
            return 'X';
        } else if (type === 'WINNER-2') {
            return 'O';
        } else if (type === 'REFUND') {
            return 'R';
        }
    }

    function DisplayResults({ results }: { results: any }) {
        let gridData: JSX.Element[] = [];
        let rootActive = false;
        let listContent: JSX.Element[] = [];

        for (let i = 0; i < results.length; i++) {
            if (!rootActive && results[i]) {
                rootActive = true;
            }
            if (rootActive) {
                let currentEventType = getCircleType(results[i].eventResult);
                let nextEventType = getCircleType(results[i + 1]?.eventResult);
                if (currentEventType === 'X' || currentEventType === 'O' || currentEventType === 'R' || currentEventType === 'N') {
                    listContent.push(<Circle key={i} type={currentEventType} currentEvent={results[i]} />);

                    if (currentEventType !== nextEventType) {
                        gridData.push(
                            <List key={gridData.length} sx={{ padding: '0px', borderRight: '1px solid #38404C' }}>
                                {listContent}
                            </List>
                        );
                        listContent = [];
                        rootActive = false;
                    }
                }
            }
        }
        // console.log(gridData);

        // Find the maximum number of children
        const maxChildren = Math.max(...gridData.map((list) => React.Children.count(list.props.children)));

        // Iterate over gridData and fill the missing children with '-'
        const filledGridData = gridData.map((list) => {
            const childrenCount = React.Children.count(list.props.children);
            const missingChildrenCount = maxChildren - childrenCount;
            const filledChildren = React.Children.toArray(list.props.children);
            for (let i = 0; i < missingChildrenCount; i++) {
                filledChildren.push(<Circle key={`empty_${i}`} type="N" />);
            }
            return React.cloneElement(list, {}, filledChildren);
        });

        return <>{filledGridData}</>;
    }

    let trendObj =
        !!sportEventModels && sportEventModels?.filter((eve) => ['WINNER-1', 'WINNER-2', 'REFUND'].includes(eve.eventResult ?? ''));

    // ----------------------------------------------------------------------
    console.log(stopBet, stopEventModel, 'stopmodel');
    const oddsReleased = stopEventModel?.hasOwnProperty('odds');
    const win_one = oddsReleased ? stopEventModel.odds['WIN-1'] : '0';
    const win_two = oddsReleased ? stopEventModel.odds['WIN-2'] : '0';

    const totalTrendX = sportEventModels?.filter((eve) => eve.eventResult === 'WINNER-1')?.length;
    const totalTrendO = sportEventModels?.filter((eve) => eve.eventResult === 'WINNER-2')?.length;
    const totalTrendC = sportEventModels?.filter((eve) => eve.eventResult === 'REFUND')?.length;

    return (
        <div style={{ width: '100%' }}>
            <ScreenDiv
                style={
                    {
                        //  height:'100vh',
                        // backgroundImage: isExpandedVideoStream ? 'url("https://arionplay-media.s3.ap-southeast-1.amazonaws.com/backgrounds/horses3.jpg")' : undefined,
                    }
                }
            >
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '90px',
                        display: 'flex',
                        justifyContent: 'center',
                        flex: '1',
                        position: 'relative'
                    }}
                >
                    <TrendsCard>
                        <TrendsView>
                            <TrendsHead>
                                <Grid md={6} sx={{ display: 'flex', width: '300px', alignItems: 'center' }}>
                                    <Typography
                                        sx={{
                                            color: '#E0E1E3',
                                            fontFamily: '"Poppins", sans-serif, Helvetica, Arial',
                                            fontWeight: '500',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Trends
                                    </Typography>
                                </Grid>
                                <Grid
                                    md={6}
                                    sx={{
                                        display: 'flex',
                                        width: '360px',
                                        gap: '20px',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography sx={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                background: '#D3544E',
                                                borderRadius: '10px',
                                                height: '18px',
                                                width: '22px',
                                                padding: '0px 6px',
                                                fontSize: '11px',
                                                fontFamily: 'google_sansbold',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            X
                                        </label>
                                        <label
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'google_sansbold',
                                                paddingLeft: '5px'
                                            }}
                                        >
                                            {totalTrendX}
                                        </label>
                                    </Typography>
                                    <Typography sx={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                background: '#565DF5',
                                                borderRadius: '10px',
                                                height: '18px',
                                                width: '22px',
                                                padding: '0px 6px',
                                                fontSize: '11px',
                                                fontFamily: 'google_sansbold',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            O
                                        </label>
                                        <label
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'google_sansbold',
                                                paddingLeft: '5px'
                                            }}
                                        >
                                            {totalTrendO}
                                        </label>
                                    </Typography>
                                    <Typography sx={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                background: '#606060',
                                                borderRadius: '10px',
                                                height: '18px',
                                                width: '22px',
                                                padding: '0px 6px',
                                                fontSize: '11px',
                                                fontFamily: 'google_sansbold',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            C
                                        </label>
                                        <label
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'google_sansbold',
                                                paddingLeft: '5px'
                                            }}
                                        >
                                            {totalTrendC}
                                        </label>
                                    </Typography>
                                </Grid>
                            </TrendsHead>
                            <TrendsBody>
                                <DisplayResults results={trendObj} />
                            </TrendsBody>
                        </TrendsView>
                    </TrendsCard>
                    {trendStatsPopup && (
                        <Grid>
                            <TrendsResultPopupView 
                            style={{
                            }}
                            >
                        <TrendsResultPopup className="trendsresultpopup">
                            

                            <Stack className="trendsresulhead" sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'10px', borderBottom:`1px solid ${alpha(theme.palette.secondary.main, 0.95)}`, }}>
                                <Typography
                                    sx={{
                                        fontSize: '20px',
                                        lineHeight: '35px',
                                        fontFamily: '"Poppins", sans-serif, Helvetica, Arial',
                                        fontWeight: '700',
                                        color: '#fff'
                                    }}
                                    variant="h5"
                                    component="span"
                                    style={{ marginLeft: 4 }}
                                >
                                    Trends
                                </Typography>
                                <Stack className="closbtn" onClick={() => setTrendStatsPopup(false)}>
                                    <CloseIcon></CloseIcon>
                                </Stack>
                            </Stack>
                            <Stack
                                className="trandesresultbody"
                                style={{
                                    overflow: 'scroll',
                                    maxWidth: '100%',
                                    height: 'calc(100% - 100px)'
                                }}
                             >
                                <List
                                    style={{
                                        overflowY: 'auto',
                                        maxWidth: '100%',
                                        //padding: '10px'
                                    }}
                                    className="popoverview"
                                >
                                    {(sportEventModels || [])
                                        .filter((raceEvent: RaceEventType) => {
                                            return raceEvent.stopBetFlag === 'Y';
                                        })
                                        .map((raceEvent: RaceEventType, index: number) => {
                                            //const openToBet = activeEventId === raceEvent.id && isActiveEventOpenToBet;
                                            const openToBet = raceEvent.stopBetFlag === 'N';

                                            return (
                                                <ListItem
                                                    sx={{
                                                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                                       // padding: '0px 12px 0px 8px'
                                                    }}
                                                    key={raceEvent.id}
                                                    disablePadding={true}

                                                    // style={{
                                                    //   borderLeft: `3px solid ${openToBet ? theme.palette.success.main : 'transparent'}`,

                                                    // }}
                                                >
                                                    <ListItemButton sx={{ padding: '8px 10px', gap: '10px' }} className="eventlistview">
                                                        <Stack
                                                            className="racestatuschange"
                                                            style={{
                                                                border: `2px solid ${openToBet ? theme.palette.success.main : '#FF6161'}`,
                                                                borderRadius: '100%',
                                                                position: 'relative',
                                                                height: '15px',
                                                                width: '15px',
                                                            }}
                                                        >
                                                            <Stack
                                                                className="racestatuschangesub"
                                                                style={{
                                                                    background: `${openToBet ? theme.palette.success.main : '#FF6161'}`,
                                                                    height: '8px',
                                                                    width: '8px',
                                                                    borderRadius: '100%',
                                                                    position: 'relative',
                                                                    top: '1.5px',
                                                                    left: '1.5px'
                                                                }}
                                                            ></Stack>
                                                        </Stack>
                                                        <Stack>
                                                            {/* <div style={{border: `3px solid ${openToBet ? theme.palette.success.main : 'transparent'}`, height:'14px', width:'14px', borderRadius:'100%' }}></div> */}
                                                            <Stack direction="column" flexWrap="nowrap">
                                                                <Stack
                                                                    style={{
                                                                        width: '100%',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        gap: '5px',
                                                                        flexDirection:'row',
                                                                    }}
                                                                >
                                                                    {/* <div style={{border: `2px solid ${openToBet ? theme.palette.success.main : '#FF6161'}`, height:'14px', width:'14px', borderRadius:'100%' }}></div> */}
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '12px',
                                                                            fontWeight: '900',
                                                                            color: 'rgba(255, 255, 255, 0.80)'
                                                                        }}
                                                                        variant="subtitle2"
                                                                        component="div"
                                                                    >
                                                                        {raceEvent.startTime} -
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '12px',
                                                                            fontWeight: '900',
                                                                            color: 'rgba(255, 255, 255, 0.80)'
                                                                        }}
                                                                        variant="subtitle2"
                                                                        component="div"
                                                                    >
                                                                        {raceEvent.name.replace('Race-', 'Event ')} -
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '12px',
                                                                            fontWeight: '900',
                                                                            color: 'rgba(255, 255, 255, 0.80)'
                                                                        }}
                                                                        variant="caption"
                                                                        component="div"
                                                                    >
                                                                        {raceEvent.venueName}
                                                                    </Typography>
                                                                    {/* <Typography variant="caption" component="div">
                                                                        {raceEvent.id}  - {raceEvent.currentFlag} - {currentEvent}
                                                                        </Typography> */}
                                                                </Stack>
                                                                <Stack
                                                                    style={{
                                                                        width: '100%',
                                                                        margin: '0px',
                                                                        lineHeight: '16px'
                                                                    }}
                                                                >
                                                                    {openToBet && (
                                                                        <Chip
                                                                            sx={{
                                                                                width: 'auto',
                                                                                padding: '0px',
                                                                                marginTop: '0px',
                                                                                background: 'none',
                                                                                justifyContent: 'flex-start',
                                                                                border: '0px',
                                                                                fontWeight: '900',
                                                                                fontSize: '12px',
                                                                                color: '#66B15F !important',
                                                                                paddingLeft: '0px',
                                                                                height: 'auto',
                                                                                lineHeight: '16px'
                                                                            }}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            label="Open to bet"
                                                                            color="success"
                                                                            clickable={false}
                                                                            className="chiplabel"
                                                                        />
                                                                    )}
                                                                </Stack>
                                                            </Stack>
                                                            {raceEvent.eventResult && (
                                                                <>
                                                                    <Typography
                                                                        sx={{
                                                                            marginTop: '2px',
                                                                            color: '#FF6161',
                                                                            fontWeight: '500',
                                                                            fontSize: '12px',
                                                                            paddingLeft: '0px',
                                                                            lineHeight: '16px'
                                                                        }}
                                                                        variant="caption"
                                                                        component="div"
                                                                    >
                                                                        {raceEvent.eventResult !== 'REFUND' &&
                                                                            `Winner: ${raceEvent.eventResult === 'WINNER-1' ? 'X' : 'O'}`}
                                                                        {raceEvent.eventResult === 'REFUND' && `TIE`}
                                                                    </Typography>
                                                                </>
                                                            )}
                                                            {raceEvent.eventStatus && (
                                                                <>
                                                                    <Typography
                                                                        sx={{
                                                                            marginTop: '0px',
                                                                            color: '#FF6161',
                                                                            fontWeight: '500',
                                                                            fontSize: '12px',
                                                                            paddingLeft: '0px',
                                                                            lineHeight: '16px'
                                                                        }}
                                                                        variant="caption"
                                                                        component="div"
                                                                    >
                                                                        {raceEvent.odds
                                                                            ? `Closed at : X(${
                                                                                  raceEvent.odds['WIN-1'] || 0
                                                                              }) , O(${raceEvent.odds['WIN-2'] || 0})`
                                                                            : ''}
                                                                        {raceEvent.odds === undefined ? `Closed at : X(0) , O(0)` : ''}
                                                                    </Typography>
                                                                </>
                                                            )}
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                </List>
                            </Stack>
                        </TrendsResultPopup>
                        </TrendsResultPopupView>
                        </Grid>
                    )}
                </Box>
                <BorderCard>
                    <Grid container={true} spacing={1} sx={{ margin: '0px' }}>
                        <Grid sx={{ width: '100%', marginBottom: '10px' }}>
                        {loading ? (
                            <>
                                <Stack sx={{display:'flex', flexDirection:'row', gap:'10px'}}>
                                  <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', borderRadius:'5px', background: theme.palette.secondary.main, }} height={38} width={'100%'} />
                                  
                                 
                                </Stack>
                                <div></div>
                                
                            </>
                        ) : (
                            <StyledRaceInfoButtonBase
                                onClick={handleOpenEventsClick}
                                aria-controls={Boolean(eventsAnchorEl) ? 'events-menu' : undefined}
                                aria-expanded={Boolean(eventsAnchorEl) ? 'true' : undefined}
                                aria-haspopup="true"
                                disabled={!sportEventModels?.length}
                                sx={{
                                    width: '100%',

                                    minHeight: '26px',
                                    // maxWidth: '660px',
                                    backgroundColor: theme.palette.dark[800],
                                    padding: '5px',
                                    borderRadius: '5px'
                                }}
                                className="noeventlist"
                            >
                                <Stack direction="row" alignItems="center" spacing={1} className="12" sx={{ width: '100%' }}>
                                    <Stack className="gameoddevenview 2323" sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems:'center', gap:'5px' }}>
                                        <Stack className="eventsvgicon">{getDotSVG(isActiveEventOpenToBet)}</Stack>
                                        <Stack className="eventslist">
                                            {
                                                <Typography
                                                    variant="caption"
                                                    className="eventnametext"
                                                    sx={{ color: '#fff', fontWeight: '600', lineHeight:'16px',display:'flex', justifyContent:'flex-start' }}
                                                >
                                                    {sportEventModels?.length
                                                        ? activeEventModel
                                                            ? `${activeEventModel.startTime} - ${
                                                                  activeEventModel.venueName
                                                              } - ${activeEventModel.name.replace('Race', 'Event')}`
                                                            : 'No active event'
                                                        : 'No available events'}
                                                </Typography>
                                            }
                                            {
                                                <Typography variant="caption" className="closebetview" sx={{textAlign:'left', lineHeight:'16px', color:'#fff'}}>
                                                    {sportEventModels?.length
                                                        ? activeEventModel && activeEventModel.odds
                                                            ? `${
                                                                  activeEventModel.eventStatus === 'FINAL'
                                                                      ? activeEventModel.eventResult === 'WINNER-1'
                                                                          ? 'Winner :  X'
                                                                          : 'Winner :  O'
                                                                      : ''
                                                              } Closed at : X(${
                                                                  activeEventModel.odds['WIN-1'] || 0
                                                              }) , O(${activeEventModel.odds['WIN-2'] || 0}) `
                                                            : ''
                                                        : 'No available events'}
                                                </Typography>
                                            }
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <KeyboardArrowDown></KeyboardArrowDown>
                            </StyledRaceInfoButtonBase>
                             )}

                        </Grid>
                        {/* <Grid
                            xs={12}
                            md={12}
                            sx={{
                                marginTop: '0px',
                                color: '#E0E1E3',
                                fontFamily: '"Poppins", sans-serif, Helvetica, Arial',
                                fontWeight: '500',
                                fontSize: '1rem',
                                marginLeft: '2px',
                                marginBottom:'5px',
                            }}
                        >
                            Enter bet amount
                        </Grid> */}
                        <BetCard className="">
                            <Grid item={true} xs={12} md={12}>
                                <BetAmountInput>
                                    <FormControl
                                        fullWidth={true}
                                        size="small"
                                        sx={{
                                            height: '52px',
                                            width: 'calc(100% - 116px )',
                                            border: `1.5px solid ${alpha(theme.palette.secondary.main, 1)}`,
                                            borderRadius: '10px',
                                            paddingLeft: '10px',
                                            paddingRight: '10px',
                                            backgroundColor: alpha(theme.palette.secondary.main, 0.25)
                                        }}
                                    >
                                        <Input
                                            id="bet-amount2"
                                            type="number"
                                            className="betamount"
                                            placeholder="Enter bet amount"
                                            startAdornment={
                                                <InputAdornment position="start" sx={{ color: '#fff', height: '52px' }}>
                                                    <div style={{ fontWeight: '400', fontSize: '20px' }}>₱</div>
                                                </InputAdornment>
                                            }
                                            sx={{
                                                fontFamily: '"Poppins", sans-serif, Helvetica, Arial',
                                                fontSize: '1.25rem',
                                                fontWeight: '600',
                                                height: '52px',
                                                background: 'none',
                                                // padding: '6px 12px 6px 12px',
                                                borderRadius: '10px',
                                                color: '#fff !important',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: '1.5px solid #505455',
                                                    height: '57px'
                                                },
                                                '::before': {
                                                    border: '0px'
                                                },
                                                '::after': {
                                                    border: '0px'
                                                },
                                                ':hover:not(.Mui-disabled, .Mui-error):before': {
                                                    border: '0px'
                                                }
                                            }}
                                            value={betAmount}
                                            onChange={handleInputAmountChange}
                                        />
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        onClick={handleReset}
                                        sx={{
                                            padding: '4px 26px',
                                            minWidth: '',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            background: '#737575',
                                            fontFamily: 'Poppins',
                                            border: '1.5px solid #b5b5b5',
                                            height: '50px',
                                            boxShadow: 'none',
                                            borderRadius: '10px',
                                            ':hover': {
                                                background: '#737575'
                                            }
                                        }}
                                    >
                                        Reset
                                    </Button>
                                </BetAmountInput>
                            </Grid>

                            <Grid item={true} xs={12} md={12} sx={{ marginTop: '8px' }}>
                                <Stack direction="row" spacing={1}>
                                {loading ? (
                            <>
                                <Stack sx={{display:'flex', flexDirection:'row', gap:'10px'}}>
                                  <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', borderRadius:'5px', background: theme.palette.secondary.main, }} height={44} width={150} />
                                  <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', borderRadius:'5px', background: theme.palette.secondary.main, }} height={44} width={150} />
                                  <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', borderRadius:'5px', background: theme.palette.secondary.main, }} height={44} width={150} />
                                  <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', borderRadius:'5px', background: theme.palette.secondary.main, }} height={44} width={150} />
                                  
                                 
                                </Stack>
                                <div></div>
                                
                            </>
                        ) : (


                                    <ToggleButtonGroup
                                        fullWidth={true}
                                        value={betAmount}
                                        exclusive={true}
                                        color="primary"
                                        aria-label="bet amount"
                                        sx={{
                                            // backgroundColor: '#40444569',
                                            gap: '10px'
                                            // borderColor : theme.palette.action.disabledBackground,
                                        }}
                                    >
                                        {amounts.map((amount: string) => (
                                            <ToggleButton
                                                key={amount}
                                                value={amount}
                                                className="amountbtn33"
                                                sx={{
                                                    fontFamily: '"Poppins", sans-serif, Helvetica, Arial',
                                                    fontSize: '1.25rem',
                                                    fontWeight: '600',
                                                    height: '44px',
                                                    border: `2px dotted ${alpha(theme.palette.secondary.main, 1)}`,
                                                    borderLeft: `2px dotted ${alpha(theme.palette.secondary.main, 1)} !important`,
                                                    strokeDasharray: '6 10',
                                                    borderRadius: '10px !important',

                                                    '&.Mui-selected': {
                                                        background: '#FFCD05',
                                                        color: '#212121',
                                                        border: `2px dotted #f78603`,
                                                        borderLeft: `2px dotted #f78603 !important`,
                                                        '&:hover': {
                                                            background: '#FFCD05',
                                                            color: '#212121',
                                                            border: `2px dotted #f78603`,
                                                            borderLeft: `2px dotted #f78603 !important`
                                                        }
                                                    }
                                                }}
                                                onClick={(event: React.MouseEvent<HTMLElement>, newBetAmount: string | null) => {
                                                    setBetAmount(newBetAmount);
                                                }}
                                            >
                                                {amount}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                      )}
                                     


                                </Stack>
                            </Grid>
                        </BetCard>
                        <Grid
                            xs={12}
                            md={12}
                            sx={{
                                marginTop: '10px',
                                color: '#E0E1E3',
                                fontFamily: '"Poppins", sans-serif, Helvetica, Arial',
                                fontWeight: '500',
                                fontSize: '1rem',
                                marginLeft: '2px'
                            }}
                        >
                            {' '}
                            Select “X” or “O” to place bet
                        </Grid>
                        <XOCard className="">
                            {((strAmount: string) => {
                                const numAmount = parseInt(strAmount || '0') || 0;
                                return (
                                    <>
                                        <Grid item={true} xs={4} md={4} className="xogame">
                                            <HorseBetButton
                                                type={BET_ODD}
                                                odds={selectedToteModel?.odds ? selectedToteModel.odds['WIN-1'] : null}
                                                betAmountTotal={selectedToteModel?.amounts ? selectedToteModel.amounts['WIN-1'] : null}
                                                betAmount={numAmount}
                                                onClick={handlePlaceBet}
                                                disabled={!isActiveEventOpenToBet}
                                            />
                                        </Grid>
                                        <OpenCloseCard xs={4} md={4} className="openclose">
                                            <StyledRaceInfoButtonBase
                                                onClick={handleOpenRaceCardsClick}
                                                // aria-controls={openHorsesPopover ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                // aria-expanded={openHorsesPopover ? 'true' : undefined}
                                                sx={{ background: 'none' }}
                                                disabled={!isActiveEventOpenToBet}
                                            >
                                                <Stack
                                                    direction="column"
                                                    alignItems="center"
                                                    spacing={1}
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 'auto',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <div>{getDotSVG(isActiveEventOpenToBet)}</div>
                                                            <Typography
                                                                sx={{
                                                                    width: '100%',
                                                                    fontSize: '1rem',
                                                                    lineHeight: '19px',
                                                                    fontWeight: '500',
                                                                    fontFamily: 'Poppins',
                                                                    color: '#fff'
                                                                }}
                                                                variant="h5"
                                                                component="span"
                                                                style={{ marginLeft: 4 }}
                                                            >
                                                                {isActiveEventOpenToBet ? 'OPEN' : 'CLOSED'}
                                                            </Typography>
                                                        </div>
                                                    </Box>
                                                    {activeEventModel?.eventResult && (
                                                        <div className="678">
                                                            <Chip
                                                                sx={{
                                                                    width: '100%',
                                                                    padding: '2px',
                                                                    fontFamily: '"Poppins", sans-serif, Helvetica, Arial',
                                                                    fontWeight: '500',
                                                                    color: '#fff',
                                                                    background: 'rgba(84, 214, 44, 0.7)',
                                                                    border: '1px solid rgba(84, 214, 44, 0.7)'
                                                                    // margin: '4px',
                                                                }}
                                                                size="small"
                                                                variant="outlined"
                                                                label={`Winner: ${activeEventModel.eventResult === 'WINNER-1' ? 'X' : 'O'}`}
                                                                color="success"
                                                            />
                                                        </div>
                                                    )}
                                                    <Typography
                                                        sx={{
                                                            width: '100%',
                                                            lineHeight: '14px',
                                                            fontWeight: '400',
                                                            fontSize: '0.813rem',
                                                            fontFamily: 'Poppins',
                                                            marginTop: '0px- !important',
                                                            color: '#fff',
                                                            backgroundColor: alpha(theme.palette.secondary.main, 0.45),
                                                            padding: '8px',
                                                            borderRadius: '5px'
                                                        }}
                                                        variant="caption"
                                                        className="oddstext"
                                                    >
                                                        Odds will change based on betting activity
                                                    </Typography>

                                                    {isActiveEventOpenToBet && (
                                                        <>
                                                            {/* <StyledDividerDiv>&nbsp;</StyledDividerDiv> */}

                                                            <Typography
                                                                sx={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    lineHeight: '16px',
                                                                    marginTop: '0px !important',
                                                                    fontFamily: 'Poppins',
                                                                    color: '#fff'
                                                                }}
                                                                variant="caption"
                                                                className="racevs"
                                                            >
                                                                {/*{(activeEventModel?.activeRunners || '').split(',').length} */}
                                                                <span
                                                                    style={{
                                                                        fontFamily: 'Poppins',
                                                                        fontSize: '0.813rem',
                                                                        fontWeight: '500',
                                                                        color: '#fff'
                                                                    }}
                                                                >
                                                                    {activeEventModel.venueName}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        fontFamily: 'Poppins',
                                                                        fontSize: '0.813rem',
                                                                        fontWeight: '500',
                                                                        color: '#fff'
                                                                    }}
                                                                >
                                                                    {activeEventModel.name.replace('Race-', 'Event ')}
                                                                </span>
                                                            </Typography>
                                                            {/* <StyledDividerDiv>&nbsp;</StyledDividerDiv> */}
                                                            <Typography
                                                                sx={{
                                                                    width: '100%',
                                                                    fontFamily: 'Poppins',
                                                                    lineHeight: '16px',
                                                                    marginTop: '0px !important',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '4px',
                                                                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                                                                    paddingTop: '2px',
                                                                    color: '#fff'
                                                                }}
                                                                variant="caption"
                                                                className="starttime"
                                                            >
                                                                <TimeIconSvg />{' '}
                                                                <span
                                                                    style={{
                                                                        fontFamily: 'Poppins',
                                                                        fontSize: '0.875rem',
                                                                        fontWeight: '600',
                                                                        color: '#fff'
                                                                    }}
                                                                >
                                                                    {activeEventModel?.startTime || '-'}
                                                                </span>
                                                            </Typography>
                                                        </>
                                                    )}
                                                </Stack>
                                            </StyledRaceInfoButtonBase>
                                        </OpenCloseCard>
                                        <Grid item={true} xs={4} md={4}>
                                            <HorseBetButton
                                                type={BET_EVEN}
                                                odds={selectedToteModel?.odds ? selectedToteModel.odds['WIN-2'] : null}
                                                betAmountTotal={selectedToteModel?.amounts ? selectedToteModel.amounts['WIN-2'] : null}
                                                betAmount={numAmount}
                                                onClick={handlePlaceBet}
                                                disabled={!isActiveEventOpenToBet}
                                            />
                                        </Grid>
                                    </>
                                );
                            })(betAmount)}
                        </XOCard>
                    </Grid>
                </BorderCard>
                <Box
                    style={{
                        zIndex: 0,
                        position: isExpandedVideoStream ? 'relative' : 'relative',
                        overflow: 'hidden',
                        // flexGrow: 1,
                        width: '100%',
                        height: 'auto',
                        minHeight: 72
                    }}
                >
                    {activeStreamSource ? (
                        <VideoPlayer source={activeStreamSource} />
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {activeEventModel && (
                                <RaceVideo venueId={activeEventModel.programId.toString()} status={activeEventModel.eventStatus} />
                            )}
                            {activeEventModel?.programId === undefined ? <div className="messageview" style={{minHeight:'300px', justifyContent:'center',display:'flex', alignItems:'center', fontWeight:'600', maxWidth:'660px', width:'100%', border:`2px solid ${alpha(theme.palette.secondary.main, 0.95)}`,}}>No events available</div> : ''}
                        </div>
                    )}
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={1}
                        className="gameoddeven"
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 0,
                            width: '100%',
                            padding: '0px opx',
                            minHeight: '2rem'
                        }}
                    >
                        {/* <StyledRaceInfoButtonBase
                            onClick={handleOpenEventsClick}
                            aria-controls={Boolean(eventsAnchorEl) ? 'events-menu' : undefined}
                            aria-expanded={Boolean(eventsAnchorEl) ? 'true' : undefined}
                            aria-haspopup="true"
                            disabled={!sportEventModels?.length}
                            sx={{
                                width: 'auto',
                                minWidth: '80',
                                minHeight: '26px',
                                maxWidth: '660px',
                                backgroundColor: theme.palette.dark[800],
                                padding:'5px',
                                borderRadius:'5px',

                            }}
                            className="noeventlist"
                        >
                            <Stack direction="row" alignItems="center" spacing={1} className="12" sx={{ width: '100%' }}>
                                <Stack className="gameoddevenview 2323" sx={{display:'flex', flexDirection:'row'}}>
                                    <Stack className="eventsvgicon">{getDotSVG(isActiveEventOpenToBet)}</Stack>
                                    <Stack className="eventslist">
                                        {
                                            <Typography variant="caption" className="eventnametext" sx={{color:'#fff', fontWeight:'600'}}>
                                                {sportEventModels?.length
                                                    ? activeEventModel
                                                        ? `${activeEventModel.startTime} - ${activeEventModel.venueName
                                                        } - ${activeEventModel.name.replace('Race', 'Event')}`
                                                        : 'No active event'
                                                    : 'No available events'}
                                            </Typography>
                                        }
                                        {
                                            <Typography variant="caption" className="closebetview">
                                                {sportEventModels?.length
                                                    ? activeEventModel && activeEventModel.odds
                                                        ? `${activeEventModel.eventStatus === 'FINAL'
                                                            ? activeEventModel.eventResult === 'WINNER-1'
                                                                ? 'Winner :  X'
                                                                : 'Winner :  O'
                                                            : ''
                                                        } Closed at : X(${activeEventModel.odds['WIN-1'] || 0
                                                        }) , O(${activeEventModel.odds['WIN-2'] || 0}) `
                                                        : ''
                                                    : 'No available events'}
                                            </Typography>
                                        }
                                    </Stack>
                                </Stack>
                            </Stack>
                            <KeyboardArrowDown></KeyboardArrowDown>
                        </StyledRaceInfoButtonBase> */}
                        {/* {!isMobile &&
              <Fab
                size="small"
                color="info"
                aria-label="Expand video"
                onClick={() => setIsExpandedVideoStream(!isExpandedVideoStream)}
                style={{ padding: 8 }}
              >
                { isExpandedVideoStream ? <CollapseIconSvg /> : <ExpandIconSvg /> }
              </Fab>
            } */}
                    </Stack>
                </Box>
            </ScreenDiv>
            {stopBet && (
                <BetCloseEvent className="betcloseevent">
                    <BetCloseEventPopup className="betclosepopup">
                        <Stack
                            className="closbtn"
                            onClick={() => setStopBet(!stopBet)}
                            sx={{ cursor: 'pointer', position: 'absolute', right: '14px', top: '20px' }}
                        >
                            <CloseIcon></CloseIcon>
                        </Stack>
                        <Stack
                            className="closeicon"
                            sx={{
                                background: 'hsla(0, 0%, 100%, .06)',
                                border: '2px solid rgba(255, 97, 97, .3)',
                                borderRadius: '16px',
                                display: 'flex',
                                padding: '4px'
                            }}
                        >
                            <ClosePopSVG />
                        </Stack>

                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: '18px !important',
                                fontWeight: '700',
                                lineHeight: '26px',
                                paddingTop: '15px',
                                color: '#fff !important'
                            }}
                        >
                            {`${stopEventModel.venueName}`} - {stopEventModel.name.replace('Race-', 'Event ')}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: '18px !important',
                                fontWeight: '700',
                                lineHeight: '26px',
                                paddingBottom: '10px',
                                color: '#fff !important'
                            }}
                        >
                            Closed at
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '24px !important',
                                fontWeight: '700',
                                lineHeight: '26px',
                                color: '#fff !important'
                            }}
                        >
                            X : {win_one || 0} O : {win_two || 0}
                        </Typography>
                    </BetCloseEventPopup>
                </BetCloseEvent>
            )}
            {resultPopover && stopEventModel?.eventResult && (
                <BetCloseEvent className="betcloseevent">
                    <BetCloseEventPopupSucess className="betclosepopup betsucesspopup">
                        <img
                            style={{ height: '260px', position: 'absolute', top: '30px' }}
                            src="https://www.northalley.com/projects/arionplay/animation.gif"
                            alt=""
                        />
                        <Stack
                            className="closbtn"
                            onClick={() => setResultPopover(!resultPopover)}
                            sx={{
                                cursor: 'pointer',
                                position: 'absolute',
                                right: '14px',
                                top: '20px'
                            }}
                        >
                            <CloseIcon></CloseIcon>
                        </Stack>
                        <Stack className="croenicons">
                            {' '}
                            <CrownPopSVG />
                        </Stack>

                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: '16px !important',
                                fontWeight: '700',
                                lineHeight: '26px',
                                paddingTop: '15px',
                                color: '#fff !important'
                            }}
                        >
                            {`${stopEventModel.venueName}`} - {stopEventModel.name.replace('Race-', 'Event ')}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: '16px !important',
                                fontWeight: '700',
                                lineHeight: '26px',
                                paddingBottom: '15px',
                                color: '#fff !important'
                            }}
                        >
                            {stopEventModel.eventResult !== 'REFUND' && ` Winner is `}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '28px !important',
                                fontWeight: '700',
                                lineHeight: '26px',
                                color: '#fff !important'
                            }}
                        >
                            {stopEventModel.eventResult === 'WINNER-1' && ` X : ${win_one || 0}`}
                            {stopEventModel.eventResult === 'WINNER-2' && ` O : ${win_two || 0}`}
                            {stopEventModel.eventResult === 'REFUND' && ` TIE `}
                        </Typography>
                    </BetCloseEventPopupSucess>
                </BetCloseEvent>
            )}

            {betplacedPopover && (
                <div className="betcloseevent">
                    <div
                        style={{
                            background: 'none',
                            border: 'none',
                            backdropFilter: 'none'
                        }}
                        className="betclosepopup betsucesspopup"
                    >
                        <img src="https://static-web.fra1.cdn.digitaloceanspaces.com/arionplay/Arionplaybetplacedanimation.gif" alt="" />
                    </div>
                </div>
            )}

            <HorsesPopover anchorEl={horsesAnchorEl} handleClose={handleCloseRaceCards} runners={activeEventModel?.runners} />

            <SportEventsPopover
                anchorEl={eventsAnchorEl}
                handleClose={handleCloseEvents}
                sportEventModels={sportEventModels}
                activeEventId={activeEventModel?.id}
                isActiveEventOpenToBet={isActiveEventOpenToBet}
                onChangeEvent={onChangeEvent}
            />

            <SportEventsBetConfirmPopover raceBet={placeRaceBet} handleCancel={() => setPlaceRaceBet(null)} handleConfirm={handleSendBet} />
        </div>
    );
};

export default GameOddEven;
