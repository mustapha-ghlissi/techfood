import React, { Component } from 'react'
import { SafeAreaView, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../assets/style'
import { Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

const PaymentPage = () => {
    let {t} = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{
                marginBottom: 10
            }}>
                {t('payDescription')}
            </Text>

            <View style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 5,
                alignItems: 'center',

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: 'Poppins-Medium'
                }}>
                    {t('payTotal')}
                </Text>
                <Text style={{
                    flex: 1,
                    fontSize: 19,
                    fontFamily: 'Poppins-Medium'
                }}>
                    14,99€
                </Text>
            </View>
        </SafeAreaView>
    )
}



export default PaymentPage;