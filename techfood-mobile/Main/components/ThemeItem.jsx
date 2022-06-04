import React from 'react'
import { View, Platform, 
    TouchableNativeFeedback, TouchableOpacity,
    Image
} from 'react-native'
import {
    Text
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const ThemeItem = ({parentWidth, site}) => {

    const {t} = useTranslation();
    const navigation = useNavigation();

    return(
    
    Platform.OS === 'android' ?
    <TouchableNativeFeedback
        onPress={() => navigation.navigate('ThemeDetails', {site})}
        useForeground
    >
        <View style={{
            width: parentWidth / 3 - 10,
            margin: 5,
            backgroundColor: '#fff',
            borderRadius: 5,
            overflow: 'hidden',

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,       
        }}>
            <Image 
                source={site.image}
                style={{
                    width: '100%',
                    height: parentWidth / 3 - 20
                }}
                resizeMode='cover'
            />
            <Text style={{
                textAlign: 'center',
                marginTop: 5
            }}>
                {_.capitalize(t(site.title))}
            </Text>
        </View>
    </TouchableNativeFeedback>
    :
    <TouchableOpacity
        onPress={() => navigation.navigate('ThemeDetails', {site})}
        activeOpacity={0.7}
        style={{
            width: parentWidth / 3 - 10,
            margin: 5,
            backgroundColor: '#fff',
            borderRadius: 5,
            overflow: 'hidden',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,       
        }}
    >
         
            <Image 
                source={site.image}
                style={{
                    width: '100%',
                    height: parentWidth / 3 - 20
                }}
                resizeMode='cover'
            />
            <Text style={{
                textAlign: 'center',
                marginTop: 5
            }}>
               {_.capitalize(t(site.title))}
            </Text>
    </TouchableOpacity>
)
}


export default ThemeItem
