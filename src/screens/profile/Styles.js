import { StyleSheet } from "react-native";
import { appTheme } from "../login/Styles";

const profileStyles = StyleSheet.create({
    container: { flex: 1 },
    top: {
        position: 'relative',
        top: 0,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: appTheme,
    },
    iconContainer: {
        height: 70,
        width: 70,
        padding: 10,
        borderRadius: 70 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: appTheme,
        padding: 10
    },
    textStyle: {
        color: appTheme,
        fontSize: 25,
        textAlign: 'center'
    },
    editButton: {
        color: appTheme,
        fontSize: 40
    },
    rightContainer: {
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: appTheme
    },
    textField: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        textAlign: 'center'
    },
    modalHeaderStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomWidth: 1,
        fontSize: 20,
        padding: 10
    },
    modalItemSeparatorComponent: { borderTopWidth: 1, borderColor: '#000' },
    modalItemStyle: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ok: {
        position: 'relative',
        bottom: 0,
        paddingVertical: 5,
        backgroundColor: appTheme
    }
})

export default profileStyles;