import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform} from 'react-native'
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'
import styles from '../../assets/style';
import { TextInput, Text, Paragraph, IconButton, HelperText } from 'react-native-paper';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { handleChangeText } from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';


class AboutPage extends Component {

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
                        {t('aboutUs')}
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
                        marginHorizontal: 20,
                        textAlign: 'justify'
                    }}>
                        {t('aboutUsDescriptionHelp.part1')}
                    </Text>
                   
                    
                    <View style={styles.list}>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('aboutUsDescriptionHelp.part2')}
                            </Paragraph>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('aboutUsDescriptionHelp.part3')}
                            </Paragraph>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('aboutUsDescriptionHelp.part4')}
                            </Paragraph>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('aboutUsDescriptionHelp.part5')}
                            </Paragraph>
                            </View>
                        </View>
                    </View>

                    <Text style={{
                        fontFamily: 'Poppins-SemiBold',
                        marginHorizontal: 20,
                        textAlign: 'justify'
                    }}>
                        {t('aboutUsDescriptionHelp.part6')}
                    </Text>
                    <View style={styles.list}>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('aboutUsDescriptionHelp.part7')}
                            </Paragraph>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('aboutUsDescriptionHelp.part8')}
                            </Paragraph>
                            </View>
                        </View>
                        <View
                            style={styles.listItem}
                        >
                            <Icon name='check' size={20}/>
                            <View style={styles.listItemContent}>
                            <Paragraph style={styles.listItemText}>
                            {t('aboutUsDescriptionHelp.part9')}
                            </Paragraph>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={{
                            textDecorationLine: 'underline',
                            marginHorizontal: 20
                        }}>
                             {t('aboutUsDescriptionHelp.part10')}
                        </Text>
                        <View style={styles.list}>
                            <View
                                style={styles.listItem}
                            >
                                <Icon name='check' size={20}/>
                                <View style={styles.listItemContent}>
                                    <Paragraph style={styles.listItemText}>
                                    {t('aboutUsDescriptionHelp.part11')}
                                    </Paragraph>
                                    <Text style={styles.listItemText}>
                                    {t('aboutUsDescriptionHelp.part12')}
                                    </Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part13')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part14')}</Text>
                                </View>
                            </View>
                            <View
                                style={styles.listItem}
                            >
                                <Icon name='check' size={20}/>
                                <View style={styles.listItemContent}>
                                    <Paragraph style={styles.listItemText}>
                                    {t('aboutUsDescriptionHelp.part15')}
                                    </Paragraph>
                                    <Text style={{fontSize: 12, textDecorationLine: 'underline'}}>
                                    {t('aboutUsDescriptionHelp.part16') + '\n\n\n' +  t('aboutUsDescriptionHelp.part17')}
                                    </Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part18')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part19')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part20')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part21')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part22')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part23')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part24')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part25')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part26')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part27')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part28')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part29')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part30')}</Text>
                                </View>
                            </View>
                            <View
                                style={styles.listItem}
                            >
                                <Icon name='check' size={20}/>
                                <View style={styles.listItemContent}>
                                   
                                    <Text style={{fontSize: 12, textDecorationLine: 'underline'}}>
                                    {t('aboutUsDescriptionHelp.part37')}
                                    </Text>
                                   
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part32')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part33')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part34')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part35')}</Text>
                                    <Text style={[styles.listItemText, {color: 'blue'}]}>- {t('aboutUsDescriptionHelp.part36')}</Text>
                                </View>
                            </View>
                        </View>

                       <View style={{
                           paddingVertical: 10,
                           paddingHorizontal: 20,
                       }}>
                        <Paragraph style={{}}>
                           {t('aboutUsDescriptionHelp.part31')}
                            </Paragraph>
                            <Paragraph style={{marginVertical: 15, textDecorationLine: 'underline'}}>
                            {t('aboutUsDescriptionHelp.part38')}
                            </Paragraph>

                            <Paragraph style={{textAlign: 'justify', color: 'white', backgroundColor: '#1C246C', borderRadius: 10, padding: 10}}>
                            {t('aboutUsDescriptionHelp.part39') + '\n\n\n' + t('aboutUsDescriptionHelp.part40') + '\n\n\n'}


                            {t('aboutUsDescriptionHelp.part41')}


                            
                        </Paragraph>
                       </View>
                    </View>
                </ScrollView>
                
            </Modal>
        )
    }

    render() {

        let {
            formErrors, orderForm, handleText, t
        } = this.props;

        return (
            <Animatable.View 
                style={styles.container}
                animation='fadeIn'
            >
                <Text style={{
                    marginBottom: 10
                }}>
                    {t('aboutUsDescription')}
                </Text>
                <View style={[styles.inputContainer, innerStyles.inputContainer]}>
                    <TextInput
                        multiline
                        label={t('aboutUsPlaceholder')}
                        onChangeText={text => handleText('about', text)}
                        value={orderForm.about}
                        textContentType='organizationName'
                        underlineColor='transparent'
                        style={[styles.inputText, innerStyles.textArea]}
                        error={'about' in formErrors}
                    />
                    { 'about' in formErrors &&
                        <HelperText
                            type="error"
                        >
                            {formErrors.about}
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
    formErrors: main.formErrors
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'orderForm')),
})

const innerStyles = StyleSheet.create({
    inputContainer: {
        flex: 1
    },
    textArea: {
        height: Dimensions.get('screen').height/3,
    }
})

AboutPage = withTranslation()(AboutPage);

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)
