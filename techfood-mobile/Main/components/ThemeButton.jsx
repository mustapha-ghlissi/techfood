import React from 'react'
import { View, Text, Platform,
    TouchableNativeFeedback, TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const ThemeButton = ({onPress}) => {
    const navigation = useNavigation();
    const {t} = useTranslation();

    return (
        Platform.OS === 'android' ? 
        <View 
            style={{
                flexDirection: 'row',
                alignItems: 'center', 
            }}
        >
            <TouchableNativeFeedback
                useForeground
                onPress={() => navigation.goBack()}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#93AF00',
                    padding: 10,
                }}>
                    <Icon name='chevron-left' size={24} color='white'/>
                    <Text style={{
                        fontFamily: 'Poppins-SemiBold',
                        textTransform: 'uppercase',
                        marginLeft: 5,
                        color: '#fff'
                    }}>
                        {t('back')}
                    </Text>
                </View>
            </TouchableNativeFeedback>
            <View 
                style={{
                    width: 1,
                    backgroundColor: 'white'
                }}
            />
            <TouchableNativeFeedback
                useForeground
                onPress={onPress}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#93AF00',
                    padding: 10,
                }}>
                    <Icon name='check-circle' size={24} color='white'/>
                    <Text style={{
                        fontFamily: 'Poppins-SemiBold',
                        textTransform: 'uppercase',
                        marginLeft: 5,
                        color: '#fff'
                    }}>
                        {t('selectTheme')}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </View>:
        <View 
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#93AF00',
                    padding: 10,
                    flex: 1
                }}
            >   
                <Icon name='chevron-left' size={24} color='white'/>
                <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'uppercase',
                    marginLeft: 5,
                    color: '#fff'
                }}>
                     {t('back')}
                </Text>
            </TouchableOpacity>
            <View 
                style={{
                    width: 1,
                    backgroundColor: 'white'
                }}
            />
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#93AF00',
                    padding: 10,
                    flex: 1
                }}
            >   
                <Icon name='check-circle' size={24} color='white'/>
                <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'uppercase',
                    marginLeft: 5,
                    color: '#fff'
                }}>
                    {t('selectTheme')}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ThemeButton
