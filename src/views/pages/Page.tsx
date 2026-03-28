// @ts-nocheck
import React, { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BoxProps from '@mui/material/BoxProps';

// ----------------------------------------------------------------------

const StyledBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    width: '100%',
    height: '100%'
}));

interface Props extends BoxProps {
    children: ReactNode;
    title: string;
    favicon?: null | string;
    hideScroll?: boolean;
    meta?: ReactNode;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', favicon = null, hideScroll = false, meta, ...other }, ref) => {
    return (
        <StyledBox style={hideScroll ? { overflow: 'hidden' } : {}}>
            {/* <Helmet>
                <title>Arionplay</title>
                {favicon && <link id="favicon" rel="icon" href={favicon} type="image/x-icon" />}
                {meta}
            </Helmet> */}

            <React.Fragment ref={ref} {...other}>
                {children}
            </React.Fragment>
        </StyledBox>
    );
});

export default Page;
