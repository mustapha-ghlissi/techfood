import React, { Component } from 'react'
import { 
    View, ScrollView, 
    StyleSheet, TouchableOpacity, 
    Dimensions, Platform
} from 'react-native';
import { Text, TextInput, IconButton, Paragraph, HelperText } from 'react-native-paper';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/style'
import { handleChangeText } from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';

class SiteName extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false
        }
    }

    toggleModal = () => {
        this.setState((state, props) => ({
            isOpenModal: !state.isOpenModal
        }))
    }

    renderModal = () => {
        const {t} = this.props;
        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
        
        return(
            <Modal
                isVisible={this.state.isOpenModal}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                onBackButtonPress={this.toggleModal}
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
                        {t('siteName')}
                    </Text>
                    <IconButton
                        icon='close'
                        size={24}
                        color='#000'
                        onPress={this.toggleModal}
                    />
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20}}>
                    <Text style={{
                        fontFamily: 'Poppins-SemiBold',
                        textDecorationLine: 'underline'
                    }}>
                        {t('siteName')}
                    </Text>
                    <Paragraph>
                        {t('siteDescriptionHelp.part1')}
                    </Paragraph>
                    <Text style={{
                        textDecorationLine: 'underline',
                        marginVertical: 15
                    }}>
                        {t('siteDescriptionHelp.part2')}
                    </Text>
                    <Text>
                        <Text style={{color: 'blue', textDecorationLine: 'underline', textDecorationColor: 'blue'}}>https://www.google.com: </Text>
                        
                        {t('siteDescriptionHelp.part3')}
                    </Text>
                    <Text>
                        <Text style={{color: 'blue', textDecorationLine: 'underline', textDecorationColor: 'blue'}}>https://www.samsung.com/fr/: </Text> 
                        
                        {t('siteDescriptionHelp.part4')}
                    </Text>
                    <Text style={{
                        fontFamily: 'Poppins-Bold',
                        color: 'red',
                        marginVertical: 10
                    }}>
                        {t('siteDescriptionHelp.part5')}
                    </Text>
                    <Text style={{color: 'blue', textDecorationLine: 'underline', textDecorationColor: 'blue', marginBottom: 10}}>
                        https://www.votreNomdeSite.com
                    </Text>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Icon name='alert' color='red' size={48}/>
                        <Paragraph style={{flex: 1, textAlign: 'justify', color:'red', marginLeft: 15}}>
                        {t('siteDescriptionHelp.part6')}
                        </Paragraph>
                    </View>
                    
                </ScrollView>
            </Modal>
        )
    }


    render() {

        let {orderForm, handleText, formErrors, t} = this.props;

        return (
            <Animatable.View 
                style={styles.container}
                animation='fadeIn'
            >
                <Text style={{
                    marginBottom: 10
                }}>
                    {t('siteDescription')}
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        label={t('siteName')}
                        onChangeText={text => handleText('siteName', text)}
                        value={orderForm.siteName}
                        textContentType='organizationName'
                        underlineColor='transparent'
                        style={styles.inputText}
                        error={'siteName' in formErrors}
                    />
                    { 'siteName' in formErrors &&
                        <HelperText
                            type="error"
                        >
                            {formErrors.siteName}
                        </HelperText>
                    }
                </View>
                <TouchableOpacity
                        onPress={this.toggleModal}
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
})

const innerStyles = StyleSheet.create({
    container: {
        padding: 20
    }
})

SiteName = withTranslation()(SiteName);

export default connect(mapStateToProps, mapDispatchToProps)(SiteName)
