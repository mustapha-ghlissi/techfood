/**
 * بسم الله الرحمان الرحيم
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StatusBar, ActivityIndicator, Alert
} from 'react-native';
import {
  Portal, Dialog, Text
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import SplashScreen from './views/SplashScreen';
import LanguageScreen from './views/Language';
import GetStartedScreen from './views/GetStarted';
import {
  AuthStack
} from './config/navigation/stack';
import {
  AppDrawerNavigator
} from './config/navigation/drawer';
import { boot, handleNotification, fetchOrders } from './actions/actionCreators';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './config/RootNavigation';
import { saveToken } from './api/services';
import { withTranslation } from 'react-i18next';

export const LocalizationContext = React.createContext();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialRouteName: null
    }
  }

  componentDidMount() {
    let {i18n} = this.props;
    this.props.bootstrap((lang) => i18n.changeLanguage(lang));
    
    this.onOpenedNotification();
    this.getInitialNotification();
    this.unsubsribe = messaging().onMessage(remoteMessage => {
      if(remoteMessage) {
        this.handleNotification(remoteMessage, true, true);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let {userToken} = this.props;
   
    if(userToken !== prevProps.userToken) {
      messaging().onTokenRefresh(firebaseToken => {
        saveToken(firebaseToken, userToken.token)
            .then(function (response) {
            })
            .catch(function (error) {
            });
        });
      
    }
  }
  

  goToOrderScreen = (order, withNavigation) => {
    let  {handleNotification} = this.props;

    handleNotification(order);

    if(withNavigation) {
      RootNavigation.navigate('OrderStack');
      RootNavigation.navigate('OrderStack', {
        screen: 'OrderDetails'
      });
    }
  }

  handleNotification = (remoteMessage, withNavigation = true, withAlert = false) => {
  
      let  orderData = remoteMessage.data, 
      order, schedules, schedulesTimes, {t} = this.props;

      schedules = {
          siteName: orderData.schedulesSiteName,
          presentation: orderData.schedulesPresentation,
          about: orderData.schedulesAbout,
          contact: orderData.schedulesContact,
          services: orderData.schedulesServices,
      };
  
        schedulesTimes = {
          siteName: orderData.schedulesTimesSiteName,
          presentation: orderData.schedulesTimesPresentation,
          about: orderData.schedulesTimesAbout,
          contact: orderData.schedulesTimesContact,
          services: orderData.schedulesTimesServices,
        };
  
        delete orderData.schedulesSiteName;
        delete orderData.schedulesPresentation;
        delete orderData.schedulesAbout;
        delete orderData.schedulesContact;
        delete orderData.schedulesServices;
        delete orderData.schedulesTimesSiteName;
        delete orderData.schedulesTimesPresentation;
        delete orderData.schedulesTimesAbout;
        delete orderData.schedulesTimesContact;
        delete orderData.schedulesTimesServices;
  
        order = {
          ...orderData,
          schedules,
          schedulesTimes,
        };
        

        if(withAlert) {
          Alert.alert(
            remoteMessage.notification.title,
            remoteMessage.notification.body,
            [
              {
                text: t('close'),
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { 
                text: t('seeOrder'), 
                onPress: () => this.goToOrderScreen(order, withNavigation)
              }
            ],
            { cancelable: true }
          );
        }
        else {
          this.goToOrderScreen(order, withNavigation);
        }
         
  }

  onOpenedNotification = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      this.handleNotification(remoteMessage);
    });
  }

  getInitialNotification = () => {
    // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {        
        this.setState({
          initialRouteName: 'OrderStack'
        }, () => this.handleNotification(remoteMessage, false));          
      }
    });
  }

  componentWillUnmount() {
    this.unsubsribe();
  }
  
  
  renderLogoutDialog = (trans) => (
    <Portal>
        <Dialog
            visible={this.props.isLoggingOut}
            dismissable={false}
        >
          <Dialog.Content style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ActivityIndicator color='#1C246C'/>
            <Text style={{
              marginTop: 10
            }}>
              {trans('loggingOut')}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
  )
  
  render() {
    let {isBooting, language, quickStart, userToken, t} = this.props, {initialRouteName} = this.state;

    return (
      <LocalizationContext.Provider value={{t: t}}>
        <NavigationContainer ref={RootNavigation.navigationRef}>
          {
            isBooting ? 
            <SplashScreen />:
            language ?
            (quickStart ?
              (userToken ? 
                <AppDrawerNavigator initialRouteName={initialRouteName} />
                :
                <AuthStack />
              ) :
            <GetStartedScreen/>):
            <LanguageScreen />
          }

          {this.renderLogoutDialog(t)}
          
        </NavigationContainer>
      </LocalizationContext.Provider>
        
    )
  }
}

const mapStateToProps = ({main}) => ({
  isBooting: main.isBooting,
  isLoggingOut: main.isLoggingOut,
  quickStart: main.quickStart,
  language: main.language,
  userToken: main.userToken
});

const mapDispatchToProps = dispatch => ({
  bootstrap: (callback) => dispatch(boot(callback)),
  handleNotification: (data) => dispatch(handleNotification(data)),
  fetchOrders: () => dispatch(fetchOrders(false, false, false))
});


App = withTranslation()(App);

export default connect(mapStateToProps, mapDispatchToProps)(App);
