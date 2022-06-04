import React, { Component } from 'react'
import { SafeAreaView, ScrollView, View, Image, Dimensions, TouchableOpacity, Linking, Alert, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../../assets/style'
import images from '../../assets/images'
import { Divider, Text } from 'react-native-paper';
import moment from 'moment';
import { handleNotification } from '../../actions/actionCreators'
import { withTranslation } from 'react-i18next'

class Progress extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            currentPage: null,
            pages: [
                {
                    index: 1,
                    name: 'siteName',
                    logo: images.siteName,
                    title: props.t('siteCreation'),
                    time: 2
                },
                {
                    index: 2,
                    name: 'presentation',
                    logo: images.home,
                    title: props.t('home'),
                    time: 2
                },
                {
                    index: 3,
                    name: 'services',
                    logo: images.service,
                    title: props.t('services'),
                    time: 2
                },
                {
                    index: 4,
                    name: 'about',
                    logo: images.history,
                    title: props.t('about'),
                    time: 2
                },
                {
                    index: 5,
                    name: 'contact',
                    logo: images.contact,
                    title: props.t('contact'),
                    time: 1
                }
                
            ],
            filteredPages: [],
            order: null
        }
    }
    
    componentDidMount() {
        let order, {notification} = this.props, 
            currentPage, 
            {pages} = this.state;
    
            if(notification) {
                order = notification;
            }
            else {
                order = this.props.route.params.order;
            }
            
            currentPage = order.currentPage;

            this.setState({
                order
            });

            if(currentPage) {
                this.setState({
                    currentPage: pages.find(page => page.name === currentPage),
                    filteredPages: pages.filter(page => page.name !== currentPage),
                });
            }
    }

    componentDidUpdate(prevProps, prevState) {
        let {order} = this.state, {notification} = this.props, 
            currentPage, 
            {pages} = this.state;
    
            if(notification && order !== notification) {
               
                order = notification;
                currentPage = order.currentPage;
    
                this.setState({
                    order
                });
    
                if(currentPage) {
                    this.setState({
                        currentPage: pages.find(page => page.name === currentPage),
                        filteredPages: pages.filter(page => page.name !== currentPage),
                    });
                }
            }
    }
    

    openSite = async () => {    
        let {order} = this.state, {siteUrl} = order; 
        const {t} = this.props;

        if(siteUrl) {
            const supported = await Linking.canOpenURL(siteUrl);
            if (supported) {
                await Linking.openURL(siteUrl);
            } else {
                Alert.alert('Erreur', `${t('invalidUrl')} ${siteUrl}`);
            }
        }
        else {
            Alert.alert('Info', t('unavailableLink'));
        }
        
    }

    checkTime = (time) => {
        var timeFormat = /^([0-9]{2})\:([0-9]{2})$/;
        return timeFormat.test(time);
    }

    getEstimatedTime = () => {
        let {currentPage, order} = this.state,
            {schedulesTimes} = order, estimatedTime = null;
        
        if(currentPage) {
            if(schedulesTimes && currentPage.name in schedulesTimes && this.checkTime(schedulesTimes[currentPage.name]) === true) {
                estimatedTime = schedulesTimes[currentPage.name];
            }
        }
        return estimatedTime;
    }

    componentWillUnmount() {
        this.props.handleNotification();
    }
    
    
    render() {

        let { order, pages, filteredPages, currentPage } = this.state, schedules;
        const {t} = this.props;

        if(!order)
            return null;

        schedules  = order.schedules;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
                <ScrollView contentContainerStyle={{flexGrow: 1, padding: 20}}>
                    <View style={{
                        height: Dimensions.get('window').height / 4,
                        backgroundColor: '#1C246C',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}>
                    <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: '#1C246C',
                            transform: [
                              {scaleX: 2}
                            ],
                            top: 50
                    }} />
                    <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: '#1C246C',
                            transform: [
                              {scaleX: 2}
                            ],
                            top: 50
                          
                    }} />
                    <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: '#1C246C',
                            transform: [
                              {scaleX: 2}
                            ],
                            top: 50
                          
                    }} />
                    </View>
                    {
                        parseInt(order.status) === 2 ?
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 5,
                            overflow: 'hidden',
                            shadowColor: "#fff",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,          
                            marginBottom: 10 
                        }}>
                            <View style={{
                                    backgroundColor: '#fff',
                                    flex: 1,
                                    paddingHorizontal: 10,
                                    paddingVertical: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={this.openSite}
                                        activeOpacity={0.6}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: '#93AF00',
                                            borderRadius: 35,
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                            shadowColor: "#fff",
                                            shadowOffset: {
                                                width: 0,
                                                height: 0,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,      
                                        }}
                                    >
                                        <Icon name='link' color='#fff' size={32} />
                                        <Text style={{
                                            color: '#fff',
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 17,
                                            marginLeft: 10
                                        }}>
                                            {t('seeLink')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            
                                <View style={{
                                    padding: 10,
                                    backgroundColor: '#F1F1F1',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: 15
                                    }}>
                                        {t('yourOrder')}
                                    </Text>
                                </View>
                    
                            {
                                pages.map((page, index) => (
                                    <React.Fragment key={index}>
                                        <View 
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingRight: 10
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                            <Image 
                                                source={page.logo}
                                                style={{
                                                    width: 48,
                                                    height: 48
                                                }}
                                                resizeMode='contain'
                                            />
                                            <Text> 
                                                {page.title}
                                            </Text>    
                                            </View>  
                                            <Icon name='check-circle' size={24} color='#93AF00' />           
                                        </View>
                                        {index < pages.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))
                            }
                        </View>:
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 5,
                            overflow: 'hidden',
                            shadowColor: "#fff",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,          
                            marginBottom: 10 
                        }}>
                            {
                                currentPage && 
                                <View style={{
                                    backgroundColor: '#fff',
                                    flex: 1,
                                    padding: 10,
                                    marginBottom: 20
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        marginBottom: 30
                                    }}>
                                        <View style={{
                                            flex: 1
                                        }}>
                                            <Text style={{
                                                fontFamily: 'Poppins-Medium',
                                                fontSize: 12
                                            }}>
                                                {t('estimatedTime')}: {schedules[currentPage.name]}h
                                            </Text>
                                            {
                                                this.getEstimatedTime() &&
                                                <Text style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    fontSize: 12
                                                }}>
                                                    {t('start')}: {this.getEstimatedTime()}h
                                                </Text>
                                            }
                                            
                                        </View>
                                        
                                            <Image
                                                source={currentPage.logo}
                                                style={{
                                                    width: 48,
                                                    height: 48
                                                }}
                                                resizeMode='contain'
                                            />
                                        
                                        
                                    </View>
                                    <Text style={{
                                        fontFamily: 'Poppins-SemiBold',
                                        textAlign: 'center',
                                        fontSize: 17,
                                        color: '#1C246C'
                                    }}>
                                        {currentPage.title} {t('pageInProgress')}
                                    </Text>
                                </View>
                            }
                                

                                <View style={{
                                    padding: 10,
                                    backgroundColor: '#F1F1F1',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: 15
                                    }}>
                                        {t('yourOrder')}
                                    </Text>
                                </View>
                           
                    
                            {
                                filteredPages.map((page, index) => (
                                    <React.Fragment key={index}>
                                        <View 
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingRight: 10
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                            <Image 
                                                source={page.logo}
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    marginRight: 10
                                                }}
                                                resizeMode='contain'
                                            />
                                            <Text> 
                                                {page.title}
                                            </Text>    
                                            </View>

                                            
                                            {
                                                page.index < currentPage.index ? 
                                                <Icon name='check-circle' size={24} color='#93AF00' />:
                                                <Icon name='timer' size={24} color='orange' />
                                            }

                                                                    
                                        </View>
                                        {index < filteredPages.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))
                            }
                            
                        </View> 
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    notification: main.notification
})

const mapDispatchToProps = dispatch => ({
    handleNotification: (order = null) => dispatch(handleNotification(order))
})

Progress = withTranslation()(Progress);

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
