import { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config/apiEndpoints';

const apiClient = axios.create({
    baseURL: ENDPOINTS.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const sendOtp = async (email) => {
    try {
        const response = await apiClient.post(`${ENDPOINTS.SEND_OTP}?email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to send OTP: ' + error.message);
    }
};

const verifyOtp = async (email, otp) => {
    try {
        const response = await apiClient.post(`${ENDPOINTS.VERIFY_OTP}?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error('Invalid OTP or failed to verify OTP: ' + error.response.data);
        } else {
            throw new Error('Invalid OTP or failed to verify OTP: ' + error.message);
        }
    }
};

const useOtpServices = () => {
    const [errorOtpServices, setErrorOtpServices] = useState(null)

    const handleSendOtp = async (email) => {
        setErrorOtpServices(null);

        try {
            await sendOtp(email);
        } catch (errorOtpServices) {
            setErrorOtpServices(errorOtpServices.message);
        } 
    };

    const handleVerifyOtp = async (email, otp) => {
        try {
            await verifyOtp(email, otp);
            setErrorOtpServices(null);
        } catch (errorOtpServices) {
            setErrorOtpServices(errorOtpServices.message);
        } 
    };

    return { handleSendOtp, handleVerifyOtp, errorOtpServices };
};

export default useOtpServices;
