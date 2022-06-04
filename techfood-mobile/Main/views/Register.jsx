import React, { Component } from 'react'
import { SafeAreaView, ScrollView, View, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, HelperText, Text, RadioButton  } from 'react-native-paper';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import styles from '../assets/style';
import {
    object, string, number,
} from 'yup';
import { handleRegister, handleChangeText, handleFormErrors } from '../actions/actionCreators';
import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';



class Register extends Component {
   
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        let {t} = this.props;
       
        this.registerSchema = object().shape({
            firstName: string().required(t('required')),
            lastName: string().required(t('required')),
            phoneNumber: string().required(t('required')),
            age: number().required(t('required')).min(18, t('invalidAge') + ' ${min}'),
            gender: string().required(t('required')),
            email: string().email(t('invalidEmail')).required(t('required')),
            password: string().required(t('required')).min(6, t('invalidPassword') + ' ${min} ' + t('caracters'))
        });
    }
    

    componentWillUnmount() {
        this.props.handleErrors();
    }
    

    render() {

        let {
            navigation, handleText, 
            onSignUp, isLoading, formErrors,
            registerForm,
            t
        } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
            
                <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <ScrollView style={styles.scroll} keyboardShouldPersistTaps='always'>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 19,
                        marginVertical: 20,
                        fontFamily: 'Poppins-Bold'
                    }}>
                        {t('join')}
                    </Text>
                        
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('firstName')}
                            onChangeText={text => handleText('firstName', text)}
                            underlineColor='transparent'
                            style={styles.inputText}
                            textContentType='name'
                            autoCorrect={true}
                            autoCompleteType='name'
                            error={'firstName' in formErrors}
                        />
                        {
                            'firstName' in formErrors &&
                            <HelperText
                                type="error"
                            >
                                {formErrors.firstName}
                            </HelperText>
                        }
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('lastName')}
                            onChangeText={text => handleText('lastName', text)}
                            underlineColor='transparent'
                            style={styles.inputText}
                            textContentType='familyName'
                            autoCorrect={true}
                            autoCompleteType='name'
                            error={'lastName' in formErrors}
                        />  
                        {
                            'lastName' in formErrors &&
                            <HelperText
                                type="error"
                            >
                                {formErrors.lastName}
                            </HelperText>
                        }
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('phone')}
                            onChangeText={text => handleText('phoneNumber', text)}
                            underlineColor='transparent'
                            style={styles.inputText}
                            autoCorrect={true}
                            textContentType='telephoneNumber'
                            keyboardType='phone-pad'
                            error={'phoneNumber' in formErrors}
                        /> 
                        { 
                         'phoneNumber' in formErrors &&
                            <HelperText
                                type="error"
                            >
                                {formErrors.phoneNumber}
                            </HelperText>
                        }
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('age')}
                            onChangeText={text => handleText('age', parseInt(text))}
                            underlineColor='transparent'
                            style={styles.inputText}
                            keyboardType='phone-pad'
                            error={'age' in formErrors}
                        />
                        {
                            'age' in formErrors &&
                            <HelperText
                                type="error"
                            >
                                {formErrors.age}
                            </HelperText>
                        }
                        
                    </View>

                    <View style={styles.inputContainer}>
                        <RadioButton.Group
                            onValueChange={value => handleText('gender', value)}
                            value={registerForm.gender}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 10
                                }}>
                                    <RadioButton value={t('male')} color='#1C246C'/>
                                    <Text>{t('male')}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 10
                                }}>
                                    
                                    <RadioButton value={t('female')} color='#1C246C'/>
                                    <Text>{t('female')}</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>

                    
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('email')}
                            onChangeText={text => handleText('email', text.trim())}
                            underlineColor='transparent'
                            style={styles.inputText}
                            textContentType='emailAddress'
                            autoCapitalize='none'
                            error={'email' in formErrors}
                        />
                        {
                            'email' in formErrors &&
                            <HelperText
                                type="error"
                            >
                                {formErrors.email}
                            </HelperText>
                        }
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('password')}
                            onChangeText={text => handleText('password', text)}
                            underlineColor='transparent'
                            secureTextEntry={true}
                            textContentType='password'
                            style={styles.inputText}
                            error={'password' in formErrors}
                        />
                        {
                            'password' in formErrors &&
                            <HelperText
                                type="error"
                            >
                                {formErrors.password}
                            </HelperText>
                        }
                    </View>

                    <View>
                            <Button
                                mode="contained"
                                onPress={() => onSignUp(this.registerSchema, () => {
                                    navigation.dispatch(
                                        StackActions.replace('Login')
                                    );
                                })}
                                contentStyle={styles.button}
                                disabled={isLoading}
                            >
                                {
                                    isLoading ?
                                        t('subscribeProgress'):
                                        t('subscribe')
                                }
                            </Button>
                        </View>
                </ScrollView>
            
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    registerForm: main.registerForm,
    isLoading: main.isLoading,
    formErrors: main.formErrors,
    language: main.language
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'registerForm')),
    onSignUp: (registerSchema, redirectCallBack) => dispatch(handleRegister(registerSchema, redirectCallBack)),
    handleErrors: () => dispatch(handleFormErrors())
})

Register = withTranslation()(Register);
export default connect(mapStateToProps, mapDispatchToProps)(Register)
