import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Thêm hook điều hướng

export default function HomeScreenView() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation(); 

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    phoneNumber: phoneNumber,
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Registration successful');
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Registration failed');
            }
        } catch (error) {
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
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.btn_register} onPress={handleRegister}>
                    <Text style={styles.btn_text}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_login} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.btn_text}>Already have an account? Login</Text>
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
    btn_login: {
        backgroundColor: '#5c5c5c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        margin: 10,
    },
    btn_text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
