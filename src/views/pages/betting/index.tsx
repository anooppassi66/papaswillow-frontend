import React, { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import RaceInfo from './raceinfo';
import RaceVideo from './video';
import RunnerInfo from './runner';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'store';
import { getRacingData } from 'store/slices/racecard';
import RacingService from '../../../services/RacingService';
import { Link, useLocation, useParams } from 'react-router-dom';
import Sockets from 'services/SocketService';
import { updateModelAttributes } from 'services/SocketModelUpdate';
import BetTypeText from './bettype';
import { HelpTextSvg } from 'assets/svg';
import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

interface HorseRacing {
    theme: Theme;
}

const HelpTextView = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down(1023)]: {
        display: 'none',
      },
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    ul: {
        display: 'flex',
        width: '100%',
        gap: '10px',
        paddingTop: '15px',
        a: {
            alignTtems: 'center',
            display: 'flex',
            flexDirection: 'column',
            textDecoration: 'none',
            color: '#fff'
        },
        p: {
            fontSize: '12px',
            textDecoration: 'none',
            color: '#fff',
            textAlign: 'center'
        }
    }
}));

const HorseRacing = styled(Box)(({ theme }: HorseRacing) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    // background: '#1A654A',
    // backgroundColor:  '#ff0000',
    borderRadius: '0px',
    padding: '10px',
    '.custom-checkbox label': {
        fontSize: '13px',
        color: '#fcfcfc',
        '&:before': {
            transition: 'background-color 0.15s ease-in-out',
            //   border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            position: 'absolute',
            top: '44%',
            transform: 'translateY(-50%)',
            left: '-16px',
            display: 'block',
            width: '15px',
            height: '15px',
            //pointer-events: none;
            //   content: '',
            //background-color: ${themeGet('colors.btnfontcolor')};
            border: '1px solid #ff0000',
            borderRadius: '0.25rem'
        }
        // '&:after ':{
        //   position: 'absolute',
        //   top: '47%',
        //   transform: 'translateY(-50%)',
        //   left: '-13px',
        //   display: 'block',
        //   width: '9px',
        //   height: '10px',
        //   content: '';
        //   // background: ${themeGet('colors.btnfontcolor')};
        //   backgroundRepeat: 'no-repeat',
        //   backgroundSize: '100%',
        // }
    },
    '.horseracingview': {
        height: '100%',
        display: 'flex',
        position: 'relative',
        //padding: '15px 16px 0px 16px',
        gap: '20px'
        // background: '#121212',
    },
    '.racingContainerleft': {
        width: '100%',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column'
    },
    '.racingcontainerright': {
        width: '100%',
        display: 'flex',
        position: 'relative',
        color: '#fff',

        // background: ${themeGet('colors.tableheaderbg')};
        borderRadius: '10px 10px 0px 0px',
        border: '1px solid',
        padding: '0px 0px',
        borderColor: alpha(theme.palette.secondary.main, 0.5)
    }
}));

interface IRunner {
    runnerId: number;
    jockey_name: string;
    name: string;
    trainer_name: string;
    position: number;
    scratched: string;
}

interface IPool {
    name: string;
    shortDesc: string;
    type: string;
    unitBet: string;
    code: string;
}

interface IPoolResults {
    name: string;
    dividend: string;
    tickets: string;
    winner: string;
}

const Betting = () => {
    let { rId, rNumber, racingType } = useParams();
    const [venueId, setVenueId] = useState(null);
    const [raceNumber, setRaceNumber] = useState(0);
    const [totalRaces, setTotalRaces] = useState(0);
    const [betType, setBetType] = useState<any>(racingType);
    const [currentRaceNumber, setCurrentRaceNumber] = useState(1);
    const [displayVideo, setDisplayVideo] = useState(false);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const pathname = location.pathname;
    //const [betTypePopup, setBetTypePopup] = useState('betExplanation');
    const [betTypePopup, setBetTypePopup] = useState('');
    const [deviceType, setDeviceType] = useState('desktop');
    const [currentRaceInfo, setCurrentRaceInfo] = useState<{
        programId: number;
        venueName: string;
        venueCode: string;
        raceNumber: number;
        betType: string;
        raceName: string;
        distance: string;
        raceTime: string;
        raceStatus: string;
        runners: IRunner[];
        poolsActive: IPool[];
        poolResults: IPoolResults[];
        isSuspended: string;
    }>({
        raceStatus: '',
        programId: 0,
        raceNumber: 0,
        betType: 'tote',
        raceName: '',
        raceTime: '',
        venueName: '',
        venueCode: '',
        distance: '',
        runners: [],
        poolsActive: [],
        poolResults: [],
        isSuspended: 'Y'
    });
    const theme = useTheme();
    const { isLoading, isError, errorMessage, isSuccess, raceCardChange } = useAppSelector((state: any) => state.raceinfo);

    useEffect(() => {
        const path = pathname.replace(/^\/|\/$/g, '');
        const raceId = path.split('/');
        if (raceId.length > 2) {
            setCurrentRaceNumber(parseInt(raceId[2]));
        }
        // if (raceId) {
        Sockets.setSocketForUser(raceId[1], updateModelAttributes);
        dispatch(getRacingData(raceId[1]));
        // }
    }, [rNumber]);

    useEffect(() => {
        console.log(isSuccess, 'isSuccess');
        if (isSuccess) {
            renderRaceCard();
        }
    }, [isSuccess]);

    useEffect(() => {
        renderRaceCard();
    }, [raceCardChange]);

    const renderRaceCard = async () => {
        changeRaceNumber();
    };

    const changeRaceNumber = async () => {
        let raceObject: any = await RacingService.getLocalRaceData();
        const path = pathname.replace(/^\/|\/$/g, '');
        const raceId = path.split('/');
        raceObject = JSON.parse(raceObject);
        const data = raceObject.details;
        const race = currentRaceNumber - 1;
        setVenueId(data[race].raceCardId);

        if (raceId.length > 2) {
            setRaceNumber(parseInt(raceId[2]));
        } else {
            setRaceNumber(data[race].raceNumber);
        }

        setTotalRaces(data.length);
        setCurrentRaceInfo({
            programId: data[race].raceCardId,
            venueCode: data[race].vCode,
            venueName: data[race].vName,
            raceNumber: data[race].raceNumber,
            raceTime: data[race].raceTime,
            raceName: data[race].name,
            distance: data[race].length,
            raceStatus: data[race].status,
            runners: data[race].runners,
            poolsActive: data[race].poolsActive,
            poolResults: data[race].poolResults,
            isSuspended: data[race].isSuspended,
            betType: betType
        });
    };

    const setBetTypeFn = (data: any) => {
        const bType = {
            betType: data
        };
        setBetType(data);
        setCurrentRaceInfo({ ...currentRaceInfo, ...bType });
    };

    const openBetTypePopup = (val: any) => {
        setBetTypePopup(val);
    };

    const closePopup = () => {
        setBetTypePopup('');
    };

    const changeRace = (type: string) => {
        let currentNumber = currentRaceNumber;
        if (type === 'prev') {
            if (currentRaceNumber > 1) {
                currentNumber = currentRaceNumber - 1;
            }
        } else {
            if (currentRaceNumber < totalRaces) {
                currentNumber = currentRaceNumber + 1;
            }
        }
        setTimeout(() => {
            navigate(`/racing/${venueId}/${currentNumber}/${betType}`);
        }, 100);
    };

    const shifttRace = (id: number) => {
        setTimeout(() => {
            navigate(`/racing/${venueId}/${id}/${betType}`);
        }, 100);
    };

    const showVideo = () => {
        setDisplayVideo(!displayVideo);
    };

    useEffect(() => {
        if (currentRaceNumber) changeRaceNumber();
    }, [currentRaceNumber]);

    const isMobile = () => {
        const { innerWidth: width } = window;
        if (innerWidth > 1024) {
            setDeviceType('desktop');
        } else {
            setDeviceType('mobile');
        }
    };

    useEffect(() => {
        function handleResize() {
            console.log('RESIZE=====');
            isMobile();
        }
        window.addEventListener('resize', handleResize);
    });

    useEffect(() => {
        isMobile();
    }, []);
console.log('theme.breakpoints',theme);
    return (
        <>
            <HorseRacing>
                <Grid className="horseracingview"
                 sx={{
                    [theme.breakpoints.down(1024)]: {
                        flexDirection: 'column',
                        gap: '0px',
                       
                    },
                 }}
                >
                    <Grid className="racingContainerleft">
                        <Grid>
                            <RaceInfo
                                totalRaces={totalRaces}
                                currentRaceInfo={currentRaceInfo}
                                parentChangeRaceNumberFn={shifttRace}
                                parentChangeRaceFn={changeRace}
                                parentChangeBetTypeFn={setBetTypeFn}
                                betType={betType}
                                currentRaceNumber={currentRaceNumber}
                                parentDisplayVideoFn={showVideo}
                                displayVideo={displayVideo}
                            />
                        </Grid>
                        <Grid>
                            {displayVideo && deviceType === 'mobile' && (
                                <div className="racevideoview">
                                    <RaceVideo venueId={venueId} status={undefined} />
                                </div>
                            )}
                            {deviceType === 'desktop' && (
                                <div className="racevideoview">
                                    <RaceVideo venueId={venueId} status={undefined} />
                                </div>
                            )}
                            <Grid>
                                <Stack
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        padding: '8px 0px',
                                        [theme.breakpoints.down(1023)]: {
                                            display: 'none',
                                          },
                                    }}
                                >
                                    <h4 style={{ fontSize: '16px', color: '#fff', margin: '0px' }}>Help</h4>
                                    <Link
                                        style={{
                                            fontSize: '14px',
                                            color: alpha(theme.palette.secondary.main, 1),
                                            textDecoration: 'none',
                                            fontWeight: '600'
                                        }}
                                        to="/faqs"
                                    >
                                        View all
                                    </Link>
                                </Stack>
                                <HelpTextView>
                                    <List sx={{ display: 'flex', listStyle: 'none', justifyContent: 'center' }}>
                                        <ListItemButton
                                            className={`${betTypePopup === 'betExplanation' ? 'active' : ''}`}
                                            sx={{
                                                marginRight: '0px',
                                                backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                                borderRadius: '10px',
                                                borderColor: alpha(theme.palette.secondary.main, 0.95),
                                                width: '100%',
                                                justifyContent: 'center',
                                                ':hover': {
                                                    backgroundColor: alpha(theme.palette.secondary.main, 0.25)
                                                }
                                            }}
                                        >
                                            <Link
                                                style={{ alignItems: 'center' }}
                                                to={''}
                                                onClick={() => openBetTypePopup('betExplanation')}
                                            >
                                                <HelpTextSvg />
                                                <p>Bet Types explanations.</p>
                                            </Link>
                                        </ListItemButton>
                                        <ListItemButton
                                            className={`${betTypePopup === 'howToBet' ? 'active' : ''}`}
                                            sx={{
                                                marginRight: '0px',
                                                backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                                borderRadius: '10px',
                                                borderColor: alpha(theme.palette.secondary.main, 0.95),
                                                width: '100%',
                                                justifyContent: 'center',
                                                ':hover': {
                                                    backgroundColor: alpha(theme.palette.secondary.main, 0.25)
                                                }
                                            }}
                                        >
                                            <Link style={{ alignItems: 'center' }} to={''} onClick={() => openBetTypePopup('howToBet')}>
                                                <HelpTextSvg />
                                                <p>How to Bet ?</p>
                                            </Link>
                                        </ListItemButton>
                                        <ListItemButton
                                            className={`${betTypePopup === 'depositWithdraw' ? 'active' : ''}`}
                                            sx={{
                                                marginRight: '0px',
                                                backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                                borderRadius: '10px',
                                                borderColor: alpha(theme.palette.secondary.main, 0.95),
                                                width: '100%',
                                                justifyContent: 'center',
                                                ':hover': {
                                                    backgroundColor: alpha(theme.palette.secondary.main, 0.25)
                                                }
                                            }}
                                        >
                                            <Link
                                                style={{ alignItems: 'center' }}
                                                to={''}
                                                onClick={() => openBetTypePopup('depositWithdraw')}
                                            >
                                                <HelpTextSvg />
                                                <p>
                                                    How to Deposit and
                                                    <br /> Withdraw ?
                                                </p>
                                            </Link>
                                        </ListItemButton>
                                    </List>
                                </HelpTextView>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="racingcontainerright">
                        {venueId && <RunnerInfo {...currentRaceInfo} />}
                        {betTypePopup !== '' && <BetTypeText betTypePopup={betTypePopup} closePopup={closePopup} />}
                    </Grid>
                </Grid>
            </HorseRacing>
        </>
    );
};

export default Betting;
