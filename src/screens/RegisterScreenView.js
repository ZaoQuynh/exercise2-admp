import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import useUserServices from '../services/UserServices';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreenView() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { user, error, addUser } = useUserServices();
    const navigation = useNavigation(); 

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
    
        const userData = JSON.stringify({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            username: username,
            password: password,
        })
    
        setLoading(true);
        try {
            await addUser(userData);
            setLoading(false);
    
            if (user) {
                Alert.alert('Success', 'Registration successful');
                navigation.navigate('Home');
            } else if (error) {
                Alert.alert('Error', error);
            } else {
                Alert.alert('Error', 'Registration failed');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'An error occurred');
        }
    };
    

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.register_title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full name"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
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
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#5c5c5c" />
                    </TouchableOpacity>
                </View>
                {loading ? (<ActivityIndicator size="large" color="#FF5C5C" />) : (
                    <TouchableOpacity style={styles.btn_register} onPress={handleRegister}>
                        <Text style={styles.btn_text}>Register</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.btn_login} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.text_link}>Already have an account? <Text style={styles.highlightText}>Login</Text></Text>
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
    register_title: {
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
    btn_register: {
        backgroundColor: '#FF5C5C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        margin: 10,
    },
    btn_text: {
        color: '#fff',
        fontWeight: 'bold',
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
    }
});
