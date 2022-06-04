import React, { Component } from 'react'
import { 
    SafeAreaView, ScrollView, View, 
    Dimensions, Platform, 
    TouchableNativeFeedback, TouchableOpacity, StatusBar 
} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { StackActions } from '@react-navigation/native';
import SiteName from './SiteName';
import HomePage from './HomePage';
import ServicePage from './ServicePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import SupplementPage from './SupplementPage';
import PaymentPage from './PaymentPage';
import NavButtons from '../../components/NavButtons';
import styles from '../../assets/style';
import { string, object } from 'yup';
import { 
    handleOrder, handleStripCard, 
    handleNextStep, handlePrevStep, handleFormErrors, 
    handleResetForm, resetSteps, toggleModal 
} from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';


const schemaOptions = {
    abortEarly: false
}

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    componentDidMount() {
        let {t} = this.props;
       
        this.siteNameSchema = object().shape({
            siteName: string().required(t('required')).min(3, t('invalidSiteName') + ' ${min} ' + t('caracters')),
        });
        
        this.homeSchema = object().shape({
            presentation: string().required(t('required')),
        });
        
        this.aboutSchema = object().shape({
            about: string().required(t('required')),
        });
        
        this.contactSchema = object().shape({
            email: string().email(t('invalidEmail')).required(t('required')),
        });
    }
    

    handleNextStep = () => {
        let {currentStep, steps, navigation, goToNextStep, orderForm, handleErrors} = this.props, pageName;
            
        if(currentStep < steps - 1) {
            if(currentStep === 0) {
                this.siteNameSchema.validate(orderForm, schemaOptions)
                .then(value => {
                    pageName = this.getPageName(currentStep + 1);
                    navigation.setOptions({title: pageName});
                    goToNextStep();
                }).catch(({inner}) => {
                    
                    let errors = {};
                    for(let fieldError of inner) {
                        errors[fieldError.path] = fieldError.message;
                    }
                    handleErrors(errors);
                    return;
                })
            }
            else if(currentStep === 1) {
                this.homeSchema.validate(orderForm, schemaOptions)
                .then(value => {
                    pageName = this.getPageName(currentStep + 1);
                    navigation.setOptions({title: pageName});
                    goToNextStep();
                }).catch(({inner}) => {
                    
                    let errors = {};
                    for(let fieldError of inner) {
                        errors[fieldError.path] = fieldError.message;
                    }
                    handleErrors(errors);
                    return;
                })
            }
            else if(currentStep === 3) {
                this.aboutSchema.validate(orderForm, schemaOptions)
                .then(value => {
                    pageName = this.getPageName(currentStep + 1);
                    navigation.setOptions({title: pageName});
                    goToNextStep();
                }).catch(({inner}) => {
                    
                    let errors = {};
                    for(let fieldError of inner) {
                        errors[fieldError.path] = fieldError.message;
                    }
                    handleErrors(errors);
                    return;
                })
            }
            else if(currentStep === 4) {
                this.contactSchema.validate(orderForm, schemaOptions)
                .then(value => {
                    pageName = this.getPageName(currentStep + 1);
                    navigation.setOptions({title: pageName});
                    goToNextStep();
                }).catch(({inner}) => {
                    
                    let errors = {};
                    for(let fieldError of inner) {
                        errors[fieldError.path] = fieldError.message;
                    }
                    handleErrors(errors);
                    return;
                })
            }
            else {
                pageName = this.getPageName(currentStep + 1);
                navigation.setOptions({title: pageName});
                goToNextStep();
            }
            
        }
    }

    handlePrevStep = () => {
        let {currentStep, navigation, goToPrevStep} = this.props, pageName;
        if(currentStep > 0) {
            pageName = this.getPageName(currentStep - 1);
            navigation.setOptions({title: pageName});
            goToPrevStep();
        }
    }

    getPageName = (step) => {
        let pageName;
        const {t} = this.props;
        
        switch(step) {
            case 0:
                pageName = t('siteConfig')
                break;
            case 1:
                pageName = t('presentation');
                break;
            case 2:
                pageName = t('yourServices');
                break;
            case 3:
                pageName = t('aboutUs');
                break;
            case 4:
                pageName = t('contactInfos');
                break;
            case 5:
                pageName = t('extra');
                break;
            case 6:
                pageName = t('payment');
                break;
            default:
                pageName = t('siteConfig');
                break;
        }

        return pageName;
    }


    renderContent = () => {
        let {currentStep} = this.props;

        switch(currentStep) {
            case 0:
                return <SiteName />;
            case 1:
                return <HomePage />;
            case 2:
                return <ServicePage />;
            case 3:
                return <AboutPage />;
            case 4:
                return <ContactPage />;
            case 5:
                return <SupplementPage />;
            case 6:
                return <PaymentPage />;
            default:
                return <SiteName />;
        }
    }

    handleCreditCard = (form) => {
        let {handleCard} = this.props;
        handleCard(form);
    }

    renderModal = () => {
        
        let { createOrder, navigation, isLoading, toggleModal, isOpenModal, t } = this.props;

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
                        style={styles.modalTitle}
                    >
                        {t('paymentCard')}
                    </Text>
                    <IconButton 
                        icon='close'
                        size={24}
                        color='#000'
                        onPress={() => toggleModal(false)}
                    />
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                    <CreditCardInput 
                        onChange={this.handleCreditCard} 
                        autoFocus={true}
                        cardFontFamily='Poppins-Medium'
                        labelStyle={{
                            fontFamily: 'Poppins-Medium',
                            fontWeight: 'normal'
                        }}
                        inputStyle={{
                            fontFamily: 'Poppins-Medium'
                        }}
                        labels={{
                            number: t('cardNumber'), 
                            expiry: "Exp.", 
                            cvc: "CVC/CCV"
                        }}
                        inputContainerStyle={{
                            borderBottomColor: '#1C246C',
                            borderBottomWidth: 1,
                            
                        }}
                        additionalInputsProps={{
                            number: {
                                selectionColor: '#000',
                                keyboardType: 'decimal-pad'
                            },
                            expiry: {
                                selectionColor: '#000',
                                keyboardType: 'decimal-pad'
                            },
                            cvc: {
                                selectionColor: '#000',
                                keyboardType: 'decimal-pad'
                            }
                        }}
                    />
                </ScrollView>
                {
                    Platform.OS === 'android' ?
                    <TouchableNativeFeedback
                        useForeground
                        onPress={() => createOrder(() => navigation.dispatch(StackActions.popToTop()))}
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
                                {isLoading ? t('processing') : t('payAction')}
                            </Text>
                            <Icon name='credit-card' size={24} color='white'/>
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
                        onPress={() => createOrder(() => navigation.dispatch(StackActions.popToTop()))}
                        disabled={isLoading}
                    >
                        <Text style={{
                            fontFamily: 'Poppins-SemiBold',
                            textTransform: 'uppercase',
                            marginRight: 5,
                            color: '#fff'
                        }}>
                            {isLoading ? t('processing') : t('payAction')}
                        </Text>
                        <Icon name='credit-card' size={24} color='white'/>
                    </TouchableOpacity>
                }
            </Modal>
        )
    }

    componentWillUnmount() {
        this.props.resetForm({
            theme: '',
            themeUrl: '',
            themeImage: '',
            siteName: '',
            presentation: '',   
            services: [],
            about: '',
            contactAddress: '',
            contactPhone: '',
            email: '',
            fullTimeWork: true,
            workTimeHours: [],
            pricing: [],
            qualities: [],
            numbers: [],
            number1: '',
            number2: '',
            number3: '',
            quality1: '',
            quality2: '',
            quality3: '',
            stripeToken: null
        });

        this.props.resetSteps();
        this.props.handleErrors({});
    }
    

    render() {
        let {currentStep, steps, toggleModal, t} = this.props;
        return (
            <SafeAreaView style={styles.container}>
               <StatusBar backgroundColor='#1C246C'/>
                <View style={{
                    overflow: 'hidden',
                    flexDirection: 'row',

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 2,    
                    marginBottom: 20
                }}>
                    <View style={{flex: 3}}/>
                    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#1C246C', padding: 10}}>
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'Poppins-Medium',
                                fontSize: 12
                            }}
                        >
                            {t('step')} {currentStep + 1} / {steps}
                        </Text>
                        <View style={{
                            backgroundColor: '#1C246C',
                            position: 'absolute',
                            top: 0,
                            right: 40,
                            width: 120,
                            bottom: 0,
                            zIndex: -20,
                            borderRadius: 5,
                            transform: [{ rotate: "45deg" }]
                        }}>
                        </View>
                    </View>
                </View>
                <ScrollView 
                    contentContainerStyle={{flexGrow: 1, padding: 10}}
                    keyboardShouldPersistTaps='always'
                >
                    {this.renderContent()}
                </ScrollView>
                <NavButtons 
                    onNextPress={currentStep === steps - 1 ? () => toggleModal(true) : this.handleNextStep} 
                    onPrevPress={this.handlePrevStep}
                    disabledPrev={currentStep === 0}
                    paymentProcess={currentStep === steps - 1}
                />

                {this.renderModal()}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    isLoading: main.isLoading,
    orderForm: main.orderForm,
    stripeCard: main.stripeCard,
    currentStep: main.currentStep,
    steps: main.steps,
    isOpenModal: main.isOpenModal
})

const mapDispatchToProps = dispatch => ({
    createOrder: (callback) => dispatch(handleOrder(callback)),
    handleCard: (card) => dispatch(handleStripCard(card)),
    goToNextStep: () => dispatch(handleNextStep()),
    goToPrevStep: () => dispatch(handlePrevStep()),
    handleErrors: (errors) => dispatch(handleFormErrors(errors)),
    resetForm: (data) => dispatch(handleResetForm('orderForm', data)),
    resetSteps: () => dispatch(resetSteps()),
    toggleModal: (bool) => dispatch(toggleModal(bool))
})

Index = withTranslation()(Index);

export default connect(mapStateToProps, mapDispatchToProps)(Index)
