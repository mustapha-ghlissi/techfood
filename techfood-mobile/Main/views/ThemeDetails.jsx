import React, { Component } from 'react'
import { SafeAreaView, View, Image, Platform,
    TouchableNativeFeedback, TouchableOpacity,
    Linking,
    Alert,
    ScrollView,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import {Text, Button, Divider, Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../assets/style'
import ThemeButton from '../components/ThemeButton';
import images from '../assets/images';
import { handleChangeText } from '../actions/actionCreators';
import { withTranslation } from 'react-i18next';

class ThemeDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }    

    render() {

        let {navigation, route, handleText, t} = this.props, {site} = route.params;
        

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
                <ScrollView contentContainerStyle={{flexGrow: 1, padding: 10}}>
                    <View style={{
                        backgroundColor: 'white',
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
                        marginBottom: 10 
                    }}>
                        <Image 
                            source={site.image}
                            style={{
                                height: 180,
                                width: '100%'
                            }}
                            resizeMode='cover'
                        />

                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 30,
                            paddingHorizontal: 10,
                            backgroundColor: '#F1F1F1',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Icon 
                                name='timer'
                                size={32}
                                
                            />
                            <Text style={{
                                fontFamily: 'Poppins-Bold',
                            }}>
                                {t('estimatedTime')}
                            </Text>
                            <Text style={{
                                fontFamily: 'Poppins-Bold',
                                marginLeft: 5,
                                fontSize: 19
                            }}>
                                9h
                            </Text>
                        </View>

                   
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 10
                        }}>
                                <Image 
                                    source={images.siteName}
                                    style={{
                                        width: 48,
                                        height: 48
                                    }}
                                    resizeMode='contain'
                                />

                                <Text> 
                                    {t('siteCreation')}
                                </Text>

                                <Badge style={{alignSelf: 'auto', backgroundColor: '#F1F1F1', fontSize: 13}}>
                                    2h
                                </Badge>
                        </View>
                        <Divider />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 10
                        }}>
                                <Image 
                                    source={images.home}
                                    style={{
                                        width: 48,
                                        height: 48
                                    }}
                                    resizeMode='contain'
                                />

                                <Text> 
                                    {t('home')}
                                </Text>

                                <Badge style={{alignSelf: 'auto', backgroundColor: '#F1F1F1', fontSize: 13}}>
                                    2h
                                </Badge>
                        </View>
                        <Divider />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 10
                        }}>
                                <Image 
                                    source={images.service}
                                    style={{
                                        width: 48,
                                        height: 48
                                    }}
                                    resizeMode='contain'
                                />

                                <Text> 
                                {t('services')}
                                </Text>

                                <Badge style={{alignSelf: 'auto', backgroundColor: '#F1F1F1', fontSize: 13}}>
                                    2h
                                </Badge>
                        </View>
                        <Divider />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 10
                        }}>
                                <Image 
                                    source={images.history}
                                    style={{
                                        width: 48,
                                        height: 48
                                    }}
                                    resizeMode='contain'
                                />

                                <Text> 
                                {t('about')}
                                </Text>

                                <Badge style={{alignSelf: 'auto', backgroundColor: '#F1F1F1', fontSize: 13}}>
                                    2h
                                </Badge>
                        </View>
                        <Divider />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 10
                        }}>
                                <Image 
                                    source={images.contact}
                                    style={{
                                        width: 48,
                                        height: 48
                                    }}
                                    resizeMode='contain'
                                />

                                <Text> 
                                {t('contact')}
                                </Text>

                                <Badge style={{alignSelf: 'auto', backgroundColor: '#F1F1F1', fontSize: 13}}>
                                    1h
                                </Badge>
                        </View>
                        
                    
                    
                    </View>
                </ScrollView>
            
            
                <ThemeButton onPress={() => {
                    handleText('theme', t(site.title), 'orderForm');
                    handleText('themeUrl', site.url, 'orderForm');
                    handleText('themeImage', site.imageName, 'orderForm');
                    navigation.navigate('SiteDetails', {pageName: t('siteConfig')});
                }} />
            </SafeAreaView>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'orderForm')),
})

ThemeDetails = withTranslation()(ThemeDetails);

export default connect(null, mapDispatchToProps)(ThemeDetails);
