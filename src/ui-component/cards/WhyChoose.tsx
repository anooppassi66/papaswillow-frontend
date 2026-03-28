// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, Theme } from '@mui/material/styles';

// third-party

import Stack from '@mui/material/Stack';

import { IconPlaneTilt, IconThumbUp, IconLock, IconTags } from '@tabler/icons-react';

// =============================|| LANDING - FRAMWORK SECTION ||============================= //

interface Whychoose {
    theme: Theme;
}

const Whychoose = styled(Box)(({ theme }: Whychoose) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
        marginBottom: '0px'
    },
    '.whychoosebox': {
        background: '#212129',
        width: '100%',
        color: '#f89b35',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        outline: '5px solid #212129',
        border: '2px solid rgba(164, 172, 179, 0.4)',
        h5: {
            fontSize: '18px',
            fontWight: '500',
            color: '#fff',
            position: 'relative',
            ':after': {
                content: '""',
                width: '80px',
                height: '2px',
                background: '#f89b35',
                position: 'absolute',
                left: '50%',
                bottom: '-8px',
                marginLeft: '-35px'
            }
        },
        svg: { fontSize: '30px', height: '40px', width: '40px' },
        p: { fontSize: '12px', fontWight: '600', color: '#fff', paddingTop: '15px' }
    }
}));

const WhyChoose = () => {
    const theme = useTheme();

    return (
        <>
            <Container
                className=""
                sx={{
                    padding: '10px 0px !important',
                    [theme.breakpoints.down('sm')]: {
                        padding: '10px 15px !important'
                    },
                    [theme.breakpoints.down('md')]: {
                        padding: '10px 15px !important'
                    }
                }}
            >
                {/* <FadeInWhenVisible> */}
                <>
                    <Box
                        sx={{
                            color: '#fff',
                            fontSize: '28px',
                            fontWeight: '600',
                            textAlign: 'center',
                            padding: '20px',
                            marginBottom: '20px',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '22px',
                                margin: '0px 0px 10px 0px'
                            }
                        }}
                    >
                        Why Choose
                    </Box>
                    <Whychoose>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Stack className="whychoosebox">
                                    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }}>
                                        <IconTags />
                                    </Stack>
                                    <Stack sx={{ padding: '20px 10px' }}>
                                        <Typography variant="h5">Cricket Exclusive</Typography>
                                        <Typography>20000+ Products</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Stack className="whychoosebox">
                                    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }}>
                                        <IconPlaneTilt />
                                    </Stack>
                                    <Stack sx={{ padding: '20px 10px' }}>
                                        <Typography variant="h5">World Wide Shipping </Typography>
                                        <Typography>Door Delivery</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Stack className="whychoosebox">
                                    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }}>
                                        <IconThumbUp />
                                    </Stack>
                                    <Stack sx={{ padding: '20px 10px' }}>
                                        <Typography variant="h5">Lowest Price </Typography>
                                        <Typography>Reward Points & Discounts</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Stack className="whychoosebox">
                                    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }}>
                                        <IconLock />
                                    </Stack>
                                    <Stack sx={{ padding: '20px 10px' }}>
                                        <Typography variant="h5">100% Secured Payments </Typography>
                                        <Typography>We value your Security</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Whychoose>
                </>
                {/* </FadeInWhenVisible> */}
            </Container>
        </>
    );
};

export default WhyChoose;
