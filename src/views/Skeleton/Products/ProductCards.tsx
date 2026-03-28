import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const SkeletonView = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    '.skeletinbox': {
        marginTop: '0px',
        marginBottom: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0px',
        padding: '0px 10px',
        width: '100%',
        Gap: '5px',
        height: '330px',
        [theme.breakpoints.down('sm')]: {
            height: '220px',
        }

    },
    '.waveimg': {
        marginTop: '0px',
        marginBottom: '5px',
        background: '#3c3c3c',
        animation: 'animation-c7515d 10s ease-in-out 0.95s infinite',
        borderRadius: '10px',
        width: '100%',
        height: '280px'
    },
    '.wavetext': {
        marginTop: '0px',
        marginBottom: '5px',
        background: '#3c3c3c',
        animation: 'animation-c7515d 10s ease-in-out 0.95s infinite',
        borderRadius: '5px',
        width: '70%',
        height: '20px'
    },
    '.waveprice': {
        marginTop: '0px',
        marginBottom: '5px',
        background: '#3c3c3c',
        animation: 'animation-c7515d 10s ease-in-out 0.95s infinite',
        borderRadius: '5px',
        width: '40%',
        height: '20px'
    }
}));

export const ProductCards = () => {
    return (
        <>
            <Stack sx={{ display: { xs: 'none', md: 'block' } }}>
                <SkeletonView>
                    <Stack className="skeletinbox">
                        <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                        <Skeleton className="wavetext" variant="rectangular" animation="wave" />
                        <Skeleton className="waveprice" variant="rectangular" animation="wave" />
                    </Stack>
                    <Stack className="skeletinbox">
                        <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                        <Skeleton className="wavetext" variant="rectangular" animation="wave" />
                        <Skeleton className="waveprice" variant="rectangular" animation="wave" />
                    </Stack>
                    <Stack className="skeletinbox">
                        <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                        <Skeleton className="wavetext" variant="rectangular" animation="wave" />
                        <Skeleton className="waveprice" variant="rectangular" animation="wave" />
                    </Stack>
                    <Stack className="skeletinbox">
                        <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                        <Skeleton className="wavetext" variant="rectangular" animation="wave" />
                        <Skeleton className="waveprice" variant="rectangular" animation="wave" />
                    </Stack>
                    <Stack className="skeletinbox">
                        <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                        <Skeleton className="wavetext" variant="rectangular" animation="wave" />
                        <Skeleton className="waveprice" variant="rectangular" animation="wave" />
                    </Stack>
                </SkeletonView>
            </Stack>
            <Stack sx={{ display: { xs: 'block', md: 'none' } }}>
                <SkeletonView>
                    <Stack className="skeletinbox">
                        <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                        <Skeleton className="wavetext" variant="rectangular" animation="wave" />
                        <Skeleton className="waveprice" variant="rectangular" animation="wave" />
                    </Stack>
                    <Stack className="skeletinbox">
                        <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                        <Skeleton className="wavetext" variant="rectangular" animation="wave" />
                        <Skeleton className="waveprice" variant="rectangular" animation="wave" />
                    </Stack>
                </SkeletonView>
            </Stack>
        </>
    );
};
