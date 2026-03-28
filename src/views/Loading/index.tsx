import React from 'react';
import { keyframes, styled, Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import { StyledLoaderContainer, StyledLoadView, StyledLoadLogo, StyledLoadGif } from './style';

interface ChildProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface Loader {
    theme: Theme;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled(Box)(({ theme }: Loader) => ({
    // backgroundColor:  theme.palette.dark[800],
    height: '100%',
    width: '100%',
    //backgroundColor:  theme.palette.dark[800],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // background: '#1A654A',

    '.spinner': {
        width: '86px',
        height: '86px',
        border: '11.2px #dcdcdc double',
        borderLeftStyle: 'solid',
        borderRadius: '50%',
        // animation: 'spinner-aib1d7 0.75s infinite linear',
        animation: `${spin} 0.75s infinite linear`
    }
}));

const Loading = ({ onClick }: ChildProps) => {
    console.log(onClick);

    return (
        <Loader className="loading">
            <Stack className="spinner"></Stack>
        </Loader>
        // <StyledLoaderContainer>
        //   <StyledLoadView>
        //     <StyledLoadLogo>
        //       {/* <img
        //         src={process.env.REACT_APP_THEME_LOGO_MOBILE}
        //         alt=''
        //       /> */}
        //     </StyledLoadLogo>
        //     <StyledLoadGif>
        //       {/* <img
        //         className='loading_img'
        //         src={`${process.env.REACT_APP_CDN_IMAGES_PATH}/loader.gif`}
        //         alt=''
        //       /> */}
        //        <img
        //           src={process.env.REACT_APP_THEME_LOGO_MOBILE} alt=''
        //         />
        //       <div className="custom-loader">
        //       </div>
        //       {/* <h6>Loading...</h6> */}
        //     </StyledLoadGif>
        //   </StyledLoadView>
        // </StyledLoaderContainer>
    );
};

export default Loading;
