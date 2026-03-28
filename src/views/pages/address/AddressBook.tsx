import React from 'react';
import Grid from '@mui/material/Grid';

import BillingAddress from '../cart/BillingAddress';

const AddressBook = () => { 
    return(<>
    <Grid container sx={{width:'1300px', margin:'0px auto', position:'relative', paddingTop:'40px'}}>
    <BillingAddress />
    </Grid>
    </>)
};

export default AddressBook;
