import React from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
  HomeStack, ProfileStack, 
  SettingsStack, OrderStack
} from '../stack';
import AppDrawer from '../../../components/AppDrawer';
import i18n from 'i18next';

const Drawer = createDrawerNavigator();

const dimensions = Dimensions.get('window');

const isLargeScreen = dimensions.width >= 768;

const AppDrawerNavigator = ({initialRouteName}) => (
    <Drawer.Navigator
      openByDefault
      drawerType={isLargeScreen ? 'permanent' : 'back'}
      drawerStyle={isLargeScreen ? null : { width: '65%' }}
      overlayColor="transparent"
      drawerContent={(props) => <AppDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: '#1C246C',
        labelStyle: {
          fontFamily: 'Poppins-Regular',
        }
      }}
      initialRouteName={initialRouteName ?? 'HomeStack'}
    >
      <Drawer.Screen 
        options={{
          drawerLabel: i18n.t('themes'),
          drawerIcon: ({focused, color, size}) => <Icon color={focused ? '#1C246C' : color} name='palette-outline' size={size}/>
        }}
        name="HomeStack" 
        component={HomeStack} 
        
      />
      <Drawer.Screen 
        name="ProfileStack" 
        component={ProfileStack} 
        options={{
          drawerLabel: i18n.t('myAccount'),
          drawerIcon: ({focused, color, size}) => <Icon color={focused ? '#1C246C' : color} name='account-circle' size={size}/>,
        
        }}
      />
      <Drawer.Screen 
        name="OrderStack" 
        component={OrderStack}
        options={{
          drawerLabel: i18n.t('myOrders'),
          drawerIcon: ({focused, color, size}) => <Icon color={focused ? '#1C246C' : color} name='file-cabinet' size={size}/>,
        }}
      />
      <Drawer.Screen 
        name="SettingsStack" 
        component={SettingsStack} 
        options={{
          drawerLabel: i18n.t('settings'),
          drawerIcon: ({focused, color, size}) => <Icon color={focused ? '#1C246C' : color} name='settings' size={size}/>
        }}
      />
    </Drawer.Navigator>
)


export {
  AppDrawerNavigator
}
