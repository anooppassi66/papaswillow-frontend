import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
// import Roulette from 'assets/images/papaslogo.jpg';
//import Roulette from 'assets/images/PSW-LOGO.png';
import Roulette from 'assets/images/logo-papaswillow.png';
import MobileLogo from 'assets/images/PSW-LOGO-Mobile1.png';
import Stack from '@mui/material/Stack';
import { styled, Theme } from '@mui/material/styles';



// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';




const LogoView = styled(Stack)(({ theme }) => ({
'.wedview':{

    [theme.breakpoints.down('sm')]: {
     display:'none',
    },
},
'.mobileview':{
    [theme.breakpoints.up('sm')]: {
        display:'none',
       },
}




}));

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <LogoView>
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo" className='' sx={{alignItems:'center', display:'flex', position:'relative', top:'0px'}}>
       {/* <Logo /> */}
       <img className="cover 333 wedview" src={Roulette} alt="" style={{ borderRadius: '0px', height:'100px' }} />
       <img className="mobileview " src={MobileLogo} alt="" style={{ borderRadius: '0px', height: '70px' }} />
    </Link>
    </LogoView>
);

export default LogoSection;
