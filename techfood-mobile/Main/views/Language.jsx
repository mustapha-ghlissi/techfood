import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, StatusBar, Platform, TouchableNativeFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../assets/style'
import { Text, IconButton } from 'react-native-paper'
import images from '../assets/images'
import { handleLanguage } from '../actions/actionCreators';
import { withTranslation } from 'react-i18next';

class Language extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'fr'
        }
    }

    switchLanguage = (lang) => {
        let {i18n} = this.props;
        this.setState({
            language: lang,
        }, () => i18n.changeLanguage(lang))
    }

    render() {

        let {language} = this.state, {setLanguage, t} = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C' />
                <View style={{
                    flex: 1, 
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20
                }}>
                    <Text style={{
                        fontSize: 17
                    }}> 
                        {t('selectLang')}
                    </Text>

                    {
                        Platform.OS === 'android' ?
                        <View
                            style={innerStyles.langs}
                        >
                            <TouchableNativeFeedback
                                onPress={() => this.switchLanguage('fr')}  
                                background={TouchableNativeFeedback.Ripple('#1C246C')}
                                useForeground
                            >
                                <View 
                                    style={[innerStyles.lang, language === 'fr' && innerStyles.active ]}
                                      
                                >
                                    <Image 
                                        source={images.france}
                                        style={{width: 24, height: 24, marginRight: 5}}
                                        resizeMode='contain'
                                    />
                                    <Text style={language === 'fr'? innerStyles.activeText : {}}>{t('french')}</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={() => this.switchLanguage('en')}    
                                background={TouchableNativeFeedback.Ripple('#1C246C')}
                                useForeground
                            >
                            <View 
                                style={[innerStyles.lang, language === 'en' && innerStyles.active ]}
                            >
                                <Image 
                                    source={images.usa}
                                    style={{width: 24, height: 24, marginRight: 5}}
                                    resizeMode='contain'
                                />
                                <Text style={language === 'en'? innerStyles.activeText : {}}>{t('english')}</Text>
                            </View>
                            </TouchableNativeFeedback>
                        </View>
                        :
                        <View
                            style={innerStyles.langs}
                        >
                            <TouchableOpacity 
                                style={[innerStyles.lang, language === 'fr' && innerStyles.active ]}
                                onPress={() => this.switchLanguage('fr')}    
                            >
                                <Image 
                                    source={images.france}
                                    style={{width: 24, height: 24, marginRight: 5}}
                                    resizeMode='contain'
                                />
                                <Text style={language === 'fr'? innerStyles.activeText : {}}>{t('french')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[innerStyles.lang, language === 'en' && innerStyles.active ]}
                                onPress={() => this.switchLanguage('en')}    
                            >
                                <Image 
                                    source={images.usa}
                                    style={{width: 24, height: 24, marginRight: 5}}
                                    resizeMode='contain'
                                />
                                <Text style={language === 'en'? innerStyles.activeText : {}}>{t('english')}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0, 
                    right: 10,
                    left: 10,
                    zIndex: 999,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 10
                }}>
                    
                    <IconButton
                        icon='chevron-right'
                        style={{
                            backgroundColor: '#1C246C'
                        }}
                        color='#fff'
                        onPress={() => setLanguage(language)}
                        size={32}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const innerStyles = StyleSheet.create({
    langs: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginTop: 30
    },
    lang: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        flex: 1, 
        marginHorizontal: 5,
        borderRadius: 5,
        overflow: 'hidden'
    },
    active: {
        backgroundColor: '#1C246C',
    },
    activeText: {
        color: 'white'
    }
})

const mapStateToProps = ({main}) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    setLanguage: (lang) => dispatch(handleLanguage(lang))  
})

Language = withTranslation()(Language);

export default connect(mapStateToProps, mapDispatchToProps)(Language);
