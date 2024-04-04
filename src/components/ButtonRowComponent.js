import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import ScreenStyles from './ScreenStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

class ButtonRowComponent extends React.Component {
  render() {
    return (
      <View
        style={[
          ScreenStyles.movieIconRowStyle,
          {paddingRight: 0},
          this.props.trophy && {paddingHorizontal: '4%'},
          this.props.buttonArray.length == 3 && {paddingHorizontal: 10},
          this.props.performanceYear && {paddingBottom: 20},
          this.props.marginTop && {marginTop: this.props.marginTop},
          this.props.marginBottom && { marginBottom: this.props.marginBottom },
        ]}
      >
        {this.props.buttonArray.map((item, key) => (
          <TouchableOpacity
            style={[
              ScreenStyles.styleEachTouchableInRow,
              { width: item.width },
              key !== this.props.buttonArray.length - 1 && {
                marginRight: this.props.buttonArray.length == 2 ? '5%' : '1%',
              },
              item.performanceYear && { backgroundColor: '#008000' },
              this.props.theme.dark && {
                backgroundColor: '#ffd700',
                borderColor: '#ffd700',
              },
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }
            ]}
            activeOpacity={0.5}
            onPress={() => 
              item.url !== ''
                ?
                item.navigation.navigate(
                  "WebViewComponent",
                  item.url && { url: item.url },
                )
                  // item.performanceYear
                  // ? item.url
                  // : () =>
                  //     item.navigationType !== 'internal'
                  //       ? Linking.openURL(item.url)
                  //       : item.navigation.navigate(
                  //           item.url,
                  //           item.type && {type: item.type},
                  //         )
                : null
            }
          >
            <Text
              style={[
                ScreenStyles.extraTextStyleForTopPerformanceAnalysis,
                item.performanceYear && {color: '#fff'},
                this.props.theme.dark && {
                  color: '#1b1b1b',
                  fontWeight: 'bold',
                },
              ]}
            >
              {item.title}
            </Text>
            <FontAwesome
              name='chevron-right'
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default props => {
  const {colors} = useTheme();
  return <ButtonRowComponent {...props} theme={colors} />;
};
