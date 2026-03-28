import React, { ReactElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Stack from '@mui/material/Stack';
import { styled, Theme } from '@mui/material/styles';

// project imports
import MenuList from './MenuList';
import useConfig from 'hooks/useConfig';

// types
import { ThemeMode } from 'types/config';

// ==============================|| HORIZONTAL MENU LIST ||============================== //

interface ElevationScrollProps {
    children: ReactElement;
    window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
    const theme = useTheme();

    /**
     * Note that you normally won't need to set the window ref as useScrollTrigger will default to window.
     * This is only being set here because the demo is in an iframe.
     */
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window!
    });

    theme.shadows[4] = theme.customShadows.z1;

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

 
// ==============================|| HORIZONTAL MENU LIST ||============================== //

const HorizontalBar = () => {
    const { mode, container } = useConfig();

    return (
        <ElevationScroll>
            <Stack
                sx={{
                    top: 156,
                   // bgcolor: mode === ThemeMode.DARK ? 'background.default' : 'background.paper',
                    background:'#f89b35',
                    width: '100%',
                    height: 52,
                    justifyContent: 'center',
                    //borderTop: '1px solid',
                    borderColor: mode === ThemeMode.DARK ? 'background.paper' : 'grey.300',
                    zIndex: 1098,
                    position:'absolute'
                }}
            >
                <Container className='menubar newmenubar' maxWidth={container ? 'lg' : false}>
                    <Box sx={{ display: 'flex', alignItems: 'center',  }}>
                        <MenuList />
                    </Box>
                </Container>
            </Stack>
        </ElevationScroll>
    );
};

export default HorizontalBar;
