// material-ui
import { Margin } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard, { MainCardProps } from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ cardWidth, children, ...other }: MainCardProps) => {
    const theme = useTheme();
    console.log(cardWidth); return (
        <MainCard
            sx={{
                maxWidth: {  xs: 400, lg: cardWidth ? parseInt(cardWidth) :  475 },
                margin: { xs: 2.5, md: 3 },
                //bgcolor:'#ff0',
                boxShadow:'none',
                [theme.breakpoints.down('sm')]: {
                    margin:'20px 0px 0px 0px'
                },
                '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%',
                    bgcolor:'#fff',
                    
                }
            }}
            content={false}
            {...other}
        >
            <Box sx={{ p: { xs: 2, sm: 0, xl: 0,  } }}>{children}</Box>
        </MainCard>
    )
};

export default AuthCardWrapper;
