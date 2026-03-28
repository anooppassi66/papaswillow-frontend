import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports

import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from './auth-forms/AuthLogin';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = ({ forceOpen }: { forceOpen: Function }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container direction="column" justifyContent="flex-end" sx={{}}>
            <Grid item xs={12} className="232323">
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item sx={{ padding: '0px' }}>
                        <AuthCardWrapper className="333333" cardWidth="380">
                            <Grid className="1111" container spacing={0} alignItems="center" justifyContent="center">
                                {/* <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}
                                <Grid className="565656" item xs={12}>
                                    <AuthLogin />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item container direction="column" alignItems="center" xs={12}>
                                        <Button
                                            onClick={() => forceOpen('register')}
                                            sx={{
                                                background: 'none',
                                                color: '#000',
                                                //color: theme.palette.dark.dark,
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                ':hover': {
                                                    background: 'none'
                                                }
                                            }}
                                        >
                                            Don&apos;t have an account?
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AuthCardWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
