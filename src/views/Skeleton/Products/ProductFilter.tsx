import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';



const SkeletonView = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    '.skeletinbox': {
        marginTop: '0px',
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        padding: '0px 10px',
        width: '100%',
        // height: '330px'
    },
    '.waveimg': {
        marginTop: '0px',
        marginBottom: '5px',
        background: '#3c3c3c',
        animation: 'animation-c7515d 10s ease-in-out 0.95s infinite',
        borderRadius: '10px',
        width: '100%',
        height: '20px'
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

export const ProductFilterSkeleton = () => {
    return (
        <> 
            <Stack sx={{ display: { xs: 'none', md: 'block' } }}>
            <SkeletonView  >
                <Stack className="skeletinbox">
                    <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                    <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack><Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack><Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack><Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack><Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
                </Stack>
                
            </SkeletonView>
            </Stack>
            {/* <Stack sx={{ display: { xs: 'block', md: 'none' } }}>
            <SkeletonView  >
            <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
            </Stack>
            <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
            </Stack>
            <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
            </Stack>
            <Stack className="skeletinbox">
                <Stack sx={{width:'20px', height:'20px', border:'2px solid #3c3c3c'}}></Stack>
                <Skeleton className="waveimg" variant="rectangular" animation="wave" />
                    
            </Stack>
                
            </SkeletonView>
            </Stack> */}
        </>
    );
};
