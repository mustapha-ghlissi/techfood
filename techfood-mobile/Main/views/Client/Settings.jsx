import React, { Component, Profiler } from 'react'
import { SafeAreaView, View, TouchableOpacity, StatusBar, ScrollView, Platform, TouchableNativeFeedback, StyleSheet, Image } from 'react-native';
import { Button, TextInput, HelperText, Text, RadioButton, IconButton, Snackbar, Divider  } from 'react-native-paper';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../assets/style';
import images from '../../assets/images';
import { object, string, ref } from 'yup';
import { handleSettingsUpdate, handleChangeText, toggleSnackBar, handleLanguage, handleFormErrors } from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';



class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            secureEntries: {
                currentPasswordShown: false,
                newPasswordShown: false,
                confirmPasswordShown: false
            }
        }
    }

    componentDidMount() {
        let {t} = this.props;
        
        this.settingsSchema = object().shape({
            current: string().required(t('required')),
            first: string().required(t('required')),
            second: string().oneOf([ref('first'), null], t('notMatchPassword')).required(t('required'))
        });
    }
    

    toggleSecureEntry = (name) => {
        this.setState((state, props) => ({
            secureEntries: {
                ...state.secureEntries,
                [name]: !state.secureEntries[name]
            }
        }));
    }

    switchLanguage = (lang) => {
        let {i18n, setLanguage} = this.props;
        
        setLanguage(lang, () => i18n.changeLanguage(lang));
    }

    componentWillUnmount() {
        this.props.handleErrors();
    }

    render() {

        let {secureEntries} = this.state;
        let {
            handleText, 
            onUpdate, 
            isLoading, 
            formErrors,
            settingsForm,
            isOpenSnackBar,
            snackBarMessage,
            toggleSnackBar,
            t,
            language
        } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
                <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                    padding: 20
                }}  keyboardShouldPersistTaps='always'>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {t('password')}
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('currentPassword')}
                            onChangeText={text => handleText('current', text)}
                            value={settingsForm.current}
                            underlineColor='transparent'
                            secureTextEntry={!secureEntries.currentPasswordShown}
                            textContentType='password'
                            style={styles.inputText}
                            error={'current' in formErrors}
                        />
                        {
                            'current' in formErrors && 
                            <HelperText
                                type="error"
                            >
                                {formErrors.current}
                            </HelperText>
                        }
                            
                        <IconButton 
                            icon={secureEntries.currentPasswordShown ? 'eye-off' : 'eye' }
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0
                            }}
                            color='gray'
                            onPress={() => this.toggleSecureEntry('currentPasswordShown')}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('newPassword')}
                            onChangeText={text => handleText('first', text)}
                            value={settingsForm.first}
                            underlineColor='transparent'
                            secureTextEntry={!secureEntries.newPasswordShown}
                            textContentType='password'
                            style={styles.inputText}
                            error={'first' in formErrors}
                        />
                        {
                            'first' in formErrors && 
                            <HelperText
                                type="error"
                            >
                                {formErrors.first}
                            </HelperText>
                        }
                        <IconButton 
                            icon={secureEntries.newPasswordShown ? 'eye-off' : 'eye' }
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0
                            }}
                            color='gray'
                            onPress={() => this.toggleSecureEntry('newPasswordShown')}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('confirmPassword')}
                            onChangeText={text => handleText('second', text)}
                            value={settingsForm.second}
                            underlineColor='transparent'
                            secureTextEntry={!secureEntries.confirmPasswordShown}
                            textContentType='password'
                            style={styles.inputText}
                            error={'second' in formErrors}
                        />
                        {
                            'second' in formErrors && 
                            <HelperText
                                type="error"
                            >
                                {formErrors.second}
                            </HelperText>
                        }
                        <IconButton 
                            icon={secureEntries.confirmPasswordShown ? 'eye-off' : 'eye' }
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0
                            }}
                            color='gray'
                            onPress={() => this.toggleSecureEntry('confirmPasswordShown')}
                        />
                    </View>
                    <View>
                        <Button
                            mode="contained"
                            onPress={() => onUpdate(this.settingsSchema)}
                            contentStyle={styles.button}
                            color='#93AF00'
                            disabled={isLoading}
                        >
                            {
                                isLoading ? 
                                t('updateProgress'):
                                t('update')
                            }
                        </Button>
                    </View>

                    <Divider style={{marginVertical: 15}}/>


                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {t('lang')}
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
                </ScrollView>

                <Snackbar
                    visible={isOpenSnackBar}
                    onDismiss={toggleSnackBar}
                    style={{
                        backgroundColor: '#93AF00'
                    }}
                    duration={1500}
                >
                    {snackBarMessage}
                </Snackbar>
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
        borderColor: '#D1D1D1',
        flex: 1, 
        marginHorizontal: 5,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#D1D1D1'
    },
    active: {
        backgroundColor: '#1C246C',
    },
    activeText: {
        color: 'white'
    }
})


const mapStateToProps = ({main}) => ({
    settingsForm: main.settingsForm,
    isLoading: main.isLoading,
    formErrors: main.formErrors,
    isOpenSnackBar: main.isOpenSnackBar,
    snackBarMessage: main.snackBarMessage,
    language: main.language
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'settingsForm')),
    onUpdate: (settingsSchema) => dispatch(handleSettingsUpdate(settingsSchema)),
    toggleSnackBar: () => dispatch(toggleSnackBar(false)),
    setLanguage: (lang, callback) => dispatch(handleLanguage(lang, callback)),
    handleErrors: () => dispatch(handleFormErrors())
})

Settings = withTranslation()(Settings);

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
