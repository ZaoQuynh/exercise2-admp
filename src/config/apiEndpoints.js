const API_BASE_URL = "https://admp-api.onrender.com/api/v1"

export const ENDPOINTS = {
    // User Endpoints
    GET_USER: `${API_BASE_URL}/user/get-user`,
    GET_BY_EMAIL: `${API_BASE_URL}/user/get-by-email`,
    ADD_USER: `${API_BASE_URL}/user/add-user`,
    UPDATE_PASSWORD: `${API_BASE_URL}/user/update-password`,
    // OTP Endpoints
    SEND_OTP: `${API_BASE_URL}/otp/send`,
    VERIFY_OTP: `${API_BASE_URL}/otp/verify`,
}