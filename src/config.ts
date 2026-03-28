// types
import { ConfigProps, MenuOrientation, ThemeDirection, ThemeMode } from 'types/config';

export const DASHBOARD_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 20;

const config: ConfigProps = {
    menuOrientation: MenuOrientation.HORIZONTAL,
    miniDrawer: false,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 0,
    outlinedFilled: true,
    mode: ThemeMode.DARK,
    presetColor: 'default',
    i18n: 'en',
    themeDirection: ThemeDirection.LTR,
    container: false
};

export default config;
