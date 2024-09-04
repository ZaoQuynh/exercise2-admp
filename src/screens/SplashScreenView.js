import React, { useEffect } from 'react'
import { StyleSheet, View, Text, StatusBar, Image, Dimensions } from "react-native"
import Avatar from '../../assets/avatar.png'
import LottieView from 'lottie-react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'; 

export default function SplashScreenView() {
    const navigation = useNavigation(); 
    const isFocused = useIsFocused();

    useEffect(() => {
        let timer;

        if (isFocused) {
            timer = setTimeout(() => {
                navigation.navigate('Login');
            }, 1000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer); 
            }
        };
    }, [isFocused, navigation]); 

    return (
        <View style={styles.body}>
        <LottieView  
            style={styles.backgroundAnimation}
            source={require('../../assets/animation/background.json')} 
            autoPlay 
            loop />
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image source={Avatar} style={styles.image}/>           
                    <Text>Nguyen Ha Quynh Giao (Zao)</Text>
                    <Text>Student ID: 21110171</Text>
                </View>
                <StatusBar style="auto" />
                <View style={styles.welcome_container}>
                    <Text style={styles.welcome_message}>WELCOME TO MY APP!</Text>
                    <View style={styles.location}>
                        <Text>Viet Nam</Text>
                        <LottieView  
                            style={{width: 30, height: 30}}
                            source={require('../../assets/animation/location.json')} 
                            autoPlay 
                            loop />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#000'
    },
    backgroundAnimation: {
        flex: 1,
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    container : {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 100
    },
    profile: {
        alignItems: 'center',
        marginBottom: 20
    },    
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'contain'   
    },
    welcome_container: {
        alignItems: 'center'
    },
    welcome_message: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'white'
    }
})