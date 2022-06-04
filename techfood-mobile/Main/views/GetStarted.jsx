import React, { Component } from 'react'
import { SafeAreaView, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import {withTheme , Text, Title, Paragraph, Button, IconButton} from 'react-native-paper';
import styles from '../assets/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { handleQuickStart } from '../actions/actionCreators';
import { withTranslation } from 'react-i18next';

class GetStarted extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            activeSlide: 0
        }

        this.swiper = React.createRef();
    }

    goToNextSlide = () => {
        let {handleQuickStart} = this.props, {activeSlide} = this.state;

        if(activeSlide < 3) {
            this.swiper.current.scrollBy(1);
        }
        else {
            handleQuickStart();
        }
    }

    render() {

        let {handleQuickStart, t} = this.props;
     
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <Swiper 
                    style={styles.swiper}
                    showsButtons={false}
                    loop={false}
                    bounces={true}
                    activeDotColor={'white'}
                    ref={this.swiper}
                    onIndexChanged={(index) => {
                        this.setState({
                            activeSlide: index
                        })
                    }}
                    onMomentumScrollEnd={(e, state, context) => {
                        this.setState({
                            activeSlide: state.index
                        })
                    }}
                >
                    <View style={styles.slide}>
                        <Text style={styles.slideTitle}>
                            {t('themeChoice')}
                        </Text>
                        <Icon 
                            name='palette-outline'
                            size={180}
                            color='white'
                        />
                        <Text style={{color: 'white', textAlign: 'justify'}}>
                        {t('themeDescription')}
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.slideTitle}>
                            {t('siteName')}
                        </Text>
                        <Icon 
                            name='web'
                            size={180}
                            color='white'
                        />
                        <Text style={{color: 'white', textAlign: 'justify'}}>
                        {t('siteDescription')}
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.slideTitle}>
                            {t('paymentDev')}
                        </Text>
                        <Icon 
                            name='code-braces'
                            size={180}
                            color='white'
                        />
                        <Text style={{color: 'white', textAlign: 'justify'}}>
                        {t('paymentDescription')}
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.slideTitle}>
                            {t('satisfied')}
                        </Text>
                        <Icon 
                            name='emoticon-happy-outline'
                            size={180}
                            color='white'
                        />
                        <Text style={{color: 'white', textAlign: 'justify'}}>
                        {t('satisfiedDescription')}
                        </Text>
                    </View>
                </Swiper>
                    <View style={{
                        position: 'absolute',
                        bottom: 0, 
                        right: 10,
                        left: 10,
                        zIndex: 999,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10
                    }}>
                        <Button
                            mode='outlined'
                            labelStyle={{
                                color: 'white'
                            }}
                            onPress={handleQuickStart}
                            
                        >
                            {t('skip')}
                        </Button>
                        <IconButton
                            icon='chevron-right'
                            style={{
                                backgroundColor: 'white'
                            }}
                            color='#1C246C'
                            onPress={this.goToNextSlide}
                        />
                    </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    handleQuickStart: () => dispatch(handleQuickStart())
})

GetStarted = withTranslation()(GetStarted);

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(GetStarted))
