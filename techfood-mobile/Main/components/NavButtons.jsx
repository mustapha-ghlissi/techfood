import React from 'react'
import { View, Text, Platform,
    TouchableNativeFeedback, TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';


const NavButtons = ({onPrevPress, onNextPress, disabledPrev, paymentProcess}) => {

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
                onPress={onPrevPress}
                disabled={disabledPrev}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: disabledPrev ? '#D1D1D1' : '#93AF00',
                    padding: 10,
                }}>
                    <Icon name='chevron-left' size={24} color='white'/>
                    <Text style={{
                        fontFamily: 'Poppins-SemiBold',
                        textTransform: 'uppercase',
                        marginLeft: 5,
                        color: '#fff'
                    }}>
                        {t('prev')}
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
                onPress={onNextPress}
            >
                { paymentProcess ?
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#93AF00',
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins-SemiBold',
                            textTransform: 'uppercase',
                            marginRight: 5,
                            color: '#fff',
                        }}>
                             {t('pay')}
                        </Text>
                        <Icon name='credit-card' size={24} color='white'/>
                    </View>:
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#93AF00',
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins-SemiBold',
                            textTransform: 'uppercase',
                            marginRight: 5,
                            color: '#fff'
                        }}>
                            {t('next')}
                        </Text>
                        <Icon name='chevron-right' size={24} color='white'/>
                    </View>
                }
            </TouchableNativeFeedback>
        </View>:
        <View 
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity
                onPress={onPrevPress}
                activeOpacity={0.7}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: disabledPrev ? '#D1D1D1' : '#93AF00',
                    padding: 10,
                    flex: 1
                }}
                disabled={disabledPrev}
            >   
                <Icon name='chevron-left' size={24} color='white'/>
                <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'uppercase',
                    marginLeft: 5,
                    color: '#fff'
                }}>
                    {t('prev')}
                </Text>
            </TouchableOpacity>
            <View 
                style={{
                    width: 1,
                    backgroundColor: 'white'
                }}
            />
            { paymentProcess ?
            <TouchableOpacity
                onPress={onNextPress}
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
                <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'uppercase',
                    marginRight: 5,
                    color: '#fff'
                }}>
                    {t('pay')}
                </Text>
                <Icon name='credit-card' size={24} color='white'/>
            </TouchableOpacity>:
            <TouchableOpacity
                onPress={onNextPress}
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
                <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'uppercase',
                    marginLeft: 5,
                    color: '#fff'
                }}>
                    {t('next')}
                </Text>
                <Icon name='chevron-right' size={24} color='white'/>
            </TouchableOpacity>
            }
        </View>
       
    )
}

export default NavButtons
