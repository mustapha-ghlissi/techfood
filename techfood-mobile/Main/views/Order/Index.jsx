import React, { Component } from 'react'
import { 
    SafeAreaView, FlatList, View, 
    ActivityIndicator, RefreshControl,
    TouchableOpacity, StatusBar
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../assets/style'
import OrderItem from '../../components/OrderItem'
import { fetchOrders } from '../../actions/actionCreators'
import { Text, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { withTranslation } from 'react-i18next'

export class Index extends Component {
    
    componentDidMount() {
        let {notification, navigation} = this.props;
        if(notification) {
            navigation.navigate('OrderDetails');
        }
       

        this.unsubscribe = navigation.addListener('focus', e => {
            // Prevent default action
            this.props.fetchOrders();
        });   
    }


    componentWillUnmount() {
        this.unsubscribe();
    }
    
    
    render() {
        let {
            orders, isLoading, fetchOrders, 
            nextEndpoint, navigation, t
        } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#1C246C'/>
                {
                    !orders && isLoading ? 
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size='large' color='#93AF00'/>
                    </View>:
                    <FlatList 
                        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}
                        data={orders || []}
                        renderItem={({ item }) => <OrderItem order={item} />}
                        keyExtractor={item => item.id.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading} 
                                onRefresh={() => fetchOrders(true)} 
                                colors={['#1C246C', '#93AF00']}
                            />
                        }
                        ListEmptyComponent={
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 20
                            }}>
                                <Text style={{
                                    textAlign: 'center'
                                }}>
                                    {t('orderFirst')}
                                </Text>
                                <IconButton 
                                    icon='plus'
                                    style={{
                                        backgroundColor: '#1C246C'
                                    }}
                                    color='#fff'
                                    size={32}
                                    onPress={() => navigation.navigate('HomeStack')}
                                />
                            </View>
                        }
                    />
                }

               
                {
                    nextEndpoint && 
                    <Animatable.View
                        animation='zoomIn'
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            left: 10,
                            right: 10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#1C246C',
                                borderRadius: 35,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingRight: 10,
                                alignSelf: 'center'
                            }}
                            activeOpacity={0.7}
                            onPress={() => fetchOrders(false, true)}
                            disabled={isLoading}
                        >
                            <Icon name='plus-circle' size={32} color='#fff'/>
                            <Text style={{
                                color: '#fff',
                                marginLeft: 10,
                                fontSize: 12
                            }}>
                                {t('displayMore')}
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                }
                
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    isLoading: main.isLoading,
    orders: main.orders,
    nextEndpoint: main.nextEndpoint,
    notification: main.notification
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: (refresh = false, loadMore = false) => dispatch(fetchOrders(refresh, loadMore))
})

Index = withTranslation()(Index);

export default connect(mapStateToProps, mapDispatchToProps)(Index)
