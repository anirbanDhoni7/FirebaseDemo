import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { getMyStringValue } from './AsyncStorage'

export const CheckNetwork = async (navigation) => {
    let state = await NetInfo.fetch();
    if (!state.isConnected) {
        let language = await getMyStringValue('language');
        let title = language === "ENGLISH" ? 'You are currently offline. Please turn on your mobile data or connect with a high speed WiFi Network.' : language === "BENGALI" ? 'আপনি বর্তমানে অফলাইনে আছেন। অনুগ্রহ করে আপনার মোবাইল ডেটা চালু করুন বা একটি উচ্চ গতির ওয়াইফাই নেটওয়ার্কের সাথে সংযোগ করুন৷' : language === "HINDI" ? "आप वर्तमान में ऑफ़लाइन हैं. कृपया अपना मोबाइल डेटा चालू करें या हाई स्पीड वाईफाई नेटवर्क से जुड़ें।" : ''; 
        Alert.alert(
            '',
            title,
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ],
            {
                cancelable: false,
                userInterfaceStyle: 'light',
            },
        );
    }
} 