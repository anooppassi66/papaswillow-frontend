import React, { useState } from 'react';

// styles
import { styled, Theme } from '@mui/material/styles';
// import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import useAuth from 'hooks/useAuth';
import ChangePassword from './Changepassword';
import { IconCircleCheck } from '@tabler/icons-react';

// const ApplyButton = styled(Stack)(({ theme }) => ({
//     '.applybtn': {
//         background: '#ffb001',
//         padding: '5px 25px',
//         height: '40px',
//         color: '#212121',
//         fontWeight: '700',
//         borderRadius: '0px',
//         textTransform: 'uppercase'
//     }
// }));

const Accountsetting = styled(Box)(({ theme }) => ({
    '.MuiOutlinedInput-input': {
        // border: '1px solid #000',
        BorderRadius: '4px'
    },
    '.MuiInputLabel-root': {
        background: '#ddd9d9',
        Padding: '5px'
    }
}));

const Accountsettings = () => {
    const { user } = useAuth();
    const [showPassword, setPassword] = useState(false);
    const [successMsg, setSuccessMessage] = useState(false);
    const handlePassword = (success: boolean) => {
      
        if (success===true) setSuccessMessage(true);
        setPassword(!showPassword);
       
    };
    return (
        <>
            <Accountsetting
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px', paddingTop: '20px' }}
            >
                <Container
                    sx={{
                        background: '#ddd9d9',
                        // border: '2px solid #fff',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px'
                    }}
                >
                    <Stack sx={{  display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center', }}>
                        {successMsg && (
                            <Stack
                                sx={{
                                    color: '#40A21B',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px 0px',
                                    border:'2px solid #40A21B',
                                    width:'400px',
                                    borderRadius:'10px',
                                    marginTop:'30px', marginBottom:'30px'
                                    
                                }}
                            >
                                <Typography
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontSize: '18px' }}
                                >
                                    <IconCircleCheck size={40} /> Password Updated
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#40A21B',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '15px',
                                        fontSize: '12px'
                                    }}
                                >
                                    Your password has been changed successfully.
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                    <Stack sx={{ width: '450px', display: 'flex', gap: '15px', margin: '0px auto' }}>
                        <Stack sx={{ color: '#000', fontSize: '26px', padding: '30px 20px', textAlign: 'left' }}>
                            Personal Information
                        </Stack>
                        <Stack sx={{ display: 'flex', flexDirection: 'row', padding: '10px', border: '1px solid #f89b35', gap: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>Full Name :</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>{user?.username}</Typography>
                        </Stack>
                        {/* <Stack sx={{ display: 'flex', flexDirection: 'row', padding: '10px', border: '1px solid #f89b35', gap: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>Mobile Number :</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>9703102217</Typography>
                        </Stack> */}
                        <Stack sx={{ display: 'flex', flexDirection: 'row', padding: '10px', border: '1px solid #f89b35', gap: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>Email ID :</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>{user?.email}</Typography>
                        </Stack>
                        <Stack sx={{ display: 'flex', flexDirection: 'row', padding: '10px', border: '1px solid #f89b35', gap: '15px', alignItems:'center',  }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>Password :</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>*********</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                                <Button sx={{padding:'0px', fontWeight:'700', fontSize:'16px'}} onClick={handlePassword}>Edit</Button>
                            </Typography>
                        </Stack>
                        {/* <Stack sx={{ width: '100%', paddingTop: '10px', marginBottom: '40px' }}>
                            <Button
                                sx={{
                                    background: '#f89b35',
                                    width: '100%',
                                    color: '#212121',
                                    padding: '10px 3px',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    ':hover': { background: '#f89b35' }
                                }}
                            >
                                EDIT
                            </Button>
                        </Stack> */}
                    </Stack>
                </Container>

                {showPassword && <ChangePassword handlePassword={handlePassword} />}
            </Accountsetting>
        </>
    );
};

export default Accountsettings;
