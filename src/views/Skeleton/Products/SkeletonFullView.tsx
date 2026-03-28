import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';



const SkeletonView = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height:'100%',
    '.skeletinbox': {
        marginTop: '0px',
        marginBottom: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0px',
        padding: '0px 10px',
        width: '100%',
        Gap: '5px',
        height: '100%'
    },
    '.waveimg': {
        marginTop: '0px',
        marginBottom: '5px',
        background: '#3c3c3c',
        animation: 'animation-c7515d 10s ease-in-out 0.95s infinite',
        borderRadius: '10px',
        width: '100%',
        height: '100%'
    }
}));

export const SkeletonFullView = () => {
    return (
        <>
            <SkeletonView>
                <Stack className="skeletinbox">
                    <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                </Stack>
                
            </SkeletonView>
        </>
    );
};
