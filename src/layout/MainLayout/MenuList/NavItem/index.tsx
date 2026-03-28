import { useEffect, useRef, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// types
import { MenuOrientation, ThemeMode } from 'types/config';
import { LinkTarget, NavItemType } from 'types';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { styled, Theme } from '@mui/material/styles';

const BetCloseEvent = styled(Grid)(({ theme }) => ({
    background: 'rgba(0, 0, 0, .87)',
    height: '100vh',
    left: '0',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '9999'
}));

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

interface NavItemProps {
    item: NavItemType;
    level: number;
    isParents?: boolean;
    setSelectedID?: () => void;
}

const NavItem = ({ item, level, isParents = false, setSelectedID }: NavItemProps) => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const ref = useRef<HTMLSpanElement>(null);

    const { pathname } = useLocation();
    const { mode, menuOrientation, borderRadius } = useConfig();

    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster.isDashboardDrawerOpened;
    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;
    const isSelected = !!matchPath({ path: item?.link ? item.link : item.url!, end: false }, pathname);

    const [hoverStatus, setHover] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const compareSize = () => {
        const compare = ref.current && ref.current.scrollWidth > ref.current.clientWidth;
        setHover(compare as boolean);
    };

    useEffect(() => {
        compareSize();
        window.addEventListener('resize', compareSize);
        window.removeEventListener('resize', compareSize);
    }, []);

    useEffect(() => {
        // Simulate an API call or data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
        // const downMD = useMediaQuery(theme.breakpoints.down('md'));
    }, []);

    const Icon = item?.icon!;
    const itemIcon = item?.icon && (
        <Icon
            stroke={1.5}
            size={drawerOpen ? '20px' : '24px'}
            style={{ ...(isHorizontal && isParents && { fontSize: 20, stroke: '1.5' }) }}
        />
    );

    let itemTarget: LinkTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    const itemHandler = () => {
        if (downMD) handlerDrawerOpen(false);

        if (isParents && setSelectedID) {
            setSelectedID();
        }
    };

    const iconSelectedColor = mode === ThemeMode.DARK && drawerOpen ? 'text.primary' : '#fff';
    return (
        <>
            {!isHorizontal ? (
                <ListItemButton
                    component={Link}
                    to={item.url!}
                    target={itemTarget}
                    disabled={item.disabled}
                    disableRipple={!drawerOpen}
                    className="12121212"
                    sx={{
                        zIndex: 1201,
                        //bgcolor: 'transparent',
                        borderRadius: `0px`,
                        //backgroundColor: theme.palette.common.white,

                        // borderRadius: `${borderRadius}px`,
                        // mb: '1px',
                        //p: 0.8,
                        color: '#212121',

                        // borderBottom:'1px solid #d4e8e1',
                        mb: '1px',
                        fontSize: '12px',

                        //background:'rgba(255, 255, 255, 0.08)',

                        //pl: drawerOpen ? `${level * 10}px` : 1.25,
                        ...(drawerOpen &&
                            level === 1 &&
                            mode !== ThemeMode.DARK && {
                                // borderBottom:'1px solid #d4e8e1',
                                padding: '0px',
                                background: '#fff',
                                fontSize: '12px !important',
                                borderBottom: '1px solid #484747',
                                '@media (max-width: 568px)': {
                                    background: '#ff0000',
                                    fontSize: '12px !important'
                                },
                                '&:hover': {
                                    //bgcolor: 'secondary.light',
                                    bgcolor: '#ff0000',
                                    color: '#fff',
                                    '.svgimg': {}
                                },
                                '&.Mui-selected': {
                                    //bgcolor: 'secondary.light',
                                    bgcolor: '#fff',
                                    color: '#fff',
                                    fontWeight: '600',
                                    '&:hover': {
                                        color: iconSelectedColor,
                                        // bgcolor: 'secondary.light'
                                        bgcolor: '#10B981'
                                    }
                                }
                            }),
                        ...((!drawerOpen || level !== 1) && {
                            py: level === 1 ? 0 : 1,
                            padding: '3px 25px 3px 30px',
                            fontSize: '13px',
                            letterSpacing: '0.07em',
                            lineHeight: '1.9',
                            transition: 'all 0.5s ease',
                            backgroundColor: '#f89b35 !important',
                            //backgroundColor: 'transparent',
                            borderBottom: '1px solid #484747',
                            cursor: 'pointer',
                            background: 'rgba(255, 255, 255, 0.03)',
                            '&:hover': {
                                // bgcolor: 'transparent',
                                background: '#ff0000 !important'
                            },
                            '&.Mui-selected': {
                                background: '#ff0000 !important',
                                '&:hover': {
                                    bgcolor: 'transparent'
                                },
                                bgcolor: 'transparent'
                            }
                        })
                    }}
                    selected={isSelected}
                    onClick={() => itemHandler()}
                >
                    {/* <ButtonBase aria-label="theme-icon" sx={{ borderRadius: `${borderRadius}px` }} disableRipple={drawerOpen}>
                        {loading ? (
                            <>
                                <Skeleton
                                    variant="rectangular"
                                    sx={{ mt: '0px', mb: '0px,', background: theme.palette.secondary.main }}
                                    height={30}
                                />
                            </>
                        ) : (
                            <ListItemIcon
                                sx={{
                                    minWidth: level === 1 ? 36 : 18,

                                    color: isSelected ? iconSelectedColor : '#ff0000',
                                    ...(!drawerOpen &&
                                        level === 1 && {
                                            // borderRadius: `${borderRadius}px`,
                                            width: 56,
                                            height: 46,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: theme.palette.common.white,
                                            '&:hover': {
                                                bgcolor: mode === ThemeMode.DARK ? alpha(theme.palette.secondary.main, 1) : '#d4e8e1'
                                            },
                                            ...(isSelected && {
                                                bgcolor: mode === ThemeMode.DARK ? alpha(theme.palette.secondary.main, 1) : '#d4e8e1',
                                                '&:hover': {
                                                    bgcolor: mode === ThemeMode.DARK ? alpha(theme.palette.secondary.main, 1) : '#d4e8e1'
                                                }
                                            })
                                        })
                                }}
                            >
                                <img className="svgimg" style={{ width: '1.4em', height: '1.4em' }} src={item?.svg} alt="Your SVG Icon" />
                            </ListItemIcon>
                        )}
                    </ButtonBase> */}

                    {(drawerOpen || (!drawerOpen && level !== 1)) && (
                        <Tooltip title={item.title} disableHoverListener={!hoverStatus}>
                            <ListItemText
                                primary={
                                    <Typography
                                        ref={ref}
                                        noWrap
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                        variant={isSelected ? 'h5' : 'body1'}
                                        color="#000"
                                        width={150}
                                        sx={{ fontSize: '0.875rem', textTransform: 'capitalize' }}
                                    >
                                        {item.title}
                                    </Typography>
                                }
                                secondary={
                                    item.caption && (
                                        <Typography
                                            variant="caption"
                                            sx={{ ...theme.typography.subMenuCaption }}
                                            //sx={{background:'#fff'}}
                                            display="block"
                                            gutterBottom
                                        >
                                            {loading ? (
                                                <>
                                                    <Skeleton
                                                        variant="rectangular"
                                                        sx={{ mt: '15px', mb: '15px,', background: theme.palette.secondary.main }}
                                                        height={40}
                                                    />
                                                </>
                                            ) : (
                                                item.caption
                                            )}
                                        </Typography>
                                    )
                                }
                            />
                        </Tooltip>
                    )}

                    {drawerOpen && item.chip && (
                        <Chip
                            color={item.chip.color}
                            variant={item.chip.variant}
                            size={item.chip.size}
                            label={item.chip.label}
                            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                        />
                    )}
                </ListItemButton>
            ) : (
                <ListItemButton
                    component={Link}
                    to={item.url!}
                    target={itemTarget}
                    disabled={item.disabled}
                    className="submenulist"
                    sx={{
                        //borderRadius: isParents ? `${borderRadius}px` : 0,
                        //mb: isParents ? 0 : 0.5,
                        alignItems: 'flex-start',
                        borderBottom: '1px solid #484747',
                        // background: '#ff0000',
                        //backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                        py: 1,
                        pl: 2,
                        mr: isParents ? 1 : 0,
                        flexGrow:'inherit',

                        ///borderBottom: '1px solid #191919',
                        background: 'none !important',
                        // background: '#f89b35'
                        '&:last-child ':{borderBottom: '0px solid #484747',}
                    }}
                    selected={isSelected}
                    onClick={() => itemHandler()}
                >
                    {/* <ListItemIcon
                        sx={{
                            my: 'auto',
                            minWidth: !item?.icon ? 18 : 36
                        }}
                    >
                        {itemIcon}
                    </ListItemIcon> */}

                    <ListItemText
                        sx={{ padding: '4px 0px !important', margin: '0px !important' }}
                        primary={
                            <Typography
                                variant={isSelected ? 'h5' : 'body1'}
                                color="inherit"
                                sx={{
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                    padding: '0px !important',
                                    margin: '0px !important',
                                    
                                }}
                            >
                                {item.title}
                            </Typography>
                        }
                        secondary={
                            item.caption && (
                                <Typography
                                    variant="caption"
                                    sx={{ fontSize: '1px', fontWeight: '500', padding: '0px', margin: '0px', background: '#ff0000' }}
                                    //sx={{ ...theme.typography.subMenuCaption }}
                                    display="block"
                                    gutterBottom
                                >
                                    {item.caption}
                                </Typography>
                            )
                        }
                    />

                    {item.chip && (
                        <Chip
                            color={item.chip.color}
                            variant={item.chip.variant}
                            size={item.chip.size}
                            label={item.chip.label}
                            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                        />
                    )}
                </ListItemButton>
            )}
        </>
    );
};

export default NavItem;
