import { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config/apiEndpoints';

const apiClient = axios.create({
    baseURL: ENDPOINTS.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getUser = (username, password) => {
    return apiClient.get(ENDPOINTS.GET_USER, {
        params: {
            username,
            password
        }
    });
};

const getByEmail = async (email) => {
    return apiClient.get(ENDPOINTS.GET_BY_EMAIL, {
        params: { email }
    });
};

const createUser = (userData) => {
    return apiClient.post(ENDPOINTS.ADD_USER, userData);
};

const updatePassword = async (uid, password) => {
    return apiClient.put(`${ENDPOINTS.UPDATE_PASSWORD}?uid=${uid}&password=${password}`);
};


const useUserServices = () => {
    const [user, setUser] = useState(null);
    const [errorUserServices, setErrorUserServices] = useState(null);

    const getUser = async (username, password) => {
        try {
            const response = await apiClient.get(ENDPOINTS.GET_USER, {
                params: { username, password }
            });
            setUser(response.data);
            setErrorUserServices(null);
        } catch (errorUserServices) {
            setErrorUserServices('User not found');
            setUser(null);
        }
    };

    const getUserByEmail = async (email) => {
        try {
            const response = await getByEmail(email);
            setUser(response.data);
            setErrorUserServices(null);
        } catch (errorUserServices) {
            setErrorUserServices('User not found');
            setUser(null);
        } 
    };

    const addUser = async (userData) => {
        try {
            const response = await createUser(userData);
            setUser(response.data);
            setErrorUserServices(null);
        } catch (errorUserServices) {
            setErrorUserServices('User not added');
            setUser(null);
        }
    };
 
    const changePassword = async (uid, password) => {
        try {
            await updatePassword(uid, password);
            setErrorUserServices(null);
        } catch (errorUserServices) {
            setErrorUserServices('Password update failed');
        }
    };

    return { user, errorUserServices, getUser, addUser, changePassword, getUserByEmail };
};

export default useUserServices;
