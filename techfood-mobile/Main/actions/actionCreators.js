import { 
    QUICK_START_SUCCESS, 
    HANDLE_LOADING, 
    TOGGLE_MODAL, 
    HANDLE_LOGGING_OUT,
    SIGN_OUT_SUCCESS,
    SIGN_IN_SUCCESS,
    RESTORE_TOKEN_SUCCESS,
    HANDLE_CHANGE_TEXT,
    HANDLE_FORM_ERRORS,
    HANDLE_BOOTING,
    FETCH_PROFILE_SUCCESS,
    HANDLE_AUTO_FILL_FORM,
    TOGGLE_SNACKBAR,
    RESET_FORM,
    FETCH_ORDERS_SUCCESS,
    HANDLE_ARRAY,
    REMOVE_ARRAY_ITEM,
    HANDLE_FULL_ARRAY,
    HANDLE_STRIPE_CARD,
    HANDLE_PREV_STEP,
    HANDLE_NEXT_STEP,
    HANDLE_ORDER_SUCCESS,
    RESET_STEPS,
    HANDLE_NOTIFICATION,
    HANDLE_LANGUAGE
} from "./actionTypes";
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {
    login, register, 
    getProfile, updateProfile,
    contact,
    forgotPassword, updateSettings,
    refresh,
    getOrders,
    postOrder,
    saveToken,
    removeToken,
    sendLink,
    updateLocale
} from '../api/services';
import { Alert } from "react-native";
import qs from 'qs';
import messaging from '@react-native-firebase/messaging';
import i18n from 'i18next';


const schemaOptions = {
    abortEarly: false
}

export function handleLanguageSuccess(language) {
    return {
        type: HANDLE_LANGUAGE,
        payload: language
    }
}

export function handleLanguage(language, callback = null) {
    return (dispatch, getState) => {
        let store = getState().main, {userToken} = store;

        if(callback) {
            updateLocale({lang: language}, userToken.token)
                .then(function (response) {
                    AsyncStorage.setItem('@TechFood:language', language).then(() => {
                        callback();
                        dispatch(handleLanguageSuccess(language));
                        dispatch(toggleSnackBar(true, i18n.t('updatedMsg')));
                    });
                })
                .catch(function (error) {
                    if(error.response.status === 401) {
                        dispatch(handleRefreshToken(userToken, language, () => handleLanguage(language, callback)));
                    }
                    else {
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('serverError')
                        );
                    }
                });
        }
        else {
            AsyncStorage.setItem('@TechFood:language', language).then(() => {
                dispatch(handleLanguageSuccess(language));
            });
        }
    }
}

export function handleNotification(notificationOrder)  {
    return {
        type: HANDLE_NOTIFICATION,
        payload: notificationOrder
    }
}

export function handleStripCard(card)  {
    return {
        type: HANDLE_STRIPE_CARD,
        payload: card
    }
}

export function resetSteps() {
    return {
        type: RESET_STEPS
    }
}

export function handleNextStep() {
    return {
        type: HANDLE_NEXT_STEP
    }
}

export function handlePrevStep() {
    return {
        type: HANDLE_PREV_STEP
    }
}

export function handleArraySuccess(arrayName, arrayData, value, index, formName) {
    return {
        type: HANDLE_ARRAY,
        payload: {
            formName,
            arrayName,
            arrayData,
            value,
            index
        }
    }
}
export function handleArray(arrayName, value, index, formName) {
    return (dispatch, getState) => {
        let {main} = getState(), arrayData = main[formName][arrayName];

        if(index !== null) {
            arrayData[index] = value;
            console.log(index)
            console.log(arrayData)
        }
        
        dispatch(handleArraySuccess(arrayName, arrayData, value, index, formName));
    }
}

export function removeArrayItem(arrayName, index, formName) {
    return {
        type: REMOVE_ARRAY_ITEM,
        payload: {
            formName,
            arrayName,
            index
        }
    }
}

export function handleFullArray(arrayName, arrayData, formName) {
    return {
        type: HANDLE_FULL_ARRAY,
        payload: {
            formName,
            arrayName,
            arrayData
        }
    }
}

export function toggleSnackBar(bool, message = null) {
    return {
        type: TOGGLE_SNACKBAR,
        payload: {
            isOpen: bool,
            message
        }
    }
}

export function handleLoading(bool) {
    return {
        type: HANDLE_LOADING,
        payload: {
            isLoading: bool
        }
    }
}

export function handleBooting(bool) {
    return {
        type: HANDLE_BOOTING,
        payload: {
            isBooting: bool
        }
    }
}


export function hanldeQuickStart() {
    return {
        type: HANDLE_QUICK_START
    }
}

export function handleLoggingOut(bool) {
    return {
        type: HANDLE_LOGGING_OUT,
        payload: {
            isLoggingOut: bool
        }
    }
}

export function toggleModal(bool) {
    return {
        type: TOGGLE_MODAL,
        payload: {
            isOpenModal: bool
        }
    }
}

export function logoutSuccess() {
    return {
        type: SIGN_OUT_SUCCESS
    }
}

export function logout() {
    return (dispatch, getState) => {

        let {userToken, language} = getState().main;

        dispatch(handleLoggingOut(true));

        removeToken(userToken.token)
            .then(function (response) {                
                AsyncStorage.removeItem('@TechFood:token').then(() => {
                    dispatch(handleLoggingOut(false));
                    dispatch(logoutSuccess());
                });
            })
            .catch(function (error) {
                if(error.response.status === 401) {
                    dispatch(handleRefreshToken(userToken, language, logout));
                }
                else {
                    dispatch(handleLoggingOut(false));
                    Alert.alert(
                        'Erreur', 
                        i18n.t('serverError')
                    );
                }
            });
    }
}

export function restoreTokenSuccess(language, quickStart, token) {
    return {
        type: RESTORE_TOKEN_SUCCESS,
        payload: {
            language,
            quickStart,
            userToken: token
        }
    }
}

export function boot(callback) {
    return (dispatch) => {
        let data, expiresAt;
        setTimeout( () => {
            AsyncStorage.multiGet(['@TechFood:language', '@TechFood:quickStart', '@TechFood:token']).then(values => {
                let language = values[0][1],
                    quickStart = values[1][1],
                    userToken = JSON.parse(values[2][1]);
                
                if(quickStart) {
                    callback(language);
                    if(userToken && userToken.token) {
                        data = jwt_decode(userToken.token);
                        expiresAt = data.exp;
        
                        if(moment().unix() >= expiresAt) {
                            dispatch(handleRefreshToken(userToken, language, null, true));
                        }
                        else {
                            dispatch(handleBooting(false));
                            dispatch(restoreTokenSuccess(language, quickStart !== null, userToken));
                        }
                    }
                    else {
                        dispatch(handleBooting(false));
                        dispatch(restoreTokenSuccess(language, quickStart !== null, null));
                    }
                }
                else {
                    dispatch(handleBooting(false));
                    dispatch(restoreTokenSuccess(null, false, null));
                }
            })

        }, 2500)

    }
}


export function handleQuickStartSuccess() {
    return {
        type: QUICK_START_SUCCESS
    }
}

export function handleQuickStart() {
    return (dispatch) => {
        AsyncStorage.setItem('@TechFood:quickStart', 'true').then(() => {
            dispatch(handleQuickStartSuccess());
        });
    }
}

export function handleChangeText(inputName, inputValue, formName) {
    return {
        type: HANDLE_CHANGE_TEXT,
        payload: {
            formName,
            data: {
                [inputName]: inputValue
            }
        }
    }
}

export function handleLoginSuccess(token) {
    return {
        type: SIGN_IN_SUCCESS,
        payload: {
            userToken: token
        }
    }
}

export function handleFormErrors(formErrors = {}) {
    return {
        type: HANDLE_FORM_ERRORS,
        payload: formErrors
    }
}

export function handleLogin(schema) {
    return (dispatch, getState) => {

        let store = getState().main, {loginForm} = store;

        dispatch(handleLoading(true));

        schema.validate(loginForm, schemaOptions)
        .then(value => {
            login(loginForm)
                .then(function (response) {
                    let userToken = response.data;
                    
                    messaging().getToken().then(firebaseToken => {
                        
                        saveToken(firebaseToken, userToken.token)
                            .then(function (response) {
                                
                                
                                AsyncStorage.setItem('@TechFood:token', JSON.stringify(userToken)).then(() => {
                                    dispatch(handleLoading(false));
                                    dispatch(handleLoginSuccess(userToken));
                                    dispatch(handleResetForm('loginForm', {
                                        email: '',
                                        password: ''
                                    }));
                                    dispatch(handleFormErrors());
                                });
                                

                            })
                            .catch(function (error) {
                                dispatch(handleLoading(false));
                                Alert.alert(
                                    i18n.t('error'), 
                                    i18n.t('serverError')
                                );
                            });
                    });
                })
                .catch(function (error) {
                    dispatch(handleLoading(false));
                    if(error.response.status === 401) {
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('errorCredentials')
                        );
                    }
                    else {
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('serverError')
                        );
                    }
                    console.log(error.response);
                });
        }).catch(({inner}) => {
            dispatch(handleLoading(false));
            let errors = {};
            for(let fieldError of inner) {
                errors[fieldError.path] = fieldError.message;
            }
            dispatch(handleFormErrors(errors))
            return;
        })

    }
}


export function handleRegister(schema, redirectCallBack) {
    return (dispatch, getState) => {
        let store = getState().main, {registerForm, language} = store;

        dispatch(handleLoading(true));

        schema.validate(registerForm, schemaOptions)
        .then(value => {
            register({...registerForm, lang: language}, language)
                .then(function (response) {
                    dispatch(handleLoading(false));
                    dispatch(handleFormErrors());
                    dispatch(handleResetForm('registerForm', {
                        firstName: '',
                        lastName: '',
                        age: 1,
                        gender: '',
                        email: '',
                        password: '',
                        phoneNumber: ''
                    }));
                    redirectCallBack();
                    Alert.alert(
                        i18n.t('congrats'), 
                        i18n.t('signUpMsg.part1') + '\n' + i18n.t('signUpMsg.part2')
                    );
                })
                .catch(function (error) {
                    dispatch(handleLoading(false));

                    if(error.response.status === 400) {
                        dispatch(handleFormErrors(error.response.data));
                    }
                    else {
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('serverError')
                        );
                    }
                });
        }).catch(({inner}) => {
            dispatch(handleLoading(false));
            let errors = {};
            for(let fieldError of inner) {
                errors[fieldError.path] = fieldError.message;
            }
            dispatch(handleFormErrors(errors))
            return;
        })

    }
    
}

export function handleAutoFill(formName, data) {
    return {
        type: HANDLE_AUTO_FILL_FORM,
        payload: {
            formName,
            data
        }
    }
}

export function fetchProfileSuccess(profileFormData) {
    return {
        type: FETCH_PROFILE_SUCCESS,
        payload: {
            profileFormData
        }
    }
}

export function fetchProfile() {
    return (dispatch, getState) => {

        let {userToken, language} = getState().main;

        dispatch(handleLoading(true));

        getProfile(userToken.token).then(function (response) {
            let {data} = response,
            formData = {
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age,
                gender: data.gender,
                email: data.email,
                phoneNumber: data.phoneNumber
            }
            // handle success
            dispatch(handleLoading(false));
            dispatch(fetchProfileSuccess(formData));
        })
        .catch(function (error) {
            // handle error
            if(error.response.status === 401) {
                dispatch(handleRefreshToken(userToken, language, fetchProfile));
            }
            else {
                dispatch(handleLoading(false));
                Alert.alert(
                    i18n.t('error'), 
                    i18n.t('serverError')
                );
            }
            console.log(error.response);
        })
        .then(function () {
           
        });
    }
}

export function handleProfileUpdate(schema) {
    return (dispatch, getState) => {
        let store = getState().main, {userToken, language, userId, profileForm} = store;

        dispatch(handleLoading(true));

        schema.validate(profileForm, schemaOptions)
        .then(value => {
            updateProfile(profileForm, userId, userToken.token, language)
                .then(function (response) {
                    dispatch(handleLoading(false));
                    dispatch(handleFormErrors());
                    dispatch(toggleSnackBar(true, i18n.t('updatedMsg')));
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    if(error.response.status === 400) {
                        let errors = error.response.data.violations, formErrors = {};
                        dispatch(handleLoading(false));
                        for(let errorField of errors) {
                            formErrors[errorField.propertyPath] = errorField.message;
                        }
                        dispatch(handleFormErrors(formErrors));
                    }
                    else if(error.response.status === 401) {
                        dispatch(handleRefreshToken(userToken, language, () => handleProfileUpdate(schema)));
                    }
                    else {
                        dispatch(handleLoading(false));
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('serverError')
                        );
                    }
                });
        }).catch(({inner}) => {
            dispatch(handleLoading(false));
            let errors = {};
            for(let fieldError of inner) {
                errors[fieldError.path] = fieldError.message;
            }
            dispatch(handleFormErrors(errors))
            return;
        })

    }
}


export function handleRequestPassword(schema) {
    return(dispatch, getState) => {

        let store = getState().main, {forgotPasswordForm} = store;

        dispatch(handleLoading(true));

        schema.validate(forgotPasswordForm, schemaOptions)
        .then(value => {
            forgotPassword(forgotPasswordForm)
                .then(function (response) {
                    dispatch(handleLoading(false));
                    dispatch(toggleSnackBar(true, 
                        i18n.t('resetPasswordMsg.part1') + '\n' + i18n.t('resetPasswordMsg.part2')
                    ));
                    dispatch(handleFormErrors());
                    dispatch(handleResetForm('forgotPasswordForm', {
                        email: ''
                    }));
                })
                .catch(function (error) {
                    console.log(error.response);
                    dispatch(handleLoading(false));
                    if(error.response.status === 404) {
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('emailNotFound')
                        );
                    }
                    else {
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('serverError')
                        );
                    }
                    
                });
        }).catch(({inner}) => {
            dispatch(handleLoading(false));
            let errors = {};
            for(let fieldError of inner) {
                errors[fieldError.path] = fieldError.message;
            }
            dispatch(handleFormErrors(errors))
            return;
        })
    }
}

export function handleResetForm(formName, formData) {
    return {
        type: RESET_FORM,
        payload: {
            [formName]: formData
        }
    }
}

export function handleRefreshToken(userToken, language, callback = null, bootMode = false) {
    return (dispatch, getState) => {

        refresh({refreshToken: userToken.refreshToken})
            .then(function (response) {
                AsyncStorage.setItem('@TechFood:token', JSON.stringify(response.data)).then(() => {
                    dispatch(restoreTokenSuccess(language, true, response.data));
                    if(bootMode) {
                        dispatch(handleBooting(false));
                    }
                    if(callback) {
                        dispatch(callback());
                    }
                }); 
            })
            .catch(function (error) {
                if(bootMode) {
                    dispatch(handleBooting(false));
                }
                else {
                    dispatch(handleLoading(false));
                }
                console.log(error.response);
            });
    }
}


export function handleSettingsUpdate(schema) {
    return (dispatch, getState) => {
        let store = getState().main, {userToken, language, settingsForm} = store;

        dispatch(handleLoading(true));

        schema.validate(settingsForm, schemaOptions)
        .then(value => {
            updateSettings({
                password: settingsForm
            }, userToken.token)
                .then(function (response) {
                    dispatch(handleLoading(false));
                    dispatch(handleFormErrors());
                    dispatch(toggleSnackBar(true, i18n.t('updatedMsg')));
                    dispatch(handleResetForm('settingsForm', {
                        current: '',
                        first: '',
                        second: ''
                    }))
                })
                .catch(function (error) {
                    
                    console.log(error.response);
                    
                    
                    if(error.response.status === 400) {
                        dispatch(handleLoading(false));
                        dispatch(handleFormErrors(error.response.data));
                    }
                    else if(error.response.status === 401) {
                        dispatch(handleRefreshToken(userToken, language, () => handleSettingsUpdate(schema)));
                    }
                    else {
                        dispatch(handleLoading(false));
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('serverError')
                        );
                    }
                });
        }).catch(({inner}) => {
            dispatch(handleLoading(false));
            let errors = {};
            for(let fieldError of inner) {
                errors[fieldError.path] = fieldError.message;
            }
            dispatch(handleFormErrors(errors))
            return;
        })
    }
}


export function fetchOrdersSuccess(data, nextEndpoint, refreshMode, loadMore) { 
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: {
            data,
            nextEndpoint,
            refreshMode,
            loadMore
        }
    }
}
export function fetchOrders(refreshMode, loadMore, withLoading = true) {
    return (dispatch, getState) => {

        let {userToken, language, userId} = getState().main, nextEndpoint;

        if(withLoading) {
            dispatch(handleLoading(true));
        }

        if(refreshMode) {
            nextEndpoint = null;
        }
        else if(loadMore) {
            nextEndpoint = getState().main.nextEndpoint;
            
            if(!nextEndpoint) {
                return;
            }
        }
        

        getOrders(userToken.token, userId, nextEndpoint).then(function (response) {
            let {data} = response;
            // handle success
            if(withLoading) {
                dispatch(handleLoading(false));
            }
            console.log(data);        
            dispatch(fetchOrdersSuccess(data['hydra:member'], 'hydra:view' in data ? data['hydra:view']['hydra:next'] : null, refreshMode, loadMore));
        })
        .catch(function (error) {
            // handle error
            if(error.response.status === 401) {
                dispatch(handleRefreshToken(userToken, language, () => fetchOrders(refreshMode)));
            }
            else {
                if(withLoading) {
                    dispatch(handleLoading(false));
                }
                Alert.alert(
                    i18n.t('error'), 
                    i18n.t('serverError')
                );
            }
            console.log(error.response);
        })
        .then(function () {
           
        });
    }
}


export function handleOrderSuccess() {
    return {
        type: HANDLE_ORDER_SUCCESS
    }
}

export function handleOrder(callback) {
    return (dispatch, getState) => {
        let store = getState().main, 
        {
            orderForm, userToken, language, stripeCard
        } = store, 
        {
            number1, number2, number3, numbers,
            quality1, quality2, quality3, qualities
        } = orderForm, pubKey = 'pk_live_heKafxO8hepRwLUqcM2qYryh00u0KA9SHo';


        const card = {
            'card[number]': stripeCard.values.number.replace(/ /g, ''),
            'card[exp_month]': stripeCard.values.expiry.split('/')[0],
            'card[exp_year]': stripeCard.values.expiry.split('/')[1],
            'card[cvc]': stripeCard.values.cvc
        };
       
        const options = {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${pubKey}`
            },
            data: qs.stringify(card),
            url: 'https://api.stripe.com/v1/tokens',
        };

        if(number1.trim() !== '') {
            numbers.push(number1);
        }

        if(number2.trim() !== '') {
            numbers.push(number2);
        }

        if(number3.trim() !== '') {
            numbers.push(number3);
        }

        if(quality1.trim() !== '') {
            qualities.push(quality1);
        }

        if(quality2.trim() !== '') {
            qualities.push(quality2);
        }

        if(quality3.trim() !== '') {
            qualities.push(quality3);
        }
        
        dispatch(handleLoading(true));

        axios(options).then(response => {
            let token = response.data.id;
            
           orderForm.stripeToken = token;

           console.log(orderForm);

            
        postOrder(orderForm, userToken.token)
            .then(function (response) {
                dispatch(handleLoading(false));
                dispatch(handleOrderSuccess());
                dispatch(toggleModal(false));
                callback();
                Alert.alert(
                    i18n.t('congrats'), 
                    i18n.t('orderMsg')
                );
                dispatch(handleFormErrors());
                dispatch(handleResetForm('orderForm', {
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
                }));
                

                
            })
            .catch(function (error) {
                console.log(error.response);
                if(error.response.status === 401) {
                    dispatch(handleRefreshToken(userToken, language, () => handleOrder(callback)));
                }
                else {
                    dispatch(handleLoading(false));
                    Alert.alert(
                        i18n.t('error'), 
                        i18n.t('serverError')
                    );
                }
            });
        }).catch(error => {
            dispatch(handleLoading(false));
            Alert.alert(
                i18n.t('error'), 
                i18n.t('serverError')
            );
        })
    }
}

export function handleContact(schema) {
    return (dispatch, getState) => {
        let store = getState().main, {contactForm, userToken, language} = store;

        dispatch(handleLoading(true));

        schema.validate(contactForm, schemaOptions)
        .then(value => {
            contact(contactForm, userToken.token)
                .then(function (response) {
                    dispatch(handleLoading(false));
                    dispatch(toggleModal(false));
                    dispatch(handleFormErrors());
                    dispatch(handleResetForm('contactForm', {
                        firstName: '',
                        lastName: '',
                        email: '',
                        message: '',
                    }));
                    Alert.alert(
                        i18n.t('congrats'), 
                        i18n.t('sentMsg')
                    );
                })
                .catch(function (error) {

                    console.log(error.response);
                   
                    if(error.response.status === 400) {
                        dispatch(handleLoading(false));
                        dispatch(handleFormErrors(error.response.data));
                    }
                    else if(error.response.status === 401) {
                        dispatch(handleRefreshToken(userToken, language, () => handleContact(schema)));
                    }
                    else {
                        dispatch(handleLoading(false));
                        Alert.alert(
                            i18n.t('error'), 
                            i18n.t('serverError')
                        );
                    }
                });
        }).catch(({inner}) => {
            dispatch(handleLoading(false));
            let errors = {};
            for(let fieldError of inner) {
                errors[fieldError.path] = fieldError.message;
            }
            dispatch(handleFormErrors(errors))
            return;
        })

    }
    
}

export function sendSiteLink(themeUrl, themeName) {
    return (dispatch, getState) => {
        let store = getState().main, {profileForm, userToken, language} = store;

        sendLink({email: profileForm.email, themeUrl, themeName}, userToken.token)
            .then(function (response) {
                Alert.alert(
                    i18n.t('congrats'), 
                    i18n.t('themeLinkMsg')
                );
            })
            .catch(function (error) {
                if(error.response.status === 401) {
                    dispatch(handleRefreshToken(userToken, language, () => sendSiteLink(themeUrl, themeName)));
                }
                else {
                    Alert.alert(
                        i18n.t('error'), 
                        i18n.t('serverError')
                    );
                }
            });
    }
    
}