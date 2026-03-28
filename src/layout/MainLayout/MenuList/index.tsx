import { memo, useState, useEffect } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import useConfig from 'hooks/useConfig';
import { HORIZONTAL_MAX_ITEM } from 'config';
import { useGetMenuMaster } from 'api/menu';

// types
import { NavItemType } from 'types';
import { MenuOrientation } from 'types/config';
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconBrandChrome,
    IconHorse,
    IconGoGame,
    IconShirtSport,
    IconCards,
    IconDashboard,
    IconDeviceAnalytics,
    IconMoneybag,
    IconSpeakerphone
} from '@tabler/icons-react';
import axios from 'utils/axios';

// icons mapping
const icons = {
    IconBrandChrome,
    IconHorse,
    IconGoGame,
    IconShirtSport,
    IconCards,
    IconDashboard,
    IconDeviceAnalytics,
    IconMoneybag,
    IconSpeakerphone
};

// Helper function to transform categories into hierarchical menu structure
const transformCategoriesToMenuItems = (categories) => {
    const categoryMap = new Map();

    // Create a map of categories with their children
    categories.forEach((cat) => {
        categoryMap.set(cat.id, {
            id: cat.id,
            title: <FormattedMessage id={cat.categoryDisplayName} />,
            type: 'item', // Default type is 'item'
            categoryName: cat.categoryName,
            categoryDisplayName : cat.categoryDisplayName,
            parentId: cat.parentId,
            url: '',
            icon: cat.icon || null,
            breadcrumbs: cat.breadcrumbs !== undefined ? cat.breadcrumbs : true
            // Initialize children as an empty array
        });
    });

    // Populate children and determine type
    const menuItems = [];
    categories.forEach((cat) => {
        // debugger;
        if (cat.parentId === 0) {
            // Top-level categories are initially set as 'group'
            const topLevelCategory = categoryMap.get(cat.id);
            // if (topLevelCategory.parentId === 0) topLevelCategory.type = 'item';
            menuItems.push(topLevelCategory);
        } else {
            const parent = categoryMap.get(cat.parentId);
            if (parent) {
                // Add the current category to the parent's children
                const currentCategory = categoryMap.get(cat.id);
                currentCategory.url = `/products/category/${currentCategory.categoryName}`;
                if (!parent.children) parent.children = [];
                parent.children.push(currentCategory);

                // Update parent type to 'collapse' if it has children
                parent.type = 'group';
                if (parent.children.length > 0 && parent.parentId !== 0) {
                    parent.type = 'collapse';
                }
            }
        }
    });

    return menuItems;
};

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const { menuOrientation } = useConfig();
    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster.isDashboardDrawerOpened;
    const [menuItems, setMenuItems] = useState<NavItemType[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios('/api/v1/menucategories');
                // debugger;

                if (response.status === 200) {
                    const transformedItems = transformCategoriesToMenuItems(response.data.data.data);
                    setMenuItems(transformedItems);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    console.log(menuItems, 'menuItems');

    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;
    const [selectedID, setSelectedID] = useState<string | undefined>('');

    // last menu-item to show in horizontal menu bar
    const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;

    let lastItemIndex = menuItems.length - 1;
    let remItems: NavItemType[] = [];
    let lastItemId: string;

    if (lastItem && lastItem < menuItems.length) {
        lastItemId = menuItems[lastItem - 1].id!;
        lastItemIndex = lastItem - 1;
        remItems = menuItems.slice(lastItem - 1, menuItems.length).map((item) => ({
            title: item.title,
            elements: item.children,
            icon: item.icon,
            ...(item.url && {
                url: item.url
            })
        }));
    }

    const navItems = menuItems.slice(0, lastItemIndex + 1).map((item, index) => {
        switch (item.type) {
            case 'group':
                if (item.url && item.id !== lastItemId) {
                    return (
                        <List key={item.id}>
                            <NavItem item={item} level={1} isParents setSelectedID={() => setSelectedID('')} />
                            {!isHorizontal && index !== 0 && <Divider sx={{ py: 0.5 }} />}
                        </List>
                    );
                }

                return (
                    <NavGroup
                        key={item.id}
                        setSelectedID={setSelectedID}
                        selectedID={selectedID}
                        item={item}
                        lastItem={lastItem!}
                        remItems={remItems}
                        lastItemId={lastItemId}
                    />
                );
            case 'item':
                return <NavItem key={item.id} item={{ ...item, url: `/products/category/${item.categoryName}` }} level={1} />;
            default:
                // debugger;
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error1
                    </Typography>
                );
        }
    });

    return !isHorizontal ? <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box> : <>{navItems}</>;
};

export default memo(MenuList);
