// material-ui
import { styled, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// project-import
import { drawerWidth } from 'store/constant';

// types
import { MenuOrientation, ThemeMode } from 'types/config';

interface MainStyleProps {
    theme: Theme;
    open: boolean;
    menuOrientation: MenuOrientation;
    borderRadius: number;
}

// ==============================|| MAIN LAYOUT - STYLED ||============================== //

const MainContentStyled = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'borderRadius' && prop !== 'menuOrientation'
})(({ theme, open, menuOrientation, borderRadius }: MainStyleProps) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.grey[100],
    minWidth: '1%',
    width: '100%',
    //minHeight: 'calc(100vh - 54px)',
    flexGrow: 1,
    padding:'0px 0px 0px 0px',
    marginTop: 200,
    marginRight: 0,
    //backgroundColor: alpha(theme.palette.secondary.main, 0.55),
    backgroundColor:'#00000080',
    //backgroundColor:  theme.palette.dark[800],
    //backgroundColor:  theme.palette.dark.dark,
    // backgroundColor:'#f5f5f5',
   // backgroundColor:  theme.palette.dark.dark,
    //background:'#144E37',
    // borderRadius: `${borderRadius}px`,
    borderRadius:'0px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...(!open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter + 200
        }),
        [theme.breakpoints.up('md')]: {
            //marginLeft: menuOrientation === MenuOrientation.VERTICAL ? -(drawerWidth - 72) : 20,
            width: `calc(100% - ${drawerWidth}px)`,
            marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 210 : 54
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter + 200
        }),
       // marginLeft: menuOrientation === MenuOrientation.HORIZONTAL ? 20 : 0,
        marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 210 : 54,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.up('md')]: {
            marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 210 : 54
        }
    }),
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        padding: '0px 0px',
        marginTop: 120,
        ...(!open && {
            width: `calc(100% - ${drawerWidth}px)`
        })
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginRight: 0
    }
}));

export default MainContentStyled;
