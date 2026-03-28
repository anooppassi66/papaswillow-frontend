import * as React from 'react';
// Mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// Api
import { EventRunnerType } from 'api/RacingCardApi';
// utils

type Props = {
    anchorEl: null | HTMLElement;
    runners: null | undefined | Array<EventRunnerType>;
    // handleClick: (event: React.MouseEvent<HTMLElement) => void,
    handleClose: () => void;
};

export default function SportEventsMenu({ anchorEl, runners, handleClose }: Props) {
    const open = Boolean(anchorEl);
    const theme = useTheme();
    return (
        <Popover
            aria-labelledby="race-cards-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            marginThreshold={48}
            // BackdropProps={{ invisible: false }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    border: '1px solid #FFFFFF69',
                    padding: 1,
                    mt: -1,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                    },
                    '&:before': {
                        content: '""',
                        borderBottom: '1px solid #FFFFFF69',
                        borderRight: '1px solid #FFFFFF69',
                        display: 'block',
                        position: 'absolute',
                        bottom: -1,
                        right: 'calc(50% - 5px)',
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(50%) rotate(45deg)',
                        zIndex: 0
                    }
                }
            }}
            transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <div>
                {(runners || []).map((runner: EventRunnerType, i: number) => {
                    const index = i + 1;
                    const c = index % 2 ? '#ff0000' : 'blue';
                    // Horse statistics, Position of the last runs.
                    let stats: null | Array<number> = null;
                    if (runner?.stats && typeof runner.stats === 'string') {
                        stats = String(runner.stats)
                            .split('-')
                            .map((c: string) => Number(c));
                    }
                    return (
                        <Grid key={index} item={true} xs={4} md={2}>
                            <div
                                style={{
                                    position: 'relative',
                                    border: `1px solid ${c}`,
                                    padding: 12,
                                    borderRadius: 6,
                                    height: '100%'
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    style={{
                                        backgroundColor: '#00000033',
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        textAlign: 'center',
                                        minWidth: 22,
                                        borderLeft: `1px solid ${c}`,
                                        borderBottom: `1px solid ${c}`,
                                        borderBottomLeftRadius: 6,
                                        borderTopRightRadius: 6
                                    }}
                                >
                                    {index}
                                </Typography>
                                <Typography variant="subtitle2">{runner.horseName}</Typography>
                                <Typography variant="caption">{runner.jockeyName}</Typography>
                            </div>
                        </Grid>
                    );
                })}
            </div>
        </Popover>
    );
}
