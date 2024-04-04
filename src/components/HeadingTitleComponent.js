import React from 'react';
import {Platform, Text, TouchableOpacity, View, Linking} from 'react-native';
import ScreenStyles from './ScreenStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

class HeadingTitleComponent extends React.Component {
  renderUnBoxedHeading = () => (
    <View
      style={[
        ScreenStyles.styleHeadingView,
        this.props.marginTop && {marginTop: this.props.marginTop},
        this.props.isTouchable && ScreenStyles.touchableIconRowAdditionalStyle,
        this.props.left && {width: String(100 - this.props.left) + '%'},
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!this.props.isTouchable}
        onPress={this.props.onIconPress}
        style={{width: '8%'}}
      >
        {!this.props.isFontAwesome ? (
          <Ionicons
            name={
              Platform.OS === 'ios'
                ? `ios-${this.props.iconType}`
                : `md-${this.props.iconType}`
            }
            size={this.props.iconSize ? this.props.iconSize : 27}
            color={
              this.props.theme.dark && this.props.left
                ? '#ffff00'
                : this.props.pointIconColor
                ? this.props.pointIconColor
                : '#E19F11'
            }
          />
        ) : (
          <FontAwesome
            name={this.props.iconType}
            size={this.props.iconSize ? this.props.iconSize : 22}
            color={
              this.props.pointIconColor ? this.props.pointIconColor : '#E19F11'
            }
          />
        )}
      </TouchableOpacity>
      {!this.props.newStyle ? (
        <>
          <Text
            selectable={!this.props.notSelectable}
            onPress={this.props.onTextPress ? this.props.onTextPress : null}
            style={
              !this.props.isTouchable
                ? !this.props.hasIconAtRightSide
                  ? [
                      ScreenStyles.stylesHeadingText,
                      this.props.left && {
                        paddingLeft: 3,
                        color: this.props.theme.dark
                          ? '#a9a9a9'
                          : this.props.headerColor
                          ? this.props.headerColor
                          : '#808080',
                      },
                      this.props.theme.dark &&
                        !this.props.left && {color: this.props.theme.text},
                      this.props.fontSize && {fontSize: this.props.fontSize},
                      this.props.fontColor && {color: this.props.fontColor},
                    ]
                  : [
                      ScreenStyles.stylesHeadingText,
                      {
                        width: this.props.headingTitleTextWidth
                          ? this.props.headingTitleTextWidth
                          : '78%',
                      },
                      this.props.headerColor && {
                        color: this.props.headerColor,
                      },
                      this.props.theme.dark && {color: '#fff'},
                      this.props.fontSize && {fontSize: this.props.fontSize},
                      this.props.fontColor && {color: this.props.fontColor},
                    ]
                : [
                    ScreenStyles.styleCommentTesterText,
                    {
                      paddingTop: 0,
                      width: '89%',
                      color: this.props.headerColor
                        ? this.props.headerColor
                        : '#1c72c3',
                    },
                    this.props.fontSize && {fontSize: this.props.fontSize},
                    this.props.marginHorizontal && {
                      marginHorizontal: this.props.marginHorizontal,
                    },
                    this.props.theme.dark && {color: '#fff'},
                    this.props.fontColor && {color: this.props.fontColor},
                  ]
            }
          >
            {this.props.headingTitle}
          </Text>
          {this.props.hasIconAtRightSide && (
            <View style={ScreenStyles.justifyContentCenter}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  ScreenStyles.topPerformanesImageShowStyle,
                  {
                    borderColor: this.props.iconColor
                      ? this.props.iconColor
                      : '#4E7CDF',
                  },
                ]}
                onPress={
                  !this.props.navigationType
                    ? () => this.props.navigation.navigate("WebViewComponent", {url: this.props.url})
                    : this.props.onHeadingPress
                }
              >
                <Ionicons
                  name={
                    this.props.socialLogo
                      ? this.props.clickableIcon
                      : Platform.OS === 'ios'
                      ? `ios-${this.props.clickableIcon}`
                      : `md-${this.props.clickableIcon}`
                  }
                  size={23}
                  color={
                    this.props.iconColor ? this.props.iconColor : '#4E7CDF'
                  }
                />
              </TouchableOpacity>
              {this.props.hasSecondIconAtRightSide && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    ScreenStyles.topPerformanesImageShowStyle,
                    {
                      borderColor: this.props.iconColor
                        ? this.props.iconColor
                        : '#4E7CDF',
                    },
                    {marginTop: this.props.marginTop},
                  ]}
                  onPress={
                    !this.props.navigationType
                      ? () => Linking.openURL(this.props.secondUrl)
                      : this.props.onHeadingPressAnother
                  }
                >
                  <Ionicons
                    name={
                      Platform.OS === 'ios'
                        ? `ios-${this.props.secondClickableIcon}`
                        : `md-${this.props.secondClickableIcon}`
                    }
                    size={23}
                    color={
                      this.props.iconColor ? this.props.iconColor : '#4E7CDF'
                    }
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </>
      ) : (
        this.props.newComponent
      )}
    </View>
  );

  renderBoxedHeading = () => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={this.props.onHeadingPress}
      style={[
        ScreenStyles.styleBoxHeadingView,
        {
          borderColor: this.props.textColor ? this.props.textColor : '#3CB371',
          borderWidth: 0.8,
          backgroundColor: this.props.color ? this.props.color : '#3CB371',
        },
        this.props.marginTop && {marginTop: this.props.marginTop},
        this.props.theme.dark && {
          backgroundColor: '#ffff00',
          borderColor: '#ffff00',
        },
      ]}
      key={this.props.key}
    >
      <Text
        style={[
          ScreenStyles.styleCommentTesterText,
          {color: this.props.textColor ? this.props.textColor : '#fff'},
          this.props.fontSize && {fontSize: this.props.fontSize},
          {width: '90%'},
          this.props.theme.dark && {color: '#1b1b1b'},
        ]}
      >
        {this.props.headingTitle}
      </Text>
      {!this.props.state ? (
        <FontAwesome
          name="angle-right"
          size={30}
          color={
            this.props.theme.dark
              ? '#1b1b1b'
              : this.props.textColor
              ? this.props.textColor
              : '#fff'
          }
        />
      ) : (
        <FontAwesome
          name="angle-up"
          size={30}
          color={
            this.props.theme.dark
              ? '#1b1b1b'
              : this.props.textColor
              ? this.props.textColor
              : '#fff'
          }
        />
      )}
    </TouchableOpacity>
  );

  render = () =>
    !this.props.isHeadingBoxed
      ? this.renderUnBoxedHeading()
      : this.renderBoxedHeading();
}

export default props => {
  const {colors} = useTheme();
  return <HeadingTitleComponent {...props} theme={colors} />;
};
