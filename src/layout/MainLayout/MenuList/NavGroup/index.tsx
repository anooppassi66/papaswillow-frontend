import { Fragment, useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { FormattedMessage } from 'react-intl';

// project imports
import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

import useConfig from 'hooks/useConfig';
import Transitions from 'ui-component/extended/Transitions';
import { useGetMenuMaster } from 'api/menu';

// assets
import { IconChevronDown, IconChevronRight, IconMinusVertical,IconChevronUp } from '@tabler/icons-react';

// types
import { NavItemType } from 'types';
import { MenuOrientation } from 'types/config';

type VirtualElement = {
    getBoundingClientRect: () => DOMRectReadOnly | DOMRect;
    contextElement?: Element;
};

interface NavGroupProps {
    item: NavItemType;
    lastItem: number;
    remItems: NavItemType[];
    lastItemId: string;
    setSelectedID: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedID: string | undefined;
}

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item, lastItem, remItems, lastItemId, selectedID, setSelectedID }: NavGroupProps) => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const { pathname } = useLocation();

    const { menuOrientation, borderRadius } = useConfig();
    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster.isDashboardDrawerOpened;
    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

    const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);
    const [currentItem, setCurrentItem] = useState(item);

    const openMini = Boolean(anchorEl);

    useEffect(() => {
        if (lastItem) {
            if (item.id === lastItemId) {
                const localItem: any = { ...item };
                const elements = remItems.map((ele: NavItemType) => ele.elements);
                localItem.children = elements.flat(1);
                setCurrentItem(localItem);
            } else {
                setCurrentItem(item);
            }
        }
    }, [item, lastItem, menuOrientation, remItems, lastItemId]);

    const checkOpenForParent = (child: NavItemType[], id: string) => {
        child.forEach((ele: NavItemType) => {
            if (ele.children?.length) {
                checkOpenForParent(ele.children, currentItem.id!);
            }
            if (ele?.url && !!matchPath({ path: ele?.link ? ele.link : ele.url, end: true }, pathname)) {
                setSelectedID(id);
            }
        });
    };

    const checkSelectedOnload = (data: NavItemType) => {
        const childrens = data.children ? data.children : [];
        childrens.forEach((itemCheck: NavItemType) => {
            if (itemCheck?.children?.length) {
                checkOpenForParent(itemCheck.children, currentItem.id!);
            }
            if (itemCheck?.url && !!matchPath({ path: itemCheck?.link ? itemCheck.link : itemCheck.url, end: true }, pathname)) {
                setSelectedID(currentItem.id!);
            }
        });

        if (data?.url && !!matchPath({ path: data?.link ? data.link : data.url, end: true }, pathname)) {
            setSelectedID(currentItem.id!);
        }
    };

    // keep selected-menu on page load and use for horizontal menu close on change routes
    useEffect(() => {
        checkSelectedOnload(currentItem);
        if (openMini) setAnchorEl(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, currentItem]);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
        if (!openMini) {
            setAnchorEl(event?.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Icon = currentItem?.icon!;
    const itemIcon = currentItem?.icon ? <Icon stroke={1.5} size="20px" /> : null;

    // menu list collapse & items
    const items = currentItem.children?.map((menu) => {
        switch (menu?.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} parentId={currentItem.id!} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                
                return (
                    <Typography key={menu?.id} variant="h6" color="error" align="center">
                        Menu Items Error5
                    </Typography>
                );
        }
    });

    const moreItems = remItems.map((itemRem: NavItemType, i) => (
        <Fragment key={i}>
            {itemRem.url ? (
                <NavItem item={itemRem} level={1} />
            ) : (
                itemRem.title && (
                    <Typography variant="caption" sx={{ pl: 2 }}>
                        {itemRem.title} {itemRem.url}
                    </Typography>
                )
            )}
            {itemRem?.elements?.map((menu) => {
                switch (menu?.type) {
                    case 'collapse':
                        return <NavCollapse key={menu.id} menu={menu} level={1} parentId={currentItem.id!} />;
                    case 'item':
                        return <NavItem key={menu.id} item={menu} level={1} />;
                    default:
                        return (
                            <Typography key={menu.id} variant="h6" color="error" align="center">
                                Menu Items Error7
                            </Typography>
                        );
                }
            })}
        </Fragment>
    ));

    const popperId = openMini ? `group-pop-${item.id}` : undefined;
    const isSelected = selectedID === currentItem.id;

    return (
        <>
            {!isHorizontal ? (
                <>
                    <List
                        disablePadding={!drawerOpen}
                        className='89898989'
                        subheader={
                            currentItem.title &&
                            drawerOpen && (
                                <Typography
                                    variant="caption"
                                    
                                    //sx={{ ...theme.typography.menuCaption }}
                                    sx={{
                                        color: '#fff',
                                        margin: '0px 0px 0.35em',
                                        lineHeight: '1.66',
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        padding: ' 6px',
                                        textTransform: 'capitalize',
                                        borderBottom: '1px solid #484747',
                                    }}
                                    display="block"
                                    gutterBottom
                                >
                                    {currentItem.title}
                                    {currentItem.caption && (
                                        <Typography
                                            variant="caption"
                                            //sx={{ ...theme.typography.subMenuCaption }}
                                            display="block"
                                            gutterBottom
                                        >
                                            {currentItem.caption}
                                        </Typography>
                                    )}
                                </Typography>
                            )
                        }
                    >
                        {items}
                    </List>

                    {/* group divider */}
                    {/* {drawerOpen && <Divider sx={{ mt: 0.25, mb: 1.25 }} />} */}
                </>
            ) : (
                <List>
                    <ListItemButton
                        selected={isSelected}
                        className="menulistview"
                        sx={{
                            borderRadius: `${borderRadius}px`,
                            p: 0.5,
                            my: 0.5,
                            // mr: 1,
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'inherit',
                            
                            '&:hover':{
                                background: 'none !important'
                            },
                            '&.Mui-selected':{ background:'none !important'}
                        }}
                        onMouseEnter={handleClick}
                        onClick={handleClick}
                        onMouseLeave={handleClose}
                        aria-describedby={popperId}
                    >
                        {itemIcon && (
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {currentItem.id === lastItemId ? <IconMinusVertical stroke={1.5} size="20px" /> : itemIcon}
                            </ListItemIcon>
                        )}
                        <ListItemText
                            sx={{ mr: .5 }}
                            primary={
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#000',
                                        textTransform: 'uppercase',
                                        whiteSpace: 'nowrap'
                                    }}
                                    variant={isSelected ? 'h5' : 'body1'}
                                    color="inherit"
                                >
                                    {currentItem.id === lastItemId ? <FormattedMessage id="more-items" /> : currentItem.title}
                                </Typography>
                            }
                        />
                        {openMini ? (
                            <IconChevronUp stroke={3.5} size="16px" color="#000" />
                        ) : (
                            <IconChevronDown stroke={3.5} size="16px" color="#000" />
                        )}

                        {anchorEl && (
                            <Popper
                                id={popperId}
                                open={openMini}
                                anchorEl={anchorEl}
                                placement="bottom-start"
                                sx={{
                                    overflow: 'visible',
                                    zIndex: 2001,
                                    minWidth: 180,
                                    fontSize: '14px',

                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 10,
                                        left: 32,
                                        width: 12,
                                        height: 12,
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 120,
                                        borderWidth: '6px',
                                        borderStyle: 'solid',
                                        borderTopColor: '#f89b35',
                                        borderLeftColor: '#f89b35',
                                        borderRightColor: 'transparent',
                                        borderBottomColor: 'transparent'
                                    }
                                }}
                            >
                                {({ TransitionProps }) => (
                                    <Transitions in={openMini} {...TransitionProps}>
                                        <Paper
                                            sx={{
                                                mt: 1.2,
                                                //py: 1.25,
                                                boxShadow: theme.shadows[8],
                                                backgroundImage: 'none',
                                                background: '#f89b35',
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                                borderRadius: '6px'
                                            }}
                                        >
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <Box
                                                    sx={{
                                                        minWidth: 200,
                                                        maxHeight: 'calc(100vh - 170px)',
                                                        overflowY: 'auto',
                                                        '&::-webkit-scrollbar': {
                                                            opacity: 0,
                                                            width: 4,
                                                            '&:hover': {
                                                                opacity: 0.7
                                                            }
                                                        },
                                                        '&::-webkit-scrollbar-track': {
                                                            bgcolor: 'transparent'
                                                        },
                                                        '&::-webkit-scrollbar-thumb': {
                                                            bgcolor: 'divider',
                                                            borderRadius: 4
                                                        }
                                                    }}
                                                >
                                                    {currentItem.id !== lastItemId ? items : moreItems}
                                                </Box>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Transitions>
                                )}
                            </Popper>
                        )}
                    </ListItemButton>
                </List>
            )}
        </>
    );
};

export default NavGroup;
