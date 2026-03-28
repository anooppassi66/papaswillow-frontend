// material-ui

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import { IconCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const RegisterSuccess = () => {
    // const theme = useTheme();
    const { forceLogin } = useAuth();

    return (
        <>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Stack sx={{background:'#0ab459', width:'100px', height:'100px', borderRadius:'100px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <IconCheck color="#fff" size={60} />
                </Stack>
                <Typography
                    variant="h6"
                    sx={{ fontSize: '22px', fontWeight: '500', mb: '15px', mt:'20px', paddingLeft: '5rem', paddingRight: '5rem' }}
                >
                    {' '}
                    Registered Successfully
                </Typography>
                <Grid sx={{ display: 'flex', flexDirection:'row', gap:'10px', alignItems:'center', justifyContent:'center', mb:'60px' }}>
                    <Button
                        onClick={() => forceLogin(true)}
                        sx={{
                            width: 'auto',
                            color: '#212121',
                            background: '#FFCD05',
                            fontSize:'14px',
                            ':hover': {
                                background: '#FFCD05'
                            }
                        }}
                    >
                        <Typography sx={{  fontSize:'14px', fontWeight:'500' }}>Click here to</Typography>
                    </Button>

                    {/* <Typography
                        variant="h6"
                        sx={{ fontSize: '1rem', fontWeight: '500', mt: '0px', pr: '8px', textDecoration: 'none' }}
                        component={Link}
                        to={'/'}
                    >
                        {' '}
                        Click Here
                    </Typography> */}
                    <Typography variant="h6" sx={{ fontSize:'14px', fontWeight:'600' }}>
                        {' '}
                        Login
                    </Typography>
                </Grid>
            </Box>
        </>
    );
};

export default RegisterSuccess;
