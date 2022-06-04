import React, { Component, Profiler } from 'react'
import { SafeAreaView, View, TouchableOpacity, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
import { Button, TextInput, HelperText, Text, RadioButton, Snackbar  } from 'react-native-paper';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../assets/style';
import { handleChangeText, handleProfileUpdate, fetchProfile, toggleSnackBar, handleFormErrors } from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';
import { object, string, number } from 'yup';



class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {navigation, t} = this.props;

       
        this.profileSchema = object().shape({
            firstName: string().required(t('required')),
            lastName: string().required(t('required')),
            phoneNumber: string().required(t('required')),
            age: number().required(t('required')).min(18, t('invalidAge') + ' ${min}'),
            gender: string().required(t('required')),
            email: string().email(t('invalidEmail')).required(t('required')),
        });

       

        this.unsubscribe = navigation.addListener('focus', e => {
            // Prevent default action
            this.props.fetchProfile();
        });   
    }


    componentWillUnmount() {
        this.unsubscribe();
        this.props.handleErrors();    
    }
    
    

    render() {

        let {
            handleText, 
            profileForm,
            onUpdate, 
            isLoading, 
            formErrors,
            isOpenSnackBar,
            snackBarMessage,
            toggleSnackBar,
            isProfileFetched,
            t
        } = this.props;


        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
                {
                    !isProfileFetched && isLoading ?
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size='large' color='#93AF00'/>
                    </View>:
                     <ScrollView contentContainerStyle={{
                        flexGrow: 1,
                        padding: 20
                    }}  keyboardShouldPersistTaps='always'>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                label={t('firstName')}
                                onChangeText={text => handleText('firstName', text)}
                                value={profileForm.firstName}
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
                                value={profileForm.lastName}
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
                                value={profileForm.phoneNumber}
                                underlineColor='transparent'
                                style={styles.inputText}
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
                                value={profileForm.age.toString()}
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
                                value={profileForm.gender}
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
                                label='Adresse e-mail'
                                onChangeText={text => handleText('email', text)}
                                value={profileForm.email}
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
                                onPress={() => onUpdate(this.profileSchema)}
                                contentStyle={styles.button}
                                color='#93AF00'
                            >
                                {
                                    isLoading ?
                                    t('updateProgress'):
                                    t('update')
                                }
                            </Button>
                        </View>
                    </ScrollView>
                }


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
    profileForm: main.profileForm,
    isProfileFetched: main.isProfileFetched,
    userId: main.userId,
    isLoading: main.isLoading,
    formErrors: main.formErrors,
    isOpenSnackBar: main.isOpenSnackBar,
    snackBarMessage: main.snackBarMessage
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'profileForm')),
    onUpdate: (profileSchema) => dispatch(handleProfileUpdate(profileSchema)),
    fetchProfile: () => dispatch(fetchProfile()),
    toggleSnackBar: () => dispatch(toggleSnackBar(false)),
    handleErrors: () => dispatch(handleFormErrors())
})

Profile = withTranslation()(Profile);

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
