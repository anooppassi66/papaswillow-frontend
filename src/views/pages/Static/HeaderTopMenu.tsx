import { Link } from 'react-router-dom';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
// material-ui
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Marquee from 'react-fast-marquee';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconPhoneCall, IconMail } from '@tabler/icons-react';
import { styled, useTheme } from '@mui/material/styles';
import {  Theme } from '@mui/material/styles';
// third party imports
import { IconBrandFacebook, IconBrandInstagram, IconBrandTelegram, IconBrandWhatsapp, IconBrandYoutube } from '@tabler/icons-react';

const SocialIcons = styled(Stack)(({ theme }) => ({
    svg: { width: '18px', height: '18px' }
}));

const PhoneNumber = styled(Typography)(({ theme }) => ({
    color: '#ffb001',
    padding: '0px 20px',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    gap: '8px',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    svg: { width: '18px', height: '18px' }
}));

const EmailText = styled(Typography)(({ theme }) => ({
    color: '#ffb001',
    padding: '0px 20px',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    gap: '8px',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    svg: { width: '18px', height: '18px' }
}));

const Icons = [
    {
        icon: <IconBrandTelegram />,
        to: '#'
    },
    {
        icon: <IconBrandFacebook />,
        to: '#'
    },
    {
        icon: <IconBrandInstagram />,
        to: '#'
    },
    {
        icon: <IconBrandYoutube />,
        to: '#'
    },
    {
        icon: <IconBrandWhatsapp />,
        to: '#'
    }
];
// ==============================|| Footer Menu LAYOUT ||============================== //
export const HeaderTopMenu = () => {
    const theme = useTheme();
    const notifications = useAppSelector((state: any) => state.store.notifications);
    return (
        <Grid
            sx={{
                background: '#212129',
                position: 'relative',
                top: '0px',
                display: 'flex',
                width: '100%',
                color: '#fff',
                padding: '8px 14px',
                justifyContent:'flex-end',
                [theme.breakpoints.down('sm')]: {
                    justifyContent: 'flex-end',
                }
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 1.5, sm: 1.5, md: 1.5 }}
                sx={{ fontWight: '400', fontSize: '14px', color: '#fff', width:'100%' }}
            >
                <Marquee style={{ fontWeight: '400', width:'100%', height:'30px', }}   speed={70} >
                    {notifications &&
                        notifications?.map((n:any) => {
                            return <Typography sx={{padding:'0px 20px', fontSize:'14px', fontWeight:'400'}}>{n.notificationName}</Typography>;
                        })}
                </Marquee>
            </Stack>
            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <PhoneNumber sx={{}}>
                        <IconPhoneCall />
                        +1 409-344-3513
                    </PhoneNumber>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <EmailText sx={{}}>
                        <IconMail />
                        papaswillow@gmail.com
                    </EmailText>
                </Box>
            </Stack>

            <SocialIcons direction="row" alignItems="center" sx={{ paddingTop: '5px' }} spacing={{ xs: 1.5, sm: 1.5, md: 1.5 }}>
                {Icons.map(({ icon, to }) => (
                    <IconButton aria-label="" href={to} target="_blank" sx={{ color: '#ffb001', padding: '0px', fontSize: '10px' }}>
                        {icon}
                    </IconButton>
                ))}
            </SocialIcons>
        </Grid>
    );
};
