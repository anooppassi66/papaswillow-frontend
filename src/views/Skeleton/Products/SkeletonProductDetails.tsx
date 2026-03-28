import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';



const SkeletonView = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: '100%',
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
const SkeletonProduct = styled(Box)(({ theme }) => ({

    display: 'flex',
    width: '100%',
    // height:'100%',
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

export const SkeletonProductDetails = () => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={12} >
                    
                    <SkeletonProduct>
                    <Stack sx={{ height: '250px', width: '100%', }}>
                        <Stack className="skeletinbox">
                            <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                        </Stack>
                    </Stack>

                    </SkeletonProduct>
                    <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                        <SkeletonProduct>
                            <Stack sx={{ height: '100px', width: '100%', }}>
                                <Stack className="skeletinbox">
                                    <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                                </Stack>
                            </Stack>
                        </SkeletonProduct>
                        <SkeletonProduct>
                            <Stack sx={{ height: '100px', width: '100%', }}>
                                <Stack className="skeletinbox">
                                    <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                                </Stack>
                            </Stack>
                        </SkeletonProduct>
                        <SkeletonProduct>
                            <Stack sx={{ height: '100px', width: '100%', }}>
                                <Stack className="skeletinbox">
                                    <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                                </Stack>
                            </Stack>
                        </SkeletonProduct>
                        <SkeletonProduct>
                            <Stack sx={{ height: '100px', width: '100%', }}>
                                <Stack className="skeletinbox">
                                    <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                                </Stack>
                            </Stack>
                        </SkeletonProduct>
                    </Stack>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>

                    <SkeletonProduct>
                        <Stack sx={{ height: '40px', width: '100%', }}>
                            <Stack className="skeletinbox">
                                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                            </Stack>
                        </Stack>
                    </SkeletonProduct>
                    <SkeletonProduct>
                        <Stack sx={{ height: '40px', width: '80%', }}>
                            <Stack className="skeletinbox">
                                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                            </Stack>
                        </Stack>
                    </SkeletonProduct>
                    <SkeletonProduct>
                        <Stack sx={{ height: '40px', width: '60%', }}>
                            <Stack className="skeletinbox">
                                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                            </Stack>
                        </Stack>
                    </SkeletonProduct>
                    <SkeletonProduct>
                        <Stack sx={{ height: '30px', width: '80%', }}>
                            <Stack className="skeletinbox">
                                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                            </Stack>
                        </Stack>
                    </SkeletonProduct>
                    <SkeletonProduct>
                        <Stack sx={{ height: '30px', width: '40%', }}>
                            <Stack className="skeletinbox">
                                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                            </Stack>
                        </Stack>
                    </SkeletonProduct>
                    <SkeletonProduct>
                        <Stack sx={{ height: '60px', width: '30%', }}>
                            <Stack className="skeletinbox">
                                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                            </Stack>
                        </Stack>
                    </SkeletonProduct>

                </Grid>
            </Grid>

        </>
    );
};
