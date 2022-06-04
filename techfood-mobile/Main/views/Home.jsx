import React, { Component } from 'react'
import { SafeAreaView, 
    ScrollView, View,
    Dimensions,
    Platform, TouchableNativeFeedback,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import {FAB, IconButton, TextInput, Text, HelperText} from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../assets/style';
import ThemeItem from '../components/ThemeItem';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import images from '../assets/images';
import { handleContact, handleChangeText, toggleModal } from '../actions/actionCreators';
import { withTranslation } from 'react-i18next';
import { object, string } from 'yup';



class Home extends Component {

    constructor() {
        super() 
        this.state = {
            layoutWidth: 0,
            sites: [
                {
                    url : "https://techfood-seven.de",
                    title: "child",
                    image: images.sites.child,
                    imageName: 'child'
                },
                {
                    url : "https://techfood-nine.de",
                    title: "architecture",
                    image: images.sites.architecture,
                    imageName: 'architecture'
                },
                {
                    url : "https://techfood-three.de",
                    title: "food",
                    image: images.sites.food,
                    imageName: 'food'
                },
                {
                    url : "https://techfood-six.de",
                    title: "tech",
                    image: images.sites.tech,
                    imageName: 'tech'
                },
                {
                    url : "https://techfood-eight.de",
                    title: "landscape",
                    image: images.sites.paysage,
                    imageName: 'paysage'
                },
                {
                    url : "https://techfood-one.de",
                    title: "green",
                    image: images.sites.green,
                    imageName: 'green'
                },
                {
                    url : "https://techfood-five.de",
                    title: "work",
                    image: images.sites.work,
                    imageName: 'work'
                },
                {
                    url : "https://techfood-two.de",
                    title: "number",
                    image: images.sites.number,
                    imageName: 'number'
                },
                {
                    url : "https://techfood-end.de",
                    title: "hosting",
                    image: images.sites.hosting,
                    imageName: 'hosting'
                },
                
            ]
        }
    }
    
    componentDidMount() {
        let {t} = this.props;
        this.contactSchema = object().shape({
            firstName: string().required(t('required')),
            lastName: string().required(t('required')),
            email: string().email(t('invalidEmail')).required(t('required')),
            message: string().required(t('required')),
        });
    }
    

    renderModal = () => {

        let {
            contactForm, isLoading, 
            onSendMessage, formErrors, 
            handleText, isOpenModal, 
            toggleModal, t
        } = this.props;

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
        
        return(
            <Modal
                isVisible={isOpenModal}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                onBackButtonPress={() => toggleModal(false)}
                hasBackdrop={false}
                style={{
                    backgroundColor: '#F1F1F1',
                    margin: 0
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <Text 
                        style={{
                            flex: 1
                        }}
                    >
                        {t('sendMessage')}
                    </Text>
                    <IconButton 
                        icon='close'
                        size={24}
                        color='#000'
                        onPress={() => toggleModal(false)}
                    />
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label={t('firstName')}
                            onChangeText={text => handleText('firstName', text)}
                            value={contactForm.firstName}
                            textContentType='name'
                            underlineColor='transparent'
                            style={styles.inputText}
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
                            value={contactForm.lastName}
                            textContentType='familyName'
                            underlineColor='transparent'
                            style={styles.inputText}
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
                            label={t('email')}
                            onChangeText={text => handleText('email', text.trim())}
                            value={contactForm.email}
                            textContentType='emailAddress'
                            underlineColor='transparent'
                            autoCompleteType='email'
                            autoCapitalize={'none'}
                            style={styles.inputText}
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
                            multiline
                            label={t('message')}
                            onChangeText={text => handleText('message', text)}
                            value={contactForm.message}
                            underlineColor='transparent'
                            style={[styles.inputText, {height: 180}]}
                            error={'message' in formErrors}
                        />
                        {
                                'message' in formErrors && 
                                <HelperText
                                    type="error"
                                >
                                    {formErrors.message}
                                </HelperText>
                            }
                    </View>
                </ScrollView>
                {
                    Platform.OS === 'android' ?
                    <TouchableNativeFeedback
                        useForeground
                        onPress={() => onSendMessage(this.contactSchema)}
                        disabled={isLoading}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#93AF00',
                            padding: 15,
                        }}>
                            
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold',
                                textTransform: 'uppercase',
                                marginRight: 5,
                                color: '#fff'
                            }}>
                                {isLoading ? t('sendProgress') : t('send')}
                            </Text>
                            <Icon name='send' size={24} color='white'/>
                        </View>
                    </TouchableNativeFeedback>:
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#93AF00',
                            padding: 15,
                        }}
                        onPress={() => onSendMessage(this.contactSchema)}
                        disabled={isLoading}
                    >
                        <Text style={{
                            fontFamily: 'Poppins-SemiBold',
                            textTransform: 'uppercase',
                            marginRight: 5,
                            color: '#fff'
                        }}>
                            {isLoading ? t('sendProgress') : t('send')}
                        </Text>
                        <Icon name='send' size={24} color='white'/>
                    </TouchableOpacity>
                }
            </Modal>
        )
    }
    
    render() {

        const {sites} = this.state, {toggleModal} = this.props;
        

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: 5
                    }}            
                >
                    <View 
                        onLayout={(event) => this.setState({
                            layoutWidth: event.nativeEvent.layout.width
                        })}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                            {
                                sites.map((site, index) => (
                                    <ThemeItem key={index} parentWidth={this.state.layoutWidth} site={site} />
                                ))
                            }
                    </View>
                </ScrollView>

                {this.renderModal()}

                <FAB 
                    style={{
                        position: 'absolute',
                        right: 20,
                        bottom: 20,
                        backgroundColor: '#1C246C'
                    }}
                    icon='message-outline'
                    color='#fff'
                    
                    onPress={() => toggleModal(true)}
                />
            </SafeAreaView>
        )
    }
}


const mapStateToProps = ({main}) => ({
    contactForm: main.contactForm,
    userToken: main.userToken,
    profileForm: main.profileForm,
    isLoading: main.isLoading,
    formErrors: main.formErrors,
    isOpenModal: main.isOpenModal,
    notification: main.notification
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'contactForm')),
    onSendMessage: (contactSchema) => dispatch(handleContact(contactSchema)),
    toggleModal: (bool) => dispatch(toggleModal(bool))
})

Home = withTranslation()(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home)
