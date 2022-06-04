import React from 'react'
import { 
    View, Platform, 
    TouchableNativeFeedback, 
    TouchableOpacity, Image, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import _ from 'lodash';
import images from '../assets/images';
import { useTranslation } from 'react-i18next';

const OrderItem = ({order}) => {
    const navigation = useNavigation();
    const {t} = useTranslation();

    return (
        Platform.OS === 'android' ?
        <View
            style={{
                backgroundColor: 'white',
                borderBottomColor: '#F1F1F1',
                borderBottomWidth: 1,
            }}
        >
            <TouchableNativeFeedback
                onPress={() => {
                    if(order.status === 0) {
                        Alert.alert('Info', t('pendingMsg'))
                    }
                    else if(order.status === -1) {
                        return;
                    }
                    else {
                        navigation.navigate('OrderDetails', {order});
                    }
                }}
                useForeground
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    overflow: 'hidden'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        top: 10,
                        right: 10,
                        position: 'absolute',
                        backgroundColor: order.status === 2 ? '#93AF00' : order.status === 1 ? 'orange' : order.status === 0 ? 'gray' : 'red',
                        borderRadius: 25
                    }}>
                        {order.status === 2 ?     
                            <>
                                <Icon name='check-circle' size={12} color='white' />
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    marginLeft: 2.5, 
                                }}>
                                    {t('finished')}
                                </Text>
                            </>:

                            order.status === 1 ?
                            <>
                                <Icon name='timer' size={12} color='white' />
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    marginLeft: 2.5
                                }}>
                                   {t('inProgress')}
                                </Text>
                            </>:
                            order.status === 0 ?
                            <>
                                <Icon name='timer-sand' size={12} color='white' />
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    marginLeft: 2.5
                                }}>
                                    {t('pending')}
                                </Text>
                            </>:
                            <>
                            <Icon name='close' size={12} color='white' />
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    marginLeft: 2.5
                                }}>
                                    {t('cancelled')}
                                </Text>
                            </>
                        

                        }
                        
                    </View>
                    <Image 
                        source={images.sites[order.themeImage]}
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 5
                        }}
                        resizeMode='cover'
                    />
                    <View style={{
                        paddingHorizontal: 10,
                        flex: 1
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center'
                        }}>
                            <Icon name='calendar' size={16} />
                            <Text style={{fontSize: 12, marginLeft: 5}}>
                                {moment(order.createdAt).format('YYYY-MM-DD')}
                            </Text>
                        </View>
                        <View style={{
                            fontSize: 12,
                            flexDirection: 'row',
                            flex: 1
                        }}>
                            <Icon name='palette-outline' size={16} />
                            <Text style={{fontSize: 12, marginLeft: 5}}>{_.capitalize(order.theme)}</Text>
                        </View>
                        <View style={{
                            fontSize: 12,
                            flexDirection: 'row',
                            flex: 1
                        }}>
                            <Icon name='web' size={16} />
                            <Text style={{fontSize: 12, marginLeft: 5}}>{order.siteName}</Text>
                        </View>
                        
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>:
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                if(order.status === 0) {
                    Alert.alert('Info', t('pendingMsg'))
                }
                else if(order.status === -1) {
                    return;
                }
                else {
                    navigation.navigate('OrderDetails', {order});
                }
            }}
            style={{
                backgroundColor: 'white',
                borderBottomColor: '#F1F1F1',
                borderBottomWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                overflow: 'hidden'
            }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        top: 10,
                        right: 10,
                        position: 'absolute',
                        backgroundColor: order.status === 2 ? '#93AF00' : order.status === 1 ? 'orange' : order.status === 0 ? 'gray' : 'red',
                        borderRadius: 25
                    }}>
                       {order.status === 2 ?     
                            <>
                                <Icon name='check-circle' size={12} color='white' />
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    marginLeft: 2.5
                                }}>
                                    {t('finished')}
                                </Text>
                            </>:

                            order.status === 1 ?
                            <>
                                <Icon name='timer' size={12} color='white' />
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    marginLeft: 2.5
                                }}>
                                   {t('inProgress')}
                                </Text>
                            </>:
                            order.status === 0 ?
                            <>
                                <Icon name='timer-sand' size={12} color='white' />
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    marginLeft: 2.5
                                }}>
                                   {t('pending')}
                                </Text>
                            </>:
                            <>
                            <Icon name='close' size={12} color='white' />
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    marginLeft: 2.5
                                }}>
                                    {t('cancelled')}
                                </Text>
                            </>
                        

                        }
                    </View>
                    <Image 
                        source={images.sites[order.themeImage]}
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 5
                        }}
                        resizeMode='cover'
                    />
                    <View style={{
                        paddingHorizontal: 10,
                        flex: 1
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center'
                        }}>
                            <Icon name='calendar' size={16} />
                            <Text style={{fontSize: 12, marginLeft: 5}}>{moment(order.createdAt).format('YYYY-MM-DD')}</Text>
                        </View>
                        <View style={{
                            fontSize: 12,
                            flexDirection: 'row',
                            flex: 1
                        }}>
                            <Icon name='palette-outline' size={16} />
                            <Text style={{fontSize: 12, marginLeft: 5}}>{_.capitalize(order.theme)}</Text>
                        </View>
                        <View style={{
                            fontSize: 12,
                            flexDirection: 'row',
                            flex: 1
                        }}>
                            <Icon name='web' size={16} />
                            <Text style={{fontSize: 12, marginLeft: 5}}>{order.siteName}</Text>
                        </View>
                        
                    </View>
        </TouchableOpacity>
    )
}

export default OrderItem
