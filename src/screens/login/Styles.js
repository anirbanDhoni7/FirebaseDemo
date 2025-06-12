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
    authenticationSuccessfulContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authSuccessfulTextStyle: { fontSize: 25 }
});

export default loginStyles;