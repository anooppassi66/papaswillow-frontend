import { useEffect, useRef, useState } from 'react';

// material-ui

import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';

import { styled, useTheme } from '@mui/material/styles';

// project imports


// assets

import useConfig from 'hooks/useConfig';

// types
import { I18n, ThemeMode } from 'types/config';

import Register from 'views/pages/authentication/Register3';


interface SimpleDialogProps {
    onClose: (s: string) => void;
    selectedValue: string;
    open: boolean;
}

// ==============================|| LOCALIZATION ||============================== //

const RegistrationMobile = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: { width: '20px' }
}));

const RegisterSection = ({ registerForceOpen, forceOpen }: { registerForceOpen: boolean; forceOpen: Function }) => {
    const { mode, borderRadius, i18n, onChangeLocale } = useConfig();

    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(registerForceOpen || false);
    const anchorRef = useRef<any>(null);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined,
        lng: I18n
    ) => {
        onChangeLocale(lng);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        forceOpen('close');
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef?.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        if (registerForceOpen) setOpen(true);
    }, [registerForceOpen]);

    const forceOpenFn = (type: string) => {
        forceOpen(type);
        setOpen(false);
    };
    return (
        <>
            {/* <Box sx={{ ml: { xs: 1, sm: 1 } }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        // border: '1px solid',
                        borderRadius: '0px',
                        // borderColor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                        // background: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[400] : theme.palette.common.white,
                        background: '#ffb001',
                        color: '#000',
                        cursor: 'pointer',
                        padding: '0px 10px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        fontFamily: 'Poppins',
                        width: '110px',
                        transition: 'all .2s ease-in-out',
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '0.675rem',
                             fontWeight: '600', height:'30px', padding: '0px 10px', width: '40px',
                        },
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            // background: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[400] : theme.palette.common.white,
                            background: '#ffb001',
                            color: '#000'
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    alt="language"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}><FormattedMessage  id="Registration" /></Box>
                    <RegistrationMobile className='' sx={{ display: { xs: 'block', md: 'none' } }}><IconUserPlus/></RegistrationMobile>
                </Avatar>
            </Box> */}

            {open && (
                <Dialog sx={{ borderRadius: '0px' }} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    {open && (
                        <>
                            <Card className="343434" sx={{ overflow: 'auto', borderRadius: '0px', background: 'transparent' }}>
                                <CardContent sx={{ p: 0, borderRadius: '0px', background: '#fff', pb: '0px !important' }}>
                                    <Register forceOpen={forceOpenFn} />
                                </CardContent>
                            </Card>
                        </>
                    )}
                </Dialog>
            )}
        </>
    );
};

export default RegisterSection;
