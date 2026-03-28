import { memo, useMemo } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';
import Chip from 'ui-component/extended/Chip';

import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// types
import { MenuOrientation } from 'types/config';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = () => {
    const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster.isDashboardDrawerOpened;

    const { menuOrientation, miniDrawer } = useConfig();

    const logo = useMemo(
        () => (
            <Box sx={{ display: 'flex', p: 0 ,pl:'15px', height:'85px', background:'#000',
            // background:'#1A654A'
            }}>
                <LogoSection />
            </Box>
        ),
        []
    );

    const drawer = useMemo(() => {
        const isVerticalOpen = menuOrientation === MenuOrientation.VERTICAL && drawerOpen;
        const drawerContent = (
            <Stack direction="row" justifyContent="center" sx={{ mb: 2, position: 'absolute', bottom: '0px', width: '100%',  }}>
                <Chip
                    label={import.meta.env.VITE_APP_VERSION}
                    disabled
                    chipcolor="secondary"
                    size="small"
                    style={{ width: '100%' }}
                    sx={{ cursor: 'pointer' }}
                />
            </Stack>
        );

        let drawerSX = { paddingLeft: '0px', paddingRight: '0px', marginTop: '20px',  };
        if (drawerOpen) drawerSX = { paddingLeft: '10px', paddingRight: '5px', marginTop: '0px',  };

        return (
            <>
                {downMD ? (
                    <Box sx={drawerSX} >
                        <MenuList />
                        {/* {isVerticalOpen && drawerContent} */}
                    </Box>
                ) : (
                    <PerfectScrollbar className='menulist' style={{   height: '100%', ...drawerSX,  }}>
                        <MenuList  />
                        {/* {isVerticalOpen && drawerContent} */}
                    </PerfectScrollbar>
                )}
            </>
        );
    }, [downMD, drawerOpen, menuOrientation]);

    return (
        <Box className='343434' component="nav" sx={{ flexShrink: { md: 0 }, width: { xs: 'auto', md: drawerWidth } }} aria-label="mailbox folders">
            {downMD || (miniDrawer && drawerOpen) ? (
                <Drawer
                    variant={downMD ? 'temporary' : 'persistent'}
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => handlerDrawerOpen(!drawerOpen)}
                    sx={{
                        // background:'#ff0',
                        
                        '& .MuiDrawer-paper': {
                            mt: downMD ? 0 : 11,
                            zIndex: 1099,
                            width: drawerWidth,
                            background:'#f89b35',
                            bgcolor:'#f89b35',
                            //bgcolor: 'background.default',
                            color: 'text.primary',
                            borderRight: 'none',
                            // background:'#144F37',
                            // backgroundColor:  theme.palette.dark[800],
                        }
                    }}
                    ModalProps={{ keepMounted: true }}
                    color="inherit"
                >
                    {downMD && logo}
                    {drawer}
                </Drawer>
            ) : (
                <MiniDrawerStyled variant="permanent" open={drawerOpen}>
                    {logo}
                    {drawer}
                </MiniDrawerStyled>
            )}
        </Box>
    );
};

export default memo(Sidebar);
