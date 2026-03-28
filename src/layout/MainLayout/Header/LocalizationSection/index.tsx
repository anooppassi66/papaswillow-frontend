import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconChevronDown } from '@tabler/icons-react';
import ChinaLogo from 'assets/images/menu-icons/china.png';
import UkLogo from 'assets/images/menu-icons/united-kingdom.png';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import TranslateTwoToneIcon from '@mui/icons-material/TranslateTwoTone';
import useConfig from 'hooks/useConfig';

// types
import { I18n, ThemeMode } from 'types/config';

// ==============================|| LOCALIZATION ||============================== //

const LocalizationSection = () => {
    const { mode, borderRadius, i18n, onChangeLocale } = useConfig();

    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
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
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (
        <>
            <Box sx={{ ml: { xs: 0, sm: 2 } }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        // border: '1px solid',
                        // borderColor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                        // bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                        // color: 'primary.dark',
                        color: '#fff',
                        borderRadius: '0px',
                        transition: 'all .2s ease-in-out',
                        textTransform: 'capitalize',
                        bgcolor: 'inherit',

                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'inherit',
                            // bgcolor: 'primary.main',
                            color: 'primary.light'
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    alt="language"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <Typography variant="h5" sx={{ textTransform: 'capitalize' }} color="inherit">
                        {i18n}
                    </Typography>
                    <IconChevronDown />
                </Avatar>
            </Box>

            <Popper
                placement={downMD ? 'bottom-start' : 'bottom'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
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
                            <Paper elevation={16} sx={{ borderRadius: '0px', background: '#fff' }} className="909090">
                                {open && (
                                    <List
                                        sx={{
                                            width: '100%',
                                            minWidth: 200,
                                            maxWidth: { xs: 250, sm: 280 },
                                            borderRadius: '0px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            padding: '10px',
                                            gap: '5px'

                                            // borderRadius: `${borderRadius}px`
                                        }}
                                    >
                                        <ListItemButton
                                            selected={i18n === 'en'}
                                            onClick={(event) => handleListItemClick(event, 'en')}
                                            sx={{
                                                padding: '0px',
                                                background: 'none !important',
                                                '.Mui-selected': {
                                                    background: '#ff0000 !important'
                                                }
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Grid container>
                                                        <img src={UkLogo} alt="" width="20px" />
                                                        {/* <Typography color="textPrimary">English</Typography> */}
                                                        <Typography
                                                            variant="caption"
                                                            color="textSecondary"
                                                            sx={{ ml: '8px', color: '#212121', fontWeight: '600' }}
                                                        >
                                                            (UK)
                                                        </Typography>
                                                    </Grid>
                                                }
                                            />
                                        </ListItemButton>
                                        <ListItemButton
                                            selected={i18n === 'zh'}
                                            onClick={(event) => handleListItemClick(event, 'zh')}
                                            sx={{
                                                padding: '0px',
                                                background: 'none !important',
                                                '.Mui-selected': {
                                                    background: '#ff0000 !important'
                                                }
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Grid container>
                                                        <img src={ChinaLogo} alt="" width="20px" />
                                                        {/* <Typography color="textPrimary">{ChinaLogo}</Typography> */}
                                                        <Typography
                                                            variant="caption"
                                                            color="textSecondary"
                                                            sx={{ ml: '8px', color: '#212121', fontWeight: '600' }}
                                                        >
                                                            (Chinese)
                                                        </Typography>
                                                    </Grid>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default LocalizationSection;
