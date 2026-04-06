import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';

import ThemeCustomization from 'themes';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    const [popupOpen, setPopupOpen] = useState(true);
     const handleClosePopup = () => {
        setPopupOpen(false);
    };
    const handleOpenPopup = () => {
        setPopupOpen(true);
    };
    return (
        
        <ThemeCustomization>
            <Dialog onClose={handleClosePopup}>
                <DialogTitle sx={{ pb: 1 }}>Game Break! 🏏</DialogTitle>
                <DialogContent>
                    Our website is under maintenance and will be back stronger soon.
                    Meanwhile, you can place your orders by calling <a href="tel:+1 (409) 344-3513">+1 (409) 344-3513</a>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <RTLLayout> */}
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <>
                            <Notistack>
                                <RouterProvider router={router} onClick={handleOpenPopup} />
                                <Snackbar />
                            </Notistack>
                        </>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
            {/* </RTLLayout> */}
        </ThemeCustomization>
    );
};

export default App;
