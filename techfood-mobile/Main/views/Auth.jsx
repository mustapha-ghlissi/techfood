import React from 'react'
import { ScrollView, View, SafeAreaView, Image, StyleSheet, StatusBar } from 'react-native'
import styles from '../assets/style'
import images from '../assets/images'
import { Text, Button } from 'react-native-paper'
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const Auth = ({navigation}) => {
    const {t} = useTranslation();
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#1C246C'/>
            <ScrollView contentContainerStyle={{flexGrow: 1, padding: 20}}>
                <Image 
                    source={images.logo}
                    style={styles.logo}
                    resizeMode='contain'
                />
                <Text style={{
                    fontFamily: 'Poppins-MediumItalic',
                    fontSize: 19,
                    marginBottom: 30,
                    textAlign: 'center'
                }}>
                    {t('authTitle')}
                </Text>

                <View style={{flex: 1, paddingHorizontal: 10}}>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Login')}
                        contentStyle={styles.button}
                        style={innerStyles.button}
                    >
                        {t('login')}
                    </Button>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Register')}
                        contentStyle={styles.button}
                        style={innerStyles.button}
                    >
                        {t('signup')}
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const innerStyles = StyleSheet.create({
    button: {
        marginBottom: 10
    }
})

export default Auth
