// material-ui
import { keyframes, styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// ==============================|| LOADER ||============================== //
interface SpinnerLoader {
    theme: Theme;
}

const spin = keyframes`
 
  to {
    transform: rotate(1turn);
  }
`;

const SpinnerLoader = styled(Box)(({ theme }: SpinnerLoader) => ({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: '2.8px solid',
    borderColor: theme.palette.dark.main,
    borderRightColor: '#474bff',
    animation: `${spin} 1s infinite linear`
}));

const Spinner = () => <SpinnerLoader sx={{ ml: '8px' }}></SpinnerLoader>;

export default Spinner;
