import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        flexGrow: 1,
        padding: 20
    },
    content: {
        flex: 1,
        padding: 20
    },
    swiper: {
        backgroundColor: '#1C246C'
    },
    slide: {
        flex: 1,
        paddingVertical: '20%',
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },  
    slideTitle: {
        fontSize: 29, 
        color: 'white',
        textAlign: 'center'
    },
    logo: {
        height: 180,
        width: '100%'
    },
    inputContainer: {
        marginBottom: 10
    },
    button: {
        height: 50
    },
    inputText: {
        height: 50,
        fontSize: 12,
        borderRadius: 5
    },
    list: {
        paddingVertical: 15
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        
    },
    listItemContent: {
        flex: 1, 
        paddingLeft: 10
    },
    listItemText: {
        fontSize: 12, 
        textAlign: 'justify',
    },
    modalTitle: {
        flex: 1,
        fontFamily: 'Poppins-Bold',
        fontSize: 17
    },
    supplements: {

    },
    supplementItem: {
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,        
        marginBottom: 10
    },
    textSupplement: {
        color: 'gray',
        fontSize: 10,
        marginHorizontal: 10,
        marginBottom: 10
    },
    supplementItemContent: {
        padding: 10
    }
});

export default styles;