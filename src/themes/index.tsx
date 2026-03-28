import { useMemo, ReactNode } from 'react';

// material-ui
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

// project import
import useConfig from 'hooks/useConfig';
import Palette from './palette';
import Typography from './typography';

import componentStyleOverrides from './compStyleOverride';
import customShadows from './shadows';

// types
import { CustomShadowProps } from 'types/default-theme';

interface Props {
    children: ReactNode;
}

export default function ThemeCustomization({ children }: Props) {
    const { borderRadius, fontFamily, mode, outlinedFilled, presetColor, themeDirection } = useConfig();

    const theme: Theme = useMemo<Theme>(() => Palette(mode, presetColor), [mode, presetColor]);

    const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
        () => Typography(theme, borderRadius, fontFamily),
        [theme, borderRadius, fontFamily]
    );
    const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(mode, theme), [mode, theme]);

    const themeOptions: ThemeOptions = useMemo(
        () =>
            ({
                breakpoints: {
                    values: {
                        xs: 0,
                        sm: 600,
                        md: 960,
                        lg: 1380,
                        1023: 1023,
                        600: 600,

                        xxl: '2200', // Custom breakpoint
                        xxxl: 2500 // Another custom breakpoint
                    }
                },
                direction: themeDirection,
                palette: theme.palette,
                mixins: {
                    toolbar: {
                        //minHeight: '48px',
                        padding: '0px 0px !important',
                        '@media (max-width: 600px)': {
                           // minHeight: '48px',
                            padding: '0px 0px !important'
                        }
                    }
                },
                typography: themeTypography,
                customShadows: themeCustomShadows
            }) as any,
        [themeDirection, theme, themeCustomShadows, themeTypography]
    );
    console.log('themeOptions', themeOptions);
    const themes: Theme = createTheme(themeOptions);
    // themes.components = useMemo(
    //     () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
    //     [themes, borderRadius, outlinedFilled]
    // );

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
