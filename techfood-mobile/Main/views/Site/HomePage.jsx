import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, TouchableNativeFeedback, ScrollView, } from 'react-native'
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'
import styles from '../../assets/style';
import { TextInput, Text, IconButton, Paragraph, HelperText } from 'react-native-paper';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { handleChangeText } from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';

class HomePage extends Component {

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
        const { t } = this.props;
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
                        {t('presentationTitle')}
                    </Text>
                    <IconButton
                        icon='close'
                        size={24}
                        color='#000'
                        onPress={this.toggleModal}
                    />
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={{
                        fontFamily: 'Poppins-SemiBold',
                        textDecorationLine: 'underline',
                        marginHorizontal: 20
                    }}>
                        {t('presentationTitle')}
                    </Text>
                    <Paragraph style={{marginHorizontal: 20, textAlign: 'justify'}}>
                        {t('presentationDescriptionHelp.part1')}
                    </Paragraph>
                    
                    <View style={styles.list}>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                                {t('presentationDescriptionHelp.part2')}
                            </Paragraph>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                                {t('presentationDescriptionHelp.part3')}
                            </Paragraph>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('presentationDescriptionHelp.part4')}
                            </Paragraph>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('presentationDescriptionHelp.part5')}
                            </Paragraph>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{
                            textDecorationLine: 'underline',
                            marginHorizontal: 20
                        }}>
                             {t('presentationDescriptionHelp.part6')}
                        </Text>
                        <View style={styles.list}>
                            <View
                                style={styles.listItem}
                            >
                                <Icon name='check' size={20}/>
                                <View style={styles.listItemContent}>
                                <Paragraph style={styles.listItemText}>
                                {t('presentationDescriptionHelp.part7')}
                                </Paragraph>
                                </View>
                            </View>
                            <View
                                style={styles.listItem}
                            >
                                <Icon name='check' size={20}/>
                                <View style={styles.listItemContent}>
                                <Paragraph style={styles.listItemText}>
                                {t('presentationDescriptionHelp.part8')}
                                </Paragraph>
                                </View>
                            </View>

                            <View
                                style={styles.listItem}
                            >
                                <Icon name='check' size={20}/>
                                <View style={styles.listItemContent}>
                                <Paragraph style={styles.listItemText}>
                                {t('presentationDescriptionHelp.part9')}
                                </Paragraph>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                
            </Modal>
        )
    }

    render() {

        let {
            orderForm, formErrors, handleText, t
        } = this.props;

        return (
            <Animatable.View 
                style={styles.container}
                animation='fadeIn'
            >
                <Text style={{
                    marginBottom: 10
                }}>
                    {t('presentationDescription')}
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        multiline
                        label={t('presentation')}
                        onChangeText={text => handleText('presentation', text)}
                        value={orderForm.presentation}
                        textContentType='organizationName'
                        underlineColor='transparent'
                        style={[styles.inputText, innerStyles.textArea]}
                        error={'presentation' in formErrors}
                    />
                    { 'presentation' in formErrors &&
                        <HelperText
                            type="error"
                        >
                            {formErrors.presentation}
                        </HelperText>
                    }
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
                </View>
                {this.renderModal()}
            </Animatable.View>
        )
    }
}

const mapStateToProps = ({main}) => ({
    orderForm: main.orderForm,
    isLoading: main.isLoading,
    formErrors: main.formErrors
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'orderForm')),
})

const innerStyles = StyleSheet.create({
    inputContainer: {

    },
    textArea: {
      height: Dimensions.get('screen').height/3,
    }
})

HomePage = withTranslation()(HomePage);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
