import React from 'react'
import { SafeAreaView,View, Text, Image, StatusBar, StyleSheet } from 'react-native'
import styles from '../assets/style';
import images from '../assets/images';

const SplashScreen = () => {
    return (
        <SafeAreaView style={[styles.container, innerStyles.container]}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <Image
                source={images.logo}
                style={styles.logo}
                resizeMode='contain'
            />
        </SafeAreaView>
    )
}

const innerStyles = StyleSheet.create({
    container: {
        backgroundColor: '#1C246C', 
        alignItems: 'center', 
        justifyContent:'center'
    }
})

export default SplashScreen
