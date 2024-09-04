import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import useUserServices from '../services/UserServices';
import useOtpServices from '../services/OtpServices';
import { useNavigation } from '@react-navigation/native';

export default function ResetPasswordScreen() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [existsAccount, setExistsAccount] = useState(false);
    const { user, errorUserServices, getUserByEmail, changePassword} = useUserServices();
    const { handleSendOtp, handleVerifyOtp, errorOtpServices} = useOtpServices();
    const navigation = useNavigation();

    // Handle OTP request
    const handleGetOTP = async () => {
        setLoading(true);
        setExistsAccount(false);
        try {
            await getUserByEmail(email);
            
            if (user) { 
                await handleSendOtp(email);
                setExistsAccount(true);
                Alert.alert('Success', 'OTP has been sent to your email');
            } else {
                setExistsAccount(false);
                Alert.alert('Error', 'No account exists with this email');
            }
            setLoading(false);
        } catch (errorUserServices) {
            setLoading(false);
            setExistsAccount(false);
            Alert.alert('Error',  errorUserServices.message);
        }
    };

    // Handle password reset
    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await handleVerifyOtp(email, otp);

            if (errorOtpServices) {
                Alert.alert('Error', errorOtpServices);
            } else {
                try {
                    await changePassword(user.id, newPassword);
                    Alert.alert('Success', 'Password reset successfully');                   
                    navigation.navigate('Login');
                } catch (errorUserServices) {
                    Alert.alert('Error', errorUserServices.message);
                }
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }

        setLoading(false);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
            />
            {!existsAccount && (
            <TouchableOpacity style={styles.button} onPress={handleGetOTP} disabled={loading}>
            
                <Text style={styles.buttonText}>
                    {loading ? 'Sending...' : 'Get OTP'}
                </Text>
            </TouchableOpacity>
            )}
            

            {existsAccount && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        value={otp}
                        onChangeText={setOtp}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button} onPress={handleGetOTP} disabled={loading}>
                        <Text style={styles.buttonText}>Resend OTP</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#FF5C5C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
