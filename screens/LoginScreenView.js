import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreenView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const url = `http://172.16.20.210:8080/get-user?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
            const response = await fetch(url, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log('API Response:', result);

                if (result) {
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Error', 'Invalid credentials');
                }
            } else {
                Alert.alert('Error', 'Invalid credentials');
            }
        } catch (error) {
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
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.btn_login} onPress={handleLogin}>
                    <Text style={styles.btn_text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_register} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.btn_text}>Haven't account? Register</Text>
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
    btn_text: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btn_register: {
        backgroundColor: '#5c5c5c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        margin: 10,
    },
});
