import React from 'react'
import { StyleSheet, View, Text } from "react-native"

export default function HomeScreenView() {
    return (
        <View style={styles.container}>
            <View>
                <Text>Home Page</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})