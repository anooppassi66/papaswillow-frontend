import { useEffect, useRef, useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets

import useConfig from 'hooks/useConfig';


// types
import { I18n, ThemeMode } from 'types/config';
import Login from 'views/pages/authentication/Login3';
import { FormattedMessage } from 'react-intl';
import useAuth from 'hooks/useAuth';
import Dialog from '@mui/material/Dialog';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

// ==============================|| LOCALIZATION ||============================== //

const LoginMobile = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: { width: '20px' }
}));

const LoginSection = ({ loginForceOpen, forceOpen }: { loginForceOpen: boolean; forceOpen: Function }) => {
    const { mode, borderRadius, i18n, onChangeLocale } = useConfig();
    const { forceLogin } = useAuth();
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    // debugger;
    const [open, setOpen] = useState(loginForceOpen || false);
    const anchorRef = useRef<any>(null);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined,
        lng: I18n
    ) => {
        onChangeLocale(lng);
        setOpen(false);
    };

    const forceOpenFn = (type: string) => {
        forceOpen(type);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        forceLogin(false);
        forceOpen('close');
        setOpen(false);
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        // debugger;
        if (loginForceOpen) setOpen(true);
    }, [loginForceOpen]);

    console.log(open, 'force login');

    return (
        <>
            <Box sx={{ ml: { xs: 1, sm: 2 }, mr: { xs: 0, sm: 0 }, position: 'relative' }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        // border: '1px solid',
                        // borderColor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                        borderRadius: '0px',
                        // backgroundColor: '#fff',
                        //backgroundColor: theme.palette.secondary.main,
                        // bgcolor: '#08B579',
                        background: '#f89b35',
                        color: '#000',
                        transition: 'all .2s ease-in-out',
                        cursor: 'pointer',
                        padding: '0px 10px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        fontFamily: 'Poppins',
                        width: '80px',
                        ':hover': {
                            background: '#f89b35',
                            color: '#000'
                        },

                        [theme.breakpoints.down('sm')]: {
                            // fontSize: '0.675rem',
                            // fontWeight: '600',
                            // height: '30px',
                            // padding: '0px 5px'
                        },
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: '#ffb001',
                            bgcolor: '#ffb001',
                            color: '#000'
                        },
                        '@media (max-width: 600px)': {
                            // width: '30px'
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    alt="language"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <Box >
                        <FormattedMessage id="Login" />
                    </Box>
                    {/* <LoginMobile className="loginmobile" sx={{ display: { xs: 'block', md: 'none' } }}>
                        <IconLogin />
                    </LoginMobile> */}
                </Avatar>
            </Box>

            <Popper
                placement={downMD ? 'bottom-start' : 'bottom'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                sx={{}}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [downMD ? 0 : 0, 20]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions position={downMD ? 'top-left' : 'top'} in={open} {...TransitionProps}>
                            <Paper sx={{ borderRadius: '0px', background: '#fff' }} elevation={16}>
                                <Dialog
                                    sx={{ borderRadius: '0px' }}
                                    onClose={handleClose}
                                    aria-labelledby="simple-dialog-title"
                                    open={open}
                                >
                                    {open && (
                                        <>
                                            <Card
                                                className="343434"
                                                sx={{ overflow: 'auto', borderRadius: '0px', background: 'transparent' }}
                                            >
                                                <CardContent sx={{ p: 0, borderRadius: '0px', background: '#fff', pb: '0px !important' }}>
                                                    <Login forceOpen={forceOpenFn} />
                                                </CardContent>
                                            </Card>
                                        </>
                                    )}
                                </Dialog>
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default LoginSection;
