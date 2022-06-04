import React, { Component } from 'react'
import { SafeAreaView, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Button, TextInput, HelperText, Text, Divider  } from 'react-native-paper';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../assets/style';
import { handleChangeText, handleLogin, handleFormErrors } from '../actions/actionCreators';
import { string, object } from 'yup';
import { withTranslation } from 'react-i18next';


class Login extends Component {
  

    componentDidMount() {
        let {t} = this.props;
        this.loginSchema = object().shape({
            email: string().email(t('invalidEmail')).required(t('required')),
            password: string().required(t('required'))
        });
    }
    

    componentWillUnmount() {
        this.props.handleErrors();
    }
    
    render() {

        let {
            navigation, handleText, 
            onSignIn, isLoading, formErrors, t
        } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
                <ScrollView contentContainerStyle={{
                        flexGrow: 1,
                        padding: 20
                    }}  keyboardShouldPersistTaps='always'>
                
                <Text style={{
                    textAlign: 'center',
                    fontSize: 19,
                    marginVertical: 20,
                    fontFamily: 'Poppins-Bold'
                }}>
                    {t('signInTitle')}
                </Text>
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
                        { 'email' in formErrors &&
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
                        {'password' in formErrors &&
                        <HelperText
                            type="error"
                        >
                            {formErrors.password}
                        </HelperText>}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword')}
                            style={{
                                padding: 10,
                                marginTop: 10,
                                alignSelf: 'flex-end'
                            }}
                        >
                            <Text style={{
                                color: '#1C246C'
                            }}>
                                {t('forgotPassword')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {
                            <Button
                                mode="contained"
                                onPress={() => onSignIn(this.loginSchema)}
                                contentStyle={styles.button}
                                disabled={isLoading}
                            >
                                {
                                isLoading ?
                                    t('signInProgress'):
                                    t('signIn')
                                }
                            </Button>
                        }
                        
                    </View>
                    <Divider style={{marginVertical: 20}} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Text>
                            {t('dontHaveAccount')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                            style={{
                                padding: 10
                            }}
                        >
                        <Text style={{
                            color: '#1C246C'
                        }}>
                            {t('createAccount')}
                        </Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    loginForm: main.loginForm,
    isLoading: main.isLoading,
    formErrors: main.formErrors
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'loginForm')),
    onSignIn: (loginSchema) => dispatch(handleLogin(loginSchema)),
    handleErrors: () => dispatch(handleFormErrors())
})

Login = withTranslation()(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login)
