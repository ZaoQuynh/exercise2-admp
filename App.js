import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreenView from './src/screens/SplashScreenView';
import LoginScreenView from './src/screens/LoginScreenView';
import RegisterScreenView from './src/screens/RegisterScreenView';
import HomeScreenView from './src/screens/HomeScreenView';
import ForgetPasswordScreenView from './src/screens/ForgetPasswordScreenView';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreenView} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreenView} />
                <Stack.Screen name="Register" component={RegisterScreenView} />
                <Stack.Screen name="Home" component={HomeScreenView} />
                <Stack.Screen name="ForgotPassword" component={ForgetPasswordScreenView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
