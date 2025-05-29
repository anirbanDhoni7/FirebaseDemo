import { StyleSheet } from "react-native";
import { appTheme } from "../login/Styles";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerStyle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    headerContainer: {
        backgroundColor: appTheme,
        padding: 10
    },
    itemStyle: {
        margin: 10,
        fontSize: 20
    },
    separator: {
        borderBottomWidth: 1,
        borderBlockColor: '#000'
    }
})