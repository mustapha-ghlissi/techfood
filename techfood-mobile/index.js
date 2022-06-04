/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';

import App from './Main/App';
import {name as appName} from './app.json';
import {  configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {store} from './Main/store';
import './Main/translations/i18n';

const fontConfig = {
    default: {
      bold: {
        fontFamily: 'Poppins-Bold',
        fontWeight: 'normal',
      },
      regular: {
        fontFamily: 'Poppins-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Poppins-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Poppins-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Poppins-Thin',
        fontWeight: 'normal',
      },
    },
  };
  
  const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: '#1C246C'
      },
      fonts: configureFonts(fontConfig),
    };


    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background Listener', remoteMessage);
    });


    const Main = () => (
        <StoreProvider store={store}>
          <PaperProvider theme={theme}>
            <App />
          </PaperProvider>
        </StoreProvider>  
    )
    

AppRegistry.registerComponent(appName, () => Main);
