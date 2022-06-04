import React, { Component } from 'react'
import { SafeAreaView, View, TouchableOpacity, StatusBar } from 'react-native';
import { Button, TextInput, HelperText, Text, Paragraph, Snackbar  } from 'react-native-paper';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../assets/style';

import {object, string} from 'yup';
import { handleChangeText, handleRequestPassword, toggleSnackBar, handleFormErrors } from '../actions/actionCreators';
import { withTranslation } from 'react-i18next';



class ForgotPassword extends Component {

    componentDidMount() {
        let {t} = this.props;
        this.forgotSchema = object().shape({
            email: string().email(t('invalidEmail')).required(t('required')),
        });
    }
    

    componentWillUnmount() {
        this.props.handleErrors();
    }
    

    render() {

        let {
            handleText, 
            onRequest, isLoading, 
            formErrors,
            forgotPasswordForm,
            isOpenSnackBar,
            snackBarMessage,
            toggleSnackBar,
            t
        } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
                <View style={styles.content}>
                
                <Text style={{
                    textAlign: 'center',
                    fontSize: 19,
                    marginVertical: 20,
                    fontFamily: 'Poppins-Bold'
                }}>
                    {t('forgotPassword')}
                </Text>
                <Paragraph>
                    
                </Paragraph>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('email')}
                            onChangeText={text => handleText('email', text.trim())}
                            value={forgotPasswordForm.email}
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
                    <View>
                        <Button
                            mode="contained"
                            onPress={() => onRequest(this.forgotSchema)}
                            contentStyle={styles.button}
                            disabled={isLoading}
                        >
                            {
                                isLoading ?
                                t('resetProgress'):
                                t('reset')
                            }
                        </Button>
                    </View>
                </View>

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

const mapStateToProps = ({main}) => ({
    forgotPasswordForm: main.forgotPasswordForm,
    isLoading: main.isLoading,
    formErrors: main.formErrors,
    isOpenSnackBar: main.isOpenSnackBar,
    snackBarMessage: main.snackBarMessage
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'forgotPasswordForm')),
    onRequest: (forgotSchema) => dispatch(handleRequestPassword(forgotSchema)),
    toggleSnackBar: () => dispatch(toggleSnackBar(false)),
    handleErrors: () => dispatch(handleFormErrors())
})

ForgotPassword = withTranslation()(ForgotPassword);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
