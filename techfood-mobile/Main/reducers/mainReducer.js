import { 
    HANDLE_LOADING, 
    TOGGLE_MODAL, 
    HANDLE_LOGGING_OUT,
    RESTORE_TOKEN_SUCCESS,
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS,
    QUICK_START_SUCCESS,
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
    HANDLE_NEXT_STEP,
    HANDLE_PREV_STEP,
    HANDLE_ORDER_SUCCESS,
    RESET_STEPS,
    HANDLE_NOTIFICATION,
    HANDLE_LANGUAGE

} from '../actions/actionTypes';


const initialState = {
    isLoading: false,
    isBooting: true,
    isLoggingOut: false,
    userToken: null,
    quickStart: false,
    language: null,
    isOpenModal: false,
    userId: null,
    isProfileFetched: false,
    contactForm: {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    },
    loginForm: {
        email: '',
        password: ''
    },
    forgotPasswordForm: {
        email: '',
    },
    registerForm: {
        firstName: '',
        lastName: '',
        age: 1,
        gender: '',
        email: '',
        password: '',
        phoneNumber: ''
    },
    profileForm: {
        firstName: '',
        lastName: '',
        age: 1,
        gender: '',
        email: '',
        phoneNumber: ''
    },
    settingsForm: {
        current: '',
        first: '',
        second: ''
    },
    orderForm: {
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
    },
    notification: null,
    orders: null,
    nextEndpoint: null,
    formErrors: {},
    isOpenSnackBar: false,
    snackBarMessage: null,
    stripeCard: null,
    currentStep: 0,
    steps: 7
}

export const mainReducer = (state = initialState, action) => {

    const {payload, type} = action;
    
    switch(type) {

        case HANDLE_NOTIFICATION:
            return {
                ...state,
                notification: payload
            }

        case RESET_STEPS:
            return {
                ...state,
                currentStep: 0
            }

        case HANDLE_NEXT_STEP:
            return {
                ...state,
                currentStep: state.currentStep + 1
            }

        case HANDLE_PREV_STEP:
            return {
                ...state,
                currentStep: state.currentStep - 1
            }

        case HANDLE_STRIPE_CARD:
            return {
                ...state,
                stripeCard: payload
            }

        case HANDLE_LANGUAGE:
            return {
                ...state,
                language: payload
            }

        case QUICK_START_SUCCESS: 
            return {
                ...state,
                quickStart: true
            }

        case RESET_FORM:
            return {
                ...state,
                ...payload
            }

        case HANDLE_LOADING: 
            return {
                ...state,
                isLoading: payload.isLoading
            }

        case HANDLE_BOOTING: 
            return {
                ...state,
                isBooting: payload.isBooting
            }

        case TOGGLE_MODAL:
            return {
                ...state,
                isOpenModal: payload.isOpenModal
            }

        case TOGGLE_SNACKBAR:
            return {
                ...state,
                isOpenSnackBar: payload.isOpen,
                snackBarMessage: payload.message
            }

        case HANDLE_LOGGING_OUT:
            return {
                ...state,
                isLoggingOut: payload.isLoggingOut
            }

        case RESTORE_TOKEN_SUCCESS:
            return {
                ...state,
                language: payload.language,
                quickStart: payload.quickStart,
                userToken: payload.userToken,
                userId: payload.userToken ? payload.userToken.userId : null,
                profileForm: {
                    ...state.profileForm,
                    email: payload.userToken ? payload.userToken.email : '',
                }
            }

        case SIGN_IN_SUCCESS: 
            return {
                ...state,
                userToken: payload.userToken,
                userId: payload.userToken.userId,
                profileForm: {
                    ...state.profileForm,
                    email: payload.userToken.email
                }
            }

        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                userToken: null
            }

        case HANDLE_CHANGE_TEXT: 
            return  {
                ...state,
                [payload.formName]: {
                    ...state[payload.formName],
                    ...payload.data
                }
            }

        case HANDLE_FORM_ERRORS: 
            return {
                ...state,
                formErrors: payload
            }

        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profileForm: payload.profileFormData,
                isProfileFetched: true
            }

        case HANDLE_AUTO_FILL_FORM:
            return {
                ...state,
                [payload.formName]: payload.data
            }

        case HANDLE_ARRAY:
            return {
                ...state,
                [payload.formName]: {
                    ...state[payload.formName],
                    [payload.arrayName]: payload.index !== null ? payload.arrayData
                    : [
                        ...state[payload.formName][payload.arrayName],
                        payload.value
                    ]
                }
            }

        case REMOVE_ARRAY_ITEM: 
            return {
                ...state,
                [payload.formName]: {
                    ...state[payload.formName],
                    [payload.arrayName]: state[payload.formName][payload.arrayName].filter((item, index) => index !== payload.index)
                }
            }

        case HANDLE_FULL_ARRAY:
            return {
                ...state,
                [payload.formName]: {
                    ...state[payload.formName],
                    [payload.arrayName]: payload.arrayData
                }
            }

        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload.refreshMode ? 
                    payload.data : 
                    payload.loadMore ? [
                        ...state.orders,
                        ...payload.data,
                    ]:payload.data,
                nextEndpoint: payload.nextEndpoint
            }

        case HANDLE_ORDER_SUCCESS:
            return {
                ...state,
                currentStep: 0
            }

        default: 
            return state;
    }
}