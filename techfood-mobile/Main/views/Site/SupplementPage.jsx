import React, { Component } from 'react'
import { 
    View, SafeAreaView, ScrollView, 
    TouchableOpacity, Dimensions, Platform,
    TouchableNativeFeedback, Image
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../assets/style';
import { Text, Checkbox, Paragraph, IconButton, TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-easy-toast';
import Modal from 'react-native-modal';
import images from '../../assets/images';
import { handleChangeText, handleArray, removeArrayItem, handleFullArray } from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';

class SupplementPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            checkedTarif: false,
            checkedQuality: false,
            checkedNumbers: false,
            isOpenPricingModal: false,
            isOpenPreviewModal: false,
            indexTarif: null,
            selectedTarif: null,
            title: '',
            price: '', 
            ranges: [],
            image: null
        }

        this.toast = React.createRef();
    }

    togglePreviewModal = (isOpenModal, image = null) => {
        this.setState((state, props) => ({
            isOpenPreviewModal: isOpenModal,
            image
        }));
    }

    togglePricingModal = (isOpenModal, tarif = null, index = null) => {
        this.setState((state, props) => ({
            isOpenPricingModal: isOpenModal,
            indexTarif: index,
            selectedTarif: tarif,
            title: tarif ? tarif.title : '',
            price: tarif ? tarif.price : '',
            ranges: tarif ? tarif.ranges : [],
        }));
    }

    handlePrice = () => {

        let {state} = this, {selectedTarif, indexTarif} = state,  {savePrice, t} = this.props, tarif = {
            title: state.title,
            price: state.price,
            ranges: state.ranges
        }

        if(selectedTarif) {
            savePrice('pricing', tarif, indexTarif);
            this.togglePricingModal(false);
            this.toast.current.show(t('updatedMsg'));
        }
        else {
            this.setState({
                title: '',
                price: '',
                ranges: []
            }, () => {
                savePrice('pricing', tarif)
                this.toast.current.show(t('savedMsg'))
            });
        }
    }

    deletePrice = () => {
        let {removePrice} = this.props, {indexTarif} = this.state;

        removePrice('pricing', indexTarif);
        this.togglePricingModal(false);  
        this.toast.current.show(t('deletedMsg'));
    }

    handleRange = (indexField, value) => {
        let {ranges} = this.state;

        ranges[indexField] = value;
        
        this.setState({
            ranges
        });
    }

    renderPreviewModal = () => {
        let { isOpenPreviewModal, image } = this.state;
        
        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
        
        return (
            <Modal
                isVisible={isOpenPreviewModal}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                onBackButtonPress={
                    () => this.togglePreviewModal(false)
                }
                hasBackdrop={false}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    margin: 0
                }}
            >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: 20
                    }}>
                        
                        <IconButton
                            icon='close'
                            size={24}
                            color='#fff'
                            onPress={() => this.togglePreviewModal(false)}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                        <Image
                            source={image}
                            style={{
                                width: '100%'
                            }}
                            resizeMode='contain'
                        />
                    </View>
                   
            </Modal>
        )
    }


    renderPricingModal = () => {
        let { isOpenPricingModal, selectedTarif, title, ranges, price } = this.state,
        {orderForm, t} = this.props, {pricing} = orderForm;

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
        
        return (
            <Modal
                isVisible={isOpenPricingModal}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                onBackButtonPress={
                    () => this.togglePricingModal(false)
                }
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
                            `${t('addPricingTitle')} ${pricing.length}/3`
                        }
                    </Text>
                    {
                        selectedTarif && 
                        <IconButton
                            icon='delete'
                            size={24}
                            color='#000'
                            onPress={this.deletePrice}
                        />
                    }
                    <IconButton
                        icon='close'
                        size={24}
                        color='#000'
                        onPress={ () => this.togglePricingModal(false) }
                    />
                </View>
                
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, }}>
                    
                    <View style={{
                                paddingHorizontal: 20
                            }}>
                            <Paragraph style={{
                                marginBottom: 10,
                                fontFamily: 'Poppins-Medium'
                            }}>
                                {t('pricingInfoLabel')}
                            </Paragraph>
                                <View style={[styles.inputContainer,]}>
                                    <TextInput
                                        label={t('title')}
                                        onChangeText={text => this.setState({title: text})}
                                        value={title}
                                        underlineColor='transparent'
                                        style={[styles.inputText]}
                                    />
                                </View>
                                <View style={[styles.inputContainer,]}>
                                    <TextInput
                                        label={t('price')}
                                        onChangeText={text => this.setState({price: text})}
                                        keyboardType='phone-pad'
                                        underlineColor='transparent'
                                        style={[styles.inputText]}
                                        value={price}
                                    />
                                </View>
                                <View>
                                <Paragraph style={{
                                    marginTop: 20,
                                    marginBottom: 10,
                                    fontFamily: 'Poppins-Medium'
                                }}>
                                    {t('ranges')}
                                </Paragraph>
                                {
                                    [1,2,3,4,5,6,7,8,9,10].map((value, index) => (
                                        <View key={index} style={[styles.inputContainer]}>
                                            <Text>
                                                {t('range')} {value}
                                            </Text>
                                            <TextInput
                                                label=''
                                                onChangeText={text => this.handleRange(index, text)}
                                                underlineColor='transparent'
                                                style={[styles.inputText]}
                                                value={ranges[index] || ''}
                                            />
                                        </View>
                                    ))
                                }
                                </View>
                            </View>
                    
                </ScrollView>
                
                {
                    (Platform.OS === 'android' ?
                    <TouchableNativeFeedback
                        useForeground
                        onPress={this.handlePrice}
                        disabled={!selectedTarif && pricing.length === 3}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: !selectedTarif && pricing.length === 3 ? '#D1D1D1' : '#93AF00',
                            padding: 15,
                        }}>
                            
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold',
                                textTransform: 'uppercase',
                                marginRight: 5,
                                color: '#fff'
                            }}>
                                {
                                    selectedTarif ?
                                    t('update') :
                                    pricing.length === 3 ? 
                                    t('reachedPricings') : 
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
                            backgroundColor: !selectedTarif && pricing.length === 3 ?'#D1D1D1' : '#93AF00',
                            padding: 15,
                        }}
                        onPress={this.handlePrice}
                        disabled={!selectedTarif && pricing.length === 3}
                    >
                        <Text style={{
                            fontFamily: 'Poppins-SemiBold',
                            textTransform: 'uppercase',
                            marginRight: 5,
                            color: '#fff'
                        }}>
                            {
                                selectedTarif ?
                                t('update') :
                                pricing.length === 3 ? 
                                t('reachedPricings') : 
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
        let {
            checkedNumbers, checkedQuality, checkedTarif,
        } = this.state, 
        {
            handleText, orderForm, cleanPricing, t
        } = this.props, 
        {
            pricing, number1, number2, number3, quality1, quality2, quality3
        } = orderForm;

        

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.supplementItem}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Checkbox
                                status={checkedTarif ? 'checked' : 'unchecked'}
                                onPress={() => { 
                                    
                                   
                                    this.setState({ 
                                        checkedTarif: !checkedTarif
                                     
                                    }, () => {
                                        if(checkedTarif) {
                                            cleanPricing();
                                         }
                                    }); 
                                    
                                }}
                                color='#1C246C'
                            />
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold'
                            }}>
                                {t('pricing')}
                            </Text>
                        </View>
                        <IconButton
                            icon='eye'
                            onPress={() => this.togglePreviewModal(true, images.tarif)}
                            color='#1C246C'
                        />
                    </View>
                    <Text style={styles.textSupplement}>
                        {t('pricingDescription')}
                    </Text>

                    {
                        checkedTarif &&
                        <Animatable.View animation='bounceIn' style={styles.supplementItemContent}>
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
                                <Text>
                                    {t('ourPrices')}
                                </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 10,
                                    backgroundColor: '#1C246C'
                                }}>
                                    <Text style={{flex: 2, color: 'white'}}>{t('title')}</Text>
                                    <Text style={{flex: 1, color: 'white'}}>{t('price')}</Text>
                                </View>
                                <View>
                                    {
                                        pricing.length > 0 ?
                                        
                                            (pricing.map((tarif, index) => (
                                                <>
                                                    {
                                                        Platform.OS === 'android' ? 
                                                        <TouchableNativeFeedback
                                                            useForeground
                                                            onPress={() => this.togglePricingModal(true, tarif, index)}
                                                            key={index}
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
                                                                <Text style={{flex: 2, fontSize: 12, marginRight: 5}} numberOfLines={1}>{tarif.title}</Text>
                                                                <Text style={{flex: 1, fontSize: 12, marginRight: 5}} numberOfLines={1}>{tarif.price}</Text>
                                                            </View>
                                                        </TouchableNativeFeedback>:
                                                        <TouchableOpacity
                                                            onPress={() => this.togglePricingModal(true, tarif, index)}
                                                            key={index}
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                padding: 10,
                                                                borderBottomColor: '#F1F1F1',
                                                                borderBottomWidth: 1
                                                            }}
                                                        >
                                                                <Text style={{flex: 2, fontSize: 12, marginRight: 5}} numberOfLines={1}>{tarif.title}</Text>
                                                                <Text style={{flex: 1, fontSize: 12, marginRight: 5}} numberOfLines={1}>{tarif.price}</Text>
                                                        </TouchableOpacity>

                                                    }
                                                    
                                                </>
                                            )))
                                        :
                                        <Text style={{
                                            fontSize: 12,
                                            textAlign: 'center',
                                            margin: 10
                                        }}>
                                            {t('pricingInfoLabel')}
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
                                        onPress={() => this.togglePricingModal(true)}
                                        disabled={pricing.length === 3}
                                    />
                                </View>
                            </View>
                        </Animatable.View>

                    }
                </View>

                <View style={styles.supplementItem}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Checkbox
                                status={checkedQuality ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({ 
                                    checkedQuality: !checkedQuality 
                                }, () => {
                                        if(checkedQuality) {
                                            handleText('quality1', '');
                                            handleText('quality2', '');
                                            handleText('quality3', '');
                                        }
                                })}
                                color='#1C246C'
                            />
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold'
                            }}>
                                3 {t('qualities')}
                            </Text>
                        </View>
                        <IconButton
                            icon='eye'
                            onPress={() => this.togglePreviewModal(true, images.quality)}
                            color='#1C246C'
                        />
                    </View>
                    <Text style={styles.textSupplement}>
                    {t('qualitiesDecription')}
                    </Text>

                    {
                        checkedQuality &&
                        <Animatable.View animation='bounceIn' style={styles.supplementItemContent}>
                            <View style={styles.inputContainer}>
                                <Text>
                                    {t('quality')} 1
                                </Text>
                                <TextInput
                                    label=''
                                    onChangeText={text => handleText('quality1', text)}
                                    value={quality1}
                                    underlineColor='transparent'
                                    style={styles.inputText}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>
                                {t('quality')} 2
                                </Text>
                                <TextInput 
                                    label=''
                                    onChangeText={text => handleText('quality2', text)}
                                    value={quality2}
                                    underlineColor='transparent'
                                    style={styles.inputText}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>
                                {t('quality')} 3
                                </Text>
                                <TextInput 
                                    label=''
                                    onChangeText={text => handleText('quality3', text)}
                                    value={quality3}
                                    underlineColor='transparent'
                                    style={styles.inputText}
                                />
                            </View>
                        </Animatable.View>
                    }
                </View>

                <View style={styles.supplementItem}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Checkbox
                                status={checkedNumbers ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({ 
                                    checkedNumbers: !checkedNumbers 
                                }, () => {
                                    if(checkedNumbers) {
                                        handleText('number1', '');
                                        handleText('number2', '');
                                        handleText('number3', '');
                                    }
                                })}
                                color='#1C246C'
                            />
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold'
                            }}>
                                3 {t('figures')}
                            </Text>
                        </View>
                        <IconButton
                            icon='eye'
                            onPress={() => this.togglePreviewModal(true, images.number)}
                            color='#1C246C'
                        />
                    </View>
                    <Text style={styles.textSupplement}>
                        {t('figuresDescription')}
                    </Text>
                    {
                        checkedNumbers &&
                        <Animatable.View animation='bounceIn' style={styles.supplementItemContent}>
                            <View style={styles.inputContainer}>
                                <Text>
                                    {t('figure1')}
                                </Text>
                                <TextInput
                                    label=''
                                    onChangeText={text => handleText('number1', text)}
                                    value={number1}
                                    underlineColor='transparent'
                                    style={styles.inputText}
                                    keyboardType='phone-pad'
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>
                                {t('figure2')}
                                </Text>
                                <TextInput 
                                    label=''
                                    onChangeText={text => handleText('number2', text)}
                                    value={number2}
                                    underlineColor='transparent'
                                    style={styles.inputText}
                                    keyboardType='phone-pad'
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>
                                {t('figure3')}
                                </Text>
                                <TextInput 
                                    label=''
                                    onChangeText={text => handleText('number3', text)}
                                    value={number3}
                                    underlineColor='transparent'
                                    style={styles.inputText}
                                    keyboardType='phone-pad'
                                />
                            </View>
                        </Animatable.View>
                    }
                </View>
            
                {this.renderPreviewModal()}
                {this.renderPricingModal()}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    orderForm: main.orderForm,
    formErrors: main.formErrors
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'orderForm')),
    savePrice: (arrayName, price, indexPrice = null) => dispatch(handleArray(arrayName, price, indexPrice, 'orderForm')),
    removePrice: (arrayName, index) => dispatch(removeArrayItem(arrayName, index, 'orderForm')),
    cleanPricing: () => dispatch(handleFullArray('pricing', [], 'orderForm')) 
})

SupplementPage = withTranslation()(SupplementPage);

export default connect(mapStateToProps, mapDispatchToProps)(SupplementPage)
