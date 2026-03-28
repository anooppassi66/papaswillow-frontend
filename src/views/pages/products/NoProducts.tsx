import { useSelector } from 'store';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import EmptyCartIcon from 'assets/images/product/no-product.png';



// =============================|| Fetured SECTION ||============================= //

const HeaderTitle = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    
    [theme.breakpoints.down('sm')]: {
        height: '30px',
        padding: '10px 10px',
        top: '-15px'
    },
   
   
}));
const EmptyCartLink = styled(Link)(({ theme }) => ({
    background: '#f89b35',
    width: 'auto',
    color: '#212121',
    padding: '5px 15px',
    fontWeight: '600',
    fontSize: '12px',
    marginTop: '20px',
    textDecoration: 'none',
    borderRadius: '4px',
    ':hover': { textDecoration: 'none' }
}));




export const NoProducts = ( ) => {
    const theme = useTheme();
    return (
        <>
            <Container sx={{ background: '#00000080', padding: '0px !important',
                [theme.breakpoints.down('sm')]: {
                    padding: '0px  15px !important',
                }
                
              }}>
                
                <Stack
                                sx={{
                                    background: '#ddd9d9',
                                    border: '2px solid #fff',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '400px'
                                }}
                            >
                                <img src={EmptyCartIcon} alt="" width="200" />
                                <Typography sx={{ color: '#000', paddingTop: '40px', fontWeight: '400', fontSize: '14px' }}>
                                     No Products Found!
                                </Typography>
                                <EmptyCartLink to="/" underline="hover" component={RouterLink}>
                                    {' '}
                                    Continue shopping
                                </EmptyCartLink>
                            </Stack>
            </Container>
        </>
    );
};
