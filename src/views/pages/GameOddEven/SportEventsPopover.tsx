import * as React from 'react';
// Mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useTheme } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {styled,  Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// Api
import { RaceEventType } from '../../../api/RacingCardApi';
import { Padding } from '@mui/icons-material';

const OpenToBet = styled(Chip)(({ theme }) => ({
    
    'span':{
        padding:'0px !important'
    }
   
    
}));

const TablistItems = styled(TabList)(({ theme }) => ({
    
    '.MuiTab-root':{
        color:'#fff'
    },
    '.Mui-selected':{
        color: alpha(theme.palette.secondary.main, 0.95),
    },
    '.MuiTabs-indicator':{
        background:alpha(theme.palette.secondary.main, 0.95),
    }
   
    
}));



type Props = {
    anchorEl: null | HTMLElement;
    sportEventModels: null | Array<RaceEventType>;
    activeEventId: null | string;
    isActiveEventOpenToBet: boolean;
    onChangeEvent: Function;
    // handleClick: (event: React.MouseEvent<HTMLElement) => void,
    handleClose: () => void;
};

export default function SportEventsPopover({
    anchorEl,
    sportEventModels,
    activeEventId,
    isActiveEventOpenToBet,
    onChangeEvent,
    handleClose
}: Props) {
    const open = Boolean(anchorEl);
    //const open = true;
    const theme = useTheme();
    const [value, setValue] = React.useState('1');

    const changeEvent = (event: any) => {
        onChangeEvent(event);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    console.log(sportEventModels, 'sportEventModels for socket');
    return (
        <Popover
            aria-labelledby="events-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            marginThreshold={28}
            className="333"
            // BackdropProps={{ invisible: false }}
            PaperProps={{
                elevation: 0,
                sx: {
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    paddingRight: '2px',
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    border: '1px solid #FFFFFF69',
                    //background: '#212B36',
                    // background:'linear-gradient(142deg, rgba(65, 69, 80, 0.80) 2.64%, rgba(32, 35, 43, 0.80) 96.27%)',
                    mt: 1,
                    // maxWidth:'400px',
                    // width:'350px',
                    [theme.breakpoints.up('lg')]: {
                        maxWidth: '350px',
                        width: '350px'
                    },
                    [theme.breakpoints.down('sm')]: {
                        maxWidth: '96%',
                        width: '100%',
                        left: '10px !important'
                    },
                    '& .MuiAvatar-root': {
                        width: 42,
                        height: 32,
                        ml: 0.5,
                        mr: 1
                    },
                    '&:before': {
                        content: '""',
                        borderTop: '1px solid #FFFFFF69',
                        borderLeft: '1px solid #FFFFFF69',
                        display: 'block',
                        position: 'absolute',
                        top: -1,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0
                    }
                }
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TablistItems onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Active" value="1" />
                        <Tab label="Results" value="2" sx={{
                            '.Mui-selected':{
                               color: '#ff0000',
                               background:'#ff0000 !important'
                            }
                        }} />
                    </TablistItems>
                </Box>
                <TabPanel value="1" sx={{ padding: '0px' }}>
                    <div style={{ overflow: 'hidden', maxWidth: '400px' }}>
                        <List
                            style={{
                                overflowY: 'auto',
                                maxHeight: 300,
                                maxWidth: 400,
                                padding: '0px'
                            }}
                            className="popoverview"
                        >
                            {(sportEventModels || [])
                                .filter((raceEvent: RaceEventType) => {
                                    return raceEvent.stopBetFlag === 'N' && raceEvent.currentFlag === 'Y';
                                })
                                .map((raceEvent: RaceEventType, index: number) => {
                                    //const openToBet = activeEventId === raceEvent.id && isActiveEventOpenToBet;
                                    const openToBet = raceEvent.stopBetFlag === 'N';
                                    const currentEvent = activeEventId;
                                    return (
                                        <ListItem
                                            sx={{
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                                //padding: '0px 12px 0px 8px'
                                            }}
                                            key={raceEvent.id}
                                            disablePadding={true}
                                            className={`${raceEvent.id == currentEvent ? 'currentRace' : ''}`}
                                            // style={{
                                            //   borderLeft: `3px solid ${openToBet ? theme.palette.success.main : 'transparent'}`,

                                            // }}
                                        >
                                            <ListItemButton sx={{ padding: '6px 10px', gap: '10px' }} className="eventlistview">
                                                <Stack
                                                    className="racestatuschange"
                                                    style={{
                                                        border: `2px solid ${openToBet ? theme.palette.success.main : '#FF6161'}`,
                                                        borderRadius: '100%',
                                                        position: 'relative',
                                                        display:'flex',
                                                        flexDirection:'column',
                                                        height: '14px',
                                                        width: '15px',
                                                        
                                                    }}
                                                >
                                                    <Stack
                                                        className="racestatuschangesub"
                                                        style={{
                                                            background: `${openToBet ? theme.palette.success.main : '#FF6161'}`,
                                                            height: '6px',
                                                            width: '6px',
                                                            borderRadius: '100%',
                                                            position: 'relative',
                                                            top: '2px',
                                                            left: '2px',
                                                        }}
                                                    ></Stack>
                                                </Stack>
                                                <Stack sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection:'row',
                                                }}>
                                                    {/* <div style={{border: `3px solid ${openToBet ? theme.palette.success.main : 'transparent'}`, height:'14px', width:'14px', borderRadius:'100%' }}></div> */}
                                                    <Stack direction="column" flexWrap="nowrap">
                                                        <Stack
                                                            style={{
                                                                width: '100%',
                                                                display: 'flex',
                                                                justifyContent:'flex-start',
                                                                alignItems: 'center',
                                                                gap: '5px',
                                                        flexDirection:'row',
                                                            }}
                                                            onClick={() => changeEvent(raceEvent)}
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
                                                            onClick={() => changeEvent(raceEvent)}
                                                        >
                                                            {openToBet && (
                                                                <OpenToBet
                                                                    sx={{
                                                                        width: 'auto',
                                                                        padding: '0px !important',
                                                                        marginTop: '0px',
                                                                        background: 'none',
                                                                        justifyContent: 'flex-start',
                                                                        border: '0px',
                                                                        fontWeight: '500',
                                                                        fontSize: '12px',
                                                                        color: '#fff !important',
                                                                        paddingLeft: '0px',
                                                                        height: 'auto',
                                                                        lineHeight: '16px'
                                                                    }}
                                                                    
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
                                                                Winner : {`${raceEvent.eventResult === 'WINNER-1' ? `X ` : `O`}`}
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
                                                </ Stack>
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                        </List>
                    </div>
                </TabPanel>
                <TabPanel value="2" sx={{ padding: '0px' }}>
                    <div style={{ overflow: 'hidden', maxWidth: '400px' }}>
                        <List
                            style={{
                                overflowY: 'auto',
                                maxHeight: 300,
                                maxWidth: 400,
                                
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
                                    const currentEvent = activeEventId;
                                    return (
                                        <ListItem
                                            sx={{
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                                // padding: '0px 12px 0px 8px'
                                            }}
                                            key={raceEvent.id}
                                            disablePadding={true}
                                            className={`${raceEvent.id == currentEvent ? 'currentRace' : ''}`}
                                            // style={{
                                            //   borderLeft: `3px solid ${openToBet ? theme.palette.success.main : 'transparent'}`,

                                            // }}
                                        >
                                            <ListItemButton sx={{ padding: '6px 10px', gap: '10px' }} className="eventlistview">
                                                <div
                                                    className="racestatuschange"
                                                    style={{
                                                        border: `2px solid ${openToBet ? theme.palette.success.main : '#FF6161'}`,
                                                        borderRadius: '100%',
                                                        position: 'relative',
                                                        height: '14px',
                                                        width: '14px',
                                                    }}
                                                >
                                                    <div
                                                        className="racestatuschangesub"
                                                        style={{
                                                            background: `${openToBet ? theme.palette.success.main : '#FF6161'}`,
                                                            height: '6px',
                                                            width: '6px',
                                                            borderRadius: '100%',
                                                            position: 'relative',
                                                            top: '2px',
                                                            left: '2px'
                                                        }}
                                                    ></div>
                                                </div>
                                                <div>
                                                    {/* <div style={{border: `3px solid ${openToBet ? theme.palette.success.main : 'transparent'}`, height:'14px', width:'14px', borderRadius:'100%' }}></div> */}
                                                    <Stack direction="column" flexWrap="nowrap">
                                                        <div
                                                            style={{
                                                                width: '100%',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                gap: '5px'
                                                            }}
                                                            onClick={() => changeEvent(raceEvent)}
                                                        >
                                                            {/* <div style={{border: `2px solid ${openToBet ? theme.palette.success.main : '#FF6161'}`, height:'14px', width:'14px', borderRadius:'100%' }}></div> */}
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '12px',
                                                                    fontWeight: '500',
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
                                                                    fontWeight: '500',
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
                                                                    fontWeight: '400',
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
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: '100%',
                                                                margin: '0px',
                                                                lineHeight: '16px'
                                                            }}
                                                            onClick={() => changeEvent(raceEvent)}
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
                                                                        fontWeight: '500',
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
                                                        </div>
                                                    </Stack>
                                                    {raceEvent.eventResult && (
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
                                                </div>
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                        </List>
                    </div>
                </TabPanel>
            </TabContext>
        </Popover>
    );
}
