import { StyleSheet } from "react-native";
export const appTheme = "#0095ba";
const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    scrollContainer: {
        flex: 1
    },
    logoStyle: {
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#0095ba'
    },
    gap: { height: 10 },
    textFieldStyle: {
        fontSize: 20,
        color: '#808080',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    erroMsg: {
        alignSelf: 'center',
        color: '#ff0000',
        fontSize: 20
    }
});

export default loginStyles;