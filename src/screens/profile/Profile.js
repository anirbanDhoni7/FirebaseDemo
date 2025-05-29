import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import profileStyles from "./Styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import loginStyles, { appTheme } from "../login/Styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalComponent from "../../components/ModalComponent";
import { ASYNCSTORAGE_PARAMETERS, availableStates, genders } from "../../components/Constants";
import CountryPicker from 'react-native-country-picker-modal'
import CustomButton from "../../components/CustomButton";
import { getMyStringValue, setStringValue } from "../../components/AsyncStorage";
import { StatusBar } from "react-native";

const Profile = props => {
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState('MS Dhoni');
    const [gender, setGender] = useState('Male');
    const [address, setAddress] = useState('MS Dhoni Bunglow');
    const [city, setCity] = useState('Ranchi');
    const [state, setUserState] = useState('Jharkhand');
    const [country, setCountry] = useState('India');
    const [dob, setDob] = useState('7.7.1981');
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openStatePicker, setOpenStatePicker] = useState(false);
    const [openCountryPicker, setOpenCountryPicker] = useState(false);
    const [showDataModal, openShowDataModal] = useState(false);
    useEffect(() => {
        getMyStringValue(ASYNCSTORAGE_PARAMETERS.NAME).then(event => {
            event != null && setName(event?.split("\"")[1]?.split("\"")[0]);
        });
        getMyStringValue(ASYNCSTORAGE_PARAMETERS.GENDER).then(event => {
            event != null && setGender(event?.split("\"")[1]?.split("\"")[0]);
        });
        getMyStringValue(ASYNCSTORAGE_PARAMETERS.DOB).then(event => {
            event != null && setDob(event?.split("\"")[1]?.split("\"")[0]);
        });
        getMyStringValue(ASYNCSTORAGE_PARAMETERS.ADDRESS).then(event => {
            event != null && setAddress(event?.split("\"")[1]?.split("\"")[0]);
        });
        getMyStringValue(ASYNCSTORAGE_PARAMETERS.CITY).then(event => {
            event != null && setCity(event?.split("\"")[1]?.split("\"")[0]);
        });
        getMyStringValue(ASYNCSTORAGE_PARAMETERS.STATE).then(event => {
            event != null && setUserState(event?.split("\"")[1]?.split("\"")[0]);
        });
        getMyStringValue(ASYNCSTORAGE_PARAMETERS.COUNTRY).then(event => {
            event != null && setCountry(event?.split("\"")[1]?.split("\"")[0]);
        });
    }, []);
    const getDateObject = (date) => {
        let dateObject = new Date();
        dateObject.setDate(Number(date.split(".")[0]));
        dateObject.setMonth(Number(date.split(".")[1]) - 1);
        dateObject.setFullYear(Number(date.split(".")[2]));
        return dateObject;
    }
    const pickDate = date => {
        setDob(
            new Date(date).getDate() + "." +
            (new Date(date).getMonth() + 1) + "." +
            new Date(date).getFullYear()
        );
        setOpenDatePicker(false);
    }
    const submit = async () => {
        await setStringValue(ASYNCSTORAGE_PARAMETERS.NAME, name);
        await setStringValue(ASYNCSTORAGE_PARAMETERS.GENDER, gender);
        await setStringValue(ASYNCSTORAGE_PARAMETERS.DOB, dob);
        await setStringValue(ASYNCSTORAGE_PARAMETERS.ADDRESS, address);
        await setStringValue(ASYNCSTORAGE_PARAMETERS.CITY, city);
        await setStringValue(ASYNCSTORAGE_PARAMETERS.STATE, state);
        await setStringValue(ASYNCSTORAGE_PARAMETERS.COUNTRY, country);
        openShowDataModal(true);
    }
    return (
        <SafeAreaView style={profileStyles.container}>
            <StatusBar backgroundColor={appTheme} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={profileStyles.top}>
                    <View style={profileStyles.topRow}>
                        <View style={[profileStyles.leftContainer, { backgroundColor: '#ffff00', borderBottomWidth: 1 }]}>
                            <View style={profileStyles.iconContainer}>
                                <Ionicons
                                    name="person"
                                    color={appTheme}
                                    size={40}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={async () => {
                                    if (editable) {
                                        await setStringValue(ASYNCSTORAGE_PARAMETERS.NAME, name);
                                        await setStringValue(ASYNCSTORAGE_PARAMETERS.GENDER, gender);
                                        await setStringValue(ASYNCSTORAGE_PARAMETERS.DOB, dob);
                                        await setStringValue(ASYNCSTORAGE_PARAMETERS.ADDRESS, address);
                                        await setStringValue(ASYNCSTORAGE_PARAMETERS.CITY, city);
                                        await setStringValue(ASYNCSTORAGE_PARAMETERS.STATE, state);
                                        await setStringValue(ASYNCSTORAGE_PARAMETERS.COUNTRY, country);
                                        openShowDataModal(true);
                                    } else {
                                        setEditable(true);
                                    }
                                }}
                            >
                                <Text style={profileStyles.editButton}>{editable ? "UPDATE" : "EDIT"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={profileStyles.rightContainer}>
                            {
                                editable ?
                                    <TextInput
                                        value={name}
                                        onChangeText={text => setName(text)}
                                        maxLength={30}
                                        style={[profileStyles.textStyle, profileStyles.textField]}
                                        multiline
                                    />
                                    : <Text style={profileStyles.textStyle}>{name}</Text>
                            }
                        </View>
                    </View>
                </View>
                <View style={profileStyles.topRow}>
                    <View style={profileStyles.leftContainer}>
                        {
                            editable ?
                                <View>
                                    <Text style={[profileStyles.textStyle, { fontWeight: 'bold' }]}>GENDER :</Text>
                                    <FlatList
                                        data={genders}
                                        keyExtractor={({ item, index }) => item}
                                        style={{
                                            maxHeight: Dimensions.get('screen').height * 0.1
                                        }}
                                        ListHeaderComponent={<View style={loginStyles.gap} />}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                style={[profileStyles.rightContainer, { flex: 1 }]}
                                                onPress={() => setGender(item)}
                                            >
                                                <Ionicons
                                                    name={`radio-button-${item == gender ? "on" : "off"}`}
                                                    color={appTheme}
                                                    size={20}
                                                />
                                                <Text style={[profileStyles.textStyle, { fontSize: 20 }]}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                                : <Text style={profileStyles.textStyle}>My Gender is {gender}</Text>
                        }
                    </View>
                    <View style={profileStyles.rightContainer}>
                        {
                            editable ?
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setOpenDatePicker(!openDatePicker)}
                                >
                                    <Text style={profileStyles.textStyle}>Select Date of Birth :</Text>
                                    <Text style={profileStyles.textStyle}>[Selected : {dob}]</Text>
                                </TouchableOpacity>
                                : <Text style={profileStyles.textStyle}>Date Of Birth - {dob}</Text>
                        }
                    </View>
                </View>
                <View style={profileStyles.topRow}>
                    <View style={profileStyles.leftContainer}>
                        {
                            editable ?
                                <View>
                                    <Text style={[profileStyles.textStyle, { fontWeight: 'bold', textAlign: 'center' }]}>ADDRESS :</Text>
                                    <TextInput
                                        value={address}
                                        onChangeText={text => setAddress(text)}
                                        maxLength={30}
                                        style={[profileStyles.textStyle, profileStyles.textField]}
                                        multiline
                                    />
                                </View>
                                : <Text style={profileStyles.textStyle}>I live in {address}</Text>
                        }
                    </View>
                    <View style={profileStyles.rightContainer}>
                        {
                            editable ?
                                <View>
                                    <Text style={[profileStyles.textStyle, { fontWeight: 'bold', textAlign: 'center' }]}>CITY :</Text>
                                    <TextInput
                                        value={city}
                                        onChangeText={text => setCity(text)}
                                        maxLength={30}
                                        style={[profileStyles.textStyle, profileStyles.textField]}
                                        multiline
                                    />
                                </View>
                                : <Text style={profileStyles.textStyle}>I am a resident of the city {city}</Text>
                        }
                    </View>
                </View>
                <View style={profileStyles.topRow}>
                    <View style={profileStyles.leftContainer}>
                        {
                            editable ?
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setOpenStatePicker(!openStatePicker)}
                                >
                                    <Text style={profileStyles.textStyle}>Select State :</Text>
                                    <Text style={profileStyles.textStyle}>[Selected : {state}]</Text>
                                </TouchableOpacity>
                                : <Text style={profileStyles.textStyle}>I am a voter of {state} state</Text>
                        }
                    </View>
                    <View style={profileStyles.rightContainer}>
                        {
                            editable ?
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setOpenCountryPicker(!openCountryPicker)}
                                >
                                    <Text style={profileStyles.textStyle}>Select Country :</Text>
                                    <Text style={profileStyles.textStyle}>[Selected : {country}]</Text>
                                </TouchableOpacity>
                                : <Text style={profileStyles.textStyle}> I am a citizen of {country}</Text>
                        }
                    </View>
                </View>
                <View style={loginStyles.gap} />
                <View style={loginStyles.gap} />
                {
                    editable &&
                    <CustomButton
                        text={"SUBMIT"}
                        color={appTheme}
                        fontSize={15}
                        style={{ width: '90%' }}
                        borderRadius={10}
                        onPress={submit}
                    />
                }
                <View style={loginStyles.gap} />
                <View style={loginStyles.gap} />
                <View style={loginStyles.gap} />
                <View style={loginStyles.gap} />
            </ScrollView>
            {
                openDatePicker &&
                <DateTimePickerModal
                    isVisible={openDatePicker}
                    mode="date"
                    date={(dob != null && dob != '') ? getDateObject(dob) : new Date()}
                    onConfirm={pickDate}
                    onCancel={() => setOpenDatePicker(false)}
                />
            }
            {
                openStatePicker &&
                <ModalComponent
                    isModalVisible={openStatePicker}
                    isModalClose={() => setOpenStatePicker(!openStatePicker)}
                    modalBody={
                        <FlatList
                            ListHeaderComponent={
                                <Text style={profileStyles.modalHeaderStyle}>Select From Below State or UTs</Text>
                            }
                            data={availableStates}
                            ItemSeparatorComponent={() => <View style={profileStyles.modalItemSeparatorComponent} />}
                            keyExtractor={({ item, index }) => index}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={profileStyles.modalItemStyle}
                                    onPress={() => {
                                        setUserState(item);
                                        setOpenStatePicker(false);
                                    }}
                                >
                                    <Text style={[profileStyles.textStyle, { maxWidth: '75%' }]}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    }
                />
            }
            {
                openCountryPicker &&
                <CountryPicker
                    visible={openCountryPicker}
                    onSelect={country => {
                        setCountry(country.name);
                        setOpenCountryPicker(false);
                    }}
                    onClose={() => setOpenCountryPicker(false)}
                />
            }
            {
                showDataModal &&
                <ModalComponent
                    isModalVisible={showDataModal}
                    isModalClose={() => {
                        openShowDataModal(!showDataModal);
                        setEditable(false);
                    }}
                    height={0.445}
                    modalBody={
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={profileStyles.modalItemStyle}>
                                <Text style={[profileStyles.textStyle, { fontSize: 20 }]}>My name is - {name}</Text>
                            </View>
                            <View style={profileStyles.modalItemSeparatorComponent} />
                            <View style={profileStyles.modalItemStyle}>
                                <Text style={[profileStyles.textStyle, { fontSize: 20 }]}>My gender is - {gender}</Text>
                            </View>
                            <View style={profileStyles.modalItemSeparatorComponent} />
                            <View style={profileStyles.modalItemStyle}>
                                <Text style={[profileStyles.textStyle, { fontSize: 20 }]}>I took birth on {dob}</Text>
                            </View>
                            <View style={profileStyles.modalItemSeparatorComponent} />
                            <View style={profileStyles.modalItemStyle}>
                                <Text style={[profileStyles.textStyle, { fontSize: 20 }]}>I live in {address}</Text>
                            </View>
                            <View style={profileStyles.modalItemSeparatorComponent} />
                            <View style={profileStyles.modalItemStyle}>
                                <Text style={[profileStyles.textStyle, { fontSize: 20 }]}>I am a resident of the city {city}</Text>
                            </View>
                            <View style={profileStyles.modalItemSeparatorComponent} />
                            <View style={profileStyles.modalItemStyle}>
                                <Text style={[profileStyles.textStyle, { fontSize: 20 }]}>I am a voter of the state of {state}</Text>
                            </View>
                            <View style={profileStyles.modalItemSeparatorComponent} />
                            <View style={profileStyles.modalItemStyle}>
                                <Text style={[profileStyles.textStyle, { fontSize: 20 }]}>I am a citizen of {country}</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={profileStyles.ok}
                                onPress={() => {
                                    setOpenStatePicker(false);
                                    setEditable(false);
                                    props.navigation.navigate("Home");
                                }}
                            >
                                <Text style={[profileStyles.textStyle, { color: '#fff' }]}>OK</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    }
                />
            }
        </SafeAreaView>
    )
}
export default Profile;