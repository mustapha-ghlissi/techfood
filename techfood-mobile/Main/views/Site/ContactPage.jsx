import React, { Component } from 'react'
import { View, StyleSheet, TouchableNativeFeedback, TouchableOpacity, TextInput as RNTextInput, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import styles from '../../assets/style'
import { TextInput, Text, HelperText, IconButton, RadioButton, Divider, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _ from 'lodash';
import moment from 'moment';
import { handleChangeText, handleFullArray } from '../../actions/actionCreators';
import { withTranslation } from 'react-i18next';

class ContactPage extends Component {

    constructor(props) {
        super(props);


        this.state = {
            workTime: 'fulltime',
            customWorkTimeShown: false,
            isPickerVisible: false, 
            activeDay: null,
            activeTime: null,
            workDays: {
                [props.t('monday')]: {
                    start: null,
                    end: null,
                    closed: false
                },
                [props.t('tuesday')]: {
                    start: null,
                    end: null,
                    closed: false
                },
                [props.t('wednesday')]: {
                    start: null,
                    end: null,
                    closed: false
                },
                [props.t('thursday')]: {
                    start: null,
                    end: null,
                    closed: false
                },
                [props.t('friday')]: {
                    start: null,
                    end: null,
                    closed: false
                },
                [props.t('saturday')]: {
                    start: null,
                    end: null,
                    closed: false
                },
                [props.t('sunday')]: {
                    start: null,
                    end: null,
                    closed: false
                }
            }
        }
    }

    showPicker = (activeDay, activeTime) => {
        this.setState((state, props) => ({
            isPickerVisible: true,
            activeDay,
            activeTime
        }))
    }

    hidePicker = () => {
        this.setState((state, props) => ({
            isPickerVisible: false,
            activeDay: null,
            activeTime: null
        }))
    }

    handleConfirm = (date) => {
        let { activeDay, activeTime } = this.state, 
        {
            saveWorkDays
        } = this.props;
        
        this.setState((state, props) => ({
            isPickerVisible: false,
            workDays: {
                ...state.workDays,
                [activeDay]: {
                    ...state.workDays[activeDay],
                    [activeTime]: moment(date).format('HH:mm')
                }
            }
        }), () => saveWorkDays('workTimeHours', this.state.workDays));
    }

    handleWorkTime = (value) => {
        let {handleText} = this.props;

        this.setState({ 
            workTime: value,
            customWorkTimeShown: value === 'custom'
        }, () => handleText('fullTimeWork', value !== 'custom'));
    }

    handleClosedDay = (day) => {
        this.setState((state, props) => ({
            workDays: {
                ...state.workDays,
                [day]: {
                    ...state.workDays[day],
                    closed: !state.workDays[day].closed
                }
            }
        }))
    }

    renderDayItem = (day) => {
        let {
            workDays
        } = this.state, activeDay = workDays[day];
        const {t} = this.props;
        return(
            <View>
                <Text style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-SemiBold'
                }}>
                    {_.capitalize(day)}
                </Text>
                {
                    Platform.OS === 'android' ?
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 10
                        }}>
                        <Checkbox
                            status={activeDay.closed ? 'checked' : 'unchecked'}
                            onPress={() => this.handleClosedDay(day)}
                            color='#1C246C'
                        />
                        <Text style={{
                            fontSize: 12
                        }}>
                            {t('closed')}
                        </Text>
                        </View>
                        <TouchableNativeFeedback
                            onPress={() => this.showPicker(day, 'start')}
                            useForeground
                            background={TouchableNativeFeedback.Ripple('#1C246C')}
                            disabled={activeDay.closed}
                        >
                        <View style={innerStyles.timeContainer}>
                            <RNTextInput 
                                style={[innerStyles.inputTime, activeDay.closed && {backgroundColor: '#F1F1F1'} ]}
                                underlineColor='transparent'
                                editable={false}
                                value={activeDay.start}
                                placeholder='-- : --'
                                disabled={activeDay.closed}
                            />
                        </View>
                        </TouchableNativeFeedback>
                        <Text style={{
                            marginHorizontal: 5
                        }}>
                            -
                        </Text>
                        <TouchableNativeFeedback
                            onPress={() => this.showPicker(day, 'end')}
                            background={TouchableNativeFeedback.Ripple('#1C246C')}
                            useForeground
                            disabled={activeDay.closed}
                        >
                            <View style={innerStyles.timeContainer}>
                                <RNTextInput 
                                    style={[innerStyles.inputTime, activeDay.closed && {backgroundColor: '#F1F1F1'} ]}
                                    underlineColor='transparent'
                                    editable={false}
                                    value={activeDay.end}
                                    placeholder='-- : --'
                                    disabled={activeDay.closed}
                                />
                            </View>
                        </TouchableNativeFeedback>
                    </View>:
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 10
                        }}>
                        <Checkbox
                            status={activeDay.closed ? 'checked' : 'unchecked'}
                            onPress={() => this.handleClosedDay(day)}
                            color='#1C246C'
                        />
                        <Text style={{
                            fontSize: 12
                        }}>
                            {t('closed')}
                        </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.showPicker(day, 'start')}
                            disabled={activeDay.closed}
                            style={innerStyles.timeContainer}
                        >
                            <RNTextInput 
                                style={[innerStyles.inputTime, activeDay.closed && {backgroundColor: '#F1F1F1'} ]}
                                underlineColor='transparent'
                                editable={false}
                                value={activeDay.start}
                                placeholder='-- : --'
                                disabled={activeDay.closed}
                            />
                        </TouchableOpacity>
                        <Text style={{
                            marginHorizontal: 5
                        }}>
                            -
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.showPicker(day, 'end')}
                            disabled={activeDay.closed}
                            style={innerStyles.timeContainer}
                        >
                            <RNTextInput 
                                style={[innerStyles.inputTime, activeDay.closed && {backgroundColor: '#F1F1F1'} ]}
                                underlineColor='transparent'
                                editable={false}
                                value={activeDay.end}
                                placeholder='-- : --'
                                disabled={activeDay.closed}
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }

    renderCustomWorkTime = () => {
        const {t} = this.props;
        return (
            <Animatable.View
                animation='fadeIn'
            >
                {this.renderDayItem(t('monday'))}
                <Divider style={{marginVertical: 10}}/>
                {this.renderDayItem(t('tuesday'))}
                <Divider style={{marginVertical: 10}}/>
                {this.renderDayItem(t('wednesday'))}
                <Divider style={{marginVertical: 10}}/>
                {this.renderDayItem(t('thursday'))}
                <Divider style={{marginVertical: 10}}/>
                {this.renderDayItem(t('friday'))}
                <Divider style={{marginVertical: 10}}/>
                {this.renderDayItem(t('saturday'))}
                <Divider style={{marginVertical: 10}}/>
                {this.renderDayItem(t('sunday'))}
            </Animatable.View>
        )
    }

    render() {

        let {workTime, customWorkTimeShown, isPickerVisible} = this.state,
        {
            formErrors, handleText, orderForm, t
        } = this.props;

        return (
            <Animatable.View 
                style={styles.container}
                animation='fadeIn'
            >
                <Text style={{
                    marginBottom: 10
                }}>
                    {t('contactDescription')}
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        label={t('address') + ' (' + t('optional') + ')'}
                        onChangeText={text => handleText('contactAddress', text)}
                        value={orderForm.contactAddress}
                        textContentType='fullStreetAddress'
                        underlineColor='transparent'
                        style={styles.inputText}
                    />
                    <HelperText>
                    {t('contactFileds.address')}
                    </HelperText>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        label={t('phone') + ' (' + t('optional') + ')'}
                        onChangeText={text => handleText('contactPhone', text)}
                        value={orderForm.contactPhone}
                        keyboardType='phone-pad'
                        textContentType='organizationName'
                        underlineColor='transparent'
                        style={styles.inputText}
                    />
                    <HelperText>
                    {t('contactFileds.phone')}
                    </HelperText>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        label={t('email')}
                        onChangeText={text => handleText('email', text.trim())}
                        value={orderForm.email}
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        underlineColor='transparent'
                        style={styles.inputText}
                        error={'email' in formErrors}
                    />
                    { 'email' in formErrors &&
                        <HelperText
                            type="error"
                        >
                            {formErrors.email}
                        </HelperText>
                    }
                    <HelperText>
                    {t('contactFileds.email')}
                    </HelperText>
                </View>


                <View style={{
                    backgroundColor: '#E1E1E1',
                    borderRadius: 5,
                    padding: 10
                }}>
                    <Text style={{
                        marginBottom: 10
                    }}>
                        
                        {t('workTime')}
                    </Text>
                    <View style={styles.inputContainer}>
                        <RadioButton.Group
                            onValueChange={value => this.handleWorkTime(value)}
                            value={workTime}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 10
                                }}>
                                    <RadioButton value="fulltime" color='#1C246C'/>
                                    <Text>24/24 - 7/7</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 10
                                }}>
                                    
                                    <RadioButton value="custom" color='#1C246C'/>
                                    <Text>{t('custom')}</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>
                    { customWorkTimeShown && this.renderCustomWorkTime()}

                    <DateTimePickerModal
                        isVisible={isPickerVisible}
                        mode="time"
                        is24Hour
                        onConfirm={this.handleConfirm}
                        onCancel={this.hidePicker}
                    />
                </View>
            </Animatable.View>
        )
    }
}


const innerStyles = StyleSheet.create({
    inputTime: {
        backgroundColor: '#fff',
        color: 'black',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        height: 35,
        paddingTop: 0,
        paddingBottom: 0  
    },
    timeContainer: {
        flex: 1, 
        overflow: 'hidden', 
        borderRadius: 5
    }
})

const mapStateToProps = ({main}) => ({
    orderForm: main.orderForm,
    formErrors: main.formErrors
})

const mapDispatchToProps = dispatch => ({
    handleText: (name, value) => dispatch(handleChangeText(name, value, 'orderForm')),
    saveWorkDays: (arrayName, arrayData) => dispatch(handleFullArray(arrayName, arrayData, 'orderForm')),
})

ContactPage = withTranslation()(ContactPage);

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
