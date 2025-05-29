import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { StatusBar } from "react-native";
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { removeStringValue } from "../../components/AsyncStorage";
import { ASYNCSTORAGE_PARAMETERS } from "../../components/Constants";
import loginStyles, { appTheme } from "../login/Styles";
import { settingsStyles } from "./Styles";

const Settings = props => {
    const navigation = useNavigation();
    const logout = async () => {
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.LOGIN_STATUS);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.NAME);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.GENDER);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.DOB);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.ADDRESS);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.CITY);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.STATE);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.COUNTRY);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.USERNAME);
        await removeStringValue(ASYNCSTORAGE_PARAMETERS.PASSWORD);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: "Login"
                    }
                ]
            })
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <StatusBar backgroundColor={appTheme} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={settingsStyles.itemContainer}
                    activeOpacity={0.7}
                >
                    <Text style={settingsStyles.textStyle}>Accounts</Text>
                </TouchableOpacity>
                <View style={loginStyles.gap} />
                <TouchableOpacity
                    style={settingsStyles.itemContainer}
                    activeOpacity={0.7}
                >
                    <Text style={settingsStyles.textStyle}>Notifications</Text>
                </TouchableOpacity>
                <View style={loginStyles.gap} />
                <TouchableOpacity
                    style={settingsStyles.itemContainer}
                    activeOpacity={0.7}
                >
                    <Text style={settingsStyles.textStyle}>Display</Text>
                </TouchableOpacity>
                <View style={loginStyles.gap} />
                <TouchableOpacity
                    style={settingsStyles.itemContainer}
                    activeOpacity={0.7}
                >
                    <Text style={settingsStyles.textStyle}>Privacy & Security</Text>
                </TouchableOpacity>
                <View style={loginStyles.gap} />
                <TouchableOpacity
                    style={settingsStyles.itemContainer}
                    activeOpacity={0.7}
                    onPress={logout}
                >
                    <Text style={settingsStyles.textStyle}>LOG OUT</Text>
                </TouchableOpacity>
                <View style={loginStyles.gap} />
                <View style={loginStyles.gap} />
            </ScrollView>
        </SafeAreaView>
    )
}
export default Settings;