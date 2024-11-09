import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {       
        flexDirection: 'row',
        justifyContent: 'space-between',        
        paddingRight: 10,
    },
    input: {
        color: "#000",
        fontSize: 18,
        padding: 10,
        width: '90%',
        borderBottomWidth: 2,
        borderBottomColor: '#bae6e3',
        marginHorizontal: 0,
        marginVertical: 0,
    },
    iconTextInput: {        
        top: 15,
        width: 25,
        height: 25,
    }
});

export default styles;