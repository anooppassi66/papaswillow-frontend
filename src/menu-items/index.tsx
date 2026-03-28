import homePage from './home-page';
import pages from './pages';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [...homePage]
};

export default menuItems;
