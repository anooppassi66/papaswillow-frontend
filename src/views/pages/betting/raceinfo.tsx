import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RaceArrowLeftIconSvg, RaceArrowRightIconSvg, RaceDownArrowIconSvg, LiveVideoIconSvg, StopVideoIconSvg } from 'assets/svg';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { BorderColor } from '@mui/icons-material';



interface RacingNumber {
    theme: Theme;
}

const RaceTimeView = styled(Grid)(({ theme }) => ({
    width: '100%',
    padding: '0px 0px 10px 0px',
    display: 'flex',
    alignItems:'center',
    '.time_info':{
        border:`1px solid ${alpha(theme.palette.secondary.main, 0.95)}`,
        color: '#fff',
        fontFamily: 'Poppins',
        fontWeight:'500',
        fontSize: '12px',
        padding: '0px 12px',
        lineHeight: '28px',
        marginRight: '10px',
        borderRadius: '20px',
        height: '27px',
        display:'flex',
        alignItems:'center',
    },

    '.racecard_text ':{
        [theme.breakpoints.down(1023)]: {
            display: 'none ',
        },
        padding: '0px 10px',
        fontSize: '13px',
        cursor: 'pointer',
        backgroundColor: alpha(theme.palette.secondary.main, 0.95),
        // border: '1px solid #2f3847',
        borderRadius: '10px',
        color: '#fff',
        height: '27px',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Poppins',
        fontWeight:'500',
    },
    '.odds_text': {
        [theme.breakpoints.down(1023)]: {
            display: 'none ',
        },
        padding: '0px 10px',
        fontSize: '13px',
        fontFamily: 'Poppins',
        fontWeight:'500',
        cursor: 'pointer',
        borderRadius: '10px',
        color: '#fff',
        height: '27px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px',
        backgroundColor: alpha(theme.palette.secondary.main, 0.95),
    },
    '.race_no': {
        fontSize: '16px',
        color: alpha(theme.palette.secondary.main, 0.95),
        fontFamily: 'Poppins',
        fontWeight:'600',
        lineHeight: '27px',
        paddingLeft: '6px',
        paddingRight: '12px',
        cursor: 'pointer',
    },
    '.race_place': {
        [theme.breakpoints.down(1023)]: {
            width: '90px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            marginRight: '5px',
        },
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight:'500',
        lineHeight: '27px',
        marginRight: '6px',
        color: '#c2c9d6',
    },


}));

const RacingNumber = styled(Box)(({ theme }: RacingNumber) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    // background: '#1A654A',
    // backgroundColor:  theme.palette.dark[800],
    // borderRadius: '0px',
    // padding: '0px !important',
    '.MuiListItemButton-root':{
        padding:'0px',
        ':hover':{
            background:'none',
        }
    },
    'a':{
        width: '42px',
        height: '42px',
        borderRadius: '100%',
        lineHeight: '40px',
        // background: '#121212',
        border: '1px solid #2f3847',
        display: 'flex',
        justifyContent: 'center',
        color: '#fff',
        textdecoration:'none',
        borderColor:alpha(theme.palette.secondary.main, 0.95),
        fontWeight: '700',
        fontSize:'16px',
        textDecoration:'none',
    },
    '.active':{
        backgroundColor: alpha(theme.palette.secondary.main, 0.95),
        fontWeight: '700',
        fontSize:'16px',
        textDecoration:'none',
    },
    '.MuiTouchRipple-root':{
        width: '42px',
        height: '42px',
        borderRadius: '100%',
        lineHeight: '40px',
        display: 'flex',
        justifyContent: 'center',
        // borderColor:alpha(theme.palette.secondary.main, 0.95),
        border:`2px solid ${alpha(theme.palette.secondary.main, 0.95)}`,
        fontWeight: '700',
        textDecoration:'none',
        
    },
}));

const FixedToteButton = styled(Box)(({ theme }) => ({
    height: '56px',
    position: 'absolute',
    right: '1px',
    top: '24px',
    width: '150px',
   

   'ul': {
        backgroundColor:  theme.palette.dark[800],
        // border: '1px solid #232935',
        borderRadius: '0px',
        height: '50px',
        padding: '6px',
        width: '100%',
        display: 'flex',
        listStyle: 'none',

    '.active button': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.95),
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0px',
        color: '#ffffff',
        fontSize: '12px',
        height: '38px',
        width: '68px',
        fontWeight:'700',
    },
    'li button': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.15),
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0px',
        color: '#ffffff',
        fontSize: '12px',
        border: 'none',
        height: '38px',
        width: '68px',
        fontWeight:'700',
        justifyContent:'center',
    },
    },


}));


const MobileRaceName = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down(1023)]: {
        display: 'flex',
      },
    display: 'none',
    listStyle: 'none',
    gap: '10px',
    paddingTop: '10px',
    'ul':{
        display: 'flex',
    listStyle: 'none',
    width:'100%',
    padding:'0px',
    margin:'0px',
    
    },
    'li':{
        padding:'0px',
        margin:'0px',
    }
}));

const MobileInfo = styled(Grid)(({ theme }) => ({
    
    [theme.breakpoints.down(1023)]: {
        display: 'flex',
      },

    display: 'none',
    listStyle: 'none',
    gap: '10px',
    paddingTop: '10px',
    width:'100%',
    
    'ul':{
        display: 'flex',
    listStyle: 'none',
    width:'100%',
    padding:'0px',
    margin:'0px',
    gap:'10px',
    },
    'li':{
        display: 'flex',
        backgroundColor: alpha(theme.palette.secondary.main, 0.45),
        border: `1px solid ${alpha(theme.palette.secondary.main, 1)}`,
        width: 'calc(100% / 3)',
        justifyContent: 'center',
        borderRadius: '10px',
   
        'a':{
            padding: '8px 10px',
            color: '#fff',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            width: '100%',
            textAlign: 'center',
        }
    },
    '.livevideo':{
        background: 'none',
        border: `1px solid ${alpha(theme.palette.secondary.main, 1)}`,
    },
}));

const MobileviewRacenext = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down(1023)]: {
        display: 'flex',
      },
    display: 'none',
    listStyle: 'none',
    
    'ul':{
        display: 'flex',
    listStyle: 'none',
    width:'100%',
    padding:'0px',
    margin:'0px',
    gap: '15px',
    
    },
    'li':{
        backgroundColor: alpha(theme.palette.secondary.main, 1),
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        'a':{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
}));






interface RaceInfoProps {
    currentRaceInfo: any; // Replace `any` with the specific type if available
    currentRaceNumber: number;
    parentChangeRaceFn: (raceNumber: any) => void;
    parentDisplayVideoFn: () => void;
    displayVideo: boolean;
    betType: string;
    parentChangeBetTypeFn: (betType: string) => void;
    totalRaces: number;
    parentChangeRaceNumberFn: (raceNumber: number) => void;
}

const RaceInfo = ({
    currentRaceInfo,
    currentRaceNumber,
    parentChangeRaceFn,
    parentDisplayVideoFn,
    displayVideo,
    betType,
    parentChangeBetTypeFn,
    totalRaces,
    parentChangeRaceNumberFn
}: RaceInfoProps) => {
    const theme = useTheme();
    return (
        <>
            <RaceTimeView>
                <span className="time_info" style={{color:'#fff', fontWeight:'600'}}>{currentRaceInfo.raceTime}</span>
                <span className="race_place" style={{color:'#fff', fontWeight:'600'}}>{currentRaceInfo.venueName}</span>
                <span className="racelistpopup">
                    <Link to="" style={{display:'flex', alignItems:'center'}}>
                        <RaceDownArrowIconSvg />{' '}
                    </Link>{' '}
                </span>
                <span className="race_no">Race {currentRaceNumber}</span>
                <span className="racecard_text">Info & Tips</span>
                <span className="odds_text">Odds</span>
                <MobileviewRacenext>
                <ul className="mobileviewracenext" >
                    <li>
                        <Link to={''} onClick={() => parentChangeRaceFn('prev')}>
                            <RaceArrowLeftIconSvg />
                        </Link>
                    </li>
                    <li>
                        <Link to={''} onClick={() => parentChangeRaceFn('next')}>
                            <RaceArrowRightIconSvg />
                        </Link>
                    </li>
                </ul>
                </MobileviewRacenext>
            </RaceTimeView>
            <MobileRaceName >
                <Stack className="mobileracenameinfo">
                    <ul style={{ 
                        display: 'flex',
                        listStyle: 'none',
                        gap: '10px',
                        paddingTop: '10px',
                        }}>
                        <li>
                            <span className="race_name" style={{color:'#fff', fontWeight:'500'}}>{currentRaceInfo.raceName}</span>
                            <span className="race_details_info">{currentRaceInfo.distance} M</span>
                        </li>
                    </ul>
                </Stack>
            </MobileRaceName>
            <MobileInfo >
                <ul>
                    <li>
                        <Link to="/">Info & Tips</Link>
                    </li>
                    <li>
                        <Link to="/">Odds</Link>
                    </li>
                    <li className="livevideo">
                        <Link to={''} onClick={() => parentDisplayVideoFn()}>
                            {displayVideo ? (
                                <>
                                    <StopVideoIconSvg /> STOP
                                </>
                            ) : (
                                <>
                                    <LiveVideoIconSvg /> LIVE
                                </>
                            )}
                        </Link>
                    </li>
                </ul>
            </MobileInfo>
            {/* <FixedToteButton>
                <div className="fixedtotebutton ">
                    <ul>
                        <li className={`${betType === 'tote' ? 'active' : ''}`}>
                            <button onClick={() => parentChangeBetTypeFn('tote')}>TOTE</button>
                        </li>
                        <li className={`${betType === 'fixed' ? 'active' : ''}`}>
                            <button onClick={() => parentChangeBetTypeFn('fixed')}>FIXED</button>
                        </li>
                    </ul>
                </div>
            </FixedToteButton> */}
            <Grid sx={{display:'flex', fontSize:'14px', lineHeight:'18px', marginBottom:'15px', [theme.breakpoints.down(1023)]: {
                    display: 'none ',
                },}}>
                <ul style={{listStyle:'none', padding:'0px', margin:'0px',
                

                }}>
                    <li>
                        <span style={{color:'#fff', fontWeight:'500'}} title={`${currentRaceInfo.raceName}`} className="race_name">
                            {currentRaceInfo.raceName}
                        </span>
                        <span style={{color: theme.palette.secondary.main, fontWeight:'900', borderLeft:'1px solid #fff', marginLeft:'10px', paddingLeft:'10px'}} className="race_details_info">{currentRaceInfo.distance} M</span>
                    </li>
                </ul>
            </Grid>
            <RacingNumber sx={{ display:'flex', marginBottom:'15px', padding:'10px 0px', borderBottom:`1px solid ${alpha(theme.palette.secondary.main, 0.55)}`, borderTop:`1px solid ${alpha(theme.palette.secondary.main, 0.55)}`, [theme.breakpoints.down(1023)]: {
                    display: 'none ',
                }, }}>
                <h4 style={{margin:'0px', display:'flex', alignItems:'center'}}>Race</h4>
                <List sx={{display:'flex', listStyle:'none', marginLeft:'10px', padding:'0px'}}>
                    {[...Array(totalRaces)].map((value: undefined, index: number) => (
                        <ListItemButton key={index} sx={{ marginRight:'10px'}}>
                            <Link style={{}}
                                to={''}
                                className={`${currentRaceNumber === index + 1 ? 'active' : ''}`}
                                onClick={() => parentChangeRaceNumberFn(index + 1)}
                            >
                                {index + 1}
                            </Link>
                        </ListItemButton>
                    ))}
                </List>
            </RacingNumber>
        </>
    );
};

export default RaceInfo;
