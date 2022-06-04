import React from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Alert, Linking, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { sendSiteLink } from '../actions/actionCreators';
import { useTranslation } from 'react-i18next';


const onDesktopOpen = (sendSiteLink, trans) => {
    Alert.alert(
        'Info',
        trans('pcVersion'),
        [
            {
              text: trans('cancel'),
              style: "cancel"
            },
            { 
                text: trans('sendLink'), 
                onPress: sendSiteLink,
            }
          ],
        { cancelable: false }
    )
}

const onMobileOpen = async ({url}, trans) => {    
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`${trans('invalidUrl')} ${url}`);
    }
}


const AppHeader = ({previous, title, route}) => {
    const navigation = useNavigation();
    const isOpen = useIsDrawerOpen();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const site = route.params ? route.params.site : null;
    
    return (
        <Appbar.Header>
            {
                previous ?
                <Appbar.BackAction
                    onPress={() => navigation.goBack()}
                />:
                <Appbar.Action
                    icon={isOpen ? 'close' : 'menu'}
                    onPress={() => navigation.toggleDrawer()}
                />
            }

            <Appbar.Content
                title={title}
            />
            
            {
                route && route.name === 'ThemeDetails' &&
                <>
                    <Appbar.Action 
                        icon={Platform.OS === 'android' ? 'cellphone-android' : 'cellphone-iphone'} 
                        color='white' onPress={() => onMobileOpen(site, t)} 
                    />
                    <Appbar.Action icon="television" color='white' onPress={() => onDesktopOpen(() => dispatch(sendSiteLink(site.url, site.title)), t)} />
                </>
            }
            
        </Appbar.Header>
    )
}

export default AppHeader
