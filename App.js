import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreenView from './screens/SplashScreenView';
import LoginScreenView from './screens/LoginScreenView';
import RegisterScreenView from './screens/RegisterScreenView';
import HomeScreenView from './screens/HomeScreenView';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreenView} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreenView} />
                <Stack.Screen name="Register" component={RegisterScreenView} />
                <Stack.Screen name="Home" component={HomeScreenView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
