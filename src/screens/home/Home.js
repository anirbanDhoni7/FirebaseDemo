import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { ActivityIndicator, BackHandler, FlatList, SafeAreaView, Text } from "react-native";
import { appTheme } from "../login/Styles";
import { homeStyles } from "./Styles";

const Home = ({ navigation }) => {
    const params = '/values/CaptaincyRecords!A1:A50000?key=';
    const baseUrl = "https://sheets.googleapis.com/v4/spreadsheets/";
    const sheetId = '1OmyOIWe11MUf4oCzlmBUrETj6EvbTwn4LgrlnXroyUQ';
    const apiKey = "AIzaSyBMFN-baKvM5EAYWGqeQ7LOGJ_I3wdI9Ew";
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setIsLoading(true);
            setContents([]);
            let formData = new FormData();
            formData.append('Accept', 'application/json');
            let response = await fetch(
                baseUrl + sheetId + params + apiKey,
                {
                    method: 'GET',
                    redirect: 'follow',
                    body: '',
                    headers: formData,
                },
            );
            let res = await response.json();
            if (res && res.values && res.values.length > 0) {
                setContents(res.values);
                setIsLoading(false);
            }
        });
        return unsubscribe;
    }, [navigation]);
    return (
        <SafeAreaView style={homeStyles.container}>
            <StatusBar backgroundColor={appTheme} />
            {
                isLoading ? <ActivityIndicator size={"large"} color={appTheme} /> :
                    <FlatList
                        data={contents}
                        keyExtractor={({ item, index }) => index}
                        ListHeaderComponent={
                            <View style={homeStyles.headerContainer}>
                                <Text style={homeStyles.headerStyle}>Achievements of MS Dhoni The Greatest Captain</Text>
                            </View>
                        }
                        ItemSeparatorComponent={() => <View style={homeStyles.separator} />}
                        renderItem={({ item, index }) => (
                            <Text style={homeStyles.itemStyle}>{(index + 1) + ". " + item[0]}</Text>
                        )}
                    />
            }
        </SafeAreaView>
    )
}
export default Home;