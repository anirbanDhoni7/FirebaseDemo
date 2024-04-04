import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ScreenStyles from './ScreenStyles';
import ModalComponent from './ModalComponent';
import {getMyStringValue, setStringValue} from './AsyncStorage';

export default class Header extends React.Component {
  state = {
    showLanguageModal: false,
    selectedLanguage: '',
  };
  async componentDidMount() {
    this.setState({
      selectedLanguage: await getMyStringValue('language'),
    });
  }
  render() {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor="#0095ba" />
        <View style={ScreenStyles.styleHeaderOuterContainer}>
          <View style={ScreenStyles.styleHeaderInnerContainer}>
            {!this.props.disabled && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{marginRight: 10}}
                onPress={() => this.props.navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
            )}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: this.props.webview ? 1 : 0.8,
                }}
                disabled={this.props.disabled}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={[ScreenStyles.styleHeaderTitle, { paddingLeft: 0 }]} numberOfLines={this.props.webview ? 1 : undefined}>
                  {this.props.title}
                </Text>
              </TouchableOpacity>
              {/* {
                !this.props.webview &&
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ alignSelf: 'center' }}
                    onPress={async () =>
                      this.setState({
                        selectedLanguage: await getMyStringValue('language'),
                        showLanguageModal: true,
                      })
                    }
                  >
                    <Ionicons name="language-outline" size={30} color="#fff" />
                  </TouchableOpacity>
              } */}

            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
