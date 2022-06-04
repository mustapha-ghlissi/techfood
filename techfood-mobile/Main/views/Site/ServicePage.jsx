import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform, TouchableNativeFeedback } from 'react-native'
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'
import styles from '../../assets/style';
import { TextInput, Text, Paragraph, IconButton, Button, Divider } from 'react-native-paper';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast, {DURATION} from 'react-native-easy-toast';
import { handleChangeText, handleArray, removeArrayItem } from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';

class ServicePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            modalType: 'service',
            services: [],
            indexService: null,
            selectedService: null,
            title: '',
            description: '', 
            price: ''
        }

        this.toast = React.createRef();
    }

    toggleModal = (isOpenModal, modalType = 'service', service = null, indexService = null) => {
        this.setState({
            isOpenModal,
            modalType,
            selectedService: service,
            title: service ? service.title : '',
            description: service ? service.description : '', 
            price: service ? service.price : '',
            indexService
        });
    }

    handleService = () => {
     
        let {state} = this, {selectedService, indexService} = state,  {saveService, t} = this.props, service = {
            title: state.title,
            description: state.description,
            price: state.price
        }

        if(selectedService) {
            saveService('services', service, indexService);
            this.toggleModal(false);
            this.toast.current.show(t('updatedMsg'));
        }
        else {
            this.setState({
                title: '',
                description: '',
                price: '',
            }, () => {
                saveService('services', service)
                this.toast.current.show(t('savedMsg'))
            });
        }
    }

    deleteService = () => {
        let {removeService, t} = this.props, {indexService} = this.state;

        removeService('services', indexService);
        this.toggleModal(false);  
        this.toast.current.show(t('deletedMsg'));
    }

    renderModal = () => {
        let { modalType, isOpenModal, selectedService, title, description, price } = this.state,
            {t, orderForm} = this.props, {services} = orderForm;

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
        
        return(
            <Modal
                isVisible={isOpenModal}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                onBackButtonPress={() => {
                    if(modalType === 'details') {
                        this.toggleModal(true)
                    }
                    else {
                        this.toggleModal(false)
                    }
                }}
                hasBackdrop={false}
                style={{
                    backgroundColor: '#F1F1F1',
                    margin: 0
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <Text 
                        style={styles.modalTitle}
                    >
                        {
                            modalType === 'service' ? 
                            `${t('addServiceTitle')} ${services.length}/5`:
                            t('offeredServices')
                        }
                    </Text>
                    {
                        selectedService && 
                        <IconButton
                            icon='delete'
                            size={24}
                            color='#000'
                            onPress={this.deleteService}
                        />
                    }
                    <IconButton
                        icon='close'
                        size={24}
                        color='#000'
                        onPress={() => {
                            if(modalType === 'details') {
                                this.toggleModal(true)
                            }
                            else {
                                this.toggleModal(false)
                            }
                        }}
                    />
                </View>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, }}>
                    {
                        modalType === 'service' ?
                        <>
                            <View style={{
                                paddingHorizontal: 20
                            }}>
                            <Paragraph style={{
                                marginBottom: 10
                            }}>
                                {t('infoLabel')}
                            </Paragraph>
                            <View style={[styles.inputContainer, innerStyles.inputContainer]}>
                                <TextInput
                                    label={t('titleLabel')}
                                    onChangeText={text => this.setState({title: text})}
                                    value={title}
                                    textContentType='organizationName'
                                    underlineColor='transparent'
                                    style={[styles.inputText]}
                                />
                            </View>
                            <View style={[styles.inputContainer, innerStyles.inputContainer]}>
                                <TextInput
                                    multiline
                                    label={t('descriptionLabel')}
                                    onChangeText={text => this.setState({description: text})}
                                    textContentType='organizationName'
                                    underlineColor='transparent'
                                    style={[styles.inputText, innerStyles.textArea]}
                                    value={description}
                                />
                                <TouchableOpacity
                                    onPress={() => this.toggleModal(true, 'details')}
                                    style={{
                                        padding: 10
                                    }}
                                >
                                <Text style={{
                                    color: '#1C246C',
                                }}>
                                    {t('help')}
                                </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.inputContainer, innerStyles.inputContainer]}>
                                <TextInput
                                    label={t('priceLabel')}
                                    onChangeText={text => this.setState({price: text})}
                                    keyboardType='phone-pad'
                                    underlineColor='transparent'
                                    style={[styles.inputText]}
                                    value={price}
                                />
                            </View>
                            </View>
                        </>:
                    <>
                    <Text style={{
                        fontFamily: 'Poppins-SemiBold',
                        textDecorationLine: 'underline',
                        marginHorizontal: 20
                    }}>
                        {t('servicesDescriptionHelp.part1')}
                    </Text>
                   
                    
                    <View style={styles.list}>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Text style={styles.listItemText}>
                            {t('servicesDescriptionHelp.part2')}
                            </Text>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Text style={styles.listItemText}>
                            {t('servicesDescriptionHelp.part3')}
                            </Text>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Text style={styles.listItemText}>
                            {t('servicesDescriptionHelp.part4')}
                            </Text>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Text style={styles.listItemText}>
                            {t('servicesDescriptionHelp.part5')}
                            </Text>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Text style={styles.listItemText}>
                            {t('servicesDescriptionHelp.part6')}
                            </Text>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Text style={styles.listItemText}>
                            {t('servicesDescriptionHelp.part7')}
                            </Text>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Text style={styles.listItemText}>
                            {t('servicesDescriptionHelp.part8')}
                            </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{paddingHorizontal: 20}}>
                    <Paragraph style={{textAlign: 'justify'}}>
                    {t('servicesDescriptionHelp.part9')}
                        </Paragraph>
                    </View>
                    </>
                    }
                </ScrollView>
                
                {
                    modalType === 'service' &&
                    (Platform.OS === 'android' ?
                    <TouchableNativeFeedback
                        useForeground
                        onPress={this.handleService}
                        disabled={!selectedService && services.length === 5}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: !selectedService && services.length === 5 ?'#D1D1D1' : '#93AF00',
                            padding: 15,
                        }}>
                            
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold',
                                textTransform: 'uppercase',
                                marginRight: 5,
                                color: '#fff'
                            }}>
                                {
                                    selectedService ?
                                    t('update') :
                                    services.length === 5 ? 
                                    t('reachedServices') : 
                                    t('save')
                                }
                            </Text>
                            
                        </View>
                    </TouchableNativeFeedback>:
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: !selectedService && services.length === 5 ?'#D1D1D1' : '#93AF00',
                            padding: 15,
                        }}
                        onPress={this.handleService}
                        disabled={!selectedService && services.length === 5}
                    >
                        <Text style={{
                            fontFamily: 'Poppins-SemiBold',
                            textTransform: 'uppercase',
                            marginRight: 5,
                            color: '#fff'
                        }}>
                                {
                                    selectedService ?
                                    t('update') :
                                    services.length === 5 ? 
                                    t('reachedServices') : 
                                    t('save')
                                }
                        </Text>
                        
                    </TouchableOpacity>)
                }

                <Toast 
                    ref={this.toast}
                    style={{backgroundColor:'rgba(28, 36, 108, 0.8)', borderRadius: 20}}
                    fadeInDuration={500}
                    fadeOutDuration={1000}
                />
            </Modal>
        )
    }

   

    render() {
        
        let {orderForm, t} = this.props , {services} = orderForm;

        return (
            <Animatable.View 
                style={styles.container}
                animation='fadeIn'
            >
                <Text style={{
                    marginBottom: 10
                }}>
                   {t('yourServicesDescription')}
                </Text>
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 5,

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 2
                }}>
                    <View style={{
                        alignItems: 'center',
                        padding: 10
                    }}>  
                    <Text>{t('ourServices')}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: '#1C246C'
                    }}>
                        <Text style={{flex: 1, color: 'white'}}>{t('title')}</Text>
                        <Text style={{flex: 2, color: 'white'}}>{t('description')}</Text>
                        <Text style={{flex: 1, color: 'white'}}>{t('price')}</Text>
                    </View>
                    <View>
                        {
                            services.length > 0 ?
                                services.map((service, index) => (
                                    <>
                                        {
                                            Platform.OS === 'android' ? 
                                            <TouchableNativeFeedback
                                                key={index}
                                                useForeground
                                                onPress={() => this.toggleModal(true, 'service', service, index)}
                                            >
                                                <View 
                                                    key={index}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        padding: 10,
                                                        borderBottomColor: '#F1F1F1',
                                                        borderBottomWidth: 1
                                                    }}>
                                                    <Text style={{flex: 1, fontSize: 12, marginRight: 5}} numberOfLines={1}>{service.title}</Text>
                                                    <Text style={{flex: 2, fontSize: 12, marginRight: 5}} numberOfLines={1}>{service.description}</Text>
                                                    <Text style={{flex: 1, fontSize: 12, marginRight: 5}} numberOfLines={1}>{service.price}</Text>
                                                </View>
                                            </TouchableNativeFeedback>:
                                            <TouchableOpacity
                                                onPress={() => this.toggleModal(true, 'service', service, index)}
                                                key={index}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    padding: 10,
                                                    borderBottomColor: '#F1F1F1',
                                                    borderBottomWidth: 1
                                                }}
                                            >
                                                    <Text style={{flex: 1, fontSize: 12, marginRight: 5}} numberOfLines={1}>{service.title}</Text>
                                                    <Text style={{flex: 2, fontSize: 12, marginRight: 5}} numberOfLines={1}>{service.description}</Text>
                                                    <Text style={{flex: 1, fontSize: 12, marginRight: 5}} numberOfLines={1}>{service.price}</Text>
                                            </TouchableOpacity>

                                        }
                                        
                                    </>
                                ))
                            :
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'center',
                                margin: 10
                            }}>
                                {t('infoLabel')}
                            </Text>
                        }
                    </View>
                    <View style={{
                        paddingVertical: 10,
                        alignItems: 'center'
                    }}>
                        <IconButton
                            icon='plus'
                            size={32}
                            color='#fff'
                            style={{
                                backgroundColor: '#1C246C'
                            }}
                            onPress={() => this.toggleModal(true)}
                            disabled={services.length === 5}
                        />
                    </View>
                </View>
                {this.renderModal()}
                
               
            </Animatable.View>
        )
    }
}


const mapStateToProps = ({main}) => ({
    orderForm: main.orderForm,
    formErrors: main.formErrors
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'orderForm')),
    saveService: (arrayName, service, indexService = null) => dispatch(handleArray(arrayName, service, indexService, 'orderForm')),
    removeService: (arrayName, index) => dispatch(removeArrayItem(arrayName, index, 'orderForm'))
})

const innerStyles = StyleSheet.create({
    inputContainer: {

    },
    textArea: {
        height: Dimensions.get('screen').height/3,
    }
})

ServicePage = withTranslation()(ServicePage);

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage)
