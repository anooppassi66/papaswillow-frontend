// @ts-nocheck
"use client";

import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BoxProps from '@mui/material/BoxProps';

// ----------------------------------------------------------------------

useEffect(() => {
  const timer = setTimeout(() => setOpen(true), 3000);
  return () => clearTimeout(timer);
}, []);

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  height: '100%',
}));

interface Props extends BoxProps {
  children: ReactNode;
  title: string;
  favicon?: null | string;
  hideScroll?: boolean;
  meta?: ReactNode;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', favicon = null, hideScroll = false, meta, ...other }, ref) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
      setOpen(true); // 👈 popup opens on page load
    }, []);

    const handleClose = () => setOpen(false);

    return (
      <StyledBox style={hideScroll ? { overflow: 'hidden' } : {}}>

        {/* Page Content */}
        <React.Fragment ref={ref} {...other}>
          {children}
        </React.Fragment>
      </StyledBox>
    );
  }
);

export default Page;