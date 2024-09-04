import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUserServices from '../services/UserServices';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreenView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { user, error, getUser } = useUserServices();
    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await getUser(username, password);
            setLoading(false);

            if (user) {  // Nếu user được lấy thành công
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Invalid credentials');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'An error occurred');
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.login_title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                 <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#5c5c5c" />
                </TouchableOpacity>
            </View>
                
                {loading ? (<ActivityIndicator size="large" color="#FF5C5C" />) : (
                    <TouchableOpacity style={styles.btn_login} onPress={handleLogin}>
                        <Text style={styles.btn_text}>Login</Text>
                    </TouchableOpacity>
                )}

                
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.text_link}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn_register} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.text_link}>Haven't account? <Text style={styles.highlightText}>Register</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login_title: {
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
    btn_login: {
        backgroundColor: '#FF5C5C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        margin: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 25,
    },
    text_link: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    highlightText: {
        color: '#FF5C5C'
    },
});
