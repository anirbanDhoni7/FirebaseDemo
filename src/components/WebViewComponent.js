import React from 'react';
import { ActivityIndicator, Dimensions, Linking, SafeAreaView, View } from 'react-native';
import Header from './Header';
import { WebView } from 'react-native-webview';
import { useTheme } from '@react-navigation/native';
import { CheckNetwork } from '../components/CheckNetwork';

class WebViewComponent extends React.Component {
    state = {
        key: Math.random()
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                key: Math.random()
            });
            CheckNetwork(this.props.navigation);
        })
    }

    render = () => (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                navigation={this.props.navigation}
                title={this.props.route.params.url}
                webview
            />
            {/* {
                this.state.isLoadingUrl &&
                <View
                    style={{
                        paddingVertical: 20,
                        backgroundColor: "#fff"
                    }}
                >
                    <ActivityIndicator 
                        size="large" 
                        color="#0095ba" 
                    />
                </View>
            } */}
            <WebView
                originWhitelist={['*']}
                onError={err => Linking.openURL(this.props.route.params.url)}
                key={this.state.key}
                source={{ uri: this.props.route.params.url }}
                // onLoadEnd={() => this.setState({isLoadingUrl: false})}
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}
                startInLoadingState={true}
            />
            <View style={{ height: 10 }} />
        </SafeAreaView>
    );
}

export default props => {
    const { colors } = useTheme();
    return <WebViewComponent {...props} theme={colors} />;
};