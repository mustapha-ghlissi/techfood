import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
import { Divider } from 'react-native-paper';
import images from '../assets/images';
import {useDispatch} from 'react-redux';
import { logout } from '../actions/actionCreators';
import { useTranslation } from 'react-i18next';

const AppDrawer = (props) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    return (
        <DrawerContentScrollView {...props}>
            <Image 
                source={images.logo}
                style={{
                    height: 120,
                    width: '100%',
                    marginHorizontal: 'auto',
                    marginVertical: 10
                }}
                resizeMode='contain'
            />
            <DrawerItemList {...props} />
            <Divider />
            <DrawerItem
                label={t('logout')}
                labelStyle={{
                    fontFamily: 'Poppins-Regular'
                }}
                icon={({focused, color, size}) => 
                    <Icon color={focused ? '#1C246C' : color} 
                        name='logout' 
                        size={size} 
                    />
                }
                onPress={() => {
                    props.navigation.closeDrawer();
                    dispatch(logout());
                }}
            />
        </DrawerContentScrollView>
    )
}

export default AppDrawer
