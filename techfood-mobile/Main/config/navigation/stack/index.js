import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AuthScreen from '../../../views/Auth';
import LoginScreen from '../../../views/Login';
import RegisterScreen from '../../../views/Register';
import ForgotPasswordScreen from '../../../views/ForgotPassword';
import HomeScreen from '../../../views/Home';
import ThemeDetailsScreen from '../../../views/ThemeDetails';
import SiteDetailsScreen from '../../../views/Site/Index';
import ProfileScreen from '../../../views/Client/Profile';
import SettingsScreen from '../../../views/Client/Settings';
import OrderScreen from '../../../views/Order/Index';
import OrderDetailsScreen from '../../../views/Order/Details';
import AppHeader from '../../../components/AppHeader';
import _ from 'lodash';
import {LocalizationContext} from '../../../App';


const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerTransparent: true,
            title: false
        }}
    >
        <Stack.Screen 
            name="Auth" 
            component={AuthScreen} 
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{
                ...TransitionPresets.SlideFromRightIOS
            }}
        />
        <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{
                ...TransitionPresets.SlideFromRightIOS
            }}
        />
        <Stack.Screen 
            name="ForgotPassword" 
            component={ForgotPasswordScreen} 
            options={{
                ...TransitionPresets.SlideFromRightIOS
            }}
        />
    </Stack.Navigator>
)

const HomeStack = () => {
    const { t } = React.useContext(LocalizationContext);
    return (
    <Stack.Navigator
        screenOptions={({route}) => ({
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.name;
              
                return (
                  <AppHeader
                    previous={previous}
                    title={title}
                    route={route}
                  />
                );
            }
        })}
    >
        <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
                title: _.capitalize(t('ourThemes'))
            }}
        />
        <Stack.Screen 
            name="ThemeDetails" 
            component={ThemeDetailsScreen}
            options={({ route }) => ({ 
                title: _.capitalize(t(route.params.site.title)),
                ...TransitionPresets.SlideFromRightIOS
            })}
        />
        <Stack.Screen 
            name="SiteDetails" 
            component={SiteDetailsScreen}
            options={({ route }) => ({ 
                title: route.params.pageName,
                ...TransitionPresets.SlideFromRightIOS
            })}
        />
    </Stack.Navigator>
)}

const ProfileStack = () => {
    const { t } = React.useContext(LocalizationContext);
    return (
    <Stack.Navigator
        screenOptions={({route}) => ({
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.name;
              
                return (
                  <AppHeader
                    previous={previous}
                    title={title}
                    route={route}
                  />
                );
            }
        })}
    >
        <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                title: t('myAccount')
            }}
        />
    </Stack.Navigator>
)}

const SettingsStack = () => {
    const { t } = React.useContext(LocalizationContext);
    return (
    <Stack.Navigator
        screenOptions={({route}) => ({
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.name;
              
                return (
                  <AppHeader
                    previous={previous}
                    title={title}
                    route={route}
                  />
                );
            }
        })}
    >
        <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
                title: t('settings')
            }}
        />
    </Stack.Navigator>
)}

const OrderStack = () => {

    const { t } = React.useContext(LocalizationContext);
    return (

    <Stack.Navigator
        screenOptions={({route}) => ({
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.name;
              
                return (
                  <AppHeader
                    previous={previous}
                    title={title}
                    route={route}
                  />
                );
            }
        })}
    >
        <Stack.Screen 
            name="Order" 
            component={OrderScreen}
            options={{
                title: t('myOrders')
            }}
        />
        <Stack.Screen 
            name="OrderDetails" 
            component={OrderDetailsScreen}
            options={({ route }) => ({ 
                title: t('techfoodOrder'),
                ...TransitionPresets.SlideFromRightIOS
            })}
        />
    </Stack.Navigator>
)}


export {
    AuthStack,
    HomeStack,
    ProfileStack,
    SettingsStack,
    OrderStack
}