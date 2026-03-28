import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Extract relevant data from the callback URL (e.g., query parameters)
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        const paymentStatus = urlParams.get('status');
        console.log(paymentId, 'paymentId');
        // Save payment data to your server
        const savePaymentData = async () => {
            // try {
            //     await axios.post('/api/save-payment', { paymentId, paymentStatus });
            //     // Redirect to the confirmation page after saving
            //     navigate('/confirmation');
            // } catch (error) {
            //     console.error('Error saving payment data:', error);
            //     // Handle error (e.g., show an error message)
            // }
            console.log('paymentId', paymentId);
            navigate('/confirmation');
        };

        if (paymentId && paymentStatus) {
            savePaymentData();
        } else {
            // Handle the case where necessary data is not available
        }
    }, [navigate]);

    return <div>Processing payment...</div>;
}

export default PaymentCallback;
